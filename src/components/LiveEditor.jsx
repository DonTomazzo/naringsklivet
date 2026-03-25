import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

// --- SVENSK STANDARDKOD ---
const defaultCode = `
/**
 * Välkommen till Tomas Javascript Compiler!
 * Denna kod simulerar en "digital ansökan" till ett spännande projekt.
 * * KÖR KODEN FÖR ATT SE VARFÖR JAG ÄR RÄTT KANDIDAT!
 */

const Ansökan = {
    Namn: "Tomas Mauritzson",
    Ålder: 44,
    Bostadsort: "Dalby (strax utanför Lund)",
    Barn: "2 (8 & 10 år)",
    Hund: "Labrador (3 år)",
    Arbetslivserfarenhet: "15+ år inom försäljning, kundrelationer och projektledning",
    Rubrik: "Systemutvecklare med Affärsfokus",
    
    // Kortfattad presentation
    Intro: "Jag bor i Dalby strax utanför Lund med min hund och mina två barn. När jag inte kodar så gillar jag att vara aktiv i löpspåret eller på cykelbanan.",
    
    // Lista över kärnkompetenser
    Kompetenser: [
        "Affärsfokus: 15+ års erfarenhet av försäljning och kundrelationer.",
        "Struktur: Projektledning (PIMA-certifierad) och leveransansvar.",
        "Utbildning: Diplomerad Affärsekonom & webbutvecklare."
    ],
    
    // Personliga egenskaper
    Värden: ["Aktiv", "Teamplayer", "Driven", "Nyfiken på teknik!"],
    
    Mål: "Att förena min robusta affärsbakgrund med ny teknisk kompetens. Ser fram emot att provjobba!"
};

// --- ANSÖKANSUTGÅNG I CONSOLEN ---
console.log("HEJ! Mitt namn är " + Ansökan.Namn + " och jag är " + Ansökan.Ålder + " år.");
console.log("BOSTADSORT: " + Ansökan.Bostadsort);
console.log("------------------------------------------");
console.log("ROLL: " + Ansökan.Rubrik);
console.log("");
console.log("INTRODUKTION:");
console.log(Ansökan.Intro);
console.log("");

console.log("NYCKELKOMPETENSER:");
// Använder forEach för att skriva ut varje kompetens
Ansökan.Kompetenser.forEach(function(komp) {
    console.log("  - " + komp);
});
console.log("");

console.log("MINA KÄRNVÄRDEN:");
console.log(Ansökan.Värden.join(' | ')); // Skriver ut värden separerade med |
console.log("");

console.log("SLUTSATSER:");
console.log(Ansökan.Mål);
console.log("------------------------------------------");
`;

const LiveEditor = ({ isOpen, onClose }) => {
    // STATE
    const [code, setCode] = useState(defaultCode);
    const [outputHtml, setOutputHtml] = useState('');
    const [consoleOutput, setConsoleOutput] = useState([]);
    const [iframeKey, setIframeKey] = useState(0);

    // Skapar HTML som kör koden i iframe
    const createHtmlContent = (currentCode) => {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                </head>
                <body style="margin:0; background-color: #2D2D2D; color: white; font-family: monospace;">
                    <script>
                        (function() {
                            var originalLog = console.log;
                            var originalError = console.error;
                            
                            console.log = function() {
                                var args = Array.prototype.slice.call(arguments);
                                var message = args.map(function(arg) {
                                    if (typeof arg === 'object') {
                                        try {
                                            return JSON.stringify(arg, null, 2);
                                        } catch(e) {
                                            return String(arg);
                                        }
                                    }
                                    return String(arg);
                                }).join(' ');
                                
                                if (window.parent) {
                                    window.parent.postMessage({
                                        source: 'iframe-console',
                                        message: message
                                    }, '*');
                                }
                                originalLog.apply(console, arguments); 
                            };
                            
                            console.error = function() {
                                var args = Array.prototype.slice.call(arguments);
                                var message = 'Error: ' + args.join(' ');
                                if (window.parent) {
                                    window.parent.postMessage({
                                        source: 'iframe-console',
                                        message: message
                                    }, '*');
                                }
                                originalError.apply(console, arguments);
                            };
                            
                            try {
                                ${currentCode}
                            } catch (error) {
                                console.error(error.message);
                            }
                        })();
                    </script>
                </body>
            </html>
        `;
    };

    const compileAndRun = useCallback((currentCode) => {
        setConsoleOutput([]); // töm konsolen vid ny körning
        const baseHtml = createHtmlContent(currentCode);
        setOutputHtml(baseHtml);
        setIframeKey(prev => prev + 1);
    }, []); // Tom dependency array - functionen är stabil

    // Ladda ner koden som .js
    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tomas-ansokan-code.js';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Tar emot konsolmeddelanden från iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.source === 'iframe-console') {
                setConsoleOutput(prev => [...prev, String(event.data.message)]);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Kör default-koden när komponenten mountas
    useEffect(() => {
        if (isOpen && consoleOutput.length === 0) {
            compileAndRun(defaultCode);
        }
    }, [isOpen, compileAndRun, consoleOutput.length]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black justify-center items-center p-4 backdrop-blur-sm transition-opacity duration-300 bg-opacity-80 flex"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-5xl bg-gray-900 border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
                onClick={e => e.stopPropagation()}
                style={{ height: '90vh' }}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-3 bg-gray-800 border-b border-purple-500/30">
                    <span className="text-xl font-bold text-white">Javascript Compiler </span>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                        aria-label="Stäng redigeraren"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col h-full">
                    {/* Buttons */}
                    <div 
                        className="flex justify-end items-center p-3 bg-gray-800 border-b border-purple-500/30 space-x-4"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={handleDownload}
                            className="flex items-center space-x-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md shadow-blue-500/30 transform hover:scale-[1.02]"
                        >
                            <span>💾 Ladda ner (.js)</span>
                        </button>
                        <button 
                            onClick={() => compileAndRun(code)}
                            className="flex items-center space-x-2 px-6 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors shadow-md shadow-green-500/30 transform hover:scale-[1.02]"
                        >
                            <span>▶ Kör koden...</span>
                        </button>
                    </div>
                    
                    {/* Editor + Output */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                        <textarea
                            className="p-4 bg-gray-800 text-white font-mono text-sm resize-none focus:outline-none border-r border-purple-500/30 placeholder-gray-500 h-full"
                            value={code}
                            onChange={(e) => setCode(e.target.value)} 
                            spellCheck="false"
                            placeholder="// Skriv din JavaScript-kod här. Exempel: console.log(5 + 3);"
                        />
                        <div className="p-4 bg-gray-900 overflow-y-auto h-full">
                            <h4 className="text-gray-400 font-semibold mb-2 border-b border-white/10 pb-1">Console Output:</h4>
                            {consoleOutput.map((line, index) => (
                                <p key={index} className="text-sm text-lime-400 whitespace-pre-wrap font-mono">
                                    {'>'} {line}
                                </p>
                            ))}
                            {consoleOutput.length === 0 && (
                                <p className="text-sm text-gray-500">Klicka på "Kör koden..." för att se resultat...</p>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Hidden iframe */}
                <iframe
                    key={iframeKey}
                    title="Code Runner Sandbox"
                    srcDoc={outputHtml}
                    style={{ display: 'none' }}
                    sandbox="allow-scripts"
                />
            </div>
        </div>
    );
};

export default LiveEditor;