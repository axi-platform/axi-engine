import {consume} from '../common/rabbit'

export default async function DeviceProcessor(app) {
  async function onStatusUpdate(data, key, meta) {
    console.log('[> Device Status Update]', data)
  }

  await consume('amq.topic', 'device.*.status', onStatusUpdate)
}
