import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Filter, 
  AlertCircle, 
  Clock, 
  Tag, 
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { WardTask } from '../../types/clinical';

interface WardTasksViewProps {
  onUpdatePendingCount?: (count: number) => void;
}

const DEFAULT_TASKS: WardTask[] = [
  {
    id: 't-1',
    roomNumber: 'Oda 204',
    patientAlias: 'M.K. (62E)',
    taskTitle: 'Sabah açlık kontrol biyokimyası ve kan gazı alınması',
    category: 'blood',
    priority: 'pre-round',
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: 't-2',
    roomNumber: 'Oda 212',
    patientAlias: 'F.S. (45K)',
    taskTitle: 'Batın USG randevusu için Radyoloji ile görüşülecek',
    category: 'radiology',
    priority: 'urgent',
    completed: false,
    createdAt: Date.now() - 7200000,
  },
  {
    id: 't-3',
    roomNumber: 'Oda 308',
    patientAlias: 'A.T. (71E)',
    taskTitle: 'Kardiyoloji konsültasyon notu ve EKO sonucu takip edilecek',
    category: 'consultation',
    priority: 'routine',
    completed: false,
    createdAt: Date.now() - 10800000,
  },
  {
    id: 't-4',
    roomNumber: 'Oda 315',
    patientAlias: 'E.B. (53K)',
    taskTitle: 'Postoperatif batın insizyon hattı steril pansuman değişimi',
    category: 'dressing',
    priority: 'routine',
    completed: true,
    createdAt: Date.now() - 14400000,
  }
];

export const WardTasksView: React.FC<WardTasksViewProps> = ({ onUpdatePendingCount }) => {
  const [tasks, setTasks] = useState<WardTask[]>(() => {
    try {
      const saved = localStorage.getItem('klinik_ward_tasks');
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  const [filterState, setFilterState] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // New task form states
  const [newRoom, setNewRoom] = useState('');
  const [newAlias, setNewAlias] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<WardTask['category']>('general');
  const [newPriority, setNewPriority] = useState<WardTask['priority']>('routine');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('klinik_ward_tasks', JSON.stringify(tasks));
      const pendingCount = tasks.filter(t => !t.completed).length;
      onUpdatePendingCount?.(pendingCount);
    } catch (e) {
      console.error(e);
    }
  }, [tasks, onUpdatePendingCount]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: WardTask = {
      id: `task_${Date.now()}`,
      roomNumber: newRoom.trim() || 'Servis',
      patientAlias: newAlias.trim() || 'Hasta',
      taskTitle: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      notes: newNotes.trim() || undefined,
      completed: false,
      createdAt: Date.now()
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
    setNewRoom('');
    setNewAlias('');
    setNewNotes('');
    setShowAddForm(false);
  };

  const addQuickTask = (title: string, category: WardTask['category'], priority: WardTask['priority'] = 'routine') => {
    const newTask: WardTask = {
      id: `quick_${Date.now()}`,
      roomNumber: 'Oda ...',
      patientAlias: 'İsimsiz',
      taskTitle: title,
      category,
      priority,
      completed: false,
      createdAt: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const filteredTasks = tasks.filter(t => {
    if (filterState === 'pending') return !t.completed;
    if (filterState === 'completed') return t.completed;
    return true;
  });

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Servis & Nöbet Görev Listesi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Vizit öncesi kanlar, konsültasyonlar, pansumanlar ve nöbet yapılacakları (KVKK uyumlu anonim kayıt)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Görev Ekle</span>
          </button>
        </div>
      </div>

      {/* Quick Routine Presets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] text-slate-400 font-medium shrink-0">Hızlı Şablonlar:</span>
        {[
          { label: '+ Kan Alma & Lab', title: 'Sabah biyokimya ve hemogram kanı alınacak', cat: 'blood' as const, prio: 'pre-round' as const },
          { label: '+ 12 Derivasyon EKG', title: '12 Derivasyonlu kontrol EKG çekilecek', cat: 'general' as const, prio: 'routine' as const },
          { label: '+ Konsültasyon Takibi', title: 'Yazılan konsültasyon notu ve hekim yanıtı takip edilecek', cat: 'consultation' as const, prio: 'urgent' as const },
          { label: '+ Pansuman', title: 'Cerrahi yara yeri pansumanı yapılacak', cat: 'dressing' as const, prio: 'routine' as const },
          { label: '+ Epikriz & Çıkış', title: 'Taburculuk epikrizi ve reçetesi hazırlanacak', cat: 'discharge' as const, prio: 'routine' as const },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => addQuickTask(item.title, item.cat, item.prio)}
            className="px-2.5 py-1 text-xs bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-lg whitespace-nowrap shrink-0 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Task Creation Modal / Drawer Form */}
      {showAddForm && (
        <form onSubmit={handleAddTask} className="bg-white rounded-xl border border-teal-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider">Yeni Servis Görevi Tanımla</h3>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Vazgeç
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Oda No</label>
              <input
                type="text"
                placeholder="Örn: Oda 204"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Hasta Rumuzu (KVKK)</label>
              <input
                type="text"
                placeholder="Örn: A.K. (55E)"
                value={newAlias}
                onChange={(e) => setNewAlias(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Kategori</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as WardTask['category'])}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="blood">Kan / Laboratuvar</option>
                <option value="radiology">Görüntüleme / Radyoloji</option>
                <option value="consultation">Konsültasyon</option>
                <option value="medication">İlaç Tedavisi</option>
                <option value="dressing">Pansuman</option>
                <option value="discharge">Epikriz / Taburculuk</option>
                <option value="general">Genel Takip</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Öncelik</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as WardTask['priority'])}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="urgent">Acil / Hemen</option>
                <option value="pre-round">Vizit Öncesi</option>
                <option value="routine">Rutin Nöbet İşi</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Görev Açıklaması *</label>
            <input
              type="text"
              placeholder="Örn: Sabah 08:00 kontrol kan gazı ve kreatinin gönderilecek"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg"
            >
              Listeye Ekle
            </button>
          </div>
        </form>
      )}

      {/* Task List Header with Filters */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-slate-800">
              Görevler <span className="font-mono text-slate-500">({tasks.length})</span>
            </div>
            <div className="text-xs text-slate-500">
              Bekleyen: <strong className="font-mono text-teal-800">{pendingCount}</strong>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'pending', label: 'Bekleyenler' },
              { id: 'completed', label: 'Tamamlananlar' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterState(f.id as any)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  filterState === f.id
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Task Items */}
        <div className="divide-y divide-slate-100">
          {filteredTasks.map(task => (
            <div 
              key={task.id}
              className={`p-3.5 flex items-center justify-between gap-3 transition-colors ${
                task.completed ? 'bg-slate-50/50 opacity-70' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-slate-400 hover:text-teal-700 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {task.roomNumber}
                    </span>
                    <span className="text-slate-400 text-xs">·</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {task.patientAlias}
                    </span>
                    <span className="text-slate-400 text-xs">·</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      task.priority === 'urgent' ? 'bg-rose-100 text-rose-800' :
                      task.priority === 'pre-round' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {task.priority === 'urgent' ? 'Acil' : task.priority === 'pre-round' ? 'Vizit Öncesi' : 'Rutin'}
                    </span>
                  </div>

                  <div className={`text-xs mt-1 font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.taskTitle}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors shrink-0"
                title="Görevi Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="py-12 text-center text-xs text-slate-400">
              Bu filtrede görüntülenecek görev bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
