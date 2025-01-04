import React, { useState, useEffect, useRef  } from "react";
import classNames from "classnames/bind";
import styles from "./VideoCall.module.scss";
import images from "../../assets/images";
import {useLocation, useNavigate} from "react-router-dom";
import {UpdateConsultationStatus} from "../../services/ApiService";
const cx = classNames.bind(styles);

function VideoCall() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state.appointment;
  const [isMicMuted, setMicMuted] = useState(false); // Quản lý trạng thái mic
  const [isVideoMuted, setVideoMuted] = useState(false);
  const [isCameraOff, setCameraOff] = useState(false);

  const mainVideoRef = useRef(null);
  const smallVideoRef = useRef(null);
  const videoStreamRef = useRef(null); // Lưu trữ video stream

  const toggleMic = () => {
    setMicMuted(!isMicMuted); // Thay đổi trạng thái mic
    if (videoStreamRef.current) {
      const tracks = videoStreamRef.current.getTracks();
      tracks.forEach((track) => {
        if (track.kind === "audio") {
          track.enabled = !track.enabled; // Tắt/mở mic bằng cách thay đổi enabled
        }
      });
    }
  };
  const toggleVideo = () => {
    setVideoMuted(!isVideoMuted);
    if (videoStreamRef.current) {
      const tracks = videoStreamRef.current.getTracks();
      tracks.forEach((track) => {
        if (track.kind === "video") {
          track.enabled = !track.enabled; // Tắt/mở video
        }
      });
    }
    setCameraOff(!isCameraOff); // Cập nhật trạng thái camera
  };

  const handleEndCall = async () => {
    const status = "Done";
    const updateResult = await UpdateConsultationStatus(appointment.consultationId, status);
    if(updateResult === "Updated")
    {
      console.log(updateResult);
      alert("End video call");
    }
    else{
      console.log(updateResult);
        alert("Failed to end video call");
    }
    navigate("/schedule");
  };
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });

        videoStreamRef.current = stream; // Lưu video stream vào videoStreamRef

        // Gán luồng video vào thẻ video chính và video nhỏ
        if (mainVideoRef.current) {
          mainVideoRef.current.srcObject = stream;
        }
        if (smallVideoRef.current) {
          smallVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Không thể truy cập camera:", error);
        alert("Không thể truy cập camera. Vui lòng kiểm tra quyền.");
      }
    }

    startCamera();

    return () => {
      // Dừng tất cả các track khi component unmount
      if (videoStreamRef.current) {
        const tracks = videoStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []); // Chạy một lần khi component mount
  useEffect(() => {
    // Cập nhật lại video stream khi bật/tắt camera
    if (isCameraOff && videoStreamRef.current) {
      const tracks = videoStreamRef.current.getTracks();
      tracks.forEach((track) => {
        if (track.kind === "video") {
          track.enabled = false; // Tắt video track
        }
      });
    } else if (!isCameraOff && videoStreamRef.current) {
      const tracks = videoStreamRef.current.getTracks();
      tracks.forEach((track) => {
        if (track.kind === "video") {
          track.enabled = true; // Bật video track
        }
      });
      // Gán lại stream cho cả hai video khi bật lại camera
      if (mainVideoRef.current && videoStreamRef.current) {
        mainVideoRef.current.srcObject = videoStreamRef.current;
      }
      if (smallVideoRef.current && videoStreamRef.current) {
        smallVideoRef.current.srcObject = videoStreamRef.current;
      }
    }
  }, [isCameraOff]); // Cập nhật khi trạng thái camera thay đổi

  return (
    <div className={cx("video-call-container")}>
      <div className={cx("video-main")}>
        <video ref={mainVideoRef} autoPlay muted></video>
        <div className={cx("doctor-info")}>
          <h3>Dr. Annah Ray</h3>
          <p>Đang kết nối...</p>
        </div>
      </div>
      <div className={cx("video-small")}>
        {isCameraOff ? (
          <img src={images.avatar} alt="avatar" /> // Hiển thị avatar nếu camera tắt
        ) : (
          <video ref={smallVideoRef} autoPlay muted></video>
        )}
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
        <button 
          className={cx("control-btn", "end-call")}
          onClick={handleEndCall}
        >
          <img src={images.endcall} alt="end-call" />
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
