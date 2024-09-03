import PropTypes from 'prop-types';

import Money from "./assets/money.svg";
import Safety from "./assets/safety.svg";
import Activities from "./assets/activities.svg";
import Food from "./assets/food.svg";

const Summary = ({money, safety, activities, food}) => {
  return (
    <div className="summary">
      <div>
        <h4>money</h4>
        <p>{money.toFixed(1)}</p>
        <img src={Money} alt="" />
      </div>

      <div>
        <h4>safety</h4>
        <p>{safety.toFixed(1)}</p>
        <img src={Safety} alt="" />
      </div>

      <div>
        <h4>activities</h4>
        <p>{activities.toFixed(1)}</p>
        <img src={Activities} alt="" />
      </div>

      <div>
        <h4>food</h4>
        <p>{food.toFixed(1)}</p>
        <img src={Food} alt="" />
      </div>
    </div>
  )
}

Summary.propTypes = {
  money: PropTypes.number,
  safety: PropTypes.number,
  activities: PropTypes.number,
  food: PropTypes.number
}

export default Summary