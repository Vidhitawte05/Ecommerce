const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  // Parse the incoming request
  const { path, httpMethod, body } = event
  const data = body ? JSON.parse(body) : {}

  try {
    // Simple router based on the path
    if (path.startsWith("/api/products")) {
      return await handleProducts(httpMethod, data)
    } else if (path.startsWith("/api/orders")) {
      return await handleOrders(httpMethod, data)
    } else if (path.startsWith("/api/users")) {
      return await handleUsers(httpMethod, data)
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Not found" }),
      }
    }
  } catch (error) {
    console.error("Prisma function error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  } finally {
    await prisma.$disconnect()
  }
}

async function handleProducts(method, data) {
  if (method === "GET") {
    const products = await prisma.product.findMany()
    return {
      statusCode: 200,
      body: JSON.stringify({ products }),
    }
  }
  // Add other methods as needed
}

async function handleOrders(method, data) {
  if (method === "GET") {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ orders }),
    }
  }
  // Add other methods as needed
}

async function handleUsers(method, data) {
  if (method === "GET") {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ users }),
    }
  }
  // Add other methods as needed
}

