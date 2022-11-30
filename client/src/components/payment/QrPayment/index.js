import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import "./style.css";
export const QrPayment = ({ setOpenPaymentQR, handleSuccessPayment }) => {
  const [countdown, setCountdown] = useState(360);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  React.useEffect(() => {
    if (countdown === 0) setOpenPaymentQR(false);
    const MyTimeOut = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(MyTimeOut);
  }, [countdown]);
  const handlePaymentQR = async () => {
    setIsSuccess(true);
    setTimeout(() => {
      navigate("/paymentSuccess", { replace: true });
      setOpenPaymentQR(false);
      handleSuccessPayment();
    }, 1500);
  };
  return (
    <div className="container-qr" onClick={() => setOpenPaymentQR(false)}>
      <div className="qr-main">
        <h3>Quét QR để thanh toán</h3>
        {!isSuccess ? (
          <div
            className="qr-img"
            onClick={(e) => {
              e.stopPropagation();
              handlePaymentQR();
            }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" />
          </div>
        ) : (
          <div
          // color="primary"
          // style={{
          //   height: "3rem",
          //   width: "3rem",
          // }}
          // type="grow"
          >
            Loading...
          </div>
        )}

        <p>Thời gian còn lại: {countdown}</p>
      </div>
    </div>
  );
};
