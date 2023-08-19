import { db } from '.'
import { config } from './schema'

// Create config default data
await db.insert(config).values({})
