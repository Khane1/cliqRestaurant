import { setDoc, doc, onSnapshot, query, where, collection, updateDoc } from 'Firebase/firestore';
import { collabListStore } from '../../../stores';


export async function customerOrderToggle(db, B_Id, toggle) {
    await updateDoc(doc(db, 'restaurants', B_Id), {
        orderToggle: toggle
    })
}

