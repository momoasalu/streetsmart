import PropTypes from 'prop-types';

function Feature({image, text}) {
  return (
    <div className="feature">
      <img src={image} />
      <p>{text}</p>
    </div>
  )
}

Feature.propTypes = {
  image: PropTypes.any,
  text: PropTypes.string
}

export default Feature;