import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function truncateTables(): Promise<void> {
  await prisma.$executeRaw`DELETE FROM "Movie"` // Clear the table by deleting all rows
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name ='Movie'` // Reset auto-increment if needed
  console.log('Tables truncated')
  await prisma.$disconnect()
}
