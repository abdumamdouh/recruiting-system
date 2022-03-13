const multer = require('multer')
const Task = require('../../models/Task')

const taskUploadmulter = multer({
    limits: {
        // 10 MB max size
        fileSize: 10000000
    }, 
    async fileFilter(req, file, cb) {
        // Note !!!
        // validation on the file extension can be done 
        // in the frontend and save db query overhead
        const result = await Task.findOne({
            attributes:['uploadFormat'] ,
            where : {
                id:req.params.TaskId
            },
            raw:true
        })
        const allowedTypes = result.uploadFormat.split('-')
        const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.')+1, file.originalname.length)
        // console.log(allowedTypes,fileExtension)
        if(!allowedTypes.includes(fileExtension)) {
            return cb(new Error('Please upload the correct format'))
        }
        cb(undefined, true)
    }
})

module.exports = taskUploadmulter ;