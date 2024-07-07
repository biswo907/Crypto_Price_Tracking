import { useContext, useEffect, useState } from "react"
import "./Home.css"
import { CoinContext } from "../../context/coinContext"
import { Link } from "react-router-dom"


const Home = () => {

    const { allCoin, currency } = useContext(CoinContext)

    const [displayCoin, setDisplayCoin] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        setDisplayCoin(allCoin)
    }, [allCoin])

    const inputHandler = (event) => {
        setQuery(event?.target?.value)
        if (event?.target?.value === "") {
            setDisplayCoin(allCoin)
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        const coins = await allCoin.filter((item, i) => {
            return item?.name?.toLowerCase().includes(query?.toLowerCase())
        })
        setDisplayCoin(coins)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch(event);
        }
    };

    return (
        <div className="home">
            <div className="hero">
                <h1>Largest <br /> Crypto Marketplace</h1>
                <p>Welcome to the world largest cryptocurrency marketplace. Sign up to explore more about cryptos</p>
                <form>
                    <input onKeyPress={handleKeyPress} list="coinlist" value={query} onChange={inputHandler} type="text" placeholder="Search Crypto..." />

                    <datalist id="coinlist">
                        {allCoin?.map((item, i) => (
                            <option key={i} value={item?.name} />
                        ))}
                    </datalist>

                    <button onClick={handleSearch} type="submit">Search</button>
                </form>
            </div>

            {/* Crypto Table */}
            <div className="crypto_table">

                <div className="table_layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Prices</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p className="market_cap">Market Cap</p>
                </div>
                {
                    displayCoin.slice(0, 10).map((v, i) => (
                        <Link to={`/coin/${v?.id}`} className="table_layout" key={i}>
                            <p>{v?.market_cap_rank}</p>
                            <div>
                                <img src={v?.image} alt="" />
                                <p>{v?.name + " - " + v?.symbol}</p>
                            </div>
                            <p>{currency?.symbol + v?.current_price}</p>
                            <p style={v?.price_change_percentage_24h > 0 ? { textAlign: "center", color: "green" } : { textAlign: "center", color: "red" }}>{Math.floor(v?.price_change_percentage_24h * 100) / 100}</p>
                            <p className="market_cap">{currency?.symbol} {v?.market_cap}</p>
                        </Link>
                    ))
                }

            </div>

        </div>
    )
}

export default Home