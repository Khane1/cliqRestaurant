import { setDoc,doc, onSnapshot, query, where, collection, updateDoc } from 'Firebase/firestore';
import { collabListStore } from '../../../stores';
import { updateUserModelstore, } from "../../firebase";
import { updateCollaborators } from './businessLogic';

export async function createUser(auth, restaurantDoc, collaboratorDoc, businessId, role) {
    try {

        let user = {
            uid: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            BusinessId: businessId,
            contacts: [{ email: auth.currentUser.email }, { phoneNumber: '' }],
            role: role,//admin/cashier/manager/kitchen&waiter.waiteress...,  
            lastLoggedIn: new Date(),
            status: 'active'//active/inactive/blocked
        }
        await setDoc(collaboratorDoc, user)
        updateCollaborators(restaurantDoc)
        await updateUserModelstore(user)
    } catch (error) {
        console.log(error);
    }
}


export async function streamUsersById(db, b_Id) {

    await onSnapshot(query(collection(db, 'collaborators'), where("BusinessId", "==", b_Id),), async (fb) => {
        let list = [];
        fb.docs.forEach(element => {
            let val = element.data();
            list = [...list, {
                name: val.name, contact: val.contacts[0],
                lastLoggedIn:
                    new Date(val.lastLoggedIn.seconds * 1000).toLocaleDateString()
                , role: val.role, status: val.status, uid: val.uid
            }]
        });
        collabListStore.update((e) => {
            return list;
        })
    })

}

export async function updateCollabRoleById(db, c_Id, role) {
    await updateDoc(doc(db, 'collaborators', c_Id), {
        role: role,
    })
}