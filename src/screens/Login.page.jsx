import { FaGoogle } from "react-icons/fa";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "./../utils/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./../context/UserContext.jsx";
import { collection, getDocs } from "firebase/firestore/lite";
import { appDB } from "../utils/firestore.js";
const Login = () => {
  const { formFields, setFormFields, setUser, logoutUser, userEmail } =
    useUser();
  const { displayName, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();
  const signInWithGoogle = async (event) => {
    event.preventDefault();
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    setUser(user.email, user.displayName);
    // navigate("/Category");
    navigate("/Category");
    // navigate("/cart");
    // console.log(userDocRef.firestore._firestoreClient.user.uid);
  };

  //cheking fun

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hit");

    if (email && password) {
      try {
        const { user } = await signInAuthUserWithEmailAndPassword(
          email,
          password
        );
        console.log({ user });
        setFormFields({ email: "", password: "", confirmPassword: "" });
        // if (user.displayName) {
        //   console.log("User displayName:", user.displayName);
        // } else {
        //   console.log("User displayName is null or undefined");
        // }

        if (user) {
          setUser(user.email, user.displayName);
          navigate("/Category");
          // navigate("/cart");
          console.log(user.email);
          console.log(user.displayName);

          if (user.email === "admin@kannan.com") {
            setUser(user.email, user.displayName);
            navigate("/admin");
            console.log(user.email);
            console.log(user.displayName);
          }
        }
      } catch (err) {
        console.log("Error Occurd while Login", err.message);
        console.log(err.code);
        if (err.code === "auth/invalid-credential") {
          alert("Invalid Credentials");
        }
      }
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <section className="login-page">
      <h2>Sign In</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={changeHandler}
          />
        </div>
        <div className="form-group for-gap">
          <button type="submit">Sign In</button>

          <button onClick={signInWithGoogle}>
            <FaGoogle /> Google Login
          </button>
        </div>
        <div>
          <p>
            New user?{" "}
            <Link className="register-link" to="/Registration">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
