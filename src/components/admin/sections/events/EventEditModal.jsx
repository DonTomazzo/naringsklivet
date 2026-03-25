import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  X, Save, Calendar, Clock, Users, Video, MapPin,
  Info, Mail, DollarSign, Repeat
} from 'lucide-react';

function EventEditModal({ event, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: event.title || '',
    description: event.description || '',
    category: event.category || 'webinar',
    thumbnailUrl: event.thumbnailUrl || '',
    startDate: event.startDate || '',
    startTime: event.startTime || '',
    endDate: event.endDate || event.startDate || '',
    endTime: event.endTime || '',
    isRecurring: event.isRecurring || false,
    recurringPattern: event.recurringPattern || 'weekly',
    recurringEndDate: event.recurringEndDate || '',
    meetingType: event.meetingType || 'zoom',
    meetingLink: event.meetingLink || '',
    meetingId: event.meetingId || '',
    meetingPassword: event.meetingPassword || '',
    location: event.location || '',
    maxParticipants: event.maxParticipants || 30,
    instructorName: event.instructorName || '',
    instructorEmail: event.instructorEmail || '',
    price: event.price || 0,
    isFree: event.isFree !== undefined ? event.isFree : true,
    sendReminders: event.sendReminders !== undefined ? event.sendReminders : true,
    autoConfirm: event.autoConfirm !== undefined ? event.autoConfirm : true,
    allowWaitlist: event.allowWaitlist !== undefined ? event.allowWaitlist : true
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'webinar', label: 'Webinar', color: 'bg-blue-100 text-blue-700' },
    { value: 'workshop', label: 'Workshop', color: 'bg-purple-100 text-purple-700' },
    { value: 'training', label: 'Utbildning', color: 'bg-green-100 text-green-700' },
    { value: 'meeting', label: 'Möte', color: 'bg-orange-100 text-orange-700' },
    { value: 'conference', label: 'Konferens', color: 'bg-red-100 text-red-700' }
  ];

  const meetingPlatforms = [
    { value: 'zoom', label: 'Zoom', icon: '🎥' },
    { value: 'teams', label: 'Microsoft Teams', icon: '💼' },
    { value: 'meet', label: 'Google Meet', icon: '📹' },
    { value: 'physical', label: 'Fysiskt möte', icon: '📍' },
    { value: 'other', label: 'Annan länk', icon: '🔗' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Titel krävs';
    if (!formData.description.trim()) newErrors.description = 'Beskrivning krävs';
    if (!formData.startDate) newErrors.startDate = 'Startdatum krävs';
    if (!formData.startTime) newErrors.startTime = 'Starttid krävs';
    if (!formData.endTime) newErrors.endTime = 'Sluttid krävs';
    if (!formData.instructorName.trim()) newErrors.instructorName = 'Instruktör krävs';
    if (!formData.instructorEmail.trim()) {
      newErrors.instructorEmail = 'Email krävs';
    } else if (!/\S+@\S+\.\S+/.test(formData.instructorEmail)) {
      newErrors.instructorEmail = 'Ogiltig email';
    }

    if (formData.meetingType === 'physical' && !formData.location.trim()) {
      newErrors.location = 'Plats krävs för fysiskt möte';
    } else if (formData.meetingType !== 'physical' && !formData.meetingLink.trim()) {
      newErrors.meetingLink = 'Möteslänk krävs';
    }

    if (formData.isRecurring && !formData.recurringEndDate) {
      newErrors.recurringEndDate = 'Slutdatum för återkommande krävs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSaving(true);
    setTimeout(() => {
      onSave({
        ...event,
        ...formData,
        updatedAt: new Date().toISOString()
      });
      setSaving(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Redigera event</h2>
                <p className="text-orange-100 mt-1">Uppdatera eventinformation</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Info size={20} className="text-orange-500" />
                Grundläggande information
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Titel *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="t.ex. Introduktion till digital marknadsföring"
                />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Beskrivning *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Beskriv vad deltagarna kommer att lära sig..."
                />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Max deltagare</label>
                  <input
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleChange('maxParticipants', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Calendar size={20} className="text-orange-500" />
                Datum och tid
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Startdatum *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.startDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Starttid *</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleChange('startTime', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.startTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.startTime && <p className="text-sm text-red-600 mt-1">{errors.startTime}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Slutdatum</label>
                  <input
                    type="date"
                    value={formData.endDate || formData.startDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sluttid *</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleChange('endTime', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.endTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.endTime && <p className="text-sm text-red-600 mt-1">{errors.endTime}</p>}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={formData.isRecurring}
                    onChange={(e) => handleChange('isRecurring', e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Återkommande event</span>
                </label>

                {formData.isRecurring && (
                  <div className="space-y-4 ml-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Upprepningsmönster</label>
                      <select
                        value={formData.recurringPattern}
                        onChange={(e) => handleChange('recurringPattern', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="daily">Dagligen</option>
                        <option value="weekly">Veckovis</option>
                        <option value="biweekly">Varannan vecka</option>
                        <option value="monthly">Månatligen</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Sluta upprepa *</label>
                      <input
                        type="date"
                        value={formData.recurringEndDate}
                        onChange={(e) => handleChange('recurringEndDate', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.recurringEndDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.recurringEndDate && <p className="text-sm text-red-600 mt-1">{errors.recurringEndDate}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Video size={20} className="text-orange-500" />
                Mötesdetaljer
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Välj plattform</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {meetingPlatforms.map(platform => (
                    <button
                      key={platform.value}
                      type="button"
                      onClick={() => handleChange('meetingType', platform.value)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.meetingType === platform.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{platform.icon}</div>
                      <div className="text-sm font-medium text-slate-900">{platform.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.meetingType === 'physical' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    Plats/Adress *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Gatuadress, Stad"
                  />
                  {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Möteslänk *</label>
                    <input
                      type="url"
                      value={formData.meetingLink}
                      onChange={(e) => handleChange('meetingLink', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.meetingLink ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="https://..."
                    />
                    {errors.meetingLink && <p className="text-sm text-red-600 mt-1">{errors.meetingLink}</p>}
                  </div>

                  {formData.meetingType === 'zoom' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Meeting ID</label>
                        <input
                          type="text"
                          value={formData.meetingId}
                          onChange={(e) => handleChange('meetingId', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="123 456 7890"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Lösenord</label>
                        <input
                          type="text"
                          value={formData.meetingPassword}
                          onChange={(e) => handleChange('meetingPassword', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Valfritt"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Instructor & Price */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Mail size={20} className="text-orange-500" />
                Instruktör & Pris
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Instruktör *</label>
                  <input
                    type="text"
                    value={formData.instructorName}
                    onChange={(e) => handleChange('instructorName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.instructorName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Namn"
                  />
                  {errors.instructorName && <p className="text-sm text-red-600 mt-1">{errors.instructorName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Instruktörs email *</label>
                  <input
                    type="email"
                    value={formData.instructorEmail}
                    onChange={(e) => handleChange('instructorEmail', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.instructorEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.instructorEmail && <p className="text-sm text-red-600 mt-1">{errors.instructorEmail}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFree}
                    onChange={(e) => handleChange('isFree', e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-slate-700">Gratis event</span>
                </label>
              </div>

              {!formData.isFree && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pris (SEK)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-slate-900">Inställningar</h3>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sendReminders}
                    onChange={(e) => handleChange('sendReminders', e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-slate-700">Skicka automatiska påminnelser</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoConfirm}
                    onChange={(e) => handleChange('autoConfirm', e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-slate-700">Auto-bekräfta anmälningar</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowWaitlist}
                    onChange={(e) => handleChange('allowWaitlist', e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-slate-700">Tillåt väntelista när fullt</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Avbryt
            </button>

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sparar...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Spara ändringar
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EventEditModal;