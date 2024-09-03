import PropTypes from 'prop-types';

const Rating = ({rating}) => {

  return (
    <div>
      <div className="rating circle">
        <div className= {rating >= 1 ? "filled" : ""} ></div>
        <div className= {rating >= 2 ? "filled" : ""} ></div>
        <div className= {rating >= 3 ? "filled" : ""} ></div>
        <div className= {rating >= 4 ? "filled" : ""} ></div>
        <div className= {rating >= 5 ? "filled" : ""} ></div>
      </div>
    </div>
  )
}

Rating.propTypes = {
  rating: PropTypes.number
}

export default Rating