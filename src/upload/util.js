import dauria from 'dauria'

export async function fileToURI(file) {
  const buffer = await streamToBuffer(file.stream)
  const type = file.detectedMimeType || file.clientReportedMimeType
  const uri = dauria.getBase64DataURI(buffer, type)

  return uri
}

const asBuffer = part => (Buffer.isBuffer(part) ? part : Buffer.from(part))

export async function streamToBuffer(stream) {
  const parts = await streamToArray(stream)
  const buffers = parts.map(asBuffer)

  return Buffer.concat(buffers)
}

export function streamToArray(stream) {
  if (!stream || typeof stream === 'function') {
    stream = this
  }

  return new Promise((resolve, reject) => {
    // stream is already ended
    if (!stream.readable) return resolve([])

    let arr = []

    stream.on('data', onData)
    stream.on('end', onEnd)
    stream.on('error', onEnd)
    stream.on('close', onClose)

    function onData(doc) {
      arr.push(doc)
    }

    function onEnd(err) {
      if (err) {
        reject(err)
      } else {
        resolve(arr)
      }

      cleanup()
    }

    function onClose() {
      resolve(arr)
      cleanup()
    }

    function cleanup() {
      arr = null
      stream.removeListener('data', onData)
      stream.removeListener('end', onEnd)
      stream.removeListener('error', onEnd)
      stream.removeListener('close', onClose)
    }
  })
}
