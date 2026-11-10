import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from 'lucide-react';
import type { AchievementPhoto } from '../../types';

interface LightboxProps {
  photos: AchievementPhoto[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const photo = photos[currentIndex];
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer shadow-lg"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={22} />
      </button>

      {/* Nav prev */}
      {photos.length > 1 && (
        <button
          className="absolute left-4 p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={26} />
        </button>
      )}

      {/* Image Container */}
      <div
        className="max-w-5xl max-h-[90vh] mx-12 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/10"
        />
        <div className="mt-4 text-center px-4">
          <p className="text-white font-medium text-base sm:text-lg">{photo.caption}</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>
      </div>

      {/* Nav next */}
      {photos.length > 1 && (
        <button
          className="absolute right-4 p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next image"
        >
          <ChevronRight size={26} />
        </button>
      )}
    </div>
  );
}

interface PhotoGalleryProps {
  photos: AchievementPhoto[];
  folderHint?: string;
  columns?: 2 | 3 | 4;
}

export default function PhotoGallery({ photos, folderHint, columns = 2 }: PhotoGalleryProps) {
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter out any broken or missing photos
  const validPhotos = photos.filter((p) => !failedIds.has(p.id));

  // Graceful empty state when no valid photos exist
  if (validPhotos.length === 0) {
    if (!folderHint) return null;
    return (
      <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-blue-900/40 bg-slate-50 dark:bg-white/[0.02] text-center">
        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium">
          <Camera size={14} className="text-blue-500 dark:text-blue-400" />
          <span>Event Gallery (Photos & certificates coming soon)</span>
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-[11px] mt-1 font-mono">
          Drop photos into public/images/achievements/{folderHint}/
        </p>
      </div>
    );
  }

  const gridColsClass =
    columns === 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : columns === 3
      ? 'grid-cols-2 sm:grid-cols-3'
      : validPhotos.length === 1
      ? 'grid-cols-1'
      : 'grid-cols-2';

  return (
    <>
      <div className={`grid ${gridColsClass} gap-3`}>
        {validPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            role="button"
            tabIndex={0}
            onClick={() => setLightboxIndex(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(idx);
              }
            }}
            className="group relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0d1829] border border-slate-200 dark:border-blue-900/30 hover:border-blue-500/60 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
            aria-label={`View ${photo.caption}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="eager"
              decoding="async"
              onError={() => {
                console.warn(`[PhotoGallery] Missing or failed image asset: ${photo.src}`);
                setFailedIds((prev) => new Set(prev).add(photo.id));
              }}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 block"
            />
            {/* Hover overlay with caption & zoom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none z-10">
              <div className="p-3 w-full">
                <div className="flex items-center gap-1.5">
                  <ZoomIn size={13} className="text-blue-400 shrink-0" />
                  <span className="text-white text-xs font-medium truncate">
                    {photo.caption}
                  </span>
                </div>
              </div>
            </div>
            {/* Blue glow highlight on hover */}
            <div className="absolute inset-0 ring-2 ring-blue-500/0 group-hover:ring-blue-500/40 rounded-xl transition-all duration-300 pointer-events-none z-10" />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={validPhotos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
