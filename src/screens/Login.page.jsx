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
  const {
    formFields,
    setFormFields,
    setUser,
    logoutUser,
    userEmail,
    getDisplayName,
  } = useUser();
  const { email, password, confirmPassword, displayName } = formFields;

  const navigate = useNavigate();
  const signInWithGoogle = async (event) => {
    event.preventDefault();
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    setUser(user.email, user.displayName, user.uid);
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

        if (user) {
          // setUser(user.email, user.uid, user.displayName);
          setUser(user.email, user.displayName, user.uid || "");
          navigate("/Category");
          console.log(user.email);
          console.log(user.displayName);

          if (user.email === "admin@admin.com") {
            setUser(user.email, user.displayName, user.uid);
            navigate("/adminInventory");
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

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-2"
          >
            <FaGoogle /> Google Login
          </button>
        </div>
        <div>
          <p>
            New user?{" "}
            <Link
              className="font-bold register-link text-blue-950"
              to="/Registration"
            >
              Register here
            </Link>
          </p>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex flex-col items-center justify-center w-3/4 text-white bg-black rounded-2xl">
            <h4 className="underline">Test Credentials</h4>
            <h5>change@gmail.com</h5>
            <h5>123456</h5>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
