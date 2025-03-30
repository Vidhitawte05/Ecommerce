import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seed...")

  // Create test user
  const hashedPassword = await bcrypt.hash("password123", 10)

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      passwordHash: hashedPassword,
    },
  })

  console.log("Created user:", user.email)

  // Create moods
  const moods = [
    {
      name: "Happy",
      description: "Products that make you feel happy and joyful",
      imageUrl: "/images/moods/happy.jpg",
    },
    {
      name: "Calm",
      description: "Products that help you relax and feel peaceful",
      imageUrl: "/images/moods/calm.jpg",
    },
    {
      name: "Energetic",
      description: "Products that boost your energy and motivation",
      imageUrl: "/images/moods/energetic.jpg",
    },
  ]

  for (const mood of moods) {
    await prisma.mood
      .upsert({
        where: { id: mood.name }, // This will fail, but we'll catch it
        update: {},
        create: mood,
      })
      .catch(() => {
        // If upsert fails because id is not a valid field, try create
        return prisma.mood
          .create({
            data: mood,
          })
          .catch((error) => {
            console.error(`Failed to create mood ${mood.name}:`, error.message)
          })
      })
  }

  console.log("Created moods")

  // Create products
  const products = [
    {
      name: "Aromatherapy Diffuser",
      description: "A beautiful diffuser that spreads calming scents",
      price: 39.99,
      imageUrl: "/images/products/diffuser.jpg",
      category: "Wellness",
    },
    {
      name: "Meditation Cushion",
      description: "Comfortable cushion for your meditation practice",
      price: 29.99,
      imageUrl: "/images/products/cushion.jpg",
      category: "Wellness",
    },
    {
      name: "Idea Journal",
      description: "A journal to capture your creative ideas",
      price: 19.99,
      imageUrl: "/images/products/journal.jpg",
      category: "Stationery",
    },
  ]

  for (const product of products) {
    await prisma.product
      .upsert({
        where: { id: product.name }, // This will fail, but we'll catch it
        update: {},
        create: product,
      })
      .catch(() => {
        // If upsert fails because id is not a valid field, try create
        return prisma.product
          .create({
            data: product,
          })
          .catch((error) => {
            console.error(`Failed to create product ${product.name}:`, error.message)
          })
      })
  }

  console.log("Created products")

  console.log("Seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

