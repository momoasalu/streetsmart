import Rating from "./Rating";
import PropTypes from 'prop-types';

const Review = ({money, safety, activities, food, comment, username }) => {
  return (
    <div className="review">
      <h5>money</h5>
      <Rating rating={ money } />
      <h5>safety</h5>
      <Rating rating={ safety } />
      <h5>activities</h5>
      <Rating rating={ activities } />
      <h5>food</h5>
      <Rating rating={ food } />
      <div className="comment">
        <h5>{"@" + username}</h5>
        <p>{comment}</p>
      </div>
    </div>
  )
}

Review.propTypes = {
  money: PropTypes.number,
  safety: PropTypes.number,
  activities: PropTypes.number,
  food: PropTypes.number,
  comment: PropTypes.string,
  username: PropTypes.string
}

export default Review;