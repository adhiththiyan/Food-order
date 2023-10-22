import { useRef, useState } from "react"
import classes from "./Checkout.module.css"

const Checkout =(props)=>{
    const isEmpty =value=> value.trim() === ''
    const isFiveChars =value=> value.trim().length === 5

    const [formInputValidity, setFormInputvalidity] = useState({
        name:true,
        street:true,
        city:true,
        postal:true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()      


    const confirmHandler =(event)=>{
        event.preventDefault()
        const enteredName = nameInputRef.current.value
        const enteredstreet = streetInputRef.current.value
        const enteredpostal = postalInputRef.current.value
        const enteredcity = cityInputRef.current.value

        const enteredNameIsvalid = !isEmpty(enteredName)
        const enteredstreetIsvalid = !isEmpty(enteredstreet)
        const enteredcityIsvalid = !isEmpty(enteredpostal)
        const enteredpostalIsvalid = !isFiveChars(enteredcity)

        setFormInputvalidity({
            name:enteredNameIsvalid,
            street:enteredstreetIsvalid,
            city:enteredcityIsvalid,
            postal:enteredpostalIsvalid
        })

        const formIsValid = 
        enteredNameIsvalid &&
        enteredstreetIsvalid &&
        enteredcityIsvalid &&
        enteredpostalIsvalid;

        if(!formIsValid){
            return
        }
        props.onConfirm({
            name:enteredName,
            street:enteredstreet,
            postal:enteredpostal,
            city:enteredcity
        })
    }
    const nameControlClasses = `${classes.control} ${formInputValidity.name ? '':classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? '':classes.invalid}`
    const postalControlClasses = `${classes.control} ${formInputValidity.postal ? '':classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? '':classes.invalid}`

    return(
        <form onSubmit={confirmHandler} className={classes.form}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" ref={nameInputRef}/>
                {!formInputValidity.name && <p>please enter a valid name</p>}

            </div>
            <div className={streetControlClasses}> 
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
                {!formInputValidity.street && <p>please enter a valid street</p>}
            </div>
            <div className={postalControlClasses}> 
                <label htmlFor="postal">Postal code</label>
                <input type="text" id="postal" ref={postalInputRef}/>
                {!formInputValidity.postal && <p>please enter a valid postal code</p>}

            </div>
            <div className={cityControlClasses}> 
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef}/>
                {!formInputValidity.city && <p>please enter a  valid city</p>}

            </div>
            <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>cancel</button>
            <button>Confirm</button>
            </div>
        </form>
    )
}
export default Checkout