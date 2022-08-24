const fsSync = require('fs')
const { promises: fs } = require('fs')

const existsFile = async (file) =>
  await new Promise((resolve, reject) => {
    const fileExists = fsSync.existsSync(file)
    resolve(fileExists)
  })

const deleteFile = async (filepath) => {
  try {
    if (await existsFile(filepath)) {
      await fs.unlink(filepath)
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
