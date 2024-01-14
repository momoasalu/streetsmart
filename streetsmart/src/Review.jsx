

const Review = ({rating, comment}) => {
  const dataIndex = Math.floor(rating);

  return (
    <div className="review">
      <div className="rating circle" data-index={dataIndex}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="comment">
        <p>{comment}</p>
      </div>
    </div>
  )
}

export default Review;