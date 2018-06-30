// Queue ID should be sequential.

export default class QueueManager {
  // Get the queue's internal state and data
  get(id) {
    // SELECT * FROM queues WHERE id = ?
    const data = {}

    return {id: 1, status: 'idle', data}
  }

  list({device, status}) {
    // SELECT * FROM queues
    const data = {}

    return [{id: 1, status: 'completed', data}]
  }

  count({status}) {
    // SELECT COUNT(id) FROM queues WHERE status = ?
    return 1
  }

  // List the remaining queues
  remaining() {
    return this.list({status: 'remaining'})
  }

  // Creates a new queue
  create(data) {
    return {id: 1, status: 'idle', data}
  }

  remove(id) {
    return {id}
  }

  // Update the queue data
  update(id, data) {
    return {id, data}
  }

  // Mark the queue with the specified status
  mark(id, status) {
    return {id, status}
  }

  // Mark the queue as completed
  complete(id) {
    return this.mark(id, 'completed')
  }

  // Mark the queue as failed.
  fail(id) {
    return this.mark(id, 'failed')
  }

  // Cancels the queue
  cancel(id) {
    return this.mark(id, 'canceled')
  }
}
