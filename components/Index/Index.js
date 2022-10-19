import React from "react"

const { DATA } = require("./constants")

const Index = () => {

    const container = React.createRef()
    const [ dimensions, setDimensions ] = React.useState({

        height: 0,
        width: 0,
        area: 0,

    })
    React.useEffect( () => {

        const width = container.current.getBoundingClientRect().width
        const height = container.current.getBoundingClientRect().height

        setDimensions({

            height,
            width,
            area: width * height

        })

    }, [])
    const renderData = () => {

        if( dimensions.area > 0 ) {

            const data = []
            DATA.map( ( value, index ) => {

                const area = dimensions.area * value.weightage / 100
                const block = Math.round(Math.sqrt(area), 2 ) - 4
                console.log( block )
                data.push(
                    
                    <div className="border border-slate-300 flex justify-center items-center text-center flex-col relative" key={ index } style={{ width: block+"px", height: block+"px"}}>
                        <p className="text-xs">{ value.name }</p>
                        <p className="text-xs">{ value.weightage }%</p>
                        <div className="absolute top-0 left-0">
                            {
                                typeof value.stocks !== "undefined" && value.stocks.map( ( valueStock, indexStock ) => {

                                    const stock_area = dimensions.area * valueStock.weightage / 100
                                    const stock_block = Math.round(Math.sqrt( stock_area ), 2 ) - 2
                                    return (
                                        
                                        <div className="border border-slate-500 flex items-center justify-center flex-col" key={ indexStock } style={{ width: stock_block+"px", height: stock_block+"px"}}>
                                            <p className="text-xs">{ valueStock.name }</p>
                                            <p className="text-xs">{ valueStock.weightage }%</p>
                                        </div>

                                    )

                                })
                            }
                        </div>
                    </div>

                )

            })
            return ( 
                
                <div className="flex flex-wrap">
                    { data }
                </div>
                
            )

        }

    }

    return (

        <div className="p-5 flex h-screen">
            <div className="border border-slate-400 w-full flex-grow" ref={ container }>
                { renderData() }
            </div>
        </div>

	)

}

module.exports = Index
