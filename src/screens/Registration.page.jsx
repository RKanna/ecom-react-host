import { useState } from "react";
//firebase import
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/index.js";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import { imageDb } from "../utils/index.js";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Registration = () => {
  const navigate = useNavigate();
  const {
    formFields,
    setFormFields,
    setUser,
    logoutUser,
    userEmail,
    avatar,
    setAvatar,
    avatarUrl,
    setAvatarUrl,
  } = useUser();
  const {
    displayName,
    email,
    password,
    confirmPassword,
    address,
    city,
    state,
    pinCode,
    phoneNumber,
  } = formFields;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not Match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      let imageRef;
      if (!avatar) {
        console.log("No File Selected");
      } else {
        const imageId = user.uid;
        imageRef = ref(imageDb, `images/${imageId}`);
        await uploadBytes(imageRef, avatar);

        const imageUrl = await getDownloadURL(imageRef);
        const userDocRef = await createUserDocumentFromAuth(user, {
          displayName,
          avatar: imageUrl,
          address,
          city,
          state,
          pinCode,
          phoneNumber,
        });
        // const userDocRef = await createUserDocumentFromAuth(user, {
        //   displayName,
        // });
        if (userDocRef) {
          alert("SignUp Success");
          navigate("/login");
        }
      }
      //   setFormFields(formFields);
      // setFormFields({
      //   displayName: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });
    } catch (err) {
      console.log("Something Happened", err.message);
      console.log(err.code);
      if (err.code === "auth/email-already-in-use") {
        alert("Email Already Exists Please use alternate Email");
      } else if (err.code === "auth/weak-password") {
        alert("Password must be at least 6 characters long");
      }
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setAvatar(file);
      setAvatarUrl(URL.createObjectURL(file));
    } else {
      console.log("No File Selected");
    }
  };

  return (
    <section className="registration">
      <form className="w-2/4 reg-container" onSubmit={submitHandler}>
        <h1>Sign Up</h1>
        <div className="flex flex-row items-center gap-3 form-group">
          <input
            type="text"
            id="display-name"
            name="displayName"
            required
            onChange={changeHandler}
            placeholder="Enter Username"
          />
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={changeHandler}
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-row items-center gap-3 form-group">
          <input
            type="text"
            id="address"
            name="address"
            required
            onChange={changeHandler}
            placeholder="Address"
          />
          <select
            id="city"
            className="select-profile"
            required
            onChange={changeHandler}
            name="city"
            value={formFields.city}
          >
            <option value="" disabled selected>
              Select a city
            </option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Trichy">Trichy</option>
            <option value="Tirunelveli">Tirunelveli</option>
            <option value="Kanyakumari">Kanyakumari</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-3 form-group">
          <input
            type="text"
            id="state"
            name="state"
            required
            onChange={changeHandler}
            placeholder="Enter State"
          />
          <input
            type="text"
            id="pincode"
            name="pinCode"
            required
            onChange={changeHandler}
            placeholder="Enter Pincode"
          />
        </div>
        <div className="flex flex-row items-center gap-3 form-group">
          <input
            type="text"
            id="phonenumber"
            name="phoneNumber"
            required
            onChange={changeHandler}
            placeholder="Enter Phone number"
          />

          <input
            type="file"
            id="displayImage"
            name="displayImage"
            onChange={handleFileUpload}
            placeholder="Upload Avatar"
          />
          {avatarUrl && (
            <img
              className="img-container-profile"
              src={avatarUrl}
              alt="Avatar Preview"
            />
          )}
        </div>
        <div className="flex flex-row items-center gap-3 form-group ">
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={changeHandler}
            placeholder="Enter Password"
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            onChange={changeHandler}
            placeholder="Enter Password Again"
          />
        </div>
        <div className="flex justify-center form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </section>
  );
};

export default Registration;
