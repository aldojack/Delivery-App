import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import {FaCameraRetro} from 'react-icons/fa'
import {MdCancel} from 'react-icons/md'

const Camera = forwardRef(({ onCapture }, ref) => {
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  function startCamera() {
    setIsCameraOpen(true)
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      })
      .catch((error) => {
        console.error('Error accessing media devices', error);
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
    setIsCameraOpen(false)
  }

  function takePicture() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    const dataUrl = canvas.toDataURL('image/png');
    onCapture(dataUrl);
    setIsCameraOpen(false)
    stopCamera();
  }

  useImperativeHandle(ref, () => ({
    startCamera: startCamera
  }));

  return (
    <div>
      <video ref={videoRef} autoPlay className={isCameraOpen ? 'block' : 'hidden'}></video>
      <div className='flex'>
        <FaCameraRetro size={34} onClick={isCameraOpen ? takePicture : startCamera} className=" cursor-pointer"/>
        <MdCancel size={34} onClick={stopCamera} className=" cursor-pointer"/>
      </div>
    </div>
  );
});

export default Camera;
