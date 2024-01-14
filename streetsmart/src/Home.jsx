import Feature from './Feature';
import './Home.css'
import Icon from './assets/StreetSmart.png'
import data from '../cities.json'
import { useState } from 'react';
import { Link } from 'react-router-dom';

console.log(data);

function Home() {
  const [query, setQuery] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [selection, setSelection] = useState(null);

  return (
    <>
      <img src= {Icon} className='icon' />
      <h2>we offer official advice for travellers arriving to Canada</h2>
      <form>
        <div className ="search">
            <div className ="search-bar">
                <input type="text" id="city" spellCheck="false" placeholder="type city name" value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    data.filter((city) => city.city.toLowerCase().includes(query.toLowerCase())).length === 0 || e.target.value.trim().length === 0 ?
                    setOpen(false) : setOpen(true)
                    setSelection(null)
                  }}
                  />
                <button type="button" className ="city-search">{
                selection ? 
                
                <Link to={"search/" + query}>🔍</Link> :
                "🔍" 
                }
                </button>
            </div>
            <div className = "search-box" >
              <ul>
                {
                  isOpen ?
                  data
                  .filter((city) => city.city.toLowerCase().includes(query.toLowerCase()))
                  .map((value) => {
                    return <li key={value.city} onClick={() => {setOpen(false); setQuery(value.city); setSelection(value.city)}}>{value.city}</li>;
                  }) :
                   null
                }
              </ul>
            </div>
        </div>
        <div className={'features'} style={
          isOpen ?
          {visibility: "hidden"} :
          {}
        }>
          <Feature image="" text="travel advisory integration" />
          <Feature image="" text="real-time updates" />
          <Feature image="" text="safety ratings by area" />
          <Feature image="" text="local emergency contacts" />
        </div>
      </form>
    </>
  )
}

export default Home;