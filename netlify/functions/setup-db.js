const { execSync } = require("child_process")

exports.handler = async (event, context) => {
  try {
    console.log("Running database setup...")

    // Run Prisma generate
    execSync("npx prisma generate", { stdio: "inherit" })

    // Push schema to database
    execSync("npx prisma db push --accept-data-loss", { stdio: "inherit" })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Database setup completed successfully" }),
    }
  } catch (error) {
    console.error("Database setup failed:", error)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Database setup failed", details: error.message }),
    }
  }
}

