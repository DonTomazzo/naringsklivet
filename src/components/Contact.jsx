import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
// NYTT: Importera din bakgrundsvideo
import contactBackgroundVideo from '../assets/contact-background.mp4'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    if (!formData.name || !formData.email || !formData.message || !recaptchaToken) {
      setStatus('error');
      return;
    }

    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setRecaptchaToken(null);
    }, 2000); 
  };

  return (
    <section 
      id="contact" 
      className="bg-gray-900 text-white py-16 relative overflow-hidden" // Ändrade klasser
    >
      {/* NYTT: Bakgrundsvideon */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full"
      >
        <source src={contactBackgroundVideo} type="video/mp4" />
        Din webbläsare stöder inte video-taggen.
      </video>
      
      {/* NYTT: Overlay för att göra texten läsbar */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">Kontakta mig</h2>
        <p className="text-center text-lg mb-8">Har du ett projekt i åtanke eller vill du bara säga hej? Fyll i formuläret så hörs vi!</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Namn</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-teal-500 transition-colors duration-300"
              placeholder="Ditt namn"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">E-postadress</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-teal-500 transition-colors duration-300"
              placeholder="din.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Meddelande</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-teal-500 transition-colors duration-300"
              placeholder="Ditt meddelande..."
            ></textarea>
          </div>
          
          <ReCAPTCHA
            sitekey="DIN-RECAPTCHA-SITE-KEY"
            onChange={handleRecaptchaChange}
          />

          <button
            type="submit"
            className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Skickar...' : 'Skicka meddelande'}
          </button>
          
          {status === 'success' && (
            <p className="mt-4 text-center text-green-400">Tack för ditt meddelande! Jag återkommer snart.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-center text-red-400">Vänligen fyll i alla fält och bekräfta att du inte är en robot.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;