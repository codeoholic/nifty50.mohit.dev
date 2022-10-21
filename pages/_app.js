import '../styles/globals.css'
import { useEffect } from "react"
import { useRouter } from "next/router"
import * as Fathom from "fathom-client"
import Head from "next/head"

function MyApp({ Component, pageProps }) {

  	const router = useRouter()
	useEffect(() => {

		Fathom.load("XZYPYEXT",{

			excludedDomains:["localhost"],
			url:"https://inventive-elastic.mohit.dev/script.js",

		})

		const onRouteChangeComplete = () => {

			Fathom.trackPageview()

		}
		// RECORD A PAGEVIEW WHEN ROUTE CHANGES
		router.events.on("routeChangeComplete", onRouteChangeComplete)

		// UNASSIGN EVENT LISTENER
		return () => {

			router.events.off("routeChangeComplete", onRouteChangeComplete)

		}

	}, [])

  	return (
		<>
			<Head>
        		<link rel="shortcut icon" href="/nifty50.png" />
      		</Head>
			<Component {...pageProps} />
		</>
	)

}

export default MyApp
