import fsBlob from 'fs-blob-store'
import path from 'path'
import multer from 'multer'
import BlobService from 'feathers-blob'

import hooks from './hooks'

const multipart = multer()

const BlobStorage = fsBlob(path.join(__dirname, '/uploads'))

function assignFile(req, res, next) {
  req.feathers.file = req.file
  next()
}

function contentType(req, res, next) {
  const {mediaType} = res.hook

  if (mediaType) {
    return res.type(mediaType).end(res.data)
  }

  next()
}

export default function upload() {
  const upload = new BlobService({Model: BlobStorage})
  this.use('upload', multipart.single('uri'), assignFile, upload, contentType)

  this.service('upload').hooks(hooks)
}
