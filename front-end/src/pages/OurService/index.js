import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images";
import styles from "./OurService.module.scss";

const cx = classNames.bind(styles);

function OurService() {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(`/${path}`);
  };
  return (
    <div className={cx("our-service")}>
      <button
        className={cx("drug-btn")}
        onClick={() => handleClick("manage-drug")}
      >
        <div className={cx("row1")}>
          <img src={images.druglist} alt="druglist" />
          <h1>Drug Service</h1>
        </div>
        <div className={cx("row2")}>
          <img src={images.drugimage} alt="drugimage" />
        </div>
      </button>
      <button
        className={cx("chat-btn")}
        onClick={() => handleClick("messages")}
      >
        <div className={cx("row1")}>
          <img src={images.chaticon} alt="chat" />
          <h1>Chat</h1>
        </div>
        <div className={cx("row2")}>
          <img src={images.chatimage} alt="drugimage" />
        </div>
      </button>
    </div>
  );
}

export default OurService;
