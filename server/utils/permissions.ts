import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access'

const statement = {
  ...defaultStatements,
  project: ['create', 'share', 'update', 'delete'],
} as const

const ac = createAccessControl(statement)

const user = ac.newRole({
  project: ['create'],
})

const admin = ac.newRole({
  project: ['create', 'share', 'update', 'delete'],
  ...adminAc.statements,
})

export { ac, admin, user }
