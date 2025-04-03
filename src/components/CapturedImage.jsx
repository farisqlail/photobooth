export default function CapturedImage({ capturedImage, mirror, downloadPhoto }) {
    return (
      <div className="mt-4 flex flex-col items-center">
        <img
          src={capturedImage}
          alt="Captured"
          className={`border rounded-lg ${mirror ? 'mirror' : ''}`}
          style={{ height: 'full', objectFit: 'cover' }}
        />
        <button
          onClick={downloadPhoto}
          className="mt-2 px-4 py-2 bg-green-500 rounded-full text-white cursor-pointer"
        >
          Download Photo
        </button>
      </div>
    );
  }
  