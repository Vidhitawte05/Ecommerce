// This file ensures the netlify/functions directory exists
// It's not used directly but helps with Netlify deployment

exports.handler = async (event, context) => ({
  statusCode: 200,
  body: JSON.stringify({ message: "Netlify Functions are working" }),
})

