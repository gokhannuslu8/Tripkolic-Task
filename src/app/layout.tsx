import './globals.css'
import { Toaster } from 'react-hot-toast'
import { FavoriteProvider } from '@/context/FavoriteContext'
import { CartProvider } from '@/context/CartContext'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <FavoriteProvider>
            {children}
            <Toaster position="bottom-right" toastOptions={{
              duration: 2000,
              style: {
                background: '#fff',
                color: '#333',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }} />
          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  )
}
