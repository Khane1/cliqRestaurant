import { updateProfile } from "firebase/auth";
import { setDoc } from 'Firebase/firestore';
import { updateUserStore } from "../../firebase";


export async function createNewBusiness(auth, userName, businessName, restaurantDoc) {
    try {
        await updateProfile(auth.currentUser, { displayName: businessName });
        await setDoc(restaurantDoc, {
            username: userName,
            email: auth.currentUser.email,
            businessName: businessName
        });
        await updateUserStore('authorized')
        location.replace("/home")
    } catch (error) {
        console.log(error);
    }
}
