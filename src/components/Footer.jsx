export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="text-xl font-bold">Learnd</div>
          <p className="text-sm text-gray-600 mt-2">Skapa, dela och gå quiz — helt gratis.</p>
        </div>

        <div className="flex gap-8 text-sm text-gray-600">
          <div className="space-y-2">
            <div className="font-semibold text-gray-900">Resurser</div>
            <div>Hjälp</div>
            <div>Om oss</div>
            <div>Integritet</div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-gray-900">Kategorier</div>
            <div>AI</div>
            <div>HR</div>
            <div>Marknad</div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-400">© {new Date().getFullYear()} Learnd — All rights reserved.</div>
    </div>
  );
}