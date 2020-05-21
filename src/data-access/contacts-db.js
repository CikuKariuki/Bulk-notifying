import Id from '../Id'

export default function createcontactsDb ({ makeDb }){
    return Object.freeze ({
        findAll,
        findById,
        createContact
    })
    async function findAll(){
        const db = await makeDb()
        const result = await db.collection(process.env.CONTACTS_COLLECTION).find({})
        return ( await result.toArray()).map(({ ...found }) => ({
            ...found
        }))
    }

    async function findById({ id: _id }){
        const db = await makeDb()
        const result = await db.collection(process.env.CONTACTS_COLLECTION).find({ _id })
        const found = await result.toArray()
        if(found.length === 0){
            return null
        }
        const {_id: id, ...info } = found [0]
        return{ id, ...info}
    }

async function createContact ({...uploadInfo }) {
    const db = await makeDb()
    const phone = uploadInfo.phone
    //  console.log(uploadInfo.merchants[0].group_id)

    const group_id = uploadInfo.merchants[0].group_id
    const merchants = uploadInfo.merchants
    const merchant_id = uploadInfo.merchants[0].merchant_id

    const result = await db
      .collection(process.env.CONTACTS_COLLECTION)
      .updateOne({ phone }, {
        "$push": {
           
            "merchants": {
               
                "$each": merchants
               
                
            },
        }
        
     }, { upsert: true })
    
    return result.modifiedCount > 0 ? {...uploadInfo } : null
  }
}