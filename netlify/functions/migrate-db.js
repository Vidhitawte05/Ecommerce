const { PrismaClient } = require("@prisma/client")

exports.handler = async (event, context) => {
  const prisma = new PrismaClient()

  try {
    console.log("Running database migrations...")

    // Check if tables exist by trying to count users
    try {
      const userCount = await prisma.user.count()
      console.log(`Database has ${userCount} users`)
    } catch (error) {
      if (error.code === "P2021") {
        console.log("Database tables do not exist.")
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Database tables do not exist", code: "P2021" }),
        }
      } else {
        console.error("Database error:", error)
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Database error", details: error.message }),
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Database is ready", tables: ["User", "Product", "Order", "Wishlist"] }),
    }
  } catch (error) {
    console.error("Migration error:", error)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Migration failed", details: error.message }),
    }
  } finally {
    await prisma.$disconnect()
  }
}

