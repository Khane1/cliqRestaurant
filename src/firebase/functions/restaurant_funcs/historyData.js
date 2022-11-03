import { doc, onSnapshot, query, collection, where, updateDoc, arrayUnion, orderBy, } from "@firebase/firestore";
import { dateTransfer, getDateToday } from "../../../func_essential";
import { historyDataStore } from "../../../stores";

export async function getOrdersByDate(uid, db, from, to) {
    try {
        historyDataStore.update((e) => {
            return [];
        })
        const conditions = [where('state', '==', 'complete'), where('orderTimestamp', '>=', new Date(from)), where('orderTimestamp', '<', new Date(dateTransfer(to)))]

        let qry = query(collection(db, 'restaurants', uid, 'order_detail'), ...conditions);
        onSnapshot(qry, async (val) => {
            console.log('value');
            let x = [];
            val.docs.forEach((e) => {
                x = [...x, e.data()]
            })
            historyDataStore.update((e) => {
                return x;
            })
        })
    } catch (error) {
        console.debug(error);
    }
}