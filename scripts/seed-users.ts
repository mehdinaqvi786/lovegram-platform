import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lovergram'

const SAMPLE_USERS = [
  {
    email: 'sara.ali@lovegram.com',
    password: 'SecurePass123!',
    firstName: 'Sara',
    lastName: 'Ali',
    bio: 'Love spontaneous adventures, sunset dates, and meaningful conversations. Looking for genuine connection.',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    email: 'maya.khan@lovegram.com',
    password: 'SecurePass123!',
    firstName: 'Maya',
    lastName: 'Khan',
    bio: 'Wine enthusiast, bookworm, and certified hopeless romantic. Believe in slow love and deep connection.',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    email: 'leila.aslam@lovegram.com',
    password: 'SecurePass123!',
    firstName: 'Leila',
    lastName: 'Aslam',
    bio: 'Artist, dreamer, and adventure seeker. Love cooking for two and creating memories that last.',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    email: 'alex.ross@lovegram.com',
    password: 'SecurePass123!',
    firstName: 'Alex',
    lastName: 'Ross',
    bio: 'Musician and coffee lover. Seeking someone who values authenticity and shared laughter.',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    email: 'james.miller@lovegram.com',
    password: 'SecurePass123!',
    firstName: 'James',
    lastName: 'Miller',
    bio: 'Traveler, photographer, and nature enthusiast. Let\'s explore the world together.',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    email: 'emma.wilson@lovegram.com',
    password: 'SecurePass123!',
    firstName: 'Emma',
    lastName: 'Wilson',
    bio: 'Yoga instructor and wellness coach. Believe in balance, growth, and true companionship.',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    email: 'daniel.smith@lovegram.com',
    password: 'SecurePass123!',
    firstName: 'Daniel',
    lastName: 'Smith',
    bio: 'Chef and food blogger. Looking for someone to cook and create magic with.',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    email: 'sophia.brown@lovegram.com',
    password: 'SecurePass123!',
    firstName: 'Sophia',
    lastName: 'Brown',
    bio: 'Photographer and philosophy enthusiast. Seeking depth and real connection.',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
]

async function seedUsers() {
  const client = new MongoClient(MONGO_URI)

  try {
    await client.connect()
    const db = client.db()
    const usersCollection = db.collection('users')

    console.log('🔄 Deleting existing test/demo users...')

    const testEmails = [
      'test@',
      'debug@',
      'demo@',
      'placeholder@',
      'sample@',
    ]

    for (const emailPattern of testEmails) {
      const result = await usersCollection.deleteMany({
        email: { $regex: `^${emailPattern}` },
      })
      if (result.deletedCount > 0) {
        console.log(`   ✓ Deleted ${result.deletedCount} test user(s) with pattern: ${emailPattern}`)
      }
    }

    console.log('\n✨ Seeding real users...')

    for (const user of SAMPLE_USERS) {
      const existingUser = await usersCollection.findOne({ email: user.email })
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const result = await usersCollection.insertOne({
          email: user.email,
          passwordHash: hashedPassword,
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          profilePicture: user.profilePicture,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        console.log(`   ✓ Created user: ${user.firstName} ${user.lastName} (${user.email})`)
        console.log(`      ID: ${result.insertedId}`)
      } else {
        console.log(`   ⚠ User already exists: ${user.email}`)
      }
    }

    console.log('\n✅ Database seeding completed successfully!')

    const totalUsers = await usersCollection.countDocuments()
    console.log(`\n📊 Total users in database: ${totalUsers}`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

seedUsers()
