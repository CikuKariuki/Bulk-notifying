import entityService from '../notifications'

export default function createAddUpload({ communicationDb }) {
    return async function addUpload(uploadInfo) {
        const merchant_id = uploadInfo.params.merchant_id
        const group_id = uploadInfo.body.group_id
        const csv = uploadInfo.csv //should return what is in the csv

        csv.forEach(async (csvItem) => {
            const upload = entityService.createUpload({ ...csvItem, merchant_id, group_id })
            return communicationDb.createContact({
                phone: upload.getPhone(),
                merchants: [
                    {
                        merchant_id: upload.getMerchantId(),
                        name: upload.getName(),
                        email: upload.getEmail(),
                        group_id: upload.getGroupId()
                    }

                ]

            })

        })
    }
}