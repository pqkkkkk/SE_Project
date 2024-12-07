import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./VideoCall.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function VideoCall() {
  const [isMicMuted, setMicMuted] = useState(false);
  const [isVideoMuted, setVideoMuted] = useState(false);
  const toggleMic = () => {
    setMicMuted(!isMicMuted);
  };

  const toggleVideo = () => {
    setVideoMuted(!isVideoMuted);
  };
  return (
    <div className={cx("video-call-container")}>
      <div className={cx("video-main")}>
        <video autoPlay muted></video>
        <div className={cx("doctor-info")}>
          <h3>Dr. Annah Ray</h3>
          <p>Đang kết nối...</p>
        </div>
      </div>
      <div className={cx("video-small")}>
        <video autoPlay muted></video>
      </div>
      <div className={cx("controls")}>
        <button
          className={cx("control-btn", "mute", { muted: isMicMuted })}
          onClick={toggleMic}
        >
          <img src={images.microphone} alt="mute" />
        </button>
        <button
          className={cx("control-btn", "video", { muted: isVideoMuted })}
          onClick={toggleVideo}
        >
          <img src={images.video} alt="video" />
        </button>
        <button className={cx("control-btn", "end-call")}>
          <img src={images.endcall} alt="end-call" />
        </button>
      </div>
    </div>
  );
}
export default VideoCall;
