'use client';

import { useState, useRef } from 'react';

export default function Photobooth() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [filter, setFilter] = useState('none');
  const [frameColor, setFrameColor] = useState('#ff0000');
  const [layout, setLayout] = useState('single');
  const [countdown, setCountdown] = useState(null);
  const [mirror, setMirror] = useState(true);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleStartCountdown = async () => {
    setCapturedImage(null); // reset hasil lama
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    const photoCount = layout === 'triple' ? 3 : layout === 'double' ? 2 : 1;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight * photoCount;

    const frames = [];

    const countdownAndCapture = (index) => {
      return new Promise((resolve) => {
        let counter = 3;
        setCountdown(counter);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = video.videoWidth;
        tempCanvas.height = video.videoHeight;
        const tempCtx = tempCanvas.getContext('2d');

        if (mirror) {
          tempCtx.translate(tempCanvas.width, 0);
          tempCtx.scale(-1, 1);
        }
        tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);


        const countdownInterval = setInterval(() => {
          counter--;
          if (counter === 0) {
            clearInterval(countdownInterval);
            setCountdown(null);

            // Capture current frame
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = video.videoWidth;
            tempCanvas.height = video.videoHeight;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
            frames.push(tempCanvas);
            resolve();
          } else {
            setCountdown(counter);
          }
        }, 1000);
      });
    };

    // Jalankan countdown + capture sesuai jumlah layout
    for (let i = 0; i < photoCount; i++) {
      await countdownAndCapture(i);
    }

    // Gabungkan semua ke dalam canvas utama
    frames.forEach((frame, index) => {
      context.drawImage(frame, 0, index * video.videoHeight, canvas.width, video.videoHeight);
    });

    const border = 40;
    const labelHeight = 80;
    const finalWidth = canvas.width + border * 2;
    const finalHeight = canvas.height + border * 2 + labelHeight;

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = finalWidth;
    finalCanvas.height = finalHeight;
    const finalCtx = finalCanvas.getContext('2d');

    // Background warna kuning pastel
    finalCtx.fillStyle = '#fff9c4';
    finalCtx.fillRect(0, 0, finalWidth, finalHeight);

    // Gambar isi foto (dari canvas utama)
    finalCtx.drawImage(canvas, border, border);

    // Teks di bagian bawah
    finalCtx.fillStyle = '#000';
    finalCtx.font = 'bold 16px sans-serif';
    finalCtx.textAlign = 'center';
    finalCtx.fillText('photobooth', finalWidth / 2, finalHeight - 12);

    // Simpan hasil akhir
    setCapturedImage(finalCanvas.toDataURL('image/png'));
  };


  const downloadPhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'photobooth.png';
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Photobooth</h1>
      <div className="relative w-80 h-60">
        <video
          ref={videoRef}
          autoPlay
          className={`border rounded-lg w-full h-full ${mirror ? 'mirror' : ''}`}
          style={{ filter }}
        />

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold bg-opacity-100 rounded-lg">
            {countdown}
          </div>
        )}
      </div>
      <button
        onClick={startCamera}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Start Camera
      </button>
      <canvas ref={canvasRef} className="hidden" />
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="mt-2 px-4 py-2 border rounded-lg"
      >
        <option value="none">No Filter</option>
        <option value="grayscale(100%)">Grayscale</option>
        <option value="sepia(100%)">Sepia</option>
        <option value="invert(100%)">Invert</option>
        <option value="contrast(200%)">High Contrast</option>
        <option value="blur(5px)">Blur</option>
      </select>
      <div className="mt-2">
        <label className="mr-2">Frame Color:</label>
        <input
          type="color"
          value={frameColor}
          onChange={(e) => setFrameColor(e.target.value)}
          className="w-12 h-8 border rounded"
        />
      </div>
      <div className="mt-2 flex items-center">
        <input
          type="checkbox"
          checked={mirror}
          onChange={(e) => setMirror(e.target.checked)}
          className="mr-2"
        />
        <label>Mirror Camera</label>
      </div>

      <div className="mt-2">
        <label className="mr-2">Layout:</label>
        <select
          onChange={(e) => setLayout(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="single">Single Photo</option>
          <option value="double">2 Photos Layout</option>
          <option value="triple">3 Photos Layout</option>
        </select>
      </div>
      <button
        onClick={handleStartCountdown}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Capture Photo
      </button>
      {capturedImage && (
        <div className="mt-4 flex flex-col items-center">
          <img
            src={capturedImage}
            alt="Captured"
            className={`border rounded-lg w-80 ${mirror ? 'mirror' : ''}`}
          /> 
          <button
            onClick={downloadPhoto}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            Download Photo
          </button>
        </div>
      )}
    </div>
  );
}
