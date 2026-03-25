import React from 'react';

// Denna komponent kommer att omsluta allt som hör till din HEMSIDA/PORTFOLIO
const PortfolioLayout = ({ children, scrollY, activeSection, navigateToPortfolio, toggleMusic, isMusicPlaying, ...restProps }) => {
    return (
        // 1. FLYTTA UT DEN GEMENSAMMA BAKGRUNDEN OCH STILEN HIT
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white min-h-screen overflow-x-hidden">
            
            {/* 2. FLYTTA UT DEN ANIMERADE BAKGRUNDEN HIT */}
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDuration: '7s'}}></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDuration: '9s', animationDelay: '2s'}}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDuration: '11s', animationDelay: '4s'}}></div>
            </div>

            {/* 3. LÄGG TILL ÖVRIGA GLOBALA KOMPONENTER SOM BARA GÄLLER HÄR */}
            <ScrollOnLoad /> 

            {/* 4. NAVBAR KOMMER NU ATT HANTERAS VILLKORLIGT I App.jsx */}

            <main>
                {/* children är MainPortfolioContent */}
                {children}
            </main>
            
            {/* 5. Audio och andra globala element som bara finns på portfolion */}
            {/* ... */}

        </div>
    );
};

export default PortfolioLayout;