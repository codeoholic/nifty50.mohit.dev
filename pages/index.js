import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { setCookie, getCookies } from "cookies-next"
import React from "react"

import StockItem from "../components/stock/StockItem"
const githubIcon = require("../assets/github.svg")

const IndexPage = ( props ) => {

	const { data } = props
	let filter_data = getCookies("data")
	const [ state, updateState ] = React.useState({

		data: [],
		filter: ""

	})

	React.useEffect(() => {

		updateState({

			...state,
			data,

		})

	}, [ data ])

	const filterStock = ( stock ) => {

		let data = getCookies("data")
		if( Object.keys(data).length > 0) {
			data = JSON.parse(decodeURIComponent(data.data) )
			const stock_filtered_flag = data.indexOf( stock )
			if( stock_filtered_flag !== -1 ){

				data.splice( stock_filtered_flag, 1 )

			} else {

				data.push( stock )

			}
			
			setCookie("data", data)

		} else {

			data = [stock]
			setCookie("data", data)

		}
		updateState({

			...state,
			filter: encodeURIComponent( data )

		})

	}
	const RenderStocks = ( props ) => {

		let {

			filter_data

		} = props

		var stock = []
		var filtered = []
		if( Object.keys(filter_data).length > 0) {

			filter_data = JSON.parse(decodeURIComponent(filter_data.data) )

		} else {

			filter_data = []

		}
		state.data.map( ( value ) => {

			if( filter_data.indexOf( value.stock ) === -1 ){

				stock.push(
					<StockItem data={ value } filterStock={ filterStock }/>
				)

			} else {

				filtered.push(
					<StockItem data={ value } filterStock={ filterStock }/>
				)

			}

		})

		return (

			<>
				{

					filtered.length > 0 &&
					<div className="mb-5">
						<h2 className="text-xl font-semibold text-slate-800">Screening</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-2.5">
							{ filtered }
						</div>
					</div>

				}
				{

					<div>
						<h2 className="text-xl font-semibold text-slate-800">Stocks</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-2.5">
							{ stock }
						</div>
					</div>

				}
			</>

		)

	}
	return (

		<>
			<Head>
				<title>Nifty 50 | mohit.dev</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="robots" content="index, follow" />
			</Head>
			<div className="p-2.5">
				<div className="mb-2.5">
					<h1 className="text-3xl font-bold">Nifty 50</h1>
				</div>
				<RenderStocks
					filter_data={ filter_data }
				/>
				<div className="flex items-center flex-col mt-5">
					<p className="text-xs">Backend on Cloudflare Serverless</p>
					<p className="text-xs">Frontend on NextJS, deployed on <span className="line-through">Vercel</span> Cloudflare Pages</p>
					<p className="text-xs">Stock data by Yahoo Finance</p>
					<div className="text-center mt-2.5">
						<p className="text-[8px] italic">cached data, updates hourly</p>
					</div>
					<Link href="https://github.com/codeoholic" passHref>
						<a target="_blank">
							<div className="w-5 h-5 relative mt-5">
								<Image
									alt="github icon"
									layout={"fill"}
									objectFit={"contain"}
									src={ githubIcon }
									unoptimised
								/>
							</div>
						</a>
					</Link>
					<div className="mt-2.5">
						<p className="text-4xl">🐆</p>
					</div>
				</div>
			</div>
		</>

	)

}

export async function getServerSideProps( context ) {

    const response = await fetch("https://nifty50-api.mohit.dev/")
	const response_json = await response.json()
    return {

        props: response_json

    }

}

export default IndexPage
