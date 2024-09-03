import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./config/firebase";

import { PropTypes } from 'prop-types';
import { useRef } from "react";

function Signup({ setUser, dialogRef }) {

  const errorRef = useRef(null);
  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
  
    formRef.current.querySelectorAll("p.error").forEach(element => {
      element.innerHTML = null;
    });

    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      setUser(user);
      updateProfile(user, {
        displayName: data.username
      })
      console.log(user);
      // ...
      dialogRef.current.close();
      dialogRef.current.querySelector('form').reset();
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      // ..

      if (error.code === "auth/email-already-exists" || error.code === "auth/email-already-in-use") {
        errorRef.current.querySelector('p').innerHTML = "The provided email is already in use by an existing user. Try another one!";
      } 
      errorRef.current.showModal();
    })
  };
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="signup" ref={formRef}>
        <h1>sign up</h1>
        <label>
          <p>username</p>
          <input type="text" placeholder="username" {...register("username", 
          {
            required: {
              value: true,
              message: 'you must enter a username'
            },
            minLength: {
              value: 3,
              message: 'username must be at least 3 characters long'
            }, 
            maxLength: {
              value: 30,
              message: 'username cannot be more than 15 characters'
            }, 
            pattern: {
              value: /^[A-Za-z][A-Za-z0-9_.]{2,14}$/,
              message: 'username must start with a letter and cannot contain special characters'
            }})} />
          <p className="username error"></p>
        </label>
        
        <label>
          <p>e-mail</p>
          <input type="email" placeholder="email" {...register("email", 
          {
            required: {
              value: true,
              message: 'you must enter an e-mail'
            }, 
            pattern: {
              value: /^\S+@\S+$/,
              message: 'enter a valid email'
            } })} />
          <p className="email error"></p>
        </label>
        
        <label>
          <p>password</p>
          <input type="password" placeholder="password" {...register("password", 
          {
            required: {
              value: true,
              message: 'you must enter a password'
            },
            minLength:{
              value: 5,
              message: 'password must be at least 5 characters long'
            }})} />
          <p className="password error"></p>
        </label>
        
        <label>
          <p>confirm password</p>
          <input type="password" placeholder="confirm password" {...register("confirmPassword", 
          {
            required: 'confirm password', 
            validate: (value) => {
              if (value !== getValues("password")) {
                return "passwords need to match";
              }
            }
          })} />
          <p className="confirm-password error"></p>
        </label>
        <input type="submit" value="submit" onClick={
          () => {
            formRef.current.querySelectorAll("p.error").forEach(element => {
              element.innerHTML = null;
            });
            
            formRef.current.querySelectorAll("label > input").forEach(element => {
              element.style.border = "1px black solid";
            });

            if (errors.confirmPassword) {
              errors.confirmPassword.ref.style.border = "1px red solid";
              errors.confirmPassword.ref.parentElement.querySelector("p.error").innerHTML = errors.confirmPassword.message;
            } 
            if (errors.username) {
              errors.username.ref.style.border = "1px red solid";
              errors.username.ref.parentElement.querySelector("p.error").innerHTML = errors.username.message;
            }

            if (errors.password) {
              errors.password.ref.style.border = "1px red solid";
              errors.password.ref.parentElement.querySelector("p.error").innerHTML = errors.password.message;
            }
            
            if (errors.email) {
              errors.email.ref.style.border = "1px red solid";
              errors.email.ref.parentElement.querySelector("p.error").innerHTML = errors.username.message;
            }
          }
        } />
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

Signup.propTypes = {
  setUser: PropTypes.func,
  dialogRef: PropTypes.object
}

export default Signup