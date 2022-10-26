import { initializeApp, } from 'firebase/app';
import { getAuth, } from 'firebase/auth'
import { checkAuth } from '../appscripts';
import { userModelStore, userStore } from '../stores';
export let process;
const firebaseConfig = 
 {
   
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
export function updateUserModelstore(value){
    userModelStore.update((e) => {
        return value;
    })
}

//https://itnext.io/how-to-use-firebase-auth-with-a-custom-node-backend-99a106376c8a
