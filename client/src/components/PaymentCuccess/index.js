import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function PaymentSuccess() {
  const { setNextPage } = useOutletContext();
  useEffect(() => {
    setNextPage("over");
  });
  return (
    <>
      <div className="grow">
        <div className="left-part">
          <div className="left-part-top">
            <h2>Dơn hàng thanh toán thành công</h2>
            <p>
              Theo dõi đơn hàng tại{" "}
              <Link className="underline" to={"/orders"}>
                Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
