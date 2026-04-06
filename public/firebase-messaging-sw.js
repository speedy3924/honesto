importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCI26dYo9rtHQXW0u-eQq6EqEVn-Vh6kTU",           // tu NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "honesto-pe.firebaseapp.com",
  projectId: "honesto-pe",
  storageBucket: "honesto-pe.appspot.com",
  messagingSenderId: "322452861665",    // tu NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:322452861665:web:a38cbd573aa55d32c57da0",              // tu NEXT_PUBLIC_FIREBASE_APP_ID
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'HONESTOpe', {
    body: body || '',
    icon: '/logo.png',
    data: { url: 'https://www.honestope.com/mercado' },
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data?.url || 'https://www.honestope.com/mercado';
  event.waitUntil(clients.openWindow(url));
});