import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FaCameraRetro } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Camera = forwardRef(({ onCapture, disabled }, ref) => {
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  function startCamera() {
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      })
      .catch((error) => {
        console.error("Error accessing media devices", error);
      });
  }

  function stopCamera() {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  }

  function takePicture() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");

    // Show the captured image and provide options to retake or save
    setIsCameraOpen(false);
    setCapturedImage(dataUrl);
    setShowPreview(true);
  }

  function retakePicture() {
    setCapturedImage(null);
    setShowPreview(false);
    setIsCameraOpen(false);
    takePicture();
  }

  function savePicture() {
    // Update the state with the captured image
    onCapture(capturedImage);
    setShowPreview(false);
    // stopCamera();
  }

  useImperativeHandle(ref, () => ({
    startCamera: startCamera,
  }));

  return (
    <div>
      {showPreview ? (
        <div>
          <img src={capturedImage} alt="Captured" />
          <div className="flex gap-4">
            <FaCameraRetro
              onClick={retakePicture}
              className="cursor-pointer"
              size={34}
            />
            <BsFillCheckCircleFill
              onClick={savePicture}
              className="cursor-pointer"
              size={34}
              style={{ color: "rgb(60, 179, 113)" }}
            />
          </div>
        </div>
      ) : (
        <div>
          <video
            ref={videoRef}
            autoPlay
            className={isCameraOpen ? "block" : "hidden"}
          ></video>
          <div className={disabled ? "hidden" : "flex"}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={isCameraOpen ? takePicture : startCamera}
            >
              {isCameraOpen ? "Take Picture" : "Confirm Delivery"}
            </button>
            <MdCancel
              size={34}
              onClick={stopCamera}
              className=" cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default Camera;
