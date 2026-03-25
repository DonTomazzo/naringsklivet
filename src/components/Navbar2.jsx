import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-black **sticky top-0 z-50**"> 
    
    {/* 2. Ändring: Ta bort max-w-7xl mx-auto */}
    <div className="**px-4 sm:px-6 lg:px-8**">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-extrabold text-white">Lurndt</div>
          
          {/* 3. Justera nav-knapparnas hover-färg till något mörkt */}
          <nav className="hidden md:flex items-center gap-3 text-sm text-white">
            <button className="px-3 py-2 rounded-md **hover:bg-gray-800**">Upptäck</button>
            <button className="px-3 py-2 rounded-md **hover:bg-gray-800**">Skapa quiz</button>
            <button className="px-3 py-2 rounded-md **hover:bg-gray-800**">Kategorier</button>
            <button className="px-3 py-2 rounded-md **hover:bg-gray-800**">Om</button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <button className="px-4 py-2 rounded-full bg-[#FF5421] text-white font-semibold hover:opacity-95">
                Kom igång (gratis)
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Menu"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>

        {/* mobil meny */}
        {open && (
          <div className="md:hidden py-2">
            <nav className="flex flex-col gap-2 text-sm">
              <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100">Upptäck</button>
              <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100">Skapa quiz</button>
              <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100">Kategorier</button>
              <button className="text-left px-3 py-2 rounded-md hover:bg-gray-100">Om</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}