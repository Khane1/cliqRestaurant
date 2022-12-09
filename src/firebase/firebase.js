import { initializeApp, } from 'firebase/app';
import { getAuth, } from 'firebase/auth'
import { checkAuth } from '../appscripts';
import { userModelStore, userStore } from '../stores';
// import functions from 'firebase-functions'
// export let process;
// const configure = functions.config()
// const config = configure.cliqrestaurant;
const firebaseConfig =
{
    // apiKey: config.appkey,
    // authDomain: config.authdomain,
    // projectId: config.project_id,
    // storageBucket: config.storagebucket,
    // messagingSenderId: config.messaging_sender_id,
    // appId: config.app_id,
    // measurementId: config.measurement_id
    apiKey: "AIzaSyDdxUEeGpzUJok5ZeOrStn-8G88lXNRX-w",
    authDomain: "cliqrestaurants.firebaseapp.com",
    projectId: "cliqrestaurants",
    storageBucket: "cliqrestaurants.appspot.com",
    messagingSenderId: "385062950946",
    appId: "1:385062950946:web:dfed13026decb68670d27b",
    measurementId: "G-TF066078JV"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export function sendRequest() {
    
    if (auth.currentUser) {
        auth.currentUser.
            getIdToken(true)
            .then((idToken) => {
                checkAuth(idToken)
                    .then((res) => {
                        updateUserStore(res.data.message)
                    }).catch((error) => {
                        updateUserStore(error)
                    })
            }).catch((error) => {
                updateUserStore("Error getting auth token " + error)

            });
    } else {
        checkAuth()
            .then((res) => {
                updateUserStore(res.data.message)
            }).catch((error) => {
                updateUserStore(error)
            })
    }
}

export function updateUserStore(value) {
    userStore.update((e) => {
        return value
    })
}
export function updateUserModelstore(value) {
    userModelStore.update((e) => {
        return value;
    })
}

//https://itnext.io/how-to-use-firebase-auth-with-a-custom-node-backend-99a106376c8a