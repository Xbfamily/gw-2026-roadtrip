import React from 'react';
import { Calendar, Map as MapIcon, CheckSquare, Navigation } from 'lucide-react';
import RouteMap from './components/Map';
import Itinerary from './components/Itinerary';
import Checklist from './components/Checklist';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Header */}
      <header className="bg-blue-600 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-sm border border-blue-400/30 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar size={14} />
            <span>02/05 - 05/05/2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            GW 2026<br/>Road Trip
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
            Hành trình 4 ngày 3 đêm khám phá Nhật Bản, cân bằng giữa di chuyển, vui chơi cho bé và nghỉ ngơi.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 -mt-16 relative z-20 space-y-8">
        
        {/* Map Section */}
        <section>
          <div className="flex items-center gap-2 mb-3 px-2">
            <MapIcon className="text-blue-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">Bản đồ hành trình</h2>
          </div>
          <RouteMap />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Itinerary Section */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <Navigation className="text-blue-600" size={20} />
                <h2 className="text-xl font-bold text-slate-800">Lịch trình chi tiết</h2>
              </div>
            </div>
            <Itinerary />
          </section>

          {/* Checklist Section */}
          <section className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="flex items-center gap-2 mb-4 px-2">
                <CheckSquare className="text-blue-600" size={20} />
                <h2 className="text-xl font-bold text-slate-800">Chuẩn bị</h2>
              </div>
              <Checklist />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
