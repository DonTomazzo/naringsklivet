// src/components/ContactFormModal.jsx

import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const ContactFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSubmitMessage(null); // Rensar meddelanden vid ny input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        // --- HÄR SKA DIN LOGIK FÖR ATT SKICKA E-POST LIGGA ---
        // I en riktig applikation skulle du använda:
        // 1. En backend-endpoint (t.ex. en serverlös funktion/Netlify Forms/Formspree/etc.)
        // 2. En fetch/axios anrop för att skicka formData.

        try {
            // SIMULERAR API-ANROP
            await new Promise(resolve => setTimeout(resolve, 2000)); 

            // Simulerar ett lyckat skick
            // const response = await fetch('/your-form-handler-endpoint', { ... });
            // if (response.ok) { ... } else { throw new Error('Failed'); }

            setSubmitMessage({ type: 'success', text: 'Tack! Ditt meddelande har skickats. Jag återkommer snart! 🚀' });
            setFormData({ name: '', email: '', message: '' });

            // Stänger modalen efter en kort fördröjning
            setTimeout(onClose, 3000); 

        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'Ett fel uppstod vid skickande. Försök igen eller mejla direkt.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div 
                className="bg-gray-900 border border-purple-500/50 rounded-2xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 scale-100"
                onClick={e => e.stopPropagation()} // Hindrar stängning när man klickar i modalen
            >
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Kontakta mig
                        </h3>
                        <button 
                            onClick={onClose} 
                            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                            aria-label="Stäng formuläret"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Namn</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-post</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Meddelande</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                                disabled={isSubmitting}
                            ></textarea>
                        </div>

                        {submitMessage && (
                            <div className={`p-3 rounded-lg text-sm font-medium ${
                                submitMessage.type === 'success' ? 'bg-green-600/30 text-green-300' : 'bg-red-600/30 text-red-300'
                            }`}>
                                {submitMessage.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
                                    <span>Skickar...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>Skicka meddelande</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactFormModal;