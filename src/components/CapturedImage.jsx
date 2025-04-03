export default function CapturedImage({ capturedImage, mirror, downloadPhoto }) {
    return (
        <div className="mt-4 flex flex-col items-center w-full px-4">
            <img
                src={capturedImage}
                alt="Captured"
                className={`border rounded-lg ${mirror ? 'mirror' : ''}`}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    aspectRatio: '3 / 4'
                }}
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