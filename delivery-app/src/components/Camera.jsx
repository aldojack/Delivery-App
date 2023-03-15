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
          <div className="flex gap-4 pt-2">
          <div className="flex flex-col justify-center items-center">
            <FaCameraRetro
              onClick={retakePicture}
              className="cursor-pointer"
              size={34}
            />
            <span>Retake</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <BsFillCheckCircleFill
              onClick={savePicture}
              className="cursor-pointer"
              size={34}
              style={{ color: "rgb(60, 179, 113)" }}
            />
            <span>Accept</span>
          </div>
          </div>
        </div>
      ) : (
        <div>
          <video
            ref={videoRef}
            autoPlay
            className={isCameraOpen ? "block" : "hidden"}
          ></video>
          <div className={disabled ? "hidden" : "flex pt-2 justify-center"}>
            <button
              type="button"
              className="text-white bg-[#FF6161] hover:bg-[#f63a3a] focus:outline-none focus:ring-4 focus:ring-orange-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-[#FF6161] dark:hover:bg-[#f63a3a]"
              onClick={isCameraOpen ? takePicture : startCamera}
            >
              {isCameraOpen ? "Take Picture" : "Confirm Delivery"}
            </button>
            <MdCancel
              size={40}
              onClick={stopCamera}
              className={isCameraOpen ? " cursor-pointer fill-red-500 hover:fill-red-600" : 'hidden'}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default Camera;
