import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  X, Calendar, Clock, Users, Video, MapPin, Check,
  ChevronRight, ChevronLeft, Info, Link as LinkIcon,
  Image as ImageIcon, DollarSign, Mail, Upload
} from 'lucide-react';

function EventCreateModal({ onClose, onCreate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'webinar',
    thumbnailUrl: '',
    thumbnailFile: null,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    isRecurring: false,
    recurringPattern: 'weekly',
    recurringEndDate: '',
    meetingType: 'zoom',
    meetingLink: '',
    meetingId: '',
    meetingPassword: '',
    location: '',
    maxParticipants: 30,
    instructorName: '',
    instructorEmail: '',
    price: 0,
    isFree: true,
    sendReminders: true,
    autoConfirm: true,
    allowWaitlist: true
  });
  const [errors, setErrors] = useState({});
  const [creating, setCreating] = useState(false);

  const steps = [
    { number: 1, title: 'Grundinfo', icon: Info },
    { number: 2, title: 'Datum & Tid', icon: Calendar },
    { number: 3, title: 'Möte', icon: Video },
    { number: 4, title: 'Granska', icon: Check }
  ];

  const categories = [
    { value: 'webinar', label: 'Webinar', color: 'bg-blue-100 text-blue-700' },
    { value: 'workshop', label: 'Workshop', color: 'bg-purple-100 text-purple-700' },
    { value: 'training', label: 'Utbildning', color: 'bg-green-100 text-green-700' },
    { value: 'meeting', label: 'Möte', color: 'bg-orange-100 text-orange-700' },
    { value: 'conference', label: 'Konferens', color: 'bg-red-100 text-red-700' }
  ];

  const meetingPlatforms = [
    { value: 'zoom', label: 'Zoom', icon: '🎥', color: 'bg-blue-500', needsLink: true },
    { value: 'teams', label: 'Microsoft Teams', icon: '💼', color: 'bg-purple-500', needsLink: true },
    { value: 'meet', label: 'Google Meet', icon: '📹', color: 'bg-green-500', needsLink: true },
    { value: 'physical', label: 'Fysiskt möte', icon: '📍', color: 'bg-orange-500', needsLink: false },
    { value: 'other', label: 'Annan länk', icon: '🔗', color: 'bg-gray-500', needsLink: true }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, thumbnailFile: 'Bilden får max vara 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        handleChange('thumbnailUrl', reader.result);
        handleChange('thumbnailFile', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Titel krävs';
      if (!formData.description.trim()) newErrors.description = 'Beskrivning krävs';
      if (!formData.instructorName.trim()) newErrors.instructorName = 'Instruktör krävs';
      if (!formData.instructorEmail.trim()) {
        newErrors.instructorEmail = 'Email krävs';
      } else if (!/\S+@\S+\.\S+/.test(formData.instructorEmail)) {
        newErrors.instructorEmail = 'Ogiltig email';
      }
    }

    if (step === 2) {
      if (!formData.startDate) newErrors.startDate = 'Startdatum krävs';
      if (!formData.startTime) newErrors.startTime = 'Starttid krävs';
      if (!formData.endTime) newErrors.endTime = 'Sluttid krävs';
      if (formData.isRecurring && !formData.recurringEndDate) {
        newErrors.recurringEndDate = 'Slutdatum för återkommande krävs';
      }
    }

    if (step === 3) {
      if (formData.meetingType === 'physical') {
        if (!formData.location.trim()) {
          newErrors.location = 'Plats krävs för fysiskt möte';
        }
      } else {
        if (!formData.meetingLink.trim()) {
          newErrors.meetingLink = 'Möteslänk krävs';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setCreating(true);
    setTimeout(() => {
      onCreate({
        id: `event-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
        participants: [],
        waitlist: []
      });
      setCreating(false);
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
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Skapa nytt event</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep > step.number
                        ? 'bg-green-500'
                        : currentStep === step.number
                        ? 'bg-white text-blue-600'
                        : 'bg-white/20'
                    }`}>
                      {currentStep > step.number ? (
                        <Check size={20} />
                      ) : (
                        <step.icon size={20} />
                      )}
                    </div>
                    <div className={`hidden sm:block ${
                      currentStep >= step.number ? 'opacity-100' : 'opacity-60'
                    }`}>
                      <div className="text-xs opacity-75">Steg {step.number}</div>
                      <div className="font-semibold">{step.title}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Grundläggande information</h3>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <ImageIcon size={16} className="inline mr-1" />
                      Event-bild
                    </label>
                    <div className="flex items-start gap-4">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-48 h-32 object-cover rounded-lg border-2 border-blue-200"
                          />
                          <button
                            onClick={() => {
                              setImagePreview(null);
                              handleChange('thumbnailUrl', '');
                              handleChange('thumbnailFile', null);
                            }}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                          <Upload className="text-gray-400 mb-2" size={32} />
                          <span className="text-sm text-gray-500">Ladda upp bild</span>
                          <span className="text-xs text-gray-400 mt-1">Max 5MB</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-slate-600">
                          Ladda upp en attraktiv bild för ditt event. Rekommenderad storlek: 1200x600px
                        </p>
                        {errors.thumbnailFile && (
                          <p className="text-sm text-red-600 mt-2">{errors.thumbnailFile}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Titel *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="t.ex. Introduktion till digital marknadsföring"
                      autoFocus
                    />
                    {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Beskrivning *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Beskriv vad deltagarna kommer att lära sig..."
                    />
                    {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Kategori
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Max deltagare
                      </label>
                      <input
                        type="number"
                        value={formData.maxParticipants}
                        onChange={(e) => handleChange('maxParticipants', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Instruktör *
                      </label>
                      <input
                        type="text"
                        value={formData.instructorName}
                        onChange={(e) => handleChange('instructorName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.instructorName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Namn"
                      />
                      {errors.instructorName && <p className="text-sm text-red-600 mt-1">{errors.instructorName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Instruktörs email *
                      </label>
                      <input
                        type="email"
                        value={formData.instructorEmail}
                        onChange={(e) => handleChange('instructorEmail', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Gratis event</span>
                    </label>
                  </div>

                  {!formData.isFree && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Pris (SEK)
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Datum och tid</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Startdatum *
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.startDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Starttid *
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleChange('startTime', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.startTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.startTime && <p className="text-sm text-red-600 mt-1">{errors.startTime}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Slutdatum
                      </label>
                      <input
                        type="date"
                        value={formData.endDate || formData.startDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Sluttid *
                      </label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleChange('endTime', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Återkommande event</span>
                    </label>

                    {formData.isRecurring && (
                      <div className="space-y-4 ml-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Upprepningsmönster
                          </label>
                          <select
                            value={formData.recurringPattern}
                            onChange={(e) => handleChange('recurringPattern', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="daily">Dagligen</option>
                            <option value="weekly">Veckovis</option>
                            <option value="biweekly">Varannan vecka</option>
                            <option value="monthly">Månatligen</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Sluta upprepa *
                          </label>
                          <input
                            type="date"
                            value={formData.recurringEndDate}
                            onChange={(e) => handleChange('recurringEndDate', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.recurringEndDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.recurringEndDate && <p className="text-sm text-red-600 mt-1">{errors.recurringEndDate}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Meeting Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Mötesdetaljer</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Välj plattform
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {meetingPlatforms.map(platform => (
                        <button
                          key={platform.value}
                          type="button"
                          onClick={() => handleChange('meetingType', platform.value)}
                          className={`p-4 border-2 rounded-lg transition-all ${
                            formData.meetingType === platform.value
                              ? 'border-blue-500 bg-blue-50'
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
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Gatuadress, Stad"
                      />
                      {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          <LinkIcon size={16} className="inline mr-1" />
                          Möteslänk *
                        </label>
                        <input
                          type="url"
                          value={formData.meetingLink}
                          onChange={(e) => handleChange('meetingLink', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.meetingLink ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={
                            formData.meetingType === 'zoom' ? 'https://zoom.us/j/...' :
                            formData.meetingType === 'teams' ? 'https://teams.microsoft.com/...' :
                            formData.meetingType === 'meet' ? 'https://meet.google.com/...' :
                            'https://...'
                          }
                        />
                        {errors.meetingLink && <p className="text-sm text-red-600 mt-1">{errors.meetingLink}</p>}
                      </div>

                      {formData.meetingType === 'zoom' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Meeting ID
                            </label>
                            <input
                              type="text"
                              value={formData.meetingId}
                              onChange={(e) => handleChange('meetingId', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="123 456 7890"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Lösenord
                            </label>
                            <input
                              type="text"
                              value={formData.meetingPassword}
                              onChange={(e) => handleChange('meetingPassword', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Valfritt"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-slate-900 text-sm">Inställningar</h4>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sendReminders}
                        onChange={(e) => handleChange('sendReminders', e.target.checked)}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Skicka automatiska påminnelser</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.autoConfirm}
                        onChange={(e) => handleChange('autoConfirm', e.target.checked)}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Auto-bekräfta anmälningar</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.allowWaitlist}
                        onChange={(e) => handleChange('allowWaitlist', e.target.checked)}
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Tillåt väntelista när fullt</span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Granska och publicera</h3>
                  </div>

                  {imagePreview && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Event-bild</h4>
                      <img
                        src={imagePreview}
                        alt="Event preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Event information</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Titel:</dt>
                          <dd className="font-semibold text-slate-900">{formData.title}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Kategori:</dt>
                          <dd className="font-semibold text-slate-900">
                            {categories.find(c => c.value === formData.category)?.label}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Instruktör:</dt>
                          <dd className="font-semibold text-slate-900">{formData.instructorName}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Max deltagare:</dt>
                          <dd className="font-semibold text-slate-900">{formData.maxParticipants}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Pris:</dt>
                          <dd className="font-semibold text-slate-900">
                            {formData.isFree ? 'Gratis' : `${formData.price} SEK`}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Datum & Tid</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Datum:</dt>
                          <dd className="font-semibold text-slate-900">
                            {new Date(formData.startDate).toLocaleDateString('sv-SE')}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Tid:</dt>
                          <dd className="font-semibold text-slate-900">
                            {formData.startTime} - {formData.endTime}
                          </dd>
                        </div>
                        {formData.isRecurring && (
                          <div className="flex justify-between">
                            <dt className="text-slate-600">Återkommande:</dt>
                            <dd className="font-semibold text-slate-900">
                              {formData.recurringPattern === 'daily' ? 'Dagligen' :
                               formData.recurringPattern === 'weekly' ? 'Veckovis' :
                               formData.recurringPattern === 'biweekly' ? 'Varannan vecka' :
                               'Månatligen'}
                              {' till ' + new Date(formData.recurringEndDate).toLocaleDateString('sv-SE')}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Möte</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Plattform:</dt>
                          <dd className="font-semibold text-slate-900">
                            {meetingPlatforms.find(p => p.value === formData.meetingType)?.label}
                          </dd>
                        </div>
                        {formData.meetingType === 'physical' ? (
                          <div className="flex justify-between">
                            <dt className="text-slate-600">Plats:</dt>
                            <dd className="font-semibold text-slate-900">{formData.location}</dd>
                          </div>
                        ) : (
                          <div>
                            <dt className="text-slate-600 mb-1">Länk:</dt>
                            <dd className="font-mono text-xs bg-white px-2 py-1 rounded border break-all">
                              {formData.meetingLink}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Check className="text-blue-600 mt-0.5" size={20} />
                        <div>
                          <div className="text-sm font-medium text-blue-900">Redo att publicera!</div>
                          <div className="text-xs text-blue-700 mt-1">
                            När du publicerar kommer eventet att bli synligt för alla användare
                            {formData.sendReminders && ' och automatiska påminnelser kommer att skickas'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={currentStep === 1 ? onClose : handleBack}
              className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
            >
              {currentStep === 1 ? (
                <>
                  <X size={18} />
                  Avbryt
                </>
              ) : (
                <>
                  <ChevronLeft size={18} />
                  Tillbaka
                </>
              )}
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
              >
                Nästa
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={creating}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
              >
                {creating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publicerar...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Publicera event
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EventCreateModal;