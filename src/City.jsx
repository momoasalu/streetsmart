import { useParams } from "react-router-dom";
import CityMap from "./Map"
import { useEffect, useRef, useState } from "react";
import Review from "./Review";
import Summary from "./Summary";

//import SafetyRating from "./SafetyRating";

import "./City.css"
import {  collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./config/firebase";
import SubmitReviewForm from "./SubmitReviewForm";
import Header from "./Header";

// lat, long, name, reviews, neighbourhoods 


/*

const [selection, setSelection] = useState(null);
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
*/

const City = () => {
  const reviewRef = useRef(null);
  const loginSignupRef = useRef(null);

  const [userAction, setUserAction] = useState("");
  const [errors, setErrors] = useState({});
  
  const { name } = useParams();

  const reviews = useRef([]);
  const city = useRef({});
  
  const cityRef = doc(db, "cities", name);
  const reviewsQuery = query(collection(db, "cities", name, "reviews"), orderBy("posted"));

  const [rating, setRating] = useState("");
  const [money, setMoney] = useState(0);
  const [safety, setSafety] = useState(0);
  const [activities, setActivities] = useState(0);
  const [food, setFood] = useState(0);

  const [numReviews, setNumReviews] = useState(0);

  const [user, setUser] = useState(null);


  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await getDocs(reviewsQuery);
        
        const filteredData = data.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });

        filteredData.reverse();
        reviews.current = filteredData;

        let money = 0;
        let safety = 0;
        let activities = 0;
        let food = 0;

        filteredData.forEach((item) => {
          money += Number(item.money);
          safety +=  Number(item.safety);
          activities += Number(item.activities);
          food +=  Number(item.food);
        })

        setMoney(filteredData.length > 0 ? money / filteredData.length : 0);
        setSafety(filteredData.length > 0 > 0 ? safety / filteredData.length : 0);
        setActivities(filteredData.length > 0 ? activities / filteredData.length : 0);
        setFood(filteredData.length > 0 ? food / filteredData.length : 0);
        setRating(filteredData.length > 0 ? ((money + safety + activities + food) / (filteredData.length * 4)).toFixed(1) : "0.0");
        setNumReviews(filteredData.length);

      } catch (error) {
        console.log(error);
      }
      
    }

    const getCity = async () => {
      try {
        const data = await getDoc(cityRef);
        
        const filteredData = data.data();

        city.current = filteredData;
      } catch (error) {
        console.log(error);
      }
      
    }

    getReviews();
    getCity();
  } 
  , [cityRef, reviewsQuery, money, safety, activities, food, rating, numReviews])

  function toggleDialog() {
    if (!reviewRef.current) {
      return;
    }
    if (reviewRef.current.hasAttribute("open")) {
      reviewRef.current.close();
      reviewRef.current.querySelector('form').reset();
    } else {
      reviewRef.current.showModal();
    }
  }

  return (
    <>
      <Header user={user} setUser={setUser} setUserAction={setUserAction} userAction={userAction} ref={loginSignupRef} />
      <CityMap name= { name } /> 
      <section id="overview">
        <div>
          <div className="top">
            <div className="name">
              <h1>{name}</h1>
              <button onClick={user ? 
                toggleDialog : 
                () => {
                  setUserAction("sign up");
                  loginSignupRef.current.showModal();
                }}>review</button>
            </div>
            <div className="review">
              <h1 id="rating">{rating}</h1>
              <p id="review-count">{"(" + reviews.current.length + " " + (reviews.current.length === 1 ? "review)" : "reviews)")}</p>
            </div>
          </div>
          <Summary money={money} safety={safety} activities={activities} food={food} />
        </div>
      </section>
      <section id="reviews">
        <h1>latest reviews</h1>
        {
            reviews.current.length === 0 ?
            <div className="no-reviews"><h2>no reviews yet!</h2></div> :
            
            <div className="reviews"> 
              {
                reviews.current.map((review, index) => {
                  return <Review money={Number(review.money)} safety={Number(review.safety)} activities={Number(review.activities)} food={Number(review.food)} comment={review.review} username={review.username} key={index}/>
                })
              }
            </div>
        }
      </section>  
      <dialog ref={reviewRef} className="add-review">
          <h1>Help us rate your experience</h1>
          <p className="error"></p>
          <SubmitReviewForm  dialog={reviewRef} cityName={name} setNumReviews={setNumReviews} numReviews={numReviews} user={user} setErrors={setErrors} />
          <div className="buttons">
            <button form="add-review" type="submit" onClick={
              () => {
                if (Object.keys(errors).length !== 0) {
                  reviewRef.current.querySelector("p.error").innerHTML = "please fill in all fields!";
                }

                if (errors.comment) {
                  errors.comment.ref.style.border = "1px solid red";
                } else {
                  reviewRef.current.querySelector("textarea").style.border = "none";
                }
              }
            }>submit</button>
            <button onClick={
              () => {
                reviewRef.current.querySelector("p.error").innerHTML = "";
                reviewRef.current.querySelector("textarea").style.border = "none";
                toggleDialog();
              }
              }>cancel</button>
          </div>
      </dialog>
    </>
  )
}

export default City