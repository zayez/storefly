const path = require('path')
const fsSync = require('fs')
const { promises: fs } = require('fs')

const { isProd, isDev } = require('../config')
const existsFile = async (file) =>
  await new Promise((resolve, reject) => {
    const fileExists = fsSync.existsSync(file)
    resolve(fileExists)
  })

const deleteFile = async (filepath) => {
  const filedir = isDev || isProd ? 'public' : 'tests/data'
  const file = path.join(filedir, filepath)
  try {
    if (await existsFile(file)) {
      await fs.unlink(file)
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  deleteFile,
  existsFile,
}
