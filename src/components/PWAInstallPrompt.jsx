import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  });
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches;
  });

  useEffect(() => {
    // Écouter l'événement beforeinstallprompt (Android/Desktop)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Ne montrer le prompt que si l'utilisateur n'a pas déjà refusé
      const promptDismissed = localStorage.getItem('pwaPromptDismissed');
      if (!promptDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Détecter si l'application a été installée
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      localStorage.setItem('pwaInstalled', 'true');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installée avec succès');
    } else {
      console.log('Installation refusée');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

  if (isInstalled || !showPrompt) return null;

  // Prompt pour iOS
  if (isIOS) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-50 border border-gray-200 md:left-auto md:right-4 md:w-96"
      >
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
        <div className="flex items-start gap-3">
          <Download size={24} className="text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Installer l'application</h3>
            <p className="text-sm text-gray-600 mb-2">
              Pour installer cette application sur votre iPhone :
            </p>
            <ol className="text-xs text-gray-500 list-decimal list-inside space-y-1">
              <li>Tapez sur le bouton <span className="font-medium">Partager</span> <span className="text-lg">⎙</span></li>
              <li>Sélectionnez <span className="font-medium">"Sur l'écran d'accueil"</span></li>
              <li>Tapez sur <span className="font-medium">"Ajouter"</span></li>
            </ol>
          </div>
        </div>
      </motion.div>
    );
  }

  // Prompt pour Android/Desktop
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-50 border border-gray-200 md:left-auto md:right-4 md:w-96"
      >
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
        <div className="flex items-start gap-3">
          <Download size={24} className="text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Installer Jj's CV Generator</h3>
            <p className="text-sm text-gray-600 mb-3">
              Installez Jj's CV Generator sur votre appareil pour y accéder plus rapidement et l'utiliser hors ligne.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Installer
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;