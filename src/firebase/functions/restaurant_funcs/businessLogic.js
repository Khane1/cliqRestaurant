import { updateProfile } from "firebase/auth";
import { setDoc, doc, arrayUnion, updateDoc, onSnapshot } from 'Firebase/firestore';
import { updateUserModelstore, updateUserStore } from "../../firebase";
import { v4 } from "uuid";
import { businessModelStore } from "../../../stores";


export async function createNewBusiness(auth, userName, businessName, restaurantDoc, collaboratorDoc,) {
    let businessId = v4()
    try {
        await updateProfile(auth.currentUser, { displayName: userName, });
        await createBusiness(restaurantDoc, businessName, businessId)
        await createUser(auth, restaurantDoc, collaboratorDoc, businessId, roles.admin)
        location.replace("/home")
    } catch (error) {
        console.debug(error);
    }
}
export async function businessListener(restaurantDoc,) {
    try {
        await onSnapshot(restaurantDoc, async (fb) => {
            if(fb.data().BusinessId!=null){
                businessModelStore.update((e) => {
                    return fb.data();
                })
            }else{
                alert('An error occured')
            }
        })
    } catch (error) {
        console.debug(error);
    }
}

export async function updateCollaborators(restaurantDoc) {
    await updateDoc(restaurantDoc, {
        collaboratorIds: arrayUnion({
            id: auth.currentUser.uid,
        })
    });
}
async function createBusiness(restaurantDoc, businessName, businessId) {
    let business = {
        businessName: businessName,
        BusinessId: businessId,
        adminIds: [auth.currentUser.uid],
        collaboratorIds: [],
        location: '',
        contacts: [{
            email: auth.currentUser.email,

        }],
        orderToggle:false
    }
    await setDoc(restaurantDoc(businessId), business);
    await updateBusinessStore(business)
    await updateUserStore('authorized')
}
export function updateBusinessStore(val) {
    businessModelStore.update((e) => {
        return val;
    })
}

export let roles = { admin: 'admin', manager: 'manager', cashier: 'cashier', attendant: 'attendant', unallocated: 'unallocated' }


