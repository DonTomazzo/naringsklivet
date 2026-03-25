import { useParams, Navigate } from 'react-router-dom';
import { getModuleBySlug } from '../../data/modules2';
import { getAktieModuleBySlug } from '../../data/modules3';

export default function ModulePage() {
  const { slug } = useParams();
  
  // Försök hitta modulen i båda dataseten
  let module = getModuleBySlug(slug); // Styrelsemoduler
  
  // Om inte hittad i styrelsemoduler, kolla aktiemoduler
  if (!module) {
    module = getAktieModuleBySlug(slug);
  }

  // Om modulen fortfarande inte finns, redirecta
  if (!module) {
    return <Navigate to="/modules" replace />;
  }

  // Om modulen saknar component
  if (!module.component) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚧</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                {module.title}
              </h1>
              <p className="text-lg text-slate-600 mb-2">
                {module.short_description}
              </p>
              <p className="text-slate-500 mb-8">
                Denna modul är under utveckling och kommer snart!
              </p>
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-slate-800 mb-2">Det här kommer du lära dig:</h3>
                  <ul className="space-y-2">
                    {module.learningPoints?.map((point, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                  <span>📚 {module.lessons} lektioner</span>
                  <span>•</span>
                  <span>🎥 {module.videoLessons} videos</span>
                  <span>•</span>
                  <span>⏱️ {module.duration}</span>
                </div>
              </div>
              <a 
                href="/modules"
                className="inline-block mt-8 bg-[#FF5421] hover:bg-[#E04A1D] text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg"
              >
                ← Tillbaka till alla moduler
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rendera modulens component
  const ModuleComponent = module.component;
  
  return (
    <div>
      <ModuleComponent />
    </div>
  );
}