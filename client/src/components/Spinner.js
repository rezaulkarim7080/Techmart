import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";



const Spinner = () => {


  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => setCount(prev => prev - 1), 1500);
    count === 0 && navigate(`/login`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location]);


  return (
    <>
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="flex justify-center gap-5 py-5">
          <div class='h-8 w-8 bg-indigo-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div class='h-8 w-8 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div class='h-8 w-8 bg-indigo-500 rounded-full animate-bounce'></div>
        </div>
        <h1 className="Text-center text-3xl font-medium">redirecting to you in {count} second </h1>
      </div>
    </>
  );
};

export default Spinner;
