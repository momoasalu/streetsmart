

function Feature({image, text}) {
  return (
    <div className="feature">
      <img src={image} />
      <p>{text}</p>
    </div>
  )
}

export default Feature;