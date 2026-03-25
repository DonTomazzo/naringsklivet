//CourseContactForm
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  MapPin,
  Briefcase,
  Target,
  Clock
} from 'lucide-react';
import { toast } from 'react-toastify';

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  employees: string;
  courseType: string;
  preferredDate: string;
  location: string;
  budget: string;
  goals: string;
  message: string;
}

interface CourseContactFormProps {
  onSubmit?: (data: FormData) => void;
  className?: string;
}

const courseTypes = [
  { id: 'leadership', name: 'Ledarskapsutbildning', duration: '2-3 dagar' },
  { id: 'sales', name: 'Säljutbildning', duration: '1-2 dagar' },
  { id: 'communication', name: 'Kommunikation', duration: '1 dag' },
  { id: 'teambuilding', name: 'Teambuilding', duration: '1-2 dagar' },
  { id: 'digital', name: 'Digital transformation', duration: '3-5 dagar' },
  { id: 'custom', name: 'Anpassad kurs', duration: 'Flexibel' }
];

const budgetRanges = [
  '< 50 000 kr',
  '50 000 - 100 000 kr',
  '100 000 - 250 000 kr',
  '250 000 - 500 000 kr',
  '> 500 000 kr'
];

const employeeRanges = [
  'Det är bara jag',
  '2 styrelseledamoter',
  '3 styrelseledamoter',
  '4 styrelseledamoter',
  '5 styrelseledamoter',
  '6 styrelseledamoter',
  '7 styrelseledamoter',
  '8 styrelseledamoter',
  '9 styrelseledamoter',
];

export default function CourseContactForm({ onSubmit, className = '' }: CourseContactFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    employees: '',
    courseType: '',
    preferredDate: '',
    location: '',
    budget: '',
    goals: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(new Set());
  const formRef = useRef<HTMLDivElement>(null);

  // Ladda data från localStorage om det finns
  useEffect(() => {
    const savedData = localStorage.getItem('initialContactData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          companyName: parsed.companyName || '',
          contactPerson: parsed.contactPerson || '',
          email: parsed.email || '',
          phone: parsed.phone || ''
        }));
        // Rensa efter att ha läst
        localStorage.removeItem('initialContactData');
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  const steps = [
    {
      title: 'Information om er förening',
      description: 'Vi behöver dessa uppgifter för att skapa konton till samtliga styrelsemedlemmar',
      icon: Building2,
      fields: ['companyName', 'contactPerson', 'email', 'phone', 'employees']
    },
    {
      title: 'Kursdetaljer',
      description: 'Vilken typ av utbildning behöver ni?',
      icon: Target,
      fields: ['courseType', 'preferredDate', 'location', 'budget']
    },
    {
      title: 'Mål & Önskemål',
      description: 'Vad vill ni uppnå?',
      icon: CheckCircle,
      fields: ['goals', 'message']
    }
  ];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFieldValid = (field: keyof FormData) => {
    const value = formData[field].trim();
    
    // Validera olika fälttyper
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case 'phone':
        const phoneRegex = /^[\d\s\-+()]{8,}$/;
        return phoneRegex.test(value);
      default:
        return value !== '';
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouchedFields(prev => new Set(prev).add(field));
  };

  const showValidation = (field: keyof FormData) => {
    return touchedFields.has(field) && isFieldValid(field);
  };

  const validateStep = (step: number) => {
    const requiredFields = steps[step].fields;
    const currentStepData = Object.entries(formData)
      .filter(([key]) => requiredFields.includes(key))
      .map(([, value]) => value);
    
    return currentStepData.every(value => value.trim() !== '');
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } else {
      toast.error('Vänligen fyll i alla obligatoriska fält');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error('Vänligen fyll i alla obligatoriska fält');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulera API-anrop
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setIsSubmitted(true);
      toast.success('Tack! Vi kontaktar er inom 24 timmar.');
    } catch (error) {
      toast.error('Något gick fel. Vänligen försök igen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl ${className}`}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-[#FF5421] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tack för er förfrågan!</h2>
          <p className="text-gray-600 mb-8">
            Vi har mottagit er förfrågan om <strong>{courseTypes.find(c => c.id === formData.courseType)?.name}</strong> för <strong>{formData.companyName}</strong>.
            En av våra kursexperter kommer att kontakta er inom 24 timmar.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
              setFormData({
                companyName: '',
                contactPerson: '',
                email: '',
                phone: '',
                employees: '',
                courseType: '',
                preferredDate: '',
                location: '',
                budget: '',
                goals: '',
                message: ''
              });
            }}
            className="bg-[#FF5421] text-white px-6 py-3 rounded-lg hover:bg-[#E04A1D] transition-colors"
          >
            Skicka ny förfrågan
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`} ref={formRef}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Beställ Styrelsekörkortet</h2>
            <span className="text-sm text-gray-600">
              Steg {currentStep + 1} av {steps.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-[#FF5421] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="flex justify-between mt-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const stepFields = step.fields as (keyof FormData)[];
              const completedFields = stepFields.filter(f => isFieldValid(f)).length;
              const totalFields = stepFields.length;
              const isStepComplete = completedFields === totalFields;
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 relative ${
                      isStepComplete
                        ? 'bg-green-500 text-white' 
                        : index <= currentStep 
                        ? 'bg-[#FF5421] text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                    animate={{
                      scale: index === currentStep ? 1.1 : 1,
                    }}
                  >
                    {isStepComplete ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                    {index === currentStep && !isStepComplete && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#FF5421]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <span className={`text-xs text-center ${
                    isStepComplete ? 'text-green-500 font-bold' :
                    index <= currentStep ? 'text-[#FF5421] font-medium' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index === currentStep && (
                    <span className="text-xs text-gray-500 mt-1">
                      {completedFields}/{totalFields} ifyllt
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-gray-600">{steps[currentStep].description}</p>
              </div>

              {/* Step 1: Company Information */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Föreningens namn */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building2 className="w-4 h-4 inline mr-2" />
                        Föreningens namn *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => updateFormData('companyName', e.target.value)}
                          onBlur={() => handleBlur('companyName')}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 ${
                            showValidation('companyName')
                              ? 'border-[#FF5421] bg-orange-50 text-[#FF5421] font-medium'
                              : 'border-gray-300 focus:border-[#FF5421]'
                          } focus:ring-2 focus:ring-[#FF5421]/20 focus:outline-none`}
                          placeholder="Ange vilken förening ni representerar"
                          required
                        />
                        {showValidation('companyName') && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <div className="relative">
                              <CheckCircle className="w-6 h-6 text-[#FF5421] fill-current" />
                              <motion.div
                                className="absolute inset-0 rounded-full bg-[#FF5421]"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Kontaktperson */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Kontaktperson *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.contactPerson}
                          onChange={(e) => updateFormData('contactPerson', e.target.value)}
                          onBlur={() => handleBlur('contactPerson')}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 ${
                            showValidation('contactPerson')
                              ? 'border-[#FF5421] bg-orange-50 text-[#FF5421] font-medium'
                              : 'border-gray-300 focus:border-[#FF5421]'
                          } focus:ring-2 focus:ring-[#FF5421]/20 focus:outline-none`}
                          placeholder="Ditt för- och efternamn"
                          required
                        />
                        {showValidation('contactPerson') && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle className="w-6 h-6 text-[#FF5421] fill-current" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email med förbättrad validering */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        E-postadress *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 ${
                            touchedFields.has('email') && !isFieldValid('email')
                              ? 'border-red-300 bg-red-50'
                              : showValidation('email')
                              ? 'border-[#FF5421] bg-orange-50 text-[#FF5421] font-medium'
                              : 'border-gray-300 focus:border-[#FF5421]'
                          } focus:ring-2 focus:ring-[#FF5421]/20 focus:outline-none`}
                          placeholder="din@email.com"
                          required
                        />
                        {showValidation('email') && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle className="w-6 h-6 text-[#FF5421] fill-current" />
                          </motion.div>
                        )}
                        {touchedFields.has('email') && !isFieldValid('email') && formData.email && (
                          <p className="text-xs text-red-500 mt-1">Ange en giltig e-postadress</p>
                        )}
                      </div>
                    </div>

                    {/* Telefon */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefonnummer *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 ${
                            showValidation('phone')
                              ? 'border-[#FF5421] bg-orange-50 text-[#FF5421] font-medium'
                              : 'border-gray-300 focus:border-[#FF5421]'
                          } focus:ring-2 focus:ring-[#FF5421]/20 focus:outline-none`}
                          placeholder="070-123 45 67"
                          required
                        />
                        {showValidation('phone') && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle className="w-6 h-6 text-[#FF5421] fill-current" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Antal kursdeltagare */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Antal kursdeltagare ni vill anmäla *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.employees}
                        onChange={(e) => {
                          updateFormData('employees', e.target.value);
                          handleBlur('employees');
                        }}
                        className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 appearance-none ${
                          showValidation('employees')
                            ? 'border-[#FF5421] bg-orange-50 text-[#FF5421] font-medium'
                            : 'border-gray-300 focus:border-[#FF5421]'
                        } focus:ring-2 focus:ring-[#FF5421]/20 focus:outline-none`}
                        required
                      >
                        <option value="">Hur många konton ska läggas upp</option>
                        {employeeRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      {showValidation('employees') && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="absolute right-10 top-1/2 -translate-y-1/2"
                        >
                          <CheckCircle className="w-6 h-6 text-[#FF5421] fill-current" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Course Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Target className="w-4 h-4 inline mr-2" />
                      Typ av utbildning *
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {courseTypes.map((course) => (
                        <motion.label
                          key={course.id}
                          className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.courseType === course.id
                              ? 'border-[#FF5421] bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="courseType"
                            value={course.id}
                            checked={formData.courseType === course.id}
                            onChange={(e) => updateFormData('courseType', e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{course.name}</div>
                            <div className="text-sm text-gray-500">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {course.duration}
                            </div>
                          </div>
                          {formData.courseType === course.id && (
                            <CheckCircle className="w-5 h-5 text-[#FF5421]" />
                          )}
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Önskad startdatum *
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => updateFormData('preferredDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Plats för utbildning *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => updateFormData('location', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors"
                        placeholder="Hos er eller våra lokaler"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Budget *
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => updateFormData('budget', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors"
                      required
                    >
                      <option value="">Välj budgetram</option>
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Goals & Message */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Target className="w-4 h-4 inline mr-2" />
                      Vad vill ni uppnå med utbildningen? *
                    </label>
                    <textarea
                      value={formData.goals}
                      onChange={(e) => updateFormData('goals', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors resize-none"
                      placeholder="Beskriv era mål och förväntningar..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Övrig information
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors resize-none"
                      placeholder="Ytterligare information eller önskemål..."
                    />
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Sammanfattning av er förfrågan:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Företag:</strong> {formData.companyName}</p>
                      <p><strong>Kurs:</strong> {courseTypes.find(c => c.id === formData.courseType)?.name}</p>
                      <p><strong>Anställda:</strong> {formData.employees}</p>
                      <p><strong>Budget:</strong> {formData.budget}</p>
                      <p><strong>Önskad start:</strong> {formData.preferredDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tillbaka
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-[#FF5421] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E04A1D] transition-all"
              >
                Nästa
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-[#FF5421] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#E04A1D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Skickar...
                  </>
                ) : (
                  <>
                    Skicka förfrågan
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}