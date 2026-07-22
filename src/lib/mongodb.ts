import { MongoClient } from 'mongodb'

const options = {}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

async function createMongoClient() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment variables')
  }

  const client = new MongoClient(uri, options)
  return client.connect()
}

export async function getMongoClient() {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createMongoClient()
    }
    return global._mongoClientPromise
  }

  return createMongoClient()
}
