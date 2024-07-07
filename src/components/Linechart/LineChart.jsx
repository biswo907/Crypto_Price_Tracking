import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ histroricalData }) => {

    const [data, setData] = useState([["Date", "Prices"]])


    useEffect(() => {
        let dataCopy = [["Date", "Prices"]]
        if (histroricalData?.prices) {
            histroricalData?.prices?.map((item) => {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]])
            })
            setData(dataCopy)
        }
    }, [histroricalData])

    return (
        <Chart
            chartType='LineChart'
            data={data}
            height={"100%"}
            legendToggle
        />
    )
}

export default LineChart