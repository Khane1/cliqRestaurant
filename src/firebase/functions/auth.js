import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { onLoadApp } from '../../functions_convert'
import { businessModelStore, userModelStore } from '../../stores'
import { auth, updateUserModelstore, updateUserStore } from '../firebase.js'
import { createCollaborator, getBusinessId, userTranslate } from './restaurant_funcs/restaurants'

export function signIn(email, password) {
    signInWithEmailAndPassword(auth, email.trim(), password)
        .then(async function () {
            console.log(auth.currentUser);
            updateUserStore('authorized')
            await getBusinessId(auth.currentUser.uid).then(async (res) => {
                console.log(res.user);
                await userModelStore.update((e) => {
                    return {
                        displayName: auth.currentUser.displayName, email: auth.currentUser.email, uid: auth.currentUser.uid,
                        BusinessId: res.user.BusinessId,
                        role: res.user.role,//admin/cashier/manager/kitchen&waiter.waiteress...,  
                        status: res.user.status
                    }
                })
                businessModelStore.update((e) => {
                    return res.business
                })
                location.replace("/home")
            })
        }).catch((err) => {
            updateUserStore(err)
        })
}
export async function signUp(email, password, data) {
    try {
        await createUserWithEmailAndPassword(
            auth,
            email.trim(), password
        )
        // console.log(auth.currentUser);
        await userModelStore.update((e) => {
            return {
                displayName: auth.currentUser.displayName, email: auth.currentUser.email, uid: auth.currentUser.uid,
                BusinessId: data.b_Id,
                }
        })
        if (data.pgName == "collab") {
            await createCollaborator(data.b_Id, data.userName, auth.currentUser.uid)
            await updateUserStore('authorized');
        } else {
            await updateUserStore('authorizing');
            location.replace("/signUp");
        }
    } catch (e) {
        await updateUserModelstore(auth.currentUser)
        updateUserStore(e)
        console.log('error from creating user', e);
    }
}

export function signOut() {
    auth.signOut().then(() => {
        updateUserStore('unauthorized')
        location.replace("/")
        userModelStore.delete();
    }).catch((err) => {
        updateUserStore(err)

    })
}