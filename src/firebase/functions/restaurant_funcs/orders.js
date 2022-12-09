import { doc, onSnapshot, query, collection, where, updateDoc, arrayUnion, orderBy } from "@firebase/firestore";
import { async } from "@firebase/util";
import { activeOrderItemDetailStore, activeOrderStore, pendingPaymentStore } from "../../../stores";


export async function getMyOrders(uid, db) {
    try {
        const conditions = [orderBy('orderTimestamp'), where('state', '==', 'active'),]
        let qry = query(collection(db, 'restaurants', uid, 'orders'), ...conditions);
        let detailsQry = query(collection(db, 'restaurants', uid, 'order_detail'), where('state', '==', 'active'))
        onSnapshot(qry, async (val) => {
            activeOrderStore.update((e) => {
                return val.docs
            })
            onSnapshot(detailsQry, async (val) => {
                console.log(val.docs);
                let x = [];
                val.docs.forEach((e) => {
                    console.log(e);
                    x = [...x, { data: e.data(), id: e.id }]
                })
                activeOrderItemDetailStore.update((e) => {
                    return x
                })
            })

            console.log(val.docs);
        })
    } catch (error) {
        console.log(error);
    }
}

export async function getPendingPayments(uid, db) {
    try {
        const conditions = [orderBy('orderTimestamp'), where('state', '==', 'payment_pending')]
        let qry = query(collection(db, 'restaurants', uid, 'orders'), ...conditions);
        onSnapshot(qry, async (val) => {
            pendingPaymentStore.update((e) => {
                return val.docs
            })
            // console.log(val.docs);
        })
    } catch (error) {
        console.log(error);
    }
}

export async function OrderItemComplete(uid, dataId, db) {
    try {
        return await updateDoc(doc(db, 'restaurants', uid, 'order_detail', dataId), {
            status: 'served',
        });
    } catch (error) {
        console.log(error);
    }
}
export async function completeOrder(uid, customerId, enumComplete, db) {
    try {
        await updateDoc(doc(db, 'restaurants', uid, 'orders', customerId), {
            state: enumComplete,
        })
    } catch (error) {
        console.log(error);
    }
}

export async function completeOrderItems(uid,name, items, enumComplete, db) {
    try {
        items.forEach(async (e) => {
            await updateDoc(doc(db, 'restaurants', uid, 'order_detail', e.id), {
                state: enumComplete,
                servedBy:name
            })
        })
    } catch (error) {
        console.log(error);
    }
}

export let enumComplete = {
    pending: 'payment_pending',
    paid: 'complete'
}