import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin, Clock, Coffee, Car, Camera, Train } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const itineraryData = [
  {
    day: 'Ngày 1',
    date: '02/05',
    title: 'Tokyo – Shizuoka – Hamamatsu',
    summary: 'Khởi hành và ngắm núi Phú Sĩ',
    activities: [
      {
        time: 'Sáng',
        icon: Car,
        desc: 'Xuất phát từ Tokyo. Điểm dừng chân đầu tiên là Ebina Service Area (SA) – trạm dừng lớn nhất Nhật Bản với rất nhiều đồ ăn ngon và không gian thoáng.'
      },
      {
        time: 'Trưa',
        icon: Camera,
        desc: 'Ghé thăm Nihondaira Ropeway ở Shizuoka để ngắm nhìn núi Phú Sĩ và vịnh Suruga. Bé 3 tuổi sẽ rất thích trải nghiệm đi cáp treo.'
      },
      {
        time: 'Chiều',
        icon: Coffee,
        desc: 'Di chuyển đến khu vực Hồ Hamana (Hamamatsu). Cho bé đi công viên chủ đề Hamamatsu Fruit Park Tokinosumika (có khu vui chơi và hái trái cây).'
      }
    ]
  },
  {
    day: 'Ngày 2',
    date: '03/05',
    title: 'Hamamatsu – Nagoya',
    summary: 'Khám phá công nghệ và vui chơi',
    activities: [
      {
        time: 'Sáng',
        icon: Car,
        desc: 'Di chuyển sang Nagoya (khoảng 1.5 - 2 tiếng).'
      },
      {
        time: 'Trưa',
        icon: Train,
        desc: 'Tham quan LEGOLAND Japan Resort hoặc SCMAGLEV and Railway Park. Cực kỳ phù hợp với trẻ nhỏ và người lớn yêu thích công nghệ đường sắt.'
      },
      {
        time: 'Chiều',
        icon: MapPin,
        desc: 'Thăm Lâu đài Nagoya hoặc mua sắm tại khu vực trung tâm Sakae.'
      }
    ]
  },
  {
    day: 'Ngày 3',
    date: '04/05',
    title: 'Nagoya – Kyoto – Kobe',
    summary: 'Văn hóa truyền thống và cảnh đêm',
    activities: [
      {
        time: 'Sáng',
        icon: Train,
        desc: 'Rời Nagoya đi Kyoto. Ghé thăm Công viên đường sắt Kyoto (Kyoto Railway Museum) – bé tha hồ khám phá các đầu máy hơi nước.'
      },
      {
        time: 'Trưa',
        icon: Camera,
        desc: 'Thưởng thức đặc sản Kyoto và dạo quanh Arashiyama hoặc chùa Thanh Thủy (Kiyomizu-dera). Ưu tiên các khu vực có bãi đậu xe rộng vì Golden Week rất đông.'
      },
      {
        time: 'Chiều',
        icon: MapPin,
        desc: 'Tiếp tục lái xe đến Kobe. Ghé qua Kobe Harborland để ngắm cảnh biển và tháp cảng Kobe về đêm.'
      }
    ]
  },
  {
    day: 'Ngày 4',
    date: '05/05',
    title: 'Kobe – Vui chơi & Quay về Tokyo',
    summary: 'Thiên đường trẻ thơ và bò Kobe',
    activities: [
      {
        time: 'Sáng',
        icon: Coffee,
        desc: 'Tham quan Kobe Anpanman Children\'s Museum & Mall – thiên đường cho bé 3 tuổi. Thưởng thức bò Kobe nổi tiếng tại các nhà hàng gần đó.'
      },
      {
        time: 'Trưa',
        icon: Camera,
        desc: 'Dạo chơi tại Công viên Meriken hoặc đi cáp treo lên Kobe Nunobiki Herb Gardens để ngắm toàn cảnh thành phố từ trên cao.'
      },
      {
        time: 'Chiều',
        icon: Car,
        desc: 'Bắt đầu hành trình quay về Tokyo. Dừng nghỉ tại các SA nổi tiếng như NEOPASA Hamamatsu để mua quà lưu niệm.'
      }
    ]
  }
];

export default function Itinerary() {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {itineraryData.map((day, index) => {
        const isExpanded = expandedDay === index;
        
        return (
          <div 
            key={index} 
            className={cn(
              "bg-white rounded-2xl overflow-hidden transition-all duration-200 border",
              isExpanded ? "border-blue-300 shadow-md" : "border-slate-200 shadow-sm hover:border-blue-200"
            )}
          >
            <button
              onClick={() => toggleDay(index)}
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-700 rounded-xl px-3 py-2 text-center min-w-[70px]">
                  <div className="text-xs font-semibold uppercase">{day.day}</div>
                  <div className="text-lg font-bold">{day.date}</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{day.title}</h3>
                  <p className="text-sm text-slate-500">{day.summary}</p>
                </div>
              </div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                isExpanded ? "bg-blue-100 text-blue-600" : "bg-slate-50 text-slate-400"
              )}>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                    <div className="space-y-6 mt-4">
                      {day.activities.map((activity, actIdx) => (
                        <div key={actIdx} className="flex gap-4 relative">
                          {/* Timeline line */}
                          {actIdx !== day.activities.length - 1 && (
                            <div className="absolute left-[15px] top-10 bottom-[-24px] w-[2px] bg-blue-100" />
                          )}
                          
                          <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 shrink-0 z-10">
                            <activity.icon size={14} />
                          </div>
                          
                          <div className="pt-1 pb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                {activity.time}
                              </span>
                            </div>
                            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                              {activity.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
