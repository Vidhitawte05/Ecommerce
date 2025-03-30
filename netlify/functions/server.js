const { builder } = require("@netlify/functions")
const { createRequestHandler } = require("@netlify/next")

const handler = createRequestHandler({
  // If you have custom Next.js configuration, you can provide it here
  // See https://nextjs.org/docs/api-reference/next.config.js/introduction
  // nextConfig: {},
})

exports.handler = builder(handler)

