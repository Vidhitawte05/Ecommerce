import type { NextPageContext } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  statusCode?: number
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">
        {statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}
      </h1>
      <p className="text-lg mb-8">We apologize for the inconvenience. Please try again later.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

