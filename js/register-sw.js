// Chequeo si el browser puede usar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js')
        .then(reg => {
          console.log("Service worker esta listo!");
        });
  }
  else {
    console.log("Service worker no soportado.");
  }
  
  // Event Listener para Offline/ Online Status
  window.addEventListener('offline', event => {
    document.querySelector('body').classList.add('offline');
  });
  
  window.addEventListener('online', event => {
    document.querySelector('body').classList.remove('offline');
  });
  
  // A veces este evento falla, ojo!
  // Sirve para saber si el navegador esta offline, cuando entramos offline. 
  // Es decir, no se disparo los eventos de arriba aun, y necesito conocer el estado.
  // 
  
  if (!navigator.onLine) {
    document.querySelector('body').classList.add('offline');
  }


  
const isOnline = async () => {
  try {
    
    const response = await fetch('https://code.jquery.com/jquery-3.6.0.slim.min.js', {cache: "no-store"});
    
    if (response.url == "https://jueves-gamma.vercel.app/offline.html"){
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('offline and rejected', error)
    return false;
  }
}

isOnline().then(
  // Resolve, estamos online
  resp => {
    if (resp){
      // Creo un evento
      var evento = new CustomEvent("onInitOnline", {});

      // Lo Disparo!
      document.dispatchEvent(evento);
    } else {
      $main.classList.add('offline');
    }
  },
  // Reject, estamos offline
  ()=> {$main.classList.add('offline');}
);
