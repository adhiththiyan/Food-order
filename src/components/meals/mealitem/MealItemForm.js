import { useRef, useState } from "react"
import styles from "./mealitemform.module.css"
const MealItemForm =(props)=>{

    const [amountIsValid, setAmountIsValid] = useState(true)

    const amountInputRef = useRef() 

    const submitHandler =(event)=>{
        event.preventDefault()
        const enteredAmount = amountInputRef.current.defaultValue
        const enteredAmountNum = +enteredAmount
        if(enteredAmount.trim().length === 0||
        enteredAmountNum<1||
        enteredAmountNum>5){
            setAmountIsValid(false)
            return
        }

        props.onAddToCart(enteredAmountNum)
    }
    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.input}>
                <label htmlFor="amount">Amount</label>
                <input 
                ref={amountInputRef}
                    id="amount"
                    type="number"
                    min="1"
                    max="5"
                    defaultValue="1"
                    step="1"/>
            </div>
            <button>+ Add</button>
            {!amountIsValid && <p>please eneter a valid amount (1-5).</p>}
        </form>
    )
}
export default MealItemForm