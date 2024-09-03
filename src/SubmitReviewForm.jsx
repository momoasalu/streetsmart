import PropTypes from 'prop-types';

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form"
import { db } from "./config/firebase";

function SubmitReviewForm({ dialog, cityName, setNumReviews, numReviews, user, setErrors }) {
  const reviewsCollectionRef = collection(db, "cities", cityName, "reviews");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  setErrors(errors);
  
  const onSubmit = async (data) => {
    console.log(data);
    if (!dialog.current) {
      return;
    }

    dialog.current.querySelector("textarea").style.border = "none";
    dialog.current.querySelector("p.error").innerHTML = "";

    await addDoc(reviewsCollectionRef, {
      money: Number(data.money),
      safety: Number(data.safety),
      activities: Number(data.activities),
      food: Number(data.food),
      review: data.comment,
      posted: Timestamp.fromDate(new Date()),
      username: user.displayName
    })

    dialog.current.close();
    dialog.current.querySelector('form').reset();

    setNumReviews(numReviews + 1);
  };

  return (
    <form id="add-review" onSubmit={handleSubmit(onSubmit)}>
      <div className="experience">
        <p>rate your experience</p>
        <h3 className="money">money</h3>
        <div className="money select">
          <label className="form-control">
            <div>1</div> <input type="radio" className="red" value="1" {...register("money", 
              {
                required: {
                  value: true,
                  message: 'you must pick a value'
                }
              }
              )}/>
          </label>
          <label className="form-control">
            <div>2</div> <input type="radio" className="orange" value="2" {...register("money")}/>
          </label>
          <label className="form-control">
            <div>3</div> <input type="radio" name="money" className="yellow" value="3" {...register("money")}/>
          </label>
          <label className="form-control">
            <div>4</div> <input type="radio" name="money" className="green" value="4" {...register("money")}/>
          </label>
          <label className="form-control">
            <div>5</div> <input type="radio" name="money" className="greener" value="5" {...register("money")} />
          </label>
        </div>
        <h3 className="safety">safety</h3>
        <div className="safety select">
          <label className="form-control">
            <div>1</div> <input type="radio" className="red" value="1" {...register("safety", 
              {
                required: {
                  value: true,
                  message: 'you must pick a value'
                }
              }
            )} />
          </label>
          <label className="form-control">
            <div>2</div> <input type="radio" className="orange" value="2" {...register("safety")}/>
          </label>
          <label className="form-control">
            <div>3</div> <input type="radio" className="yellow" value="3" {...register("safety")}/>
          </label>
          <label className="form-control">
            <div>4</div> <input type="radio" className="green" value="4" {...register("safety")}/>
          </label>
          <label className="form-control">
            <div>5</div> <input type="radio" className="greener" value="5" {...register("safety")} />
          </label>
        </div>
        <h3 className="activities">activities</h3>
        <div className="activities select">
          <label className="form-control">
            <div>1</div> <input type="radio" className="red" value="1" {...register("activities", 
              {
                required: {
                  value: true,
                  message: 'you must pick a value'
                }
              }
            )} />
          </label>
          <label className="form-control">
            <div>2</div> <input type="radio" className="orange" value="2" {...register("activities")}/>
          </label>
          <label className="form-control">
            <div>3</div> <input type="radio" className="yellow" value="3" {...register("activities")} />
          </label>
          <label className="form-control">
            <div>4</div> <input type="radio" className="green" value="4" {...register("activities")}/>
          </label>
          <label className="form-control">
            <div>5</div> <input type="radio" className="greener" value="5" {...register("activities")} />
          </label>
        </div>
        <h3 className="food">food</h3>
        <div className="food select">
          <label className="form-control">
            <div>1</div> <input type="radio" className="red" value="1" {...register("food", 
              {
                required: {
                  value: true,
                  message: 'you must pick a value'
                }
              }
            )} />
          </label>
          <label className="form-control">
            <div>2</div> <input type="radio" className="orange" value="2" {...register("food")} />
          </label>
          <label className="form-control">
            <div>3</div> <input type="radio" className="yellow" value="3" {...register("food")} />
          </label>
          <label className="form-control">
            <div>4</div> <input type="radio" className="green" value="4" {...register("food")} />
          </label>
          <label className="form-control">
            <div>5</div> <input type="radio" className="greener" value="5" {...register("food")}/>
          </label>
        </div>
      </div>
      <div className="comment">
        <p>comment about the city</p>
        <textarea type="text" name="comment" placeholder="type your review here" {...register("comment", 
          {
            required: {
              value: true,
              message: 'you must type out a review'
            }
          })}></textarea>
      </div>
    </form>
  )
}

SubmitReviewForm.propTypes = {
  dialog: PropTypes.object,
  cityName: PropTypes.string,
  setNumReviews: PropTypes.func,
  numReviews: PropTypes.number,
  user: PropTypes.object,
  setErrors: PropTypes.func
}

export default SubmitReviewForm;