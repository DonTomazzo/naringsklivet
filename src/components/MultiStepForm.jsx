import { useState, useEffect } from 'react';
import { Building2, User, Mail, Phone, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

// STEG 1: Enkelt formulär för startsidan (Hero)
export function SimpleContactForm({ onContinue }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = () => {
    return Object.values(formData).every(val => val.trim() !== '');
  };

  const handleContinue = () => {
    if (!isValid()) {
      alert('Vänligen fyll i alla fält');
      return;
    }
    
    // Spara i localStorage och gå vidare
    localStorage.setItem('contactFormStep1', JSON.stringify(formData));
    
    if (onContinue) {
      onContinue(formData);
    }
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5 animate-pulse"></div>
      
      {/* Glow effects */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF5421] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#FF7851] rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Kom igång med Learnd</h3>
          <p className="text-gray-400 text-sm">Fyll i era kontaktuppgifter så kontaktar vi er inom 24 timmar</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Building2 className="w-4 h-4 inline mr-2 text-[#FF5421]" />
              Företagsnamn *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => updateField('company', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
              placeholder="Ditt företag"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2 text-[#FF5421]" />
              Kontaktperson *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
              placeholder="Ditt namn"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2 text-[#FF5421]" />
              E-post *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
              placeholder="din@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone className="w-4 h-4 inline mr-2 text-[#FF5421]" />
              Telefon *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
              placeholder="070-123 45 67"
            />
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!isValid()}
          className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isValid()
              ? 'bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-[1.02]'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Fortsätt till fullständigt formulär
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Genom att fortsätta godkänner du våra villkor
        </p>
      </div>
    </div>
  );
}

// STEG 2: Komplett formulär (egen sida)
export function CompleteContactForm() {
  const [step1Data, setStep1Data] = useState(null);
  const [formData, setFormData] = useState({
    website: '',
    companySize: '',
    currentSolution: '',
    painPoints: [],
    urgency: 'medium',
    preferredContactTime: '',
    message: '',
    gdprConsent: false,
    marketingConsent: false,
    newsletterConsent: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Hämta data från steg 1
    const savedData = localStorage.getItem('contactFormStep1');
    if (savedData) {
      setStep1Data(JSON.parse(savedData));
    }
  }, []);

  const COMPANY_SIZES = [
    '1-10 anställda',
    '11-50 anställda',
    '51-200 anställda',
    '201-500 anställda',
    '500+ anställda'
  ];

  const PAIN_POINTS = [
    'Höga IT-kostnader',
    'Säkerhetsproblem',
    'Långsam prestanda',
    'Svårighet att skala',
    'Bristande support',
    'Gamla system'
  ];

  const URGENCY_LEVELS = [
    { value: 'low', label: 'Utforskande - inget brådskande' },
    { value: 'medium', label: 'Planerar inom 3-6 månader' },
    { value: 'high', label: 'Behöver lösning inom 1-3 månader' },
    { value: 'urgent', label: 'Akut behov - inom 30 dagar' }
  ];

  const CONTACT_TIMES = [
    'Vardagar 8-17',
    'Vardagar 17-20',
    'Helger',
    'Flexibel tid'
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePainPoint = (point) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter(p => p !== point)
        : [...prev.painPoints, point]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.gdprConsent) {
      setError('Du måste acceptera behandling av personuppgifter');
      return;
    }

    setLoading(true);
    setError('');

    // Kombinera all data
    const completeData = {
      ...step1Data,
      ...formData,
      submittedAt: new Date().toISOString()
    };

    try {
      // Simulera API-anrop - ersätt med din endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Här gör du ditt riktiga API-anrop:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(completeData)
      // });

      console.log('Submitted data:', completeData);
      
      setSubmitted(true);
      localStorage.removeItem('contactFormStep1');
    } catch (err) {
      setError('Ett fel uppstod. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 shadow-2xl border border-gray-700 text-center">
          <div className="bg-green-500/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Tack för din förfrågan!</h2>
          <p className="text-gray-400 text-lg mb-8">
            Vi har tagit emot dina uppgifter och återkommer inom 24 timmar för att diskutera hur vi kan hjälpa er.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-orange-500/50 transition-all"
          >
            Tillbaka till startsidan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <span className="ml-2 text-gray-400">Grunduppgifter</span>
            </div>
            <div className="w-24 h-1 bg-[#FF5421]"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FF5421] flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="ml-2 text-white font-semibold">Ytterligare info</span>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF5421] to-[#FF7851] p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Berätta mer om era behov</h2>
            <p className="text-orange-100">
              Vi behöver lite mer information för att kunna ge er bästa möjliga rådgivning
            </p>
          </div>

          {/* Form content */}
          <div className="p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300">{error}</span>
              </div>
            )}

            {/* Företagsinformation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hemsida
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5421]"
                  placeholder="https://dittforetag.se"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Företagsstorlek
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => updateField('companySize', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF5421]"
                >
                  <option value="">Välj storlek</option>
                  {COMPANY_SIZES.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Nuvarande lösning */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Vad använder ni idag?
              </label>
              <textarea
                value={formData.currentSolution}
                onChange={(e) => updateField('currentSolution', e.target.value)}
                rows={3}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5421] resize-none"
                placeholder="Beskriv era nuvarande lösningar..."
              />
            </div>

            {/* Utmaningar */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Vilka utmaningar har ni?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PAIN_POINTS.map(point => (
                  <label key={point} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.painPoints.includes(point)}
                      onChange={() => togglePainPoint(point)}
                      className="rounded border-gray-600 bg-gray-800 text-[#FF5421] focus:ring-[#FF5421]"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {point}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Angelägenhet och kontakt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hur angeläget är ert behov?
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => updateField('urgency', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF5421]"
                >
                  {URGENCY_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  När passar det bäst att kontakta er?
                </label>
                <select
                  value={formData.preferredContactTime}
                  onChange={(e) => updateField('preferredContactTime', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF5421]"
                >
                  <option value="">Välj tid</option>
                  {CONTACT_TIMES.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Meddelande */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ytterligare information
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                rows={4}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5421] resize-none"
                placeholder="Berätta mer om era behov..."
              />
            </div>

            {/* Samtycken */}
            <div className="space-y-4 bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  checked={formData.gdprConsent}
                  onChange={(e) => updateField('gdprConsent', e.target.checked)}
                  className="mt-1 rounded border-gray-600 bg-gray-800 text-[#FF5421] focus:ring-[#FF5421]"
                />
                <label htmlFor="gdpr" className="text-sm text-gray-300">
                  Jag godkänner att mina personuppgifter behandlas enligt integritetspolicyn *
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={formData.marketingConsent}
                  onChange={(e) => updateField('marketingConsent', e.target.checked)}
                  className="mt-1 rounded border-gray-600 bg-gray-800 text-[#FF5421] focus:ring-[#FF5421]"
                />
                <label htmlFor="marketing" className="text-sm text-gray-300">
                  Jag vill få information om relevanta produkter och tjänster
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletterConsent}
                  onChange={(e) => updateField('newsletterConsent', e.target.checked)}
                  className="mt-1 rounded border-gray-600 bg-gray-800 text-[#FF5421] focus:ring-[#FF5421]"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-300">
                  Jag vill prenumerera på nyhetsbrev med tips och insikter
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Tillbaka
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading || !formData.gdprConsent}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  loading || !formData.gdprConsent
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white hover:shadow-xl hover:shadow-orange-500/50'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Skickar...
                  </>
                ) : (
                  <>
                    Skicka förfrågan
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo för att visa båda stegen
export default function MultiStepFormDemo() {
  const [showStep2, setShowStep2] = useState(false);

  if (showStep2) {
    return <CompleteContactForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Vänster sida - Information */}
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Gör lärandet roligt med{' '}
            <span className="text-[#FF5421]">Learnd</span>
          </h1>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#FF5421] rounded-full flex items-center justify-center mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <p className="text-lg text-gray-300">Tusentals gratis quiz för alla ämnen</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#FF5421] rounded-full flex items-center justify-center mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <p className="text-lg text-gray-300">Perfekt för onboarding och utbildning</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#FF5421] rounded-full flex items-center justify-center mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <p className="text-lg text-gray-300">Enkelt att komma igång - helt gratis</p>
            </div>
          </div>
        </div>

        {/* Höger sida - Formulär */}
        <SimpleContactForm onContinue={() => setShowStep2(true)} />
      </div>
    </div>
  );
}