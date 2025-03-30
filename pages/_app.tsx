import type { AppProps } from "next/app"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <Component {...pageProps} />
            <Toaster />
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

