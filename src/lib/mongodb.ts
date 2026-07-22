import { MongoClient } from 'mongodb'

const options = {}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getMongoUri() {
  return (
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL ||
    ''
  )
}

async function createMongoClient() {
  const uri = getMongoUri()
  if (!uri) {
    throw new Error(
      'Missing MongoDB connection string. Set MONGODB_URI, MONGO_URI, or DATABASE_URL in your environment.'
    )
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
