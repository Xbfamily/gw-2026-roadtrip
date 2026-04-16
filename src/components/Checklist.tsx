import { useState, useEffect, FormEvent } from 'react';
import { CheckSquare, Square, Trash2, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

const defaultItems: ChecklistItem[] = [
  { id: '1', text: 'Giấy tờ tùy thân (Hộ chiếu, Thẻ ngoại kiều)', checked: false },
  { id: '2', text: 'Bằng lái xe & ETC Card', checked: false },
  { id: '3', text: 'Đồ dùng cho bé (bỉm, sữa, xe đẩy, đồ chơi)', checked: false },
  { id: '4', text: 'Quần áo 4 ngày 3 đêm', checked: false },
  { id: '5', text: 'Đồ ăn nhẹ & nước uống trên xe', checked: false },
  { id: '6', text: 'Sạc dự phòng & cáp sạc', checked: false },
  { id: '7', text: 'Tiền mặt & Thẻ tín dụng', checked: false },
  { id: '8', text: 'Thuốc men cơ bản (cảm, tiêu hóa, băng gạc)', checked: false },
];

export default function Checklist() {
  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const [newItemText, setNewItemText] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('roadtrip-checklist');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse checklist', e);
      }
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('roadtrip-checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      checked: false
    };
    
    setItems([...items, newItem]);
    setNewItemText('');
  };

  const completedCount = items.filter(i => i.checked).length;
  const progress = items.length === 0 ? 0 : Math.round((completedCount / items.length) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Hành trang cần chuẩn bị</h3>
          <p className="text-sm text-slate-500">Đừng quên những vật dụng quan trọng</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{progress}%</div>
          <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Hoàn thành</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 w-full bg-slate-100">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-2">
        <div className="max-h-[300px] overflow-y-auto p-3 space-y-1">
          {items.map(item => (
            <div 
              key={item.id}
              className={cn(
                "flex items-center justify-between group p-2 rounded-xl transition-colors",
                item.checked ? "bg-slate-50" : "hover:bg-blue-50/50"
              )}
            >
              <button 
                onClick={() => toggleItem(item.id)}
                className="flex items-center gap-3 flex-1 text-left"
              >
                <div className={cn(
                  "flex-shrink-0 transition-colors",
                  item.checked ? "text-blue-500" : "text-slate-300 group-hover:text-blue-400"
                )}>
                  {item.checked ? <CheckSquare size={22} /> : <Square size={22} />}
                </div>
                <span className={cn(
                  "text-sm md:text-base transition-all",
                  item.checked ? "text-slate-400 line-through" : "text-slate-700"
                )}>
                  {item.text}
                </span>
              </button>
              
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                aria-label="Delete item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              Chưa có mục nào. Hãy thêm vào danh sách!
            </div>
          )}
        </div>

        <form onSubmit={addItem} className="mt-2 p-3 border-t border-slate-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Thêm vật dụng mới..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <button 
              type="submit"
              disabled={!newItemText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl px-4 py-2.5 transition-colors flex items-center justify-center"
            >
              <Plus size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
