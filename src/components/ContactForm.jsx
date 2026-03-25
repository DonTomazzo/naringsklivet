import { useState } from "react";
import { Mail, User, Building2, MessageSquare, Send, CheckCircle } from "lucide-react";
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // --- Här lägger du in din riktiga Ajax-call: ---
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });

    // Simulera API-anrop
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);

    // Reset efter 3 sekunder
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/30 relative overflow-hidden mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-64 text-center">
          <div className="bg-green-500/20 rounded-full p-4 mb-4">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Tack för ditt meddelande!</h3>
          <p className="text-gray-300">Vi återkommer så snart som möjligt.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // GLASSMORPHISM KLASSER:
      className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/30 relative overflow-hidden mx-auto"
    >
      {/* Animated background gradient (behövs inte med blur, men behålls för glow) */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5"></div>
      
      {/* Glow effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF5421] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#FF7851] rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Kom igång idag</h3>
          <p className="text-gray-300 text-sm">Fyll i formuläret så hör vi av oss inom 24h</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Namn *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                // INPUT ÄNDRINGAR FÖR GLASS
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
                placeholder="Ditt namn"
              />
            </div>
          </div>

          {/* Email field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              E-post *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                // INPUT ÄNDRINGAR FÖR GLASS
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
                placeholder="din@email.com"
              />
            </div>
          </div>

          {/* Company field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Företag
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                // INPUT ÄNDRINGAR FÖR GLASS
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
                placeholder="Ditt företag (valfritt)"
              />
            </div>
          </div>

          {/* Message field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Meddelande *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                // TEXTAREA ÄNDRINGAR FÖR GLASS
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all resize-none"
                placeholder="Berätta lite om dina behov..."
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Skickar...
              </>
            ) : (
              <>
                Skicka meddelande
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Genom att skicka formuläret godkänner du våra villkor
        </p>
      </div>
    </motion.div>
  );
}