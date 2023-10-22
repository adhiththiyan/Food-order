import { useContext, useState } from "react"
import Modal from "../ui/Modal"
import styles from "./cart.module.css"
import CartContext from "../../store/Cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"


const Cart =(props)=>{

    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmitting, setDidSubmitting] = useState(false)
    const cartCtx = useContext(CartContext)
    console.log(cartCtx.totalAmount);

    const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`
    const hasItem = cartCtx.items.length >0

    const cartItemRemoveHandler =(id)=>{
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler =(item)=>{
        cartCtx.addItem({...item,amount:1})
    }
    const orderHandler =()=>{
            setIsCheckout(true)
    }
    const submitHandler =async (userData)=>{
        setIsSubmitting(true)
        await fetch('https://react-http-afcc1-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false)
        setDidSubmitting(true)
        cartCtx.clearCart()
    }

    const cartItem = <ul>
        {cartCtx.items.map((item)=> <CartItem key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd = {cartItemAddHandler.bind(null,item)}/>)}
    </ul>
    const modalAction =(
        <div>
        <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
       {hasItem && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>
    </div>
    )
    const cartModelContent = 
    (<>
             <div className={styles['cart-items']}>
            {cartItem}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm = {submitHandler}onCancel={props.onClose}/>}
            {!isCheckout && modalAction}
            </div>
    </>)
    const isSubmitModal = <p>sending order data...</p>
    const didSubmitModalContent = 
    (<>
    <p>sucessfully sent the order</p>
        <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>Close</button>
        </div>
    </>)
    return(
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmitting && cartModelContent}
            {isSubmitting && isSubmitModal}
            {didSubmitting && didSubmitModalContent}
        </Modal>
        
    )
}
export default Cart