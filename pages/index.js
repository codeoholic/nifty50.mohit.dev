import Head from "next/head"

const IndexPage = ( props ) => {

	const { data } = props 
	const renderStocks = () => {

		var stock = []
		data.map( ( value ) => {

			stock.push(
				<div className={`${ value.change_number > 0 ? "bg-emerald-400 border p-5 flex flex-col text-center rounded border-emerald-500" : "bg-rose-400 border border-rose-500 p-5 flex flex-col text-center rounded"}`}>
					<div className="h-16">
						<p className="text-sm md:text-xl text-slate-900">{ value.stock_name}</p>
					</div>
					<div className="flex flex-col">
						<p className="text-sm md:text-2xl font-semibold">{ value.change_number > 0 ? "+" + value.change_number : value.change_number } ({ value.change_percentage })</p>
					</div>
					<div className="flex justify-between mt-5">
						<p className="text-xs">₹{ value.price}</p>
						<p className="text-xs">{ value.market_cap }</p>
					</div>
				</div>
			)

		})

		return (

			<div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
				{ stock }
			</div>

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
				{ renderStocks() }
				<div className="flex items-center flex-col mt-5">
					<p className="text-xs">Backend on Cloudflare Serverless</p>
					<p className="text-xs">Frontend on NextJS, deployed on Vercel</p>
					<p className="text-xs">Stock data by Yahoo Finance</p>
					<div className="text-center mt-2.5">
						<p className="text-[8px] italic">cached data, updates hourly</p>
					</div>
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
