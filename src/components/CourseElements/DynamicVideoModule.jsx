import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Film, CheckCircle } from 'lucide-react';

// ============================================
// 1. ⚙️ H J Ä L P F U N K T I O N E R
// ============================================

/**
 * Extraherar YouTube Video ID från en URL.
 * Stöder format: watch?v=ID, youtu.be/ID, embed/ID
 */
const getYouTubeEmbedUrl = (url) => {
    let videoId = '';
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|\?v=|v\/)|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
        videoId = match[1];
    }
    
    if (videoId) {
        // Returnera den säkra embed-URL:en
        return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    
    return null;
};


// ============================================
// 2. 📺 E M B E D - H J Ä L P K O M P O N E N T
// ============================================

/**
 * Renderar video-spelaren baserat på URL-typ.
 */
const VideoEmbedPlayer = ({ url, title }) => {
    const embedUrl = getYouTubeEmbedUrl(url);

    // YouTube inbäddning
    if (embedUrl) {
        return (
            <div className="relative pt-[56.25%] bg-black rounded-lg shadow-xl overflow-hidden">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={embedUrl}
                    title={title || "YouTube video player"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }
    
    // Generisk video (t.ex. .mp4)
    // OBS! AutoPlay är ofta blockerat utan interaktion
    return (
        <video 
            controls 
            src={url} 
            title={title} 
            className="w-full h-auto rounded-lg shadow-xl"
            poster="" // Lägg till en poster-bild om du vill
        >
            Din webbläsare stöder inte HTML5-video.
        </video>
    );
};


// ============================================
// 3. 📦 H U V U D K O M P O N E N T
// ============================================

// Exempeldata för hur komponenten ska användas (används som fallback)
const DEFAULT_VIDEO_DATA = {
    SECTION_ID: 'video-intro-ai',
    SECTION_TITLE: 'Introduktion till Maskininlärning',
    VIDEO_URL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    POINTS: 75,
    ICON: Youtube,
    DESCRIPTION: 'Denna korta video förklarar grunderna i hur en AI tränas. Var uppmärksam på skillnaden mellan övervakad och oövervakad inlärning.',
    REFLECTION_QUESTION: "Vad anser du är det viktigaste begreppet från videon, och varför?",
    BUTTON_COLOR: "bg-orange-600",
};


const DynamicVideoModule = ({ 
    SECTION_ID,
    SECTION_TITLE,
    VIDEO_URL,
    POINTS,
    ICON: Icon = Film,
    DESCRIPTION,
    REFLECTION_QUESTION,
    BUTTON_COLOR = "bg-slate-900",
    isCompleted, 
    onComplete 
}) => {
    const [isReflectionCompleted, setIsReflectionCompleted] = useState(false);
    const [reflectionText, setReflectionText] = useState('');
    
    // Hantera vad som visas i rubriken
    const DisplayIcon = useMemo(() => getYouTubeEmbedUrl(VIDEO_URL) ? Youtube : Icon, [VIDEO_URL, Icon]);

    const handleComplete = () => {
        // Enkel validering (att fältet inte är tomt)
        if (REFLECTION_QUESTION && reflectionText.trim().length < 10) {
            alert('Vänligen skriv minst 10 tecken i din reflektion innan du slutför.');
            return;
        }
        
        // Här kan du skicka in reflektionstexten till din backend om du vill
        onComplete(SECTION_ID, { reflection: reflectionText });
    };

    return (
        <section data-section={SECTION_ID} className="py-12 bg-gray-50 rounded-xl shadow-xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-4xl mx-auto px-6"
            >
                {/* Rubrik */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">
                        <DisplayIcon className="inline-block w-10 h-10 text-[#FF5421] mr-3" />
                        {SECTION_TITLE}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">{DESCRIPTION}</p>
                </div>

                {/* Video Embed */}
                <div className="mb-8">
                    <VideoEmbedPlayer url={VIDEO_URL} title={SECTION_TITLE} />
                </div>

                {/* Reflektion och Slutförande */}
                <div className="bg-white p-6 md:p-8 border-t-4 border-slate-200 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-slate-700 mb-4">
                        <span className="text-[#FF5421] mr-2">1.</span> {REFLECTION_QUESTION}
                    </h3>
                    
                    <textarea
                        className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-shadow resize-y min-h-[120px]"
                        placeholder="Skriv din reflektion här..."
                        value={reflectionText}
                        onChange={(e) => {
                            setReflectionText(e.target.value);
                            // Sätter isReflectionCompleted när texten är tillräckligt lång
                            setIsReflectionCompleted(e.target.value.trim().length >= 10);
                        }}
                        disabled={isCompleted}
                    />

                    {!isCompleted && (
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleComplete}
                            disabled={!isReflectionCompleted}
                            className={`mt-6 mx-auto block ${isReflectionCompleted ? BUTTON_COLOR : 'bg-slate-400 cursor-not-allowed'} text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg transition-all`}
                        >
                            <CheckCircle className="w-5 h-5" />
                            <span>Slutför Video-Modul ({POINTS > 0 ? `+${POINTS}p` : 'Klar'})</span>
                        </motion.button>
                    )}

                    {isCompleted && (
                        <div className="mt-4 text-center text-green-600 font-semibold flex items-center justify-center space-x-2">
                            <CheckCircle className="w-6 h-6" />
                            <span>Modulen är slutförd och {POINTS} poäng tilldelades!</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

// Export-funktion som använder defaultvärden (för enkel inbäddning)
export default ({ isCompleted, onComplete }) => (
    <DynamicVideoModule 
        {...DEFAULT_VIDEO_DATA} 
        isCompleted={isCompleted} 
        onComplete={onComplete} 
    />
);