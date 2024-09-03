import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import { forwardRef, useEffect } from "react";
import LoginSignup from "./LoginSignup";
import { PropTypes } from 'prop-types';

import StreetSmart from './assets/littlelogo.svg';
import "./Header.css"
import { Link } from "react-router-dom";

const Header = forwardRef(function Header({ user, setUser, setUserAction, userAction }, ref) {
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    }
  }, [setUser]);

  return <>
    <header>
      <Link to={"/"}>
        <img src={ StreetSmart } />
      </Link>
      {user ?
      <div>
        <p>hello, {user.displayName}</p>
        <button className="sign-out" onClick={
          () => {
            signOut(auth).then(() => {
              setUser(null);
            }).catch((error) => {
              // An error happened.
              console.log(error);
            });
          }
        }>sign out</button>
      </div>
      :
      <div className="logged-out">
        <button className="sign-up" onClick={
          () => {
            setUserAction("sign up");
            if (!ref.current) {
              return;
            }
            ref.current.showModal();
          }
        }>
          sign up
        </button>
        <button className="log-in" onClick={
          () => {
            setUserAction("log in");
            if (!ref.current) {
              return;
            }
            ref.current.showModal();
          }
        }>
          log in
        </button>
      </div> }
    </header>


    <dialog ref={ref} className="login-signup">
      <LoginSignup action={ userAction } setUser={setUser} dialogRef={ref} />
      <button className="cancel" onClick={() => {
        ref.current.querySelectorAll("label input").forEach(element => {
          element.style.border = "1px solid black";
        });

        ref.current.querySelectorAll("label p.error").forEach(element => {
          element.innerHTML = "";
        });

        ref.current.close();
        ref.current.querySelector('form').reset();
      }}>cancel</button>
      <a onClick={
        () => {
          if (userAction == "log in") {
            setUserAction("sign up");
          } else {
            setUserAction("log in");
          }
        }
      }>{ userAction == "log in" ? "sign up instead" : "log in instead"}</a>
    </dialog>
  </>
})

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  userAction: PropTypes.string,
  setUserAction: PropTypes.func
}

export default Header;