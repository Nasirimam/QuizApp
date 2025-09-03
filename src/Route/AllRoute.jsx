import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Quiz from "../Pages/Quiz";
import Result from "../Pages/Result";

const AllRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
};

export default AllRoute;
