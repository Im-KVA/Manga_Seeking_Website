import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchForm from "../../components/SearchForm/SearchForm";
import Header from "../../components/Header/Header";
import "./Home.css";

const Home = () => {
  return (
    <div className="BG-container">
      <Navbar />
      <Header />
      <div id="SearchForm">
        <SearchForm />
      </div>
    </div>
  );
};

export default Home;
