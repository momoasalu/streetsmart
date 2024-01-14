import { useParams } from "react-router-dom";
import CityMap from "./Map"
import data from "../cities.json"
import { useRef, useState } from "react";
import Review from "./Review";
import Summary from "./Summary";
import SafetyRating from "./SafetyRating";

import "./City.css"

// lat, long, name, reviews, neighbourhoods 
const City = () => {
  const dialogRef = useRef(null);

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
    ? dialogRef.current.close()
    : dialogRef.current.showModal()
  }
  const [selection, setSelection] = useState(null);
  
  const { name } = useParams();

  const city = data.find((city) => name.toLowerCase() === city.city.toLowerCase());
  let rating = 0;
  let money = 0;
  let safety = 0;
  let activities = 0;
  let food = 0;
  let reviewCount = city.review.length;

  city.review.forEach((item) => {
    rating += item.rating;
    money += item.money;
    safety += item.safety;
    activities += item.activities;
    food += item.food;
  })

  rating = Math.round(rating / city.review.length * 10) / 10;
  money = Math.round(money / city.review.length * 10) / 10;
  safety = Math.round(safety / city.review.length * 10) / 10;
  activities = Math.round(activities / city.review.length * 10) / 10;
  food = Math.round(food / city.review.length * 10) / 10;

  return (
    <>
      <header></header>
      <section id="overview">
        <CityMap lat={city.latitude} lng={city.longitude} />
        <div>
          <div className="top">
          <div>
            <h1>{name}</h1>
            <button onClick={toggleDialog}>review</button>
          </div>
          <div className="review">
            <h1 id="rating">{rating}</h1>
            <p id="review-count">{reviewCount + " " + (reviewCount === 1 ? "review" : "reviews")}</p>
          </div>
          </div>
          <Summary money={money} safety={safety} activities={activities} food={food} />
        </div>
      </section>
      <section id="neighbourhood">
        <h1>Travel advisory by neighbourhood</h1>
        <p>        
          The Travel Advice and Advisories help you to make informed decisions and travel safely while you are within Canada. 
          We&apos;ve listed the worst {city.city} neighbourhoods that you should avoid based on data on crime rates and violence.
        </p>
        <div>
          <div className="input">
          <h3>Where are you going?</h3>
          <select onChange={(e) => {e.target.value === "-- nowhere" ? setSelection(null) : setSelection(e.target.value) }}>
            <option>-- nowhere</option>
            {city.neighbourhoods.map((neighbourhood) => {
              return <option key={neighbourhood.name}>{neighbourhood.name}</option>
            })}
          </select>
          </div>
          <div className="view">
            {selection ? 
            <div>
              <h1>{selection}</h1>
              <SafetyRating ranking={city.neighbourhoods.find((item) => item.name === selection).risk} />
            </div> :
            <div>
              <SafetyRating ranking="low" />
              <SafetyRating ranking="moderate" />
              <SafetyRating ranking="high" />
            </div>}
          </div>
        </div>
      </section>
      <section id="reviews">
        <h1>latest reviews</h1>
          <div>
          {
          city.review.length === 0 ?
          <div className="no-review"><h1>no reviews yet!</h1></div> :
          
          city.review.slice(0, 4).map((review, index) => {
            return <Review rating={review.rating} comment={review.comment} key={index}/>
          })}

        </div>
      </section>
      <dialog ref={dialogRef}>
        <form>
          <h1></h1>
        </form>
        <button onClick={toggleDialog}>cancel</button>
        <button onClick={() => {
          toggleDialog();}}>submit</button>
      </dialog>
    </>
  )
}

export default City