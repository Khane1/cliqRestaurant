import { doc, onSnapshot, query, collection, where, updateDoc, arrayUnion, orderBy,limit } from "@firebase/firestore";
import { activeOrderItemDetailStore, activeOrderStore, pendingPaymentStore } from "../../../stores";


export async function getMyOrders(uid, activeOrders,db) {
    console.log(activeOrders);
    try {
        const conditions = [orderBy('orderTimestamp'), where('state', '==', 'active'),limit(100)]
        let qry = query(collection(db, 'restaurants', uid, 'orders'), ...conditions);
        let detailsQry = query(collection(db, 'restaurants', uid, 'order_detail'), where('state', '==', 'active'),limit)
        onSnapshot(qry, async (val) => {
            activeOrderStore.update((e) => {
                return val.docs
            })
            onSnapshot(detailsQry, async (val) => {
                console.log(val.docs);
                let x = [];
                val.docs.forEach((e) => { x = [...x, { data: e.data(), id: e.id }] })
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

export async function getPendingPayments(uid,db) {
    try {
        const conditions = [orderBy('orderTimestamp'), where('state', '==', 'payment_pending',limit(100))]
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

export async function OrderItemComplete(uid, dataId,db) {
    try {
        return await updateDoc(doc(db, 'restaurants', uid, 'order_detail', dataId), {
            status: 'served',
        });
    } catch (error) {
        console.log(error);
    }
}
export async function completeOrder(uid, customerId, enumComplete,db) {
    try {
        await updateDoc(doc(db, 'restaurants', uid, 'orders', customerId), {
            state: enumComplete,
        });
    } catch (error) {
        console.log(error);
    }
}


export let enumComplete = {
    pending: 'payment_pending',
    paid: 'complete'
}