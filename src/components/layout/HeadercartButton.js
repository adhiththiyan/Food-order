import { useContext, useEffect, useState } from "react"
import CartIcon from "../cart/CartIcon"
import style from "./headercartbutton.module.css"
import CartContext from "../../store/Cart-context"
const HeaderCartButton = (props) => {
    const [btnIsHighLighted, setbtnIsHighLighted] = useState(false)
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx
    const numberOfCartItem = items.reduce((currentNum, item) => {
        return currentNum + item.amount
    }, 0)
    const btnClasses = `${style.button} ${btnIsHighLighted ? style.bump : ''}`
    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setbtnIsHighLighted(true)
        const timer = setTimeout(()=>{
            setbtnIsHighLighted(false)
        },300)

        return ()=>{
            clearTimeout(timer)
        }
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={style.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={style.badge}>{numberOfCartItem}</span>

        </button>
    )
}
export default HeaderCartButton