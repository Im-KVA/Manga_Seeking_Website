import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../components/Firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Logged In:", formData);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User Logged In:", formData);
      console.log("User Logged in Successfully!!");
      window.location.href = "/user";
      toast.success("User Logged in  Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-form">
          <h2>Đăng Nhập</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <p>
              Chưa có tài khoản?
              <Link to="/signup"> Sign Up</Link>
            </p>

            <button type="submit" className="signin-btn">
              Đăng Nhập
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
