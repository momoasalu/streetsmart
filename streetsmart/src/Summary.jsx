

const Summary = ({money, safety, activities, food}) => {
  return (
    <div className="summary">
      <div>
        <h4>money</h4>
        <p>{money}</p>
        <img src="" alt="" />
      </div>

      <div>
        <h4>safety</h4>
        <p>{safety}</p>
        <img src="" alt="" />
      </div>

      <div>
        <h4>activities</h4>
        <p>{activities}</p>
        <img src="" alt="" />
      </div>

      <div>
        <h4>food</h4>
        <p>{food}</p>
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default Summary