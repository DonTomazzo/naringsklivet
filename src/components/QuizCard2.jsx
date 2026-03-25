import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Play, X } from 'lucide-react'; // CheckCircle behövs inte i QuizCard2
import { Link } from 'react-router-dom';
// DownloadCourseMaterialButton behövs inte direkt i kortet, bara i modalen
// import DownloadCourseMaterialButton from './DownloadCourseMaterialButton'; 

// === Helper-funktioner (kan flyttas till en gemensam fil om de används av fler) ===
const getFirstVideoUrl = (quiz) => {
    return quiz.questions?.find(q => q.question_type === "videolesson")?.video_url || null;
};

const StarRating = ({ rating, size = "default" }) => {
    const starSize = size === "small" ? "text-sm" : "text-lg";
    const textSize = size === "small" ? "text-xs" : "text-sm";
    
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="relative">
                    {star <= Math.floor(rating) ? (
                        <span className={`text-amber-400 ${starSize}`}>★</span>
                    ) : star - 0.5 <= rating ? (
                        <span className="relative inline-block">
                            <span className={`text-slate-300 ${starSize}`}>★</span>
                            <span className={`absolute inset-0 overflow-hidden w-1/2 text-amber-400 ${starSize}`}>★</span>
                        </span>
                    ) : (
                        <span className={`text-slate-300 ${starSize}`}>★</span>
                    )}
                </span>
            ))}
            <span className={`ml-1 font-semibold text-amber-400 ${textSize}`}>{rating.toFixed(1)}</span>
        </div>
    );
};
// ===================================================================================


// === Kategorifärger och ikoner (bör vara samma som i QuizCard.js) ===
const categoryColors = {
    AI: 'from-sky-500 to-sky-600',
    GITHUB: 'from-slate-700 to-slate-800',
    HTML: 'from-orange-500 to-orange-600',
    JAVASCRIPT: 'from-amber-500 to-amber-600',
    CSS: 'from-sky-400 to-sky-500',
    REACT: 'from-cyan-500 to-cyan-600',
    CSHARP: 'from-indigo-600 to-indigo-700',
    PYTHON: 'from-emerald-500 to-emerald-600',
    AZURE: 'from-blue-500 to-blue-600',
    ALLA: 'from-[#FF5421] to-[#E04619]'
};

const categoryIcons = {
    AI: '💻',
    GITHUB: '🐙',
    HTML: '📄',
    JAVASCRIPT: '💡',
    CSS: '🎨',
    REACT: '⚛️',
    CSHARP: '💻',
    PYTHON: '🐍',
    AZURE: '☁️',
};
// ====================================================================

// === CourseModal - Använd din befintliga CourseModal från QuizCard.js ===
// Förutsätter att du har uppdaterat CourseModal med videologiken som jag instruerade.
// Om CourseModal är definierad i QuizCard.js kan du importera den:
// import { CourseModal } from './QuizCard'; // Eller var den nu exporteras
// Annars kopierar du den direkt hit om den är unik för QuizCard2

// Temporär CourseModal för att QuizCard2 ska fungera. 
// Ersätt denna med en import om din CourseModal är globalt tillgänglig eller i QuizCard.js
// eller kopiera in den uppdaterade CourseModal-koden hit.
const CourseModal = ({ quiz, rating, students, description, duration, onClose }) => {
    const { author, logo_url } = quiz;
    const category = quiz.slug?.split('-')[0]?.toUpperCase() || 'ALLA';
    const cardIcon = categoryIcons[category] || '📚';
    const gradientClass = categoryColors[category] || categoryColors.ALLA;
    
    // NYTT: Hitta den första videolänken för modalen
    const firstVideoUrl = getFirstVideoUrl(quiz);

    const videoLessonCount = quiz.questions?.filter(
        (q) => q.question_type === "videolesson"
    ).length || 0;
    const quizQuestionCount = quiz.questions?.filter(
        (q) => q.question_type !== "videolesson" && q.question_type !== "textlesson"
    ).length || 0;
    const textLessonCount = quiz.questions?.filter(
        (q) => q.question_type === "textlesson"
    ).length || 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl border border-slate-200"
            >
                {/* Header med bild/video - ANVÄND UPPPDATERADE KODEN FRÅN FÖREGÅENDE SVAR */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                    {firstVideoUrl ? (
                        <iframe
                            title={`${quiz.title} trailer`}
                            src={`${firstVideoUrl}?autoplay=0&controls=1`} 
                            frameBorder="0"
                            allow="encrypted-media"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    ) : quiz.image_url ? (
                        <img
                            src={quiz.image_url}
                            alt={quiz.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${gradientClass}`} />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
                    
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all text-slate-800 shadow-lg hover:scale-110"
                    >
                        <X size={24} />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-4xl font-bold text-white flex items-center gap-3">
                            <span className="text-5xl">{cardIcon}</span>
                            {quiz.title}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
                        <StarRating rating={rating} />
                        <div className="flex items-center gap-2 text-[#FF5421]">
                            <Users size={20} />
                            <span className="font-semibold">{students.toLocaleString()} studenter</span>
                        </div>
                        {duration && (
                            <div className="flex items-center gap-2 text-slate-600">
                                <Clock size={20} />
                                <span className="font-semibold">{duration}</span>
                            </div>
                        )}
                    </div>

                    {/* NYTT: Författarinformation */}
    {(author || logo_url) && (
        <div className="mb-6 flex items-center gap-3">
            {logo_url && (
                <img 
                    src={logo_url} 
                    alt={`${author || 'Kursägare'} logo`} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FF5421]" 
                />
            )}
            <div>
                <h3 className="text-sm font-medium text-slate-500">Upphovsman</h3>
                <p className="text-lg font-bold text-slate-900">{author || 'Okänd'}</p>
            </div>
        </div>
    )}

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Om kursen</h3>
                        <p className="text-slate-600 leading-relaxed">{description}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Vad du kommer lära dig</h3>
                        <ul className="space-y-2 text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-1 text-lg">✓</span>
                                <span>Grundläggande koncept och best practices</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-1 text-lg">✓</span>
                                <span>Praktiska exempel och övningar</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-1 text-lg">✓</span>
                                <span>Verkliga projekt och use cases</span>
                            </li>
                        </ul>
                    </div>

                    {quiz.questions && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Kursinnehåll</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {quiz.pdf_url ? (
                                    // ANVÄND DownloadCourseMaterialButton om den finns
                                    // Glöm inte att importera DownloadCourseMaterialButton om du använder den!
                                    // <DownloadCourseMaterialButton pdfUrl={quiz.pdf_url} /> 
                                    <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                                        <div className="text-3xl mb-2">📄</div>
                                        <div className="text-2xl font-bold text-[#FF5421]">PDF</div>
                                        <div className="text-sm text-slate-600">Material</div>
                                    </div>
                                ) : (
                                    <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                                        <div className="text-3xl mb-2">📚</div>
                                        <div className="text-2xl font-bold text-slate-900">{quiz.questions.length}</div>
                                        <div className="text-sm text-slate-600">Totalt steg</div>
                                    </div>
                                )}
                                
                                {videoLessonCount > 0 && (
                                    <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                                        <div className="text-3xl mb-2">🎥</div>
                                        <div className="text-2xl font-bold text-[#FF5421]">{videoLessonCount}</div>
                                        <div className="text-sm text-slate-600">Videolektioner</div>
                                    </div>
                                )}

                                {quizQuestionCount > 0 && (
                                    <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                                        <div className="text-3xl mb-2">❓</div>
                                        <div className="text-2xl font-bold text-[#FF5421]">{quizQuestionCount}</div>
                                        <div className="text-sm text-slate-600">Quiz frågor</div>
                                    </div>
                                )}

                                {textLessonCount > 0 && (
                                    <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                                        <div className="text-3xl mb-2">📝</div>
                                        <div className="text-2xl font-bold text-[#FF5421]">{textLessonCount}</div>
                                        <div className="text-sm text-slate-600">Textlektioner</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <Link
                            to={`/quizzes/${quiz.slug}`}
                            className="flex-1 bg-gradient-to-r from-[#FF5421] to-[#E04619] hover:from-[#E04619] hover:to-[#FF5421] text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 text-center text-lg shadow-lg flex items-center justify-center gap-2"
                        >
                            <Play size={20} />
                            Starta kursen direkt
                        </Link>
                        <button
                            onClick={onClose}
                            className="px-8 py-4 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
                        >
                            Stäng
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
// ====================================================================


// === MAIN QUIZCARD2 COMPONENT ===
export default function QuizCard2({ 
    quiz, 
    delay = 0,
    rating = 4.5,
    students = 1200,
    description = null,
    duration = "2h 30min",
}) {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isHovered, setIsHovered] = useState(false); 

    const category = quiz.slug?.split('-')[0]?.toUpperCase() || 'ALLA';
    const gradientClass = categoryColors[category] || categoryColors.ALLA;
    
    const finalDescription = description || `Lär dig ${quiz.title.toLowerCase()} från grunden. Denna kurs täcker allt från grundläggande koncept till avancerade tekniker. Perfekt för både nybörjare och de som vill förbättra sina färdigheter.`;
    
    const firstVideoUrl = getFirstVideoUrl(quiz);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    delay: delay,
                    type: "spring",
                    stiffness: 100,
                }}
            >
                <motion.div
                    onClick={() =>
                        setSelectedQuiz({
                            quiz,
                            rating,
                            students,
                            description: finalDescription,
                            duration,
                        })
                    }
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-slate-200 group"
                >
                    {/* Bild/Video-sektion med 16:9 förhållande */}
                    <div className="relative pb-[56.25%] overflow-hidden"> {/* 16:9 Aspect Ratio (9 / 16 * 100 = 56.25) */}
                        <div className="absolute inset-0"> {/* Wrapper för att fylla 16:9-området */}
                            {(isHovered && firstVideoUrl) ? (
                                <iframe
                                    title={`${quiz.title} trailer`}
                                    src={`${firstVideoUrl}?autoplay=1&mute=1&controls=0`} 
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={
                                        quiz.image_url ||
                                        `https://source.unsplash.com/1280x720/?${encodeURIComponent( // Bättre upplösning för 16:9
                                            quiz.category || "learning"
                                        )}`
                                    }
                                    alt={quiz.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            )}
                        </div>

                        {/* Överlagrat innehåll över bild/video */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex flex-col justify-end p-6">
                            
                            {/* Kategori-badge */}
                            <div className="absolute top-4 left-4">
                                <span className={`text-xs px-3 py-1 rounded-full font-semibold bg-white text-slate-900`}>
                                    {category}
                                </span>
                            </div>

                            {/* Dag X–Y (om den finns) */}
                            {quiz.dayRange && (
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow">
                                    {quiz.dayRange}
                                </div>
                            )}

                            {/* Titel */}
                            <h3 className="text-white font-bold text-xl leading-tight mb-2">
                                {quiz.title}
                            </h3>

                            {/* Rating och Duration */}
                            <div className="flex items-center justify-between text-white/90 text-sm">
                                <StarRating rating={rating} size="small" />
                                <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {duration}
                                </span>
                            </div>

                            {/* Play-ikon overlay (synlig om video finns och inte vid hover) */}
                            {firstVideoUrl && (
                                <motion.div 
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: isHovered ? 0 : 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <Play size={60} className="text-white/90" fill="white" />
                                </motion.div>
                            )}
                        </div>
                    </div>
{/* Kort beskrivning (under bild/video) */}
					<div className="p-6">
						
						{/* NYTT: Författare och Logotyp i kortet */}
						<div className="flex items-center gap-3 mb-3">
							{/* Rendera logotypen om den finns */}
							{quiz.logo_url && (
								<img 
									src={quiz.logo_url} 
									alt={`${quiz.author || 'Kursägare'} logo`} 
									className="w-8 h-8 rounded-full object-cover border border-slate-200" 
								/>
							)}
							{/* Rendera författaren om den finns */}
							<p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
								{quiz.author || 'Okänd Upphovsman'}
							</p>
						</div>
						
						{/* Beskrivning */}
						<p className="text-slate-600 text-sm leading-relaxed">
							{quiz.short_description ||
								"Lär dig grunderna och bygg trygghet i din roll."}
						</p>
					</div>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {selectedQuiz && (
                    <CourseModal
                        quiz={selectedQuiz.quiz}
                        rating={selectedQuiz.rating}
                        students={selectedQuiz.students}
                        description={selectedQuiz.description}
                        duration={selectedQuiz.duration}
                        onClose={() => setSelectedQuiz(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// === DEMO för QuizCard2 (valfritt, för att testa) ===
function DemoQuizCard2() {
    const demoQuizzes = [
        {
            id: 'a1',
            title: 'Hållbarhetsrapportering',
            slug: 'hallbarhet-rapportering',
            image_url: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab936?w=1280&h=720',
            dayRange: 'Dag 1-3',
            short_description: 'Förstå de nya kraven och fördelarna med ESG-rapportering.',
            category: 'Ekonomi',
            questions: Array(10).fill({ question_type: 'single_choice' }),
            // Lägg till en video här för att testa hover-effekten
            // Sätt en faktisk YouTube/Vimeo inbäddningslänk i video_url för att testa
            questions: [{ question_type: "videolesson", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }] 
        },
        {
            id: 'b2',
            title: 'Effektivt Styrelsearbete',
            slug: 'effektivt-styrelsearbete',
            image_url: 'https://images.unsplash.com/photo-1552581234-26379f5b5832?w=1280&h=720',
            short_description: 'Optimera möten och beslutsfattande i styrelsen.',
            category: 'Ledarskap',
            questions: Array(12).fill({ question_type: 'single_choice' })
        },
        {
            id: 'c3',
            title: 'Ny Teknik för Styrelsen',
            slug: 'ny-teknik-styrelsen',
            image_url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1280&h=720',
            dayRange: 'Dag 1-7',
            short_description: 'Hur AI och digitalisering kan stärka styrelsens arbete.',
            category: 'AI',
            questions: Array(8).fill({ question_type: 'single_choice' })
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
                    <span className="text-[#FF5421]">Våra</span> Nya Kurser
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {demoQuizzes.map((quiz, index) => (
                        <QuizCard2
                            key={quiz.id}
                            quiz={quiz}
                            delay={index * 0.1}
                            rating={4.7}
                            students={850}
                            duration="1h 45min"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export { DemoQuizCard2 }; // Exportera demofunktionen om du vill använda den