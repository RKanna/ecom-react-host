import React from "react";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";

const Profile = () => {
  const {
    avatar,
    displayNameNew,
    avatarUrl,
    setAvatarUrl,
    setAvatar,
    updateProfileDocument,
    uploadAvatar,
    uid,
    formFields,
    lastName,
    address,
    getUserProfileInfoFromFirestore,
    email,
    city,
    state,
    phoneNumber,
    pinCode,
    applyAvatar,
  } = useUser();

  useEffect(() => {
    const uid = localStorage.getItem("UID");
    getUserProfileInfoFromFirestore(uid);
  }, [uid, getUserProfileInfoFromFirestore]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const newName = e.target.elements.changeName.value;
    const newAddress = e.target.elements.changeAddress.value;
    const newCity = e.target.elements.changeCity.value;
    const newState = e.target.elements.changeState.value;
    const newPhoneNumber = e.target.elements.changeNumber.value;
    const newPinCode = e.target.elements.changePinCode.value;
    const newEmail = e.target.elements.changeEmail.value;
    const newAvatar = e.target.elements.newPicture.files[0];
    const userId = localStorage.getItem("UID");

    // ////////////////////////////////////////////////
    const auth = getAuth();
    const user = auth.currentUser;
    // const promptForCredentials = () => {
    //   const password = prompt("Please enter your password:");
    //   return EmailAuthProvider.credential(user.email, password);
    // };

    if (user.providerData && user.providerData[0].providerId !== "google.com") {
      const promptForCredentials = () => {
        const password = prompt("Please enter your password:");
        return EmailAuthProvider.credential(user.email, password);
      };

      const credential = promptForCredentials();

      try {
        await reauthenticateWithCredential(user, credential);
      } catch (error) {
        console.error("Error reauthenticating user:", error.message);
        return;
      }

      // Update email in Firebase Authentication
      try {
        await updateEmail(user, newEmail);
      } catch (error) {
        console.error("Error updating email:", error.message);
        return;
      }
    }
    const updatedProfile = await updateProfileDocument(userId, {
      displayName: newName,
      address: newAddress,
      city: newCity,
      state: newState,
      phoneNumber: newPhoneNumber,
      pinCode: newPinCode,
      email: newEmail,
    });
    if (newAvatar) {
      const avatarUrl = await uploadAvatar(newAvatar, userId);
      setAvatarUrl(avatarUrl);
      setAvatar(newAvatar);
      await updateProfileDocument(userId, { avatar: avatarUrl });
    }

    e.target.reset();
    window.alert("Profile Details Updated Successfully");
  };

  useEffect(() => {
    console.log("UID:", uid);
    console.log("Profile data from context:", {
      displayNameNew,
      email,
      address,
      city,
      state,
      phoneNumber,
      pinCode,
    });
  }, [uid, displayNameNew, email, address, city, state, phoneNumber, pinCode]);

  return (
    <section className="min-h-screen py-10 text-black">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold">Hello {displayNameNew}</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="max-w-xs">
              <img
                className="w-full mx-auto rounded-full"
                src={applyAvatar}
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex">
              <h2 className="mb-4 text-3xl font-bold">Profile Information</h2>
            </div>

            <div className="flex flex-col space-y-2 text-2xl font-bold">
              <p>Name : {displayNameNew}</p>
              <p>Email : {email}</p>
              <p>Address : {address}</p>
              <p>City : {city}</p>
              <p>State : {state}</p>
              <p>Pincode : {pinCode}</p>
              <p>Phone Number : {phoneNumber}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col w-3/4 p-5 mt-10 bg-slate-300 rounded-xl">
            <h1 className="mb-6 text-3xl font-bold">Update Profile</h1>
            <form
              onSubmit={handleProfileUpdate}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="flex flex-col">
                <label htmlFor="changeName" className="font-bold">
                  First Name
                </label>
                <input
                  className="px-4 py-2 text-black bg-white border border-gray-500 rounded"
                  type="text"
                  id="changeName"
                  name="changeName"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="changeEmail" className="font-bold">
                  Email
                </label>
                <input
                  className="px-4 py-2 text-black bg-white border border-gray-500 rounded"
                  type="text"
                  id="changeEmail"
                  name="newEmail"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="changeAddress" className="font-bold">
                  Address
                </label>
                <input
                  className="px-4 py-2 text-black bg-white border border-gray-500 rounded"
                  type="text"
                  id="changeAddress"
                  name="newAddress"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="changeCity" className="font-bold">
                  City
                </label>
                <select
                  id="changeCity"
                  className="px-4 py-2 text-black bg-white border border-gray-500 rounded"
                  required
                  name="newCity"
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
              <div className="flex flex-col">
                <label htmlFor="changeState" className="font-bold">
                  State
                </label>
                <input
                  className="px-4 py-2 text-black bg-white border border-gray-500 rounded"
                  type="text"
                  id="changeState"
                  name="newState"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="changeNumber" className="font-bold">
                  Phone Number
                </label>
                <input
                  className="px-4 py-2 text-black bg-white border border-gray-500 rounded"
                  type="text"
                  id="changeNumber"
                  name="newNumber"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="changePinCode" className="font-bold">
                  Pincode
                </label>
                <input
                  className="px-4 py-2 text-black bg-white border border-gray-500 rounded"
                  type="text"
                  id="changePinCode"
                  name="newPinCode"
                  required
                />
              </div>
              <div className="flex flex-col ml-6">
                <label htmlFor="newPicture" className="font-bold">
                  Avatar
                </label>
                <input type="file" id="newPicture" name="newPicture" />
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 text-black bg-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
