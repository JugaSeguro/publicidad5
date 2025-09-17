/**
 * Componente principal de la aplicación
 * Gestiona la estructura principal y los estilos globales
 */

import React, { useEffect, useState } from 'react';
import './styles/main.css';
import './styles/popup.css';
import { useLandingPhone } from '@shared/useLandingPhone';

// Función para inicializar Meta Pixel
const initializeMetaPixel = () => {
  // Verificar si fbq ya existe
  if (typeof window !== 'undefined' && window.fbq) {
    console.log('✅ Meta Pixel ya inicializado');
    return;
  }

  // Cargar el script de Meta Pixel si no existe
  if (typeof window !== 'undefined' && !window.fbq) {
    (function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    window.fbq('init', '802662742307003');
    window.fbq('track', 'PageView');
    console.log('✅ Meta Pixel inicializado correctamente');
  }
};

// Función para trackear eventos personalizados
const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
    console.log(`📊 Evento trackeado: ${eventName}`, parameters);
  } else {
    console.warn('⚠️ Meta Pixel no está disponible para trackear:', eventName);
  }
};

// Función para verificar el estado del pixel
const checkPixelStatus = () => {
  if (typeof window !== 'undefined') {
    console.log('🔍 Estado del Meta Pixel:');
    console.log('- fbq disponible:', !!window.fbq);
    console.log('- _fbq disponible:', !!window._fbq);
    console.log('- dataLayer:', window.dataLayer);
    
    if (window.fbq) {
      console.log('✅ Meta Pixel está funcionando correctamente');
    } else {
      console.error('❌ Meta Pixel no está disponible');
    }
  }
};

function App() {
  const { phoneData, loading } = useLandingPhone(1);
  const [showPopup, setShowPopup] = useState(false);

  // Efectos al cargar el componente
  useEffect(() => {
    // Inicializar Meta Pixel
    initializeMetaPixel();
    
    // Verificar estado del pixel después de un breve delay
    setTimeout(() => {
      checkPixelStatus();
    }, 1000);
    
    // Comprobar si el webcomponent está correctamente cargado
    const webComponent = document.getElementById('lux-register');
    if (webComponent) {
      console.log('✅ Webcomponent detectado desde React');
    } else {
      console.error('❌ Webcomponent no encontrado en el DOM');
    }
    
    // Función para manejo alternativo del botón de registro
    const handleRegisterButtonClick = () => {
      const webComponent = document.getElementById('lux-register');
      if (webComponent) {
        console.log('🚀 Activando webcomponent desde evento delegado en React');
        webComponent.click();
      }
    };
    
    // Delegación de eventos para mayor compatibilidad
    document.addEventListener('click', (event) => {
      if (event.target.id === 'register-button' || 
          event.target.closest('#register-button')) {
        handleRegisterButtonClick();
      }
    });
    
    // Limpieza al desmontar
    return () => {
      document.removeEventListener('click', handleRegisterButtonClick);
    };
  }, []);

  // Mostrar loading mientras se cargan los enlaces
  if (loading) {
    return (
      <main className="main-content">
        <div className="loading-container">
          <p>Cargando...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Fondo animado */}
      <div className="background-container">
        <div className="scrolling-background"></div>
        <div className="dark-overlay"></div>
      </div>
      
      <main className="main-content">
        <div className="logo-container">
          <img src="/img/logo-new.webp" alt="Picante Sports Logo" className="site-logo" width="850" height="810" />
        </div>
        
        <div className="bonus-title">
          <h1>{phoneData.title}</h1>
        </div>
        
        <div className="promo-text">
          <p>Crea tu cuenta rápido y seguro ✨</p>
          <p>Regístrate totalmente gratis en la plataforma más segura de Argentina. Contamos con más de 12000 Slots, la mejor deportiva y el mejor casino en vivo.</p>
          <p>✅ ¡Nosotros no tenemos límites de apuestas!</p>
          <p>✅ ¡Retira sin límite!</p>
          <button id="bonus-button" className="bonus-highlight bonus-button" onClick={() => {
            trackEvent('InitiateCheckout', {
              content_name: 'MEGABONUS Registration',
              content_category: 'Registration',
              value: 2000,
              currency: 'ARS'
            });
            setShowPopup(true);
          }}>
            REGISTRATE GRATIS Y OBTENE UN <span className="bonus-amount">MEGABONUS</span> CON TU PRIMER RECARGA
          </button>

        </div>
        

        
        {/* Popup Modal */}
        {showPopup && (
          <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
              <h2>¡Elige tu forma de registro!</h2>
              <div className="popup-options">
                <div className="popup-option telegram-option" onClick={() => {
                  trackEvent('Lead', {
                    content_name: 'Telegram Registration',
                    content_category: 'Registration',
                    value: 2000,
                    currency: 'ARS'
                  });
                  window.open('https://t.me/casino1xclub_bot', '_blank');
                  setShowPopup(false);
                }}>
                  <div className="option-icon">📱</div>
                  <h3>Telegram VIP</h3>
                  <p>✨ MÁS BENEFICIOS ✨</p>
                  <p>✨ MÁS BONOS SIEMPRE ✨</p>
                  <ul>
                    <li>🎁 Bonos exclusivos diarios</li>
                    <li>🚀 Promociones especiales</li>
                    <li>⚡ Soporte 24/7 prioritario</li>
                    <li>💎 Acceso VIP a torneos</li>
                  </ul>
                  <button className="option-button telegram-btn">Registrarme por Telegram</button>
                </div>
                
                <div className="popup-option whatsapp-option" onClick={() => {
                  trackEvent('Lead', {
                    content_name: 'WhatsApp Registration',
                    content_category: 'Registration',
                    value: 2000,
                    currency: 'ARS'
                  });
                  window.open(phoneData.whatsapp_link, '_blank');
                  setShowPopup(false);
                }}>
                  <div className="option-icon">💬</div>
                  <h3>WhatsApp</h3>
                  <p>Registro tradicional</p>
                  <ul>
                    <li>📞 Atención personalizada</li>
                    <li>💰 Bonos de bienvenida</li>
                    <li>🎯 Soporte directo</li>
                  </ul>
                  <button className="option-button whatsapp-btn">Registrarme por WhatsApp</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;

