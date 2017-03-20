importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyB9zcIc1TpWX76Y9idkUgzPsDQrfCrW-T0",
    authDomain: "tank-6d5d3.firebaseapp.com",
    databaseURL: "https://tank-6d5d3.firebaseio.com",
    storageBucket: "tank-6d5d3.appspot.com",
    messagingSenderId: "918636476327"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();