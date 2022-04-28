const multer = require('multer')
const Task = require('../../models/Task')

const recTaskUpload = multer({
    limits: {
        // 10 MB max size
        fileSize: 10000000
    }, 
    async fileFilter(req, file, cb) {
        // Note !!!
        // validation on the file extension can be done 
        // in the frontend and save db query overhead
        const allowedTypes = ['pdf','docx','rar','zip'];
        const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.')+1, file.originalname.length)
        // console.log(allowedTypes,fileExtension)
        if(!allowedTypes.includes(fileExtension)) {
            return cb(new Error('Please upload the correct format'))
        }
        cb(undefined, true)
    }
})

module.exports = recTaskUpload ;