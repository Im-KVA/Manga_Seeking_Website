import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { auth, db } from "../../components/Firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import "./User.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function User() {
  async function handelSignOut() {
    await auth.signOut();
    window.location.href = "/";
    toast.success("User signed out successfully", {
      position: "top-center",
    });
    console.log("User signed out successfully");
  }

  const [userDetails, setUserDetails] = useState(null);
  const [toastShown, setToastShown] = useState(false);

  const fetchUserDetails = () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        if (!toastShown) {
          console.log("No user is signed in!");
          toast.error("No user is signed in!", {
            position: "top-center",
          });
          setToastShown(true);
        }
      } else {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchUserDetails();
    return () => unsubscribe();
  }, [toastShown]);

  return (
    <div className="User-page">
      <Navbar />
      <div className="User-container">
        {userDetails ? (
          <>
            <h3>Xin chào {userDetails.username}</h3>
            <div>
              <p>Email: {userDetails.email}</p>
              <p>Password: {userDetails.password}</p>
            </div>
            <button className="User-btn" onClick={handelSignOut}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <p>Loading user details...</p>
            <div className="User-buttons">
              <Link to="/signin">
                <button className="User-btn">Đăng nhập</button>
              </Link>
              <Link to="/signup">
                <button className="User-btn">Đăng ký</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default User;
