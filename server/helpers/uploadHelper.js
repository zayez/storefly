const multer = require('@koa/multer')
const { format } = require('date-fns')
const fs = require('fs')
const { isProd } = require('../config')
const { IMAGE_MAX_SIZE_MB } = require('../config').app
const IMAGE_MAX_SIZE = 1024 * (1024 * IMAGE_MAX_SIZE_MB)

const uploadsDir = isProd ? './public/uploads/' : './tests/data/uploads/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      fs.mkdirSync(uploadsDir, { recursive: true })
      cb(null, uploadsDir)
    } catch (err) {
      throw err
    }
  },
  filename: (req, file, cb) => {
    const f = `${format(new Date(), 'yyyy-MM-dd-hh-mm-ss')}_${
      file.originalname
    }`
    cb(null, f)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/png') {
    cb(null, true)
    return
  }
  cb(null, false)
}

const upload = multer({
  storage,
  limits: { fileSize: IMAGE_MAX_SIZE },
  fileFilter,
})

module.exports = upload
