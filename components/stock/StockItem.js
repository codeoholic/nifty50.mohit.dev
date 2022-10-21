const StockItem = ( props ) => {

    console.log( props )
    const {

        data,
        filterStock

    } = props
    const {

        change_number,
        stock_name,
        stock,
        price,
        market_cap,
        change_percentage,

    } = data

    return (

        <div className={`${ change_number > 0 ? "bg-emerald-400 border p-5 flex flex-col text-center rounded border-emerald-500 cursor-pointer" : "bg-rose-400 border border-rose-500 p-5 flex flex-col text-center rounded cursor-pointer"}`} onClick={ () => filterStock( stock ) }>
            <div className="h-16">
                <p className="text-sm md:text-lg font-semibold text-slate-50">{ stock_name }</p>
            </div>
            <div className="flex flex-col">
                <p className={`${ change_number > 0 ? "text-sm md:text-xl font-semibold text-emerald-900" : "text-sm md:text-xl font-semibold text-rose-900" }`}>{ change_number > 0 ? "+" + change_number : change_number } ({ change_percentage })</p>
            </div>
            <div className="flex justify-between mt-5">
                <p className="text-xs text-slate-50">₹{ price}</p>
                <p className="text-xs text-slate-50">{ market_cap }</p>
            </div>
        </div>

    )

}

export default StockItem
