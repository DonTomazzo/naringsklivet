import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Users, BookOpen, CheckCircle, Target, Lightbulb, TrendingUp } from 'lucide-react';

interface TextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TextModal: React.FC<TextModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header with background image */}
              <div className="relative bg-gradient-to-r from-[#FF5421] to-[#FF7849] px-8 py-12">
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200" 
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">Styrelsekörkort</h2>
                    <p className="text-white/90 text-lg">Din väg till professionellt styrelsearbete</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-8 overflow-y-auto max-h-[calc(90vh-220px)]">
                {/* Bakgrund */}
                <div className="mb-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <BookOpen className="w-6 h-6 text-[#FF5421]" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Bakgrund</h3>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Att vara förtroendevald i en bostadsrättsförening innebär ett stort ansvar. 
                    Du fattar beslut som påverkar både ekonomi, trivsel och värde för alla medlemmar. 
                    Vår utbildning ger dig den kunskap och de verktyg du behöver för att göra ett 
                    professionellt och tryggt jobb som styrelsemedlem.
                  </p>
                </div>

                {/* EFI Logo/Badge */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-xl p-6 mb-10">
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-600 p-4 rounded-lg">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-indigo-900 mb-2">
                        Certifierad av EFI (Exempel)
                      </h4>
                      <p className="text-indigo-700">
                        Denna utbildning är kvalitetssäkrad och följer branschstandard för 
                        styrelseutbildningar inom bostadsrättssektorn. Vid genomförd kurs 
                        erhåller du ett digitalt certifikat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vad kursen ger */}
                <div className="mb-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Target className="w-6 h-6 text-[#FF5421]" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Vad kursen ger dig</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h5 className="font-bold text-slate-900 mb-1">Juridisk trygghet</h5>
                          <p className="text-slate-600 text-sm">
                            Lär dig om lagen, stadgar och styrelsens juridiska ansvar
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h5 className="font-bold text-slate-900 mb-1">Ekonomisk kompetens</h5>
                          <p className="text-slate-600 text-sm">
                            Förstå budgetar, årsredovisningar och ekonomisk planering
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h5 className="font-bold text-slate-900 mb-1">Praktiska verktyg</h5>
                          <p className="text-slate-600 text-sm">
                            Mallar, checklistor och konkreta exempel från verkligheten
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h5 className="font-bold text-slate-900 mb-1">Konflikthantering</h5>
                          <p className="text-slate-600 text-sm">
                            Metoder för att hantera konflikter och svåra situationer
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h5 className="font-bold text-slate-900 mb-1">Fastighetskunskap</h5>
                          <p className="text-slate-600 text-sm">
                            Underhåll, stambyten och långsiktig fastighetsplanering
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h5 className="font-bold text-slate-900 mb-1">Digitalt certifikat</h5>
                          <p className="text-slate-600 text-sm">
                            Få ett professionellt certifikat som styrker din kompetens
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 text-center">
                    <div className="bg-[#FF5421] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#FF5421] mb-1">13</div>
                    <div className="text-sm text-slate-600">Moduler</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 text-center">
                    <div className="bg-[#FF5421] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#FF5421] mb-1">2,500+</div>
                    <div className="text-sm text-slate-600">Studenter</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 text-center">
                    <div className="bg-[#FF5421] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#FF5421] mb-1">4.9</div>
                    <div className="text-sm text-slate-600">Betyg (⭐⭐⭐⭐⭐)</div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF5421] to-[#FF7849] rounded-xl p-8 text-center text-white">
                  <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h4 className="text-2xl font-bold mb-3">Redo att börja din resa?</h4>
                  <p className="text-white/90 mb-6 text-lg">
                    Gå med i tusentals förtroendevalda som redan utvecklat sin kompetens genom vår utbildning.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button className="bg-white text-[#FF5421] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                      Starta kursen nu
                    </button>
                    <button 
                      onClick={onClose}
                      className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                    >
                      Stäng
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TextModal;