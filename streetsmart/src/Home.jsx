import Feature from './Feature';
import './Home.css'
import Icon from './assets/StreetSmart.png'

function Home() {
  return (
    <>
      <img src= {Icon} className='icon' />
      <h2>we offer official advice for travellers arriving to Canada</h2>
      <form>
        <div className ="search">
            <div className ="search-bar">
                <input type="text" id="city" spellCheck="false" placeholder="type city name" />
                <button type="button" className ="city-search">🔍</button>
            </div>
            <div className = "search-box">
              <ul>
              </ul>
            </div>
        </div>
        <div className='features'>
          <Feature image="" text="hello" />
          <Feature image="" text="hi" />
          <Feature image="" text="hello" />
          <Feature image="" text="hi" />
        </div>
      </form>
    </>
  )
}

export default Home;