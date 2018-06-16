import {consume} from '../common/rabbit'

export default function DeviceController(app) {
  const devices = app.service('devices')

  async function onStatusUpdate(data, key, meta) {
    console.log('[> Device Status Update]', data)
  }

  consume('amq.topic', 'device.*.status', onStatusUpdate)
}
