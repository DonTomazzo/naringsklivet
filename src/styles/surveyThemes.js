export const surveyThemes = {
  professional: {
    name: 'Professional',
    colors: {
      primary: '#FF5421',
      secondary: '#0c5370',
      background: '#0c5370',
      cardBg: '#ffffff',
      text: '#2c3e50',
      textLight: '#666',
      progressBar: '#FF5421',
      buttonBg: 'linear-gradient(to right, #FF5421, #FF5421)',
      buttonHover: '#E04A1D',
      navButton: 'rgba(255, 255, 255, 0.1)',
      navButtonBorder: 'rgba(255, 255, 255, 0.3)'
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
    },
    styles: {
      headerGradient: 'linear-gradient(135deg, #0c5370 0%, #0a4560 100%)',
      cardShadow: '0 20px 40px rgba(0,0,0,0.1)',
      borderRadius: '20px'
    }
  },

  playful: {
    name: 'Fun & Playful',
    colors: {
      primary: '#ff6b9d',
      secondary: '#c44569',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardBg: '#ffffff',
      text: '#2c3e50',
      textLight: '#666',
      progressBar: '#ff6b9d',
      buttonBg: 'linear-gradient(to right, #ff6b9d, #c44569)',
      buttonHover: '#d65780',
      navButton: 'rgba(255, 255, 255, 0.2)',
      navButtonBorder: 'rgba(255, 255, 255, 0.4)'
    },
    fonts: {
      body: '"Comic Neue", "Comic Sans MS", cursive, sans-serif',
      heading: '"Fredoka One", "Comic Neue", cursive'
    },
    styles: {
      headerGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardShadow: '0 25px 50px rgba(102, 126, 234, 0.3)',
      borderRadius: '25px'
    }
  },

  academic: {
    name: 'Academic',
    colors: {
      primary: '#1e3a8a',
      secondary: '#475569',
      background: '#1e293b',
      cardBg: '#ffffff',
      text: '#1e293b',
      textLight: '#64748b',
      progressBar: '#1e3a8a',
      buttonBg: 'linear-gradient(to right, #1e3a8a, #3b82f6)',
      buttonHover: '#1e40af',
      navButton: 'rgba(255, 255, 255, 0.15)',
      navButtonBorder: 'rgba(255, 255, 255, 0.3)'
    },
    fonts: {
      body: 'Georgia, "Times New Roman", serif',
      heading: 'Georgia, "Times New Roman", serif'
    },
    styles: {
      headerGradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      cardShadow: '0 15px 30px rgba(0,0,0,0.15)',
      borderRadius: '12px'
    }
  },

  minimalist: {
    name: 'Minimalist',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      background: '#f5f5f5',
      cardBg: '#ffffff',
      text: '#000000',
      textLight: '#666666',
      progressBar: '#000000',
      buttonBg: '#000000',
      buttonHover: '#333333',
      navButton: 'rgba(0, 0, 0, 0.1)',
      navButtonBorder: 'rgba(0, 0, 0, 0.2)'
    },
    fonts: {
      body: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      heading: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    },
    styles: {
      headerGradient: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      cardShadow: '0 10px 25px rgba(0,0,0,0.08)',
      borderRadius: '8px'
    }
  }
};

export const getThemeStyles = (themeName = 'professional') => {
  const theme = surveyThemes[themeName] || surveyThemes.professional;
  
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${theme.fonts.body};
      background: ${theme.colors.background};
      min-height: 100vh;
      overflow: hidden;
    }
    
    .survey-container {
      width: 100%;
      height: 100vh;
      position: relative;
    }
    
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: ${themeName === 'minimalist' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
      backdrop-filter: blur(10px);
      padding: 20px;
      text-align: center;
      z-index: 100;
      border-bottom: 1px solid ${themeName === 'minimalist' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(102, 126, 234, 0.2)'};
    }
    
    .header h1 {
      font-size: ${themeName === 'playful' ? '2em' : '1.8em'};
      color: ${theme.colors.primary};
      margin-bottom: 8px;
      font-weight: ${themeName === 'academic' ? '400' : '300'};
      font-family: ${theme.fonts.heading};
    }
    
    .progress-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      margin-top: 10px;
    }
    
    .progress-text {
      font-size: 0.9em;
      color: ${theme.colors.primary};
      font-weight: 500;
    }
    
    .progress-bar {
      width: 200px;
      height: 4px;
      background: ${themeName === 'minimalist' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(102, 126, 234, 0.2)'};
      border-radius: 2px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: ${theme.colors.progressBar};
      transition: width 0.5s ease;
      border-radius: 2px;
    }
    
    .survey-viewport {
      position: fixed;
      top: 120px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .questions-container {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .question-card {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 90%;
      max-width: 700px;
      transform: translateX(-50%) translateY(-50%);
      padding: 40px;
      background: ${theme.colors.cardBg};
      border-radius: ${theme.styles.borderRadius};
      box-shadow: ${theme.styles.cardShadow};
      opacity: 0;
      pointer-events: none;
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease, z-index 0s 0.8s;
      will-change: transform, opacity;
    }

    .question-card.active {
      opacity: 1;
      pointer-events: auto;
      z-index: 10;
    }

    .question-card.prev {
      transform: translateX(-150%) translateY(-50%) scale(0.95);
      opacity: 0;
      z-index: 5;
    }

    .question-card.next {
      transform: translateX(50%) translateY(50%) scale(0.95);
      opacity: 0;
      z-index: 5;
    }

    .question-card.far {
      display: none;
    }
    
    .question-content {
      text-align: center;
    }
    
    .question-title {
      font-size: ${themeName === 'playful' ? '1.3em' : '1.2em'};
      color: ${theme.colors.primary};
      font-weight: 500;
      font-family: ${theme.fonts.heading};
    }
    
    .question-text {
      font-size: ${themeName === 'playful' ? '2.2em' : themeName === 'academic' ? '1.8em' : '2em'};
      color: ${theme.colors.text};
      margin: 20px 0 30px;
      line-height: 1.3;
      font-weight: ${themeName === 'minimalist' ? '400' : '300'};
    }

    .options-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
    }
    
    .option-label {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px 25px;
      background: ${themeName === 'minimalist' ? '#fafafa' : '#f7f9fc'};
      border-radius: ${themeName === 'minimalist' ? '8px' : '10px'};
      width: 100%;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
      border: ${themeName === 'minimalist' ? '1px solid #e5e5e5' : '2px solid transparent'};
    }
    
    .option-label:hover {
      background-color: ${themeName === 'minimalist' ? '#f0f0f0' : '#eef2f5'};
      transform: ${themeName === 'playful' ? 'scale(1.02)' : 'none'};
    }

    .option-label input[type="radio"],
    .option-label input[type="checkbox"] {
      display: none;
    }

    .option-label input[type="radio"]:checked + .option-text {
      position: relative;
      color: ${theme.colors.primary};
      font-weight: 600;
    }

    .option-label input[type="radio"]:checked + .option-text::before {
      content: '✔';
      position: absolute;
      left: -35px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2em;
      color: ${theme.colors.primary};
    }

    .option-text {
      color: ${theme.colors.text};
      font-size: ${themeName === 'playful' ? '1.15em' : '1.1em'};
      position: relative;
      transition: color 0.2s ease;
    }

    .input-container, .scale-container {
      width: 100%;
    }

    .text-input {
      width: 100%;
      padding: 15px;
      border-radius: ${themeName === 'minimalist' ? '8px' : '10px'};
      border: ${themeName === 'minimalist' ? '1px solid #e5e5e5' : '2px solid #ddd'};
      font-size: 1.1em;
      color: ${theme.colors.text};
      transition: border-color 0.2s ease;
      font-family: ${theme.fonts.body};
    }

    .text-input:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }

    .scale-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .scale-labels {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 10px;
      font-size: 0.9em;
      color: ${theme.colors.primary};
    }

    .scale-options {
      display: flex;
      gap: 10px;
      width: 100%;
      justify-content: space-between;
    }

    .radio-group {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .radio-group input[type="radio"] {
      -webkit-appearance: none;
      appearance: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid ${themeName === 'minimalist' ? '#e5e5e5' : '#ddd'};
      cursor: pointer;
      transition: border-color 0.2s ease, background-color 0.2s ease;
      position: relative;
      z-index: 1;
    }

    .radio-group input[type="radio"]:checked {
      border-color: ${theme.colors.primary};
      background-color: ${theme.colors.primary};
    }

    .radio-group input[type="radio"]:checked::after {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .next-button {
      margin-top: 20px;
      padding: 15px 40px;
      font-size: 1.1em;
      font-weight: 600;
      color: white;
      background: ${theme.colors.buttonBg};
      border: none;
      border-radius: ${themeName === 'minimalist' ? '8px' : '50px'};
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease;
      box-shadow: ${themeName === 'minimalist' ? '0 2px 8px rgba(0,0,0,0.1)' : '0 4px 15px rgba(118, 75, 162, 0.4)'};
    }
    
    .next-button:hover {
      transform: translateY(-2px);
      background: ${theme.colors.buttonHover};
      box-shadow: ${themeName === 'minimalist' ? '0 4px 12px rgba(0,0,0,0.15)' : '0 6px 20px rgba(118, 75, 162, 0.5)'};
    }
    
    .next-button:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .footer-buttons {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 15px;
      z-index: 100;
    }

    .nav-button {
      background: ${theme.colors.navButton};
      border: 2px solid ${theme.colors.navButtonBorder};
      color: ${themeName === 'minimalist' ? '#000' : 'white'};
      font-size: 1em;
      font-weight: bold;
      padding: 12px 25px;
      border-radius: ${themeName === 'minimalist' ? '8px' : '50px'};
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
      backdrop-filter: blur(5px);
    }

    .nav-button:hover {
      background: ${themeName === 'minimalist' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)'};
      transform: translateY(-2px);
    }
    
    .nav-button:disabled {
      background: transparent;
      border-color: ${themeName === 'minimalist' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
      color: ${themeName === 'minimalist' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)'};
      cursor: not-allowed;
      transform: none;
    }
    
    .help-button {
      background: ${theme.colors.primary};
      border: none;
      border-radius: 50%;
      color: white;
      width: 45px;
      height: 45px;
      font-size: 1.5em;
      cursor: pointer;
      box-shadow: ${themeName === 'minimalist' ? '0 2px 8px rgba(0,0,0,0.1)' : '0 4px 15px rgba(118, 75, 162, 0.4)'};
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .help-button:hover {
      transform: translateY(-2px);
      box-shadow: ${themeName === 'minimalist' ? '0 4px 12px rgba(0,0,0,0.15)' : '0 6px 20px rgba(118, 75, 162, 0.5)'};
    }

    .completion-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: ${themeName === 'minimalist' ? '#ffffff' : theme.styles.headerGradient};
      color: ${themeName === 'minimalist' ? '#000000' : 'white'};
      animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .completion-container h2 {
      font-size: ${themeName === 'playful' ? '3.5em' : '3em'};
      margin-bottom: 20px;
      font-family: ${theme.fonts.heading};
    }
    
    .completion-container p {
      font-size: 1.2em;
      margin-bottom: 30px;
    }
    
    .completion-buttons {
      display: flex;
      gap: 15px;
    }

    .completion-button {
      padding: 15px 30px;
      border-radius: ${themeName === 'minimalist' ? '8px' : '50px'};
      border: 2px solid ${themeName === 'minimalist' ? '#000' : 'white'};
      background: transparent;
      color: ${themeName === 'minimalist' ? '#000' : 'white'};
      font-size: 1em;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .completion-button:hover {
      background: ${themeName === 'minimalist' ? '#000' : 'white'};
      color: ${themeName === 'minimalist' ? '#fff' : theme.colors.primary};
    }

    .auto-advance-indicator {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${themeName === 'minimalist' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(118, 75, 162, 0.8)'};
      color: white;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 0.9em;
      animation: slideIn 0.3s ease-out forwards;
    }
    
    @keyframes slideIn {
      from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
      to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }

    .sorting-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
      width: 100%;
    }

    .sorting-item {
      user-select: none;
      text-align: center;
      cursor: grab;
      background-color: ${theme.colors.primary} !important;
      color: white !important;
    }

    ${themeName === 'playful' ? `
      .question-card {
        animation: float 3s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateX(-50%) translateY(-50%); }
        50% { transform: translateX(-50%) translateY(calc(-50% - 10px)); }
      }
      
      .option-label:hover {
        animation: wiggle 0.5s ease-in-out;
      }
      
      @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-2deg); }
        75% { transform: rotate(2deg); }
      }
    ` : ''}
  `;
};  