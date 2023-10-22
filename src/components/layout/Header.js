import React from "react"
import { Fragment } from "react"
import img1 from "../../assests/meals.jpg"
import style from "./header.module.css"
import HeaderCartButton from "./HeadercartButton"
const Header =(props)=>{
    return(
      <Fragment>
            <header className={style.header}>
                <h1>React meals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={style['main-image']}>
                <img  src={img1} alt="it is "></img>
            </div>
      </Fragment>
    )
}
export default Header