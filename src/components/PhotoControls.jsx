import Image from 'next/image';
import { useRouter } from "next/navigation"

const filters = [
  { name: 'None', value: 'none', image: '/assets/filter/none.jpg' },
  { name: 'Grayscale', value: 'grayscale(100%)', image: '/assets/filter/grayscale.jpg' },
  { name: 'Sepia', value: 'sepia(100%)', image: '/assets/filter/sepia.jpg' },
  { name: 'Invert', value: 'invert(100%)', image: '/assets/filter/invert.jpg' },
  { name: 'Contrast', value: 'contrast(200%)', image: '/assets/filter/contrast.jpg' },
  { name: 'Blur', value: 'blur(5px)', image: '/assets/filter/blur.jpg' }
];

export default function PhotoControls({
  filter, setFilter,
  frameColor, setFrameColor,
  layout, setLayout,
  mirror, setMirror,
  handleStartCountdown
}) {
  const router = useRouter();

  const handleNavigation = (url) => {
    router.push(url);
  }
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <div className="mt-6 flex items-center gap-4 flex-wrap">
        {filters.map((f, i) => (
          <button
            key={i}
            onClick={() => setFilter(f.value)}
            className={`w-10 h-10 rounded-full border-2 cursor-pointer ${filter === f.value ? 'border-red-400' : 'border-transparent'
              } overflow-hidden`}
          >
            <Image
              src={f.image}
              alt={f.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </button>
        ))}

        <button
          onClick={() => setLayout('single')}
          className={`w-10 h-10 rounded-full border cursor-pointer ${layout === 'single' ? 'border-red-400' : 'border-gray-300'
            } text-sm text-black bg-white flex items-center justify-center`}
        >
          1
        </button>
        <button
          onClick={() => setLayout('double')}
          className={`w-10 h-10 rounded-full border cursor-pointer ${layout === 'double' ? 'border-red-400' : 'border-gray-300'
            } text-sm text-black bg-white flex items-center justify-center`}
        >
          2
        </button>
        <button
          onClick={() => setLayout('triple')}
          className={`w-10 h-10 rounded-full border cursor-pointer ${layout === 'triple' ? 'border-red-400' : 'border-gray-300'
            } text-sm text-black bg-white flex items-center justify-center`}
        >
          3
        </button>

        <button
          onClick={() => setMirror(!mirror)}
          className={`w-10 h-10 rounded-full border cursor-pointer ${mirror ? 'border-blue-400 bg-blue-100 text-blue-600' : 'border-gray-300 text-gray-500'
            } flex items-center justify-center text-xs font-bold`}
          title="Toggle Mirror"
        >
          ↔
        </button>

        <label
          title="Frame Color"
          className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 relative cursor-pointer"
        >
          <input
            type="color"
            value={frameColor}
            onChange={(e) => setFrameColor(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-full h-full"
            style={{ backgroundColor: frameColor }}
          />
        </label>
      </div>
      <div className='flex'>
        <button
          onClick={handleStartCountdown}
          className="ml-4 px-6 py-2 w-fit cursor-pointer border-2 border-red-300 text-red-400 rounded-full font-bold hover:bg-red-300 hover:text-white transition"
        >
          START
        </button>
        <button
          onClick={() => handleNavigation("/")}
          className="ml-4 px-6 py-2 w-fit cursor-pointer bg-white text-black rounded-full font-bold hover:border-2 hover:border-white hover:bg-transparent hover:text-white transition"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
