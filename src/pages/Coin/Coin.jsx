import { useParams } from "react-router-dom"
import "./Coin.css"
import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/coinContext";
import LineChart from "../../components/Linechart/LineChart";

const Coin = () => {
    const { coin_id } = useParams()

    const [coinDetails, setCoinDetails] = useState(null)
    const [coinChart, setCoinChart] = useState(null)

    const { currency } = useContext(CoinContext)

    const getCoinDetails = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-G9LJkpcSdqx5vN6ZPEAWsuTi' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin_id}`, options);
            const data = await response.json();
            console.log(data);
            setCoinDetails(data);
        } catch (err) {
            console.error(err);
        }
    };




    const getCoinChart = async () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-G9LJkpcSdqx5vN6ZPEAWsuTi'
            }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=${currency?.name}&days=${10}&interval=daily`, options);
            const data = await response.json();
            console.log(data);
            setCoinChart(data)
        } catch (err) {
            console.error(err);
        }
    };



    useEffect(() => {
        getCoinDetails()
        getCoinChart()
    }, [currency])



    return (
        <div className="coin">
            <div className="coin_name">
                <img src={coinDetails?.image?.large} alt="" />
                <p><b>{coinDetails?.name} ({coinDetails?.symbol.toUpperCase()})</b></p>
            </div>
            <div className="coin_chart">
                <LineChart histroricalData={coinChart} />
            </div>
            <div className="coin_info">
                <ul>
                    <li>Crypto Market Rank</li>
                    <li>{coinDetails?.market_cap_rank}</li>
                </ul>
                <ul>
                    <li>Current Price</li>
                    <li>{currency?.symbol} {coinDetails?.market_data?.current_price[currency?.name]}</li>
                </ul>

                <ul>
                    <li>Market Cap</li>
                    <li>{currency?.symbol} {coinDetails?.market_data?.market_cap[currency?.name]}</li>
                </ul>

                <ul>
                    <li>24 Hour High</li>
                    <li>{currency?.symbol} {coinDetails?.market_data?.high_24h[currency?.name]}</li>
                </ul>

                <ul>
                    <li>24 Hour Low</li>
                    <li>{currency?.symbol} {coinDetails?.market_data?.low_24h[currency?.name]}</li>
                </ul>

            </div>
        </div>

    )
}

export default Coin