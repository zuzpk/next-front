import { 
  APP_NAME, 
  APP_DESCRIPTION,  
  APP_URL,
  GA_MEASUREMENT_ID
} from '@/config'
import Wrapper from './wrapper'
import '@/app/css/app.scss'
import '@zuzjs/ui/styles'

export const metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://icons.zuzcdn.net" />
      </head>
      <body>
        <Wrapper>{children}</Wrapper>
        {GA_MEASUREMENT_ID != "__" && <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />}
        {GA_MEASUREMENT_ID != "__" && <Script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>}
        {/* <link rel="stylesheet" href="https://icons.zuzcdn.net/public/ICON_ID/style.css" />         */}
      </body>
    </html>
  )

}