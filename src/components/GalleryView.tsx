import React, { useState } from 'react';
import { GALLERY_ALBUMS } from '../data/initialData';
import { Camera, Calendar, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(0);
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ url: string; caption: string } | null>(null);

  const currentAlbum = GALLERY_ALBUMS[selectedAlbumIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Title */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Hình ảnh hoạt động
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 mt-1">
          Thư Viện Ảnh Hoạt Động Nhà Trường
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Lưu giữ những khoảnh khắc đáng nhớ trong học tập, rèn luyện và đời sống bán trú của thầy và trò
        </p>
      </div>

      {/* Album Selector Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none">
        {GALLERY_ALBUMS.map((album, idx) => (
          <button
            key={album.id}
            onClick={() => setSelectedAlbumIndex(idx)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedAlbumIndex === idx
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {album.title}
          </button>
        ))}
      </div>

      {/* Album Showcase Grid */}
      {currentAlbum && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{currentAlbum.title}</h2>
              <span className="text-xs text-slate-500 tabular-nums">Thời gian: {currentAlbum.date}</span>
            </div>
            <span className="text-xs text-slate-500">
              {currentAlbum.images.length} hình ảnh
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAlbum.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLightboxImg(img)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={img.url}
                    alt={img.caption}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/campus.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="text-xs font-semibold px-3 py-1.5 bg-black/60 rounded-lg backdrop-blur-xs">
                      Phóng to ảnh
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <span className="text-xs font-semibold text-slate-300 truncate max-w-lg">
                {activeLightboxImg.caption}
              </span>
              <button
                onClick={() => setActiveLightboxImg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] flex items-center justify-center p-2 bg-black">
              <img
                src={activeLightboxImg.url}
                alt={activeLightboxImg.caption}
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-3 bg-slate-900 text-center text-xs text-slate-300 italic">
              {activeLightboxImg.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
