export const metadata = {
  title: 'IMPACT - ReFi Platform',
  description: 'ReFi app for ecological verification, staking, and impact tracking',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}