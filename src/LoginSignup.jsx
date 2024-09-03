import Login from "./Login";
import Signup from "./Signup";
import { PropTypes } from "prop-types"

function LoginSignup({ action, setUser, dialogRef }) {
  if (action == "sign up") {
    return <Signup setUser={setUser} dialogRef={dialogRef} />
  } else {
    return <Login setUser={setUser} dialogRef={dialogRef} />
  }
}

LoginSignup.propTypes = {
  action: PropTypes.string,
  setUser: PropTypes.func,
  dialogRef: PropTypes.object
}

export default LoginSignup