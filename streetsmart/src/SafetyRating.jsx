

const SafetyRating = ({ranking}) => {
  let icon;
  let label;
  let text;
  if (ranking === "low") {
    label = "low risk";
    text = "take normal safety measures"
  } else if (ranking === "moderate") {
    label = "moderate risk";
    text = "take some level of caution"
  } else {
    label = "high risk";
    text = "stay away from all travel"
  }

  return (
    <div className="safety-rating">
      <img src={icon} />
      <div>
        <h5>{label}</h5>
        <p>{text}</p>
      </div>
    </div>
  )
}


export default SafetyRating;