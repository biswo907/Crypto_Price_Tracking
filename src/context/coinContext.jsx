import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext()

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([])
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-G9LJkpcSdqx5vN6ZPEAWsuTi' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency?.name}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("All Coin...............", data);
            setAllCoin(data)
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchAllCoin()
    }, [currency])

    const contextValue = {
        allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props?.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider