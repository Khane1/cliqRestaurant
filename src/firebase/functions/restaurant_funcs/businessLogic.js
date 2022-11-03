import { updateProfile } from "firebase/auth";
import { setDoc,doc } from 'Firebase/firestore';
import { updateUserStore } from "../../firebase";
import { v4 } from "uuid";
import { businessModelStore } from "../../../stores";


export async function createNewBusiness(auth, userName, businessName, restaurantDoc,collaboratorDoc) {
    let businessId = v4()
    try {
        await updateProfile(auth.currentUser, { displayName: userName, });
        await setDoc(collaboratorDoc, {
            uid: auth.currentUser.uid,
            BusinessId: businessId,
            contacts: [{ email: auth.currentUser.email }, { phoneNumber:'' }],
            role: 'admin',//admin/cashier/manager/kitchen&waiter.waiteress...,  
            lastLoggedIn: new Date(),
            status: 'active'//active/inactive/blocked
        })
        let business={
            businessName: businessName,
            BusinessId: businessId,
            adminIds: [auth.currentUser.uid],
            collaboratorIds: [],
            location: '',
            contacts: [{
                email: auth.currentUser.email,

            }]
        }
        await setDoc(restaurantDoc(businessId),business );
        await updateBusinessStore(business)
        await updateUserStore('authorized')
        location.replace("/home")
    } catch (error) {
        console.log(error);
    }
}

function updateBusinessStore(val){
    businessModelStore.update((e)=>{
        return val;
    })
}