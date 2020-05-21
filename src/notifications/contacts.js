import crypto from 'crypto'

export default function buildCreateUpload({ Id }) {
    return function createUpload({
        id = Id.makeId(),
        name,
        phone,
        email,
        merchant_id,
        group_id
    } = {}) {


        if (!phone || !name) {
            throw new Error("Empty phone number or name!")
        }

        //if the number starts with +254 leave it and check for spaces and remove the spaces.
        if (phone.startsWith('+')) {
            phone.replace(/[+]/g, '')
            phone.replace(/\s/g, '')
        }

        let hash
        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getPhone: () => phone,
            getEmail: () => email,
            getMerchantId: () => merchant_id,
            getGroupId: () => group_id,
            getHash: () => hash || (hash = makeHash())
        })
        function makeHash() {
            return crypto.createHash('md5').update(email).digest("hex")
        }
    }
} 