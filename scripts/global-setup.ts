import { truncateTables } from './truncate-tables'

export default async function globalSetup(): Promise<void> {
  console.log('Running global setup once befere everything...')
  await truncateTables()
}
