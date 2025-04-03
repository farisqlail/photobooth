'use client';

import Webcam from 'react-webcam';

export default function VideoPreview({ videoRef, countdown, filter, mirror }) {
  const videoConstraints = {
    facingMode: 'user' 
  };

  return (
    <div className="relative w-full h-[400px]">
      <Webcam
        audio={false}
        ref={videoRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/png"
        mirrored={mirror}
        className="border rounded-xl w-full h-full object-cover"
        style={{ filter }}
      />

      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold bg-black/40 rounded-xl">
          {countdown}
        </div>
      )}
    </div>
  );
}
