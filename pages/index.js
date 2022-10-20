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

		<div className="p-2.5">
			{ renderStocks() }
			<div className="flex items-center flex-col mt-5">
				<p className="text-xs">Backend on Cloudflare Servless</p>
				<p className="text-xs">Frontend on NextJS, deployed on Vercel</p>
				<p className="text-xs">Stock data by Yahoo Finance</p>
				<div className="mt-2.5">
					<p className="text-2xl">🐆</p>
				</div>
			</div>
		</div>

	)

}

export async function getServerSideProps( context ) {

    const response = await fetch("https://nifty50-api.mohit.dev/")
	const response_json = await response.json()

    console.log( response_json )
    return {

        props: response_json

    }

}

export default IndexPage
