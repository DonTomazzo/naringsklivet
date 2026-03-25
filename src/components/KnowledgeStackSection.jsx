import React from 'react';


const KnowledgeStackSection = () => {
    // Definiera dina tekniker, erfarenhetsår och ikon-URL:er
    const technologies = [
        { name: 'Wordpress / PHP', years: 8, icon: '/wordpress.png', color: 'from-blue-600 to-cyan-500' },
        { name: 'HTML & CSS', years: 5, icon: '/html.png', color: 'from-orange-500 to-red-500' },
        { name: 'JavaScript', years: 3, icon: '/javascript-logo-javascript-icon-transparent-free-png.webp', color: 'from-yellow-400 to-yellow-600' },
        { name: 'C# / .NET', years: 1, icon: '/c-sharp.png', color: 'from-purple-500 to-indigo-600' },
        { name: 'Python', years: 0.5, icon: '/python.png', color: 'from-green-500 to-blue-500' },
    ];

    // Beräkna den maximala erfarenheten för att normalisera progress bars
    const maxYears = Math.max(...technologies.map(t => t.years), 10); // Sätter 10 som max baslinje

    // Certifikat-data (använd din fil: microsoft-azure-fundamentals-official-training-certification.png)
    const certifications = [
        { 
            name: 'Microsoft Azure Fundamentals', 
            issuer: 'Microsoft', 
            icon: '/microsoft-azure-fundamentals-official-training-certification.png' 
        },
        // Lägg till fler certifikat här om du har!
    ];

    return (
        <section id="knowledgestack" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Knowledge Stack & Cloud
                    </h2>
                    <p className="text-xl text-gray-400">Teknisk kompetens och certifieringar</p>
                </div>

                {/* Technical Stack with Progress Bars */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-purple-400 border-b border-purple-900 pb-3">
                Erfarenhet inom Teknikstack
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {technologies.map((tech, idx) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center space-x-4">
                                    <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain" />
                                    <span className="font-semibold text-lg">{tech.name}</span>
                                </div>
                                <span className="text-pink-400 font-bold">{tech.years} År</span>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full bg-gradient-to-r ${tech.color} rounded-full transition-all duration-1000`}
                                    style={{ width: `${(tech.years / maxYears) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-purple-400 border-b border-purple-900 pb-3">
                Certifieringar
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, idx) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center flex flex-col items-center">
                            <img src={cert.icon} alt={cert.name} className="w-24 h-24 object-contain mb-4" />
                            <p className="font-bold text-lg mb-1">{cert.name}</p>
                            <p className="text-sm text-gray-400">{cert.issuer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KnowledgeStackSection;