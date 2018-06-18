import fsBlob from 'fs-blob-store'
import path from 'path'
import multer from 'multer'
import BlobService from 'feathers-blob'

import hooks from './hooks'

const multipart = multer()

const BlobStorage = fsBlob(path.join(__dirname, '/public/uploads'))

function assignFile(req, res, next) {
  req.feathers.file = req.file
  next()
}

export default function upload() {
  const upload = new BlobService({Model: BlobStorage})
  this.use('upload', multipart.single('uri'), assignFile, upload)

  this.service('upload').hooks(hooks)
}
