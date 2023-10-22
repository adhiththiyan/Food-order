import style from "./mealssummary.module.css"

const MealsSummary = () => {
    return (
        <div className={style.summary}>
            <h2>Delicious food Delivered to you</h2>
            <p>
                Choose your favorite meal from our broad selection of available meals
                and enjoy a delicious lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients, just-in-time and
                of course by experienced chefs!
            </p>
        </div>
    )
}
export default MealsSummary