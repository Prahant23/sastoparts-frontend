import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmailApi } from "../apis/Api";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const intervaliD = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    if (countdown === 0) {
      clearInterval(intervaliD);
      verifyEmail();
    }
    return () => clearInterval(intervaliD);
  }, [countdown]);

  const verifyEmail = async () => {
    try {
      const response = await verifyEmailApi(token);
      console.log("API Response:", response.data);

      if (response.data.success) {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to verify email.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Invalid or expired token.");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">
                Email Verification .. You will be redirected in {countdown}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
