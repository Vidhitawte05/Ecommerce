// This is a script to check for route conflicts
// Run this with: node scripts/check-route-conflicts.js

const fs = require("fs")
const path = require("path")

// Directories to check
const directories = ["app/api", "app/account", "app/products", "app/track-order"]

// Parameter names we want to standardize
const parameterMap = {
  products: "productId",
  orders: "orderId",
  invoice: "invoiceId",
  wishlist: "productId",
}

function checkDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const fullPath = path.join(dir, file.name)

    if (file.isDirectory()) {
      // Check if this is a dynamic route
      if (file.name.startsWith("[") && file.name.endsWith("]")) {
        const paramName = file.name.slice(1, -1)
        const parentDir = path.basename(dir)

        // Check if this parameter should be standardized
        if (parameterMap[parentDir] && paramName !== parameterMap[parentDir]) {
          console.log(`Route conflict found: ${fullPath}`)
          console.log(`  Parameter should be [${parameterMap[parentDir]}] instead of [${paramName}]`)
        }
      }

      // Recursively check subdirectories
      checkDirectory(fullPath)
    }
  }
}

// Check all directories
for (const dir of directories) {
  if (fs.existsSync(dir)) {
    checkDirectory(dir)
  }
}

console.log("Route conflict check completed.")

