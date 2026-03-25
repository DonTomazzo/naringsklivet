import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  X, Building2, Mail, Phone, Image, BookOpen,
  Check, ChevronRight, ChevronLeft, Users, Key
} from 'lucide-react';

function TeamCreateModal({ onClose, onCreate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contactEmail: '',
    contactPhone: '',
    logoUrl: '',
    description: '',
    accessCode: '',
    maxMembers: 50,
    assignedCourses: [],
    status: 'active'
  });
  const [errors, setErrors] = useState({});
  const [creating, setCreating] = useState(false);

  // Available courses (skulle komma från context i verkligheten)
  const availableCourses = [
    { id: 'course-1', title: 'Diskriminering', category: 'Compliance' },
    { id: 'course-2', title: 'Föreningens intressenter', category: 'Organisation' },
    { id: 'course-3', title: 'Arbetsmiljö', category: 'Säkerhet' },
    { id: 'course-4', title: 'GDPR Grundkurs', category: 'Compliance' },
    { id: 'course-5', title: 'Ledarskap', category: 'Personal' }
  ];

  const steps = [
    { number: 1, title: 'Grundinfo', icon: Building2 },
    { number: 2, title: 'Kontakt', icon: Mail },
    { number: 3, title: 'Kurser', icon: BookOpen },
    { number: 4, title: 'Granska', icon: Check }
  ];

  const generateAccessCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, accessCode: code }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const toggleCourse = (courseId) => {
    setFormData(prev => ({
      ...prev,
      assignedCourses: prev.assignedCourses.includes(courseId)
        ? prev.assignedCourses.filter(id => id !== courseId)
        : [...prev.assignedCourses, courseId]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Teamnamn krävs';
      if (!formData.company.trim()) newErrors.company = 'Företagsnamn krävs';
    }

    if (step === 2) {
      if (!formData.contactEmail.trim()) {
        newErrors.contactEmail = 'Kontaktemail krävs';
      } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        newErrors.contactEmail = 'Ogiltig email-adress';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2 && !formData.accessCode) {
        generateAccessCode();
      }
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
        id: `team-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString()
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
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Skapa nytt team</h2>
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
                        ? 'bg-white text-orange-600'
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
                    <p className="text-slate-600 mb-6">Fyll i information om det nya teamet</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Teamnamn *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="t.ex. Stockholm Syd"
                      autoFocus
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Företagsnamn *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.company ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="t.ex. Acme AB"
                    />
                    {errors.company && <p className="text-sm text-red-600 mt-1">{errors.company}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Beskrivning
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Beskriv teamet..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Max antal medlemmar
                    </label>
                    <input
                      type="number"
                      value={formData.maxMembers}
                      onChange={(e) => handleChange('maxMembers', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Info */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Kontaktinformation</h3>
                    <p className="text-slate-600 mb-6">Lägg till kontaktuppgifter och logotyp</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Kontaktemail *
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleChange('contactEmail', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="contact@company.com"
                    />
                    {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleChange('contactPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+46 8 123 456 78"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Image size={16} className="inline mr-1" />
                      Logotyp URL (valfritt)
                    </label>
                    <input
                      type="url"
                      value={formData.logoUrl}
                      onChange={(e) => handleChange('logoUrl', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                    {formData.logoUrl && (
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-slate-600 mb-2">Förhandsgranskning:</p>
                        <img
                          src={formData.logoUrl}
                          alt="Logo preview"
                          className="h-16 object-contain"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Key className="text-blue-600 mt-0.5" size={20} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-900 mb-1">
                          Åtkomstkod
                        </div>
                        <p className="text-xs text-blue-700 mb-3">
                          En unik kod genereras automatiskt för detta team. Team leader delar denna kod med medlemmar.
                        </p>
                        {formData.accessCode && (
                          <code className="px-3 py-2 bg-white border border-blue-300 rounded text-lg font-mono font-bold text-blue-900">
                            {formData.accessCode}
                          </code>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Courses */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Tilldela kurser</h3>
                    <p className="text-slate-600 mb-6">Välj vilka kurser teamet ska ha tillgång till</p>
                  </div>

                  <div className="space-y-2">
                    {availableCourses.map(course => (
                      <label
                        key={course.id}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.assignedCourses.includes(course.id)
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.assignedCourses.includes(course.id)}
                          onChange={() => toggleCourse(course.id)}
                          className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{course.title}</div>
                          <div className="text-sm text-slate-600">{course.category}</div>
                        </div>
                        {formData.assignedCourses.includes(course.id) && (
                          <Check className="text-orange-600" size={20} />
                        )}
                      </label>
                    ))}
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-sm text-slate-700">
                      <strong>{formData.assignedCourses.length}</strong> kurser valda
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Du kan alltid lägga till eller ta bort kurser senare
                    </p>
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
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Granska och skapa</h3>
                    <p className="text-slate-600 mb-6">Kontrollera att allt ser bra ut innan du skapar teamet</p>
                  </div>

                  {/* Summary */}
                  <div className="space-y-4">
                    {/* Team Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Building2 size={18} />
                        Teaminformation
                      </h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Teamnamn:</dt>
                          <dd className="font-semibold text-slate-900">{formData.name}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Företag:</dt>
                          <dd className="font-semibold text-slate-900">{formData.company}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Max medlemmar:</dt>
                          <dd className="font-semibold text-slate-900">{formData.maxMembers}</dd>
                        </div>
                        {formData.description && (
                          <div>
                            <dt className="text-slate-600 mb-1">Beskrivning:</dt>
                            <dd className="text-slate-900">{formData.description}</dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Mail size={18} />
                        Kontakt
                      </h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-slate-600">Email:</dt>
                          <dd className="font-semibold text-slate-900">{formData.contactEmail}</dd>
                        </div>
                        {formData.contactPhone && (
                          <div className="flex justify-between">
                            <dt className="text-slate-600">Telefon:</dt>
                            <dd className="font-semibold text-slate-900">{formData.contactPhone}</dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Access Code */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                        <Key size={18} />
                        Åtkomstkod
                      </h4>
                      <code className="inline-block px-4 py-2 bg-white border border-orange-300 rounded-lg text-xl font-mono font-bold text-orange-900">
                        {formData.accessCode}
                      </code>
                      <p className="text-xs text-orange-800 mt-2">
                        Denna kod används av team leader för att bjuda in medlemmar
                      </p>
                    </div>

                    {/* Courses */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <BookOpen size={18} />
                        Kurser ({formData.assignedCourses.length})
                      </h4>
                      {formData.assignedCourses.length > 0 ? (
                        <ul className="space-y-1 text-sm">
                          {formData.assignedCourses.map(courseId => {
                            const course = availableCourses.find(c => c.id === courseId);
                            return (
                              <li key={courseId} className="flex items-center gap-2 text-slate-700">
                                <Check size={14} className="text-green-600" />
                                {course?.title}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-600">Inga kurser tilldelade ännu</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Check className="text-green-600 mt-0.5" size={20} />
                      <div>
                        <div className="text-sm font-medium text-green-900">Redo att skapa!</div>
                        <div className="text-xs text-green-700 mt-1">
                          När du klickar på "Skapa team" kommer teamet att aktiveras direkt
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
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center gap-2"
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
                    Skapar team...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Skapa team
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

export default TeamCreateModal;