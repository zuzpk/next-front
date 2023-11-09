import './app.scss'
import '@zuzjs/ui/styles'
import Wrapper from './wrapper'

export const metadata = {
  title: 'ZuzApp',
  description: 'Control what you share',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="stylesheet" href="https://i.icomoon.io/public/temp/933a74526e/furrpk/style.css" /> */}
      </head>
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}