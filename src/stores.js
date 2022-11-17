import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
import { writable } from 'svelte/store'

export function notifyUser(text, addNotification, type) {
    /// Warning Default Success Danger
    addNotification({
        text: text.length == 0 ? "Done" : text,
        position: "bottom-center",
        type: type,
        removeAfter: 5000,
    });
}
export let pageNameStore = writable([]);
export let userStore = persist(writable([]), createLocalStorage(), 'userStore')
export let userModelStore = persist(writable([]), createLocalStorage(), 'currentUser')
export let businessModelStore = persist(writable([]), createLocalStorage(), 'currentBusiness')
export let categoryStore = persist(writable([]), createLocalStorage(), 'categoryStore')
export let fbMenuStore = persist(writable([]), createLocalStorage(), 'fbMenuStore')
export let customerOrderStore = writable([]);
export let emailStore = writable([]);
export let collabBusinessId= persist(writable([]), createLocalStorage(), 'collabBusinessId')
export let customerOrderHistory = persist(writable([]), createLocalStorage(), 'customerOrderHistory')
export let customerOrderListStore = writable([]);
export let activeOrderStore = writable([])
export let pendingPaymentStore = writable([])
export let activeOrderItemDetailStore = writable([])
export let historyDataStore = writable([])
export let editItemDetailStore =  persist(writable([]), createLocalStorage(), 'editItemDetailStore')
export let collabListStore =  persist(writable([]), createLocalStorage(), 'collabListStore')



export let activeCompleteItemStore = writable([])

export function clearMemory(){
    categoryStore.update((e)=>[])
    fbMenuStore.update((e)=>[])
    customerOrderHistory.update((e)=>[])
}


export let businessNewUserStore = writable([]);
export let createCategorySteps = writable([])
export let myMenuPages = writable([])
export let myDashBoardPages = writable([])
export let menuListStore = writable([])
export let screenSizeStore = writable([])
export let downloadQrTableStore = writable([])





export let listStore = (itemId) => ({
    itemId: itemId,
    name: 'fresh foods',
    description: 'Description',
    price: 3999,
    avatar: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
});


export let list2Store = (itemId) => ({
    itemId: itemId,
    name: 'Papetolliu mexican',
    description: 'Description',
    price: 10500,
    avatar: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
});
