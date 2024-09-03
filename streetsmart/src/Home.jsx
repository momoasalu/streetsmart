import Feature from './Feature';
import './Home.css'
import Icon from './assets/StreetSmart.png'
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Travel from './assets/travel.svg';
import Updates from "./assets/updates.svg";
import Reviews from './assets/reviews.svg';
import Contacts from './assets/contacts.svg';

import { getDocs, collection } from "firebase/firestore";
import { db } from './config/firebase';
import Header from './Header';

function Home() {
  const citiesCollectionRef = collection(db, "cities");
  const cityList = useRef([]);

  const [userAction, setUserAction] = useState("");
  const [user, setUser] = useState(null);

  const loginSignupRef = useRef(null);

  useEffect(() => {
      const getCities = async () => {
        try {
          const data = await getDocs(citiesCollectionRef);
          
          const filteredData = data.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id
            }
          })

          cityList.current = filteredData;
        } catch (error) {
          console.log(error);
        }
        
      }

      getCities();
    } 
  , [citiesCollectionRef])

  const [isOpen, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  let query = '';

  return (
    <>
      <Header user={user} setUser={setUser} setUserAction={setUserAction} userAction={userAction} ref={loginSignupRef} />
      <img src= {Icon} className='icon' />
      <form id="city-search">
        <div className ="search">
            <div className ="search-bar">
                <input type="text" id="city" spellCheck="false" placeholder="type city name"
                  onChange={(e) => {
                    query = e.target.value;
                    query.trim().length === 0 ? setOpen(false) : setOpen(true);
                    setResults(
                      query.trim().length > 0 ? 
                      cityList.current.filter((city) => city.name.toLowerCase().includes(query.toLowerCase())).map(city => city.name) : [] 
                    )
                  }}

                  onFocus={(e) => {
                    query = e.target.value;
                    query.trim().length === 0 ? setOpen(false) : setOpen(true);
                    setResults(
                      query.trim().length > 0 ? 
                      cityList.current.filter((city) => city.name.toLowerCase().includes(query.toLowerCase())).map(city => city.name) : [] 
                    )
                  }}
                  
                  onBlur={() => {
                    setTimeout(() => {
                      setOpen(false);
                    }, 300);
                  }}
                  />
                <button type="button" className ="city-search">{
                results.length > 0 ? 
                <Link to={"search/" + results[0]}>🔍</Link> :
                "🔍" 
                }
                </button>
            </div>
            <div className="search-box" style={
          isOpen ?
          {} :
          {visibility: "hidden"}
        } >
              <ul >
                {
                  isOpen && results.length > 0 ?
                  results
                  .map((value) => {
                    return <li key={value}><Link to={"search/" + value}>{ value }</Link></li>;
                  }) :
                   (isOpen && results.length == 0 ? <>no results</> : <></>)
                }
              </ul>
            </div>
        </div>
        <div className={'features'} style={
          isOpen ?
          {visibility: "hidden"} :
          {}
        }>
          <Feature image= { Travel } text="travel advisory integration" />
          <Feature image= { Updates } text="real-time updates" />
          <Feature image= { Reviews } text="safety ratings by area" />
          <Feature image= { Contacts } text="local emergency contacts" />
        </div>
      </form>
    </>
  )
}

export default Home;