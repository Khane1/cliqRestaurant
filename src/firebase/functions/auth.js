import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { onLoadApp } from '../../functions_convert'
import { userModelStore } from '../../stores'
import { auth, updateUserModelstore, updateUserStore } from '../firebase.js'

export function signIn(email,password) {
    signInWithEmailAndPassword(auth, email.trim(), password)
        .then(async function () {
            await updateUserStore('authorized')
            console.log(auth.currentUser);
            await onLoadApp(auth.currentUser.uid)
            location.replace("/mymenu")
        }).catch((err) => {
            updateUserStore(err)
        })
}
export async function signUp(email,password) {
    try {
        let user = await createUserWithEmailAndPassword(
            auth,
            email.trim(), password
        )
        await updateUserStore('authorizing');
        console.log(auth.currentUser);
        updateUserModelstore(auth.currentUser)
        location.replace("/signUp");
        return user;
    } catch (e) {
        updateUserStore(e)
        console.log('error from creating user', e);
    }
}

export function signOut() {
    auth.signOut().then(() => {
        updateUserStore('unauthorized')
        userModelStore.delete();
    }).catch((err) => {
        updateUserStore(err)

    })
}