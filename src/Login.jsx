import { useForm } from "react-hook-form"
import { auth } from "./config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { PropTypes } from 'prop-types';
import { useRef } from "react";

function Login({setUser, dialogRef}) {
  const errorRef = useRef(null);
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);

    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in 
      setUser(userCredential.user);

      dialogRef.current.close();
      dialogRef.current.querySelector('form').reset();
      // ...
    })
    .catch((error) => {
      if (error.code === "auth/invalid-credential") {
        errorRef.current.querySelector('p').innerHTML = "Incorrect email or password. Please try again.";
      }
      
      errorRef.current.showModal();
      console.log(error.code);
      console.log(error.message);
    });
  };
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="login" ref={formRef}>
        <h1>log in</h1>
        <label>
          <p>e-mail</p>
          <input type="email" placeholder="email" {...register("email", 
            {required: 
              {
                value: true,
                message: 'you must enter an e-mail'
              }
            })} 
          />
          <p className="email error"></p>
        </label>
        
        <label>
          <p>password</p>
          <input type="password" placeholder="password" {...register("password", 
            {
              required: 
              {
                value: true,
                message: 'you must enter a password'
              }
            })}
          />
          <p className="password error"></p>
        </label>
        

        <input type="submit" value="submit" onClick={
          () => {
            formRef.current.querySelectorAll("p.error").forEach(element => {
              element.innerHTML = null;
            });
            
            formRef.current.querySelectorAll("label > input").forEach(element => {
              element.style.border = "1px black solid";
            });

            if (errors.password) {
              errors.password.ref.style.border = "1px red solid";
              errors.password.ref.parentElement.querySelector("p.error").innerHTML = errors.password.message;
            }
            
            if (errors.email) {
              errors.email.ref.style.border = "1px red solid";
              errors.email.ref.parentElement.querySelector("p.error").innerHTML = errors.email.message;
            }
          }
        }/>
      </form>
      <dialog ref={errorRef} className="error">
        <p>Whoops, something went wrong. Please try again!</p>
        <button onClick={() => {
          errorRef.current.close();
        }}>close</button>
      </dialog>
    </>
  );
  
}

Login.propTypes = {
  setUser: PropTypes.func,
  dialogRef: PropTypes.object
}

export default Login