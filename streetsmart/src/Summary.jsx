
import Money from "./assets/money.png";
import Safety from "./assets/safety.png";
import Activities from "./assets/activities.png";
import Food from "./assets/food.png";

const Summary = ({money, safety, activities, food}) => {
  return (
    <div className="summary">
      <div>
        <h4>money</h4>
        <p>{money}</p>
        <img src={Money} alt="" />
      </div>

      <div>
        <h4>safety</h4>
        <p>{safety}</p>
        <img src={Safety} alt="" />
      </div>

      <div>
        <h4>activities</h4>
        <p>{activities}</p>
        <img src={Activities} alt="" />
      </div>

      <div>
        <h4>food</h4>
        <p>{food}</p>
        <img src={Food} alt="" />
      </div>
    </div>
  )
}

export default Summary