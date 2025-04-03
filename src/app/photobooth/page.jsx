'use client';

import { useRef, useState, useEffect } from 'react';
import VideoPreview from '@/components/VideoPreview';
import PhotoControls from '@/components/PhotoControls';
import CapturedImage from '@/components/CapturedImage';

export default function Photobooth() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [filter, setFilter] = useState('none');
    const [frameColor, setFrameColor] = useState('#ff0000');
    const [layout, setLayout] = useState('single');
    const [countdown, setCountdown] = useState(null);
    const [mirror, setMirror] = useState(true);

    useEffect(() => {
        startCamera();
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleStartCountdown = async () => {
        setCapturedImage(null);
        const canvas = canvasRef.current;
        if (!canvas || !videoRef.current) return;

        const context = canvas.getContext('2d');
        const photoCount = layout === 'triple' ? 3 : layout === 'double' ? 2 : 1;

        let imageWidth = 640;
        let imageHeight = 480;

        const frames = [];

        const countdownAndCapture = (index) => {
            return new Promise((resolve) => {
                let counter = 3;
                setCountdown(counter);

                const countdownInterval = setInterval(() => {
                    counter--;
                    setCountdown(counter);
                    if (counter === 0) {
                        clearInterval(countdownInterval);
                        setCountdown(null);

                        const image = videoRef.current.getScreenshot();
                        const imgElement = new Image();
                        imgElement.src = image;

                        imgElement.onload = () => {
                            if (index === 0) {
                                imageWidth = imgElement.width;
                                imageHeight = imgElement.height;
                                canvas.width = imageWidth;
                                canvas.height = imageHeight * photoCount;
                            }

                            context.save();
                            if (mirror) {
                                context.translate(imageWidth, 0);
                                context.scale(-1, 1);
                            }
                            context.filter = filter;
                            context.drawImage(
                                imgElement,
                                0,
                                index * imageHeight,
                                imageWidth,
                                imageHeight
                            );
                            context.restore();
                            resolve();
                        };
                    }
                }, 1000);
            });
        };

        for (let i = 0; i < photoCount; i++) {
            await countdownAndCapture(i);
        }

        const border = 40;
        const labelHeight = 80;
        const finalWidth = imageWidth + border * 2;
        const finalHeight = imageHeight * photoCount + border * 2 + labelHeight;

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = finalWidth;
        finalCanvas.height = finalHeight;
        const finalCtx = finalCanvas.getContext('2d');

        finalCtx.fillStyle = frameColor;
        finalCtx.fillRect(0, 0, finalWidth, finalHeight);
        finalCtx.drawImage(canvas, border, border);
        finalCtx.fillStyle = '#000';
        finalCtx.font = 'bold 16px sans-serif';
        finalCtx.textAlign = 'center';
        finalCtx.fillText('photobooth', finalWidth / 2, finalHeight - 12);

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
        <div className="w-full min-h-screen bg-black text-white flex flex-col lg:flex-row gap-10 px-4 sm:px-6 lg:px-12 py-10 items-center justify-center">
            <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                <VideoPreview videoRef={videoRef} countdown={countdown} filter={filter} mirror={mirror} />
                <canvas ref={canvasRef} className="hidden" />
                <PhotoControls
                    filter={filter}
                    setFilter={setFilter}
                    frameColor={frameColor}
                    setFrameColor={setFrameColor}
                    layout={layout}
                    setLayout={setLayout}
                    mirror={mirror}
                    setMirror={setMirror}
                    handleStartCountdown={handleStartCountdown}
                />
            </div>

            <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
                {capturedImage ? (
                    <CapturedImage
                        capturedImage={capturedImage}
                        mirror={mirror}
                        downloadPhoto={downloadPhoto}
                    />
                ) : (
                    <p className="text-gray-400 text-sm text-center">Your captured photo will appear here</p>
                )}
            </div>
        </div>
    );
}
