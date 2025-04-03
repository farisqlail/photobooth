export default function VideoPreview({ videoRef, countdown, filter, mirror }) {
    return (
      <div className="relative w-full h-[400px]">
        <video
          ref={videoRef}
          autoPlay
          className={`border rounded-xl w-full h-full object-cover ${mirror ? 'mirror' : ''}`}
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
  