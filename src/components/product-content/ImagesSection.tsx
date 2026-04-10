import Image from "next/image";
import { Shield, Truck, RotateCcw, ZoomIn,  } from "lucide-react";

interface ImageParams {
  name: string;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
  setIsZoomed: (isZoomed: boolean) => void;
  images: string[];
}

const ImagesSection = ({ name, selectedImage, setSelectedImage, setIsZoomed, images }: ImageParams) => {

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Main Image Container (Small & Constrained) */}
        <div
          onClick={() => setIsZoomed(true)}
          className="relative group aspect-square w-full max-w-[450px] mx-auto overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 cursor-zoom-in"
        >
          <Image
            src={images[selectedImage] || "/placeholder.jpg"}
            alt={name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <ZoomIn className="text-white w-8 h-8" />
          </div>
</div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 justify-center overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === idx
                    ? "border-amber-500 shadow-lg"
                    : "border-zinc-800 hover:border-zinc-600"
                }`}
              >
                <Image
                  src={img}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
            <Shield className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-tighter text-zinc-400">
              Official Store
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
            <Truck className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-tighter text-zinc-400">
              Fast Shipping
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
            <RotateCcw className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-tighter text-zinc-400">
              Easy Returns
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagesSection;
