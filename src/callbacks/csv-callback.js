import fs from 'fs'
const csv = require('fast-csv')

module.exports = function expressCallback ( controller ){
return (req,res)=>{
    //to see the details of the uploaded file
    // console.log("\n File Information\n",{...req.file})
    let fileRows = []
    csv.parseFile(req.file.path, {headers: ['name', 'phone', 'email']})
    .on("data", (data)=>{ 
        fileRows.push(data)
    })
    .on("end", () => {
        fs.unlinkSync(req.file.path)
        const csvData = fileRows.splice(1)
        // console.log("FILEROWS!!", csvData) 
    const httpRequest = {
        body: req.body, 
        query: req.query,
        params: req.params,
        method: req.method,
        path: req.path,
        file: req.file,
        csv: csvData,
        headers: {
            'Content-Type': req.get('Content-Type'),
            Referer: req.get('referer'),
          
            'User-Agent': req.get('User-Agent')
        }

    }
    
    controller(httpRequest)
    .then(httpResponse => {
        if(httpResponse.headers){
            res.set(httpResponse.headers)
        }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
    })
    .catch(e => res.status(500).send({error: "An unkown error occurred!"}))
})
}
}