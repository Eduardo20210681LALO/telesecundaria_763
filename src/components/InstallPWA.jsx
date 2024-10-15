import React, { useState, useEffect } from "react";

function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null); // Guardar el evento para usarlo más tarde
  const [showInstallButton, setShowInstallButton] = useState(false); // Mostrar o no el botón de instalación

  useEffect(() => {
    // Escuchar el evento 'beforeinstallprompt'
    const handler = (e) => {
      e.preventDefault(); // Prevenir el prompt automático del navegador
      setDeferredPrompt(e); // Guardar el evento
      setShowInstallButton(true); // Mostrar el botón de instalación
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Manejar la instalación de la PWA
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Mostrar el prompt de instalación
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó instalar la PWA');
        } else {
          console.log('El usuario rechazó la instalación de la PWA');
        }
        setDeferredPrompt(null); // Reiniciar el prompt
        setShowInstallButton(false); // Ocultar el botón después de la interacción
      });
    }
  };

  return (
    <div>
      {showInstallButton && (
        <div className="install-snackbar">
          <p>¿Quieres instalar la PWA?</p>
          <button onClick={handleInstallClick}>Instalar App</button>
        </div>
      )}
    </div>
  );
}

export default InstallPWA;
