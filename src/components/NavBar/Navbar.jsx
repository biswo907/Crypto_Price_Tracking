import "./Navbar.css"
import logo from "../../assets/logo.png"
import arrow_icon from "../../assets/arrow_icon.png"
import { useContext } from "react"
import { CoinContext } from "../../context/coinContext"
import { Link } from "react-router-dom"


const Navbar = () => {

    const { setCurrency } = useContext(CoinContext)

    const currencyHandler = (event) => {
        switch (event.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            }
            case "eur": {
                setCurrency({ name: "eur", symbol: "€" });
                break;
            }
            case "inr": {
                setCurrency({ name: "inr", symbol: "₹" });
                break;
            }
            default: {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            }
        }
    }

    return (
        <div className='navbar'>
            <img src={logo} alt="" className="logo" />
            <ul className="nav_ul">
                <Link to={"/"}>

                    <li className="nav_li">Home</li>
                </Link>
                <li className="nav_li">Features</li>
                <li className="nav_li">Pricing</li>
                <li className="nav_li">Blog</li>
            </ul>
            <div className="nav_right">
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="inr">INR</option>
                </select>
                <button>Sign up <img src={arrow_icon} /> </button>
            </div>
        </div>
    )
}

export default Navbar