import "./index.css";
import { BsGithub, BsFacebook } from "react-icons/bs";
// import { FiMail } from "react-icons/fi";

function Footer() {
  const iconSize = "20";
  const nameList = ["Đádành", "Ngô aọng", "NgaMạnh", "Ldng", "Nguyễn A"];

  return (
    <div id="footer">
      {nameList.map((item, idx) => (
        <div className="author" key={idx}>
          <h5 className="author-name">{item}</h5>
          <div className="icon-wrapper">
            <span className="author-icon">
              <BsGithub size={iconSize} />
            </span>
            {/* <span className="author-icon">
              <FiMail size={iconSize} />
            </span> */}
            <span className="author-icon">
              <BsFacebook size={iconSize} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Footer;
