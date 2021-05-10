import { PrismaClient } from '@prisma/client'

let db: PrismaClient

if (process.env.NODE_ENV !== 'development') {
  db = new PrismaClient()
} else {
  if (!global['prisma']) {
    global['prisma'] = new PrismaClient()
  }

  db = global['prisma']
}

export async function disconnect() {
  await db.$disconnect()

  return true
}

export async function connect() {
  await db.$connect()

  return true
}

export * from '@prisma/client'
export default db
