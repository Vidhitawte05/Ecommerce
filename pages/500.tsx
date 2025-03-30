import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
      <p className="text-lg mb-8">We apologize for the inconvenience. Our server encountered an error.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

