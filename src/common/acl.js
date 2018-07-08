import {AccessControl} from 'accesscontrol'

const ac = new AccessControl()

ac.grant('admin').readAny('debug')

ac.lock()

export default ac
