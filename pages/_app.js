import "@/css/tailwind.css"
import "@/css/sticky.css"
import "@/css/prism.css"
import "katex/dist/katex.css"

import "@fontsource/inter/variable-full.css"

import { ThemeProvider } from "next-themes"
import Head from "next/head"
import { useRouter } from "next/router"
import Script from "next/script"

import siteMetadata from "@/data/siteMetadata"
import Analytics from "@/components/analytics"
import LayoutWrapper from "@/components/LayoutWrapper"
import { ClientReload } from "@/components/ClientReload"
import TopBanner from "@/components/topBanner"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import RSS from "@/components/Rss"

const isDevelopment = process.env.NODE_ENV === "development"
const isSocket = process.env.SOCKET
import * as snippet from "@segment/snippet"
// import ReactGA from "react-ga"
import { useEffect } from "react"
import { GoogleAnalytics } from "nextjs-google-analytics"
const POSTHOG_KEY = "phc_L9f6Uj1bRNHNEBe4QDQkLwzq8iAtzszkwzrvXw90wjV"

if (typeof window !== "undefined") {
  posthog.init(POSTHOG_KEY, {
    api_host: "https://app.posthog.com",
    // Disable in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.opt_out_capturing()
    },
  })
}

function renderSnippet() {
  const opts = {
    apiKey: process.env.SEGMENT_API_KEY,
    // note: the page option only covers SSR tracking.
    // Page.js is used to track other events using `window.analytics.page()`
    page: true,
  }
  // if (NODE_ENV === 'development') {
  //   return snippet.max(opts)
  // }

  return snippet.min(opts)
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Trigger page view on initial load
    // ReactGA.pageview(window.location.pathname + window.location.search)

    // Add listener for route changes and trigger page view
    const handleRouteChange = (url) => {
      // ReactGA.pageview(url)
      posthog?.capture("$pageview")
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    // Cleanup the listener when the component is unmounted
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <PostHogProvider client={posthog}>
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
          <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.CRISP_WEBSITE_ID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
              }}
              defer
            />
            {/* Google Tag Manager */} vv
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MCPBKZDL');`,
              }}
            />
            {/* End Google Tag Manager */}
          </Head>
          {process.env.NODE_ENV === "production" && <GoogleAnalytics trackPageViews />}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MCPBKZDL"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}

          {isDevelopment && isSocket && <ClientReload />}
          <Analytics />
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
          <RSS />
        </ThemeProvider>
      </PostHogProvider>
    </>
  )
}
