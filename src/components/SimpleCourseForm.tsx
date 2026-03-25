// SimpleCourseForm
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Building2, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SimpleFormData {
  contactPerson: string;
  email: string;
  phone: string;
  companyName: string;
}

interface SimpleCourseFormProps {
  className?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function SimpleCourseForm({
  className = '',
  title = "Kom igång med företagsutbildning",
  subtitle = "Fyll i era kontaktuppgifter så kontaktar vi er inom 24 timmar för att diskutera era utbildningsbehov.",
  buttonText = "Fortsätt till fullständigt formulär"
}: SimpleCourseFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SimpleFormData>({
    contactPerson: '',
    email: '',
    phone: '',
    companyName: ''
  });

  const updateFormData = (field: keyof SimpleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFieldValid = (fieldName: keyof SimpleFormData) => {
    return formData[fieldName].trim() !== '';
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleContinue = () => {
    if (!validateForm()) {
      toast.error('Vänligen fyll i alla fält');
      return;
    }

    if (isClient) {
      localStorage.setItem('initialContactData', JSON.stringify(formData));
    }
    
    // Ändra till din route path
    navigate('/course-form');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`max-w-md w-full mx-auto ${className}`}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building2 className="w-4 h-4 inline mr-2 text-[#FF5421]" />
            Företagsnamn *
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => updateFormData('companyName', e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors ${
              isFieldValid('companyName') ? 'text-[#FF5421] border-[#FF5421]' : 'text-gray-900'
            }`}
            placeholder="Ange företagsnamn"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2 text-[#FF5421]" />
            Kontaktperson *
          </label>
          <input
            type="text"
            value={formData.contactPerson}
            onChange={(e) => updateFormData('contactPerson', e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors ${
              isFieldValid('contactPerson') ? 'text-[#FF5421] border-[#FF5421]' : 'text-gray-900'
            }`}
            placeholder="För- och efternamn"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2 text-[#FF5421]" />
            E-postadress *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors ${
              isFieldValid('email') ? 'text-[#FF5421] border-[#FF5421]' : 'text-gray-900'
            }`}
            placeholder="din@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2 text-[#FF5421]" />
            Telefonnummer *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-[#FF5421] transition-colors ${
              isFieldValid('phone') ? 'text-[#FF5421] border-[#FF5421]' : 'text-gray-900'
            }`}
            placeholder="070-123 45 67"
            required
          />
        </div>
      </div>

      <motion.button
        onClick={handleContinue}
        disabled={!validateForm()}
        className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          validateForm()
            ? 'bg-[#FF5421] text-white hover:bg-[#E04A1D] transform hover:scale-105 shadow-lg hover:shadow-xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        whileHover={validateForm() ? { scale: 1.02 } : {}}
        whileTap={validateForm() ? { scale: 0.98 } : {}}
      >
        {buttonText}
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Genom att fortsätta godkänner du att vi kontaktar dig angående våra utbildningstjänster.
      </p>
    </motion.div>
  );
}

// Exempel på hur du använder den på landningssidan
export function SimpleCourseFormExample() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Vänster sida - Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Förenkla kursuppbyggnad från start till mål med{' '}
            <span className="text-yellow-300">våra experter</span>
          </h1>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center mt-1">
                <span className="text-purple-800 font-bold text-sm">✓</span>
              </div>
              <p className="text-lg">Branschledande utbildningsplattform</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center mt-1">
                <span className="text-purple-800 font-bold text-sm">✓</span>
              </div>
              <p className="text-lg">13+ miljoner resurser för professionell företagsutbildning</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center mt-1">
                <span className="text-purple-800 font-bold text-sm">✓</span>
              </div>
              <p className="text-lg">Enkel kontohantering och arbetsflödesintegrationer</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center mt-1">
                <span className="text-purple-800 font-bold text-sm">✓</span>
              </div>
              <p className="text-lg">Flexibla mallar för framtidens arbetskraft</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center mt-1">
                <span className="text-purple-800 font-bold text-sm">✓</span>
              </div>
              <p className="text-lg">Support från e-learning experter</p>
            </div>
          </div>
        </motion.div>

        {/* Höger sida - Formulär */}
        <SimpleCourseForm />
      </div>
    </div>
  );
}