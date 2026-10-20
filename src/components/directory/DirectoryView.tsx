import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Search, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  Building2, 
  MapPin, 
  User 
} from 'lucide-react';
import { CLINIC_CONTACTS } from '../../data/clinicalData';
import { ClinicContact } from '../../types/clinical';

export const DirectoryView: React.FC = () => {
  const [contacts, setContacts] = useState<ClinicContact[]>(() => {
    try {
      const saved = localStorage.getItem('klinik_contacts');
      return saved ? JSON.parse(saved) : CLINIC_CONTACTS;
    } catch {
      return CLINIC_CONTACTS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Contact fields
  const [newUnit, setNewUnit] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newExt, setNewExt] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('klinik_contacts', JSON.stringify(contacts));
    } catch (e) {
      console.error(e);
    }
  }, [contacts]);

  const handleCopy = (ext: string, id: string) => {
    navigator.clipboard.writeText(ext);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnit.trim() || !newExt.trim()) return;

    const newContact: ClinicContact = {
      id: `custom_${Date.now()}`,
      unitName: newUnit.trim(),
      department: newDept.trim() || 'Klinik Servis',
      extension: newExt.trim(),
      location: newLocation.trim() || 'Klinik İçi',
      responsibleTitle: newTitle.trim() || 'Sorumlu Personel',
      isCustom: true
    };

    setContacts(prev => [newContact, ...prev]);
    setNewUnit('');
    setNewDept('');
    setNewExt('');
    setNewLocation('');
    setNewTitle('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const filtered = contacts.filter(c => 
    c.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.extension.includes(searchQuery) ||
    c.responsibleTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Klinik Dahili Telefon Rehberi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Laboratuvarlar, görüntüleme, kan merkezi, eczane ve nöbetçi asistan odası hızlı dahili hatları
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Yeni Numara Ekle</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Birim, departman veya dahili no ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        />
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <form onSubmit={handleAddContact} className="bg-white rounded-xl border border-teal-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider">Rehbere Yeni Dahili Numara Ekle</h3>
            <button 
              type="button" 
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Vazgeç
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Birim / Oda Adı *</label>
              <input
                type="text"
                placeholder="Örn: 2. Kat Hemşire Bankosu"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                required
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Dahili No *</label>
              <input
                type="text"
                placeholder="Örn: 2240"
                value={newExt}
                onChange={(e) => setNewExt(e.target.value)}
                required
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Departman</label>
              <input
                type="text"
                placeholder="Örn: Dahiliye Servisi"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Konum / Kat</label>
              <input
                type="text"
                placeholder="Örn: 2. Kat Batı Kanadı"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">Sorumlu Unvanı</label>
              <input
                type="text"
                placeholder="Örn: Servis Sorumlu Hemşiresi"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg"
            >
              Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(contact => (
          <div 
            key={contact.id}
            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-xs flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold text-teal-800">
                  {contact.department}
                </span>
                {contact.isCustom && (
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-slate-300 hover:text-rose-600 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 mt-1">
                {contact.unitName}
              </h4>

              <div className="space-y-1 mt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{contact.responsibleTitle}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{contact.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Dahili Hat</span>
                <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                  {contact.extension}
                </span>
              </div>

              <button
                onClick={() => handleCopy(contact.extension, contact.id)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  copiedId === contact.id
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {copiedId === contact.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-xs text-slate-400">
            "{searchQuery}" araması ile eşleşen dahili hat bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};
