import {
    setDoc, doc, getFirestore, collection,
    getDocs, query, where, updateDoc, arrayUnion, getDoc, onSnapshot, limit
} from 'Firebase/firestore';
import { userModelStore, menuListStore, categoryStore, fbMenuStore, businessModelStore, } from '../../../stores';
import { app, auth, updateUserStore } from '../../firebase.js'
import { businessListener, createNewBusiness, roles, updateBusinessStore } from './businessLogic';
import { createUser, streamUsersById, updateCollabRoleById, } from './collabLogic';
import { uploadItemImage } from './ImageUpload';
import { completeOrder, completeOrderItems, getMyOrders, getPendingPayments, OrderItemComplete } from './orders';
import { v4 } from 'uuid'
import { getOrdersByDate } from './historyData';
import { updateProfile } from 'firebase/auth';
import { customerOrderToggle } from './settingsLogic';
export let db = getFirestore(app);
const restaurantDoc = (userId) => doc(db, "restaurants", userId)
const collaboratorDoc = (userId) => doc(db, "collaborators", userId)

const menuDoc = (restaurantId) => doc(db, 'menu', restaurantId)


export async function getAllMyOrders(uid, activeOrders) {
    return await getMyOrders(uid, db)
}
export async function getOrders_ByDate(uid, from, to) {
    return await getOrdersByDate(uid, db, from, to)
}
export async function OrderItem_Complete(uid, dataId) {
    return await OrderItemComplete(uid, dataId, db)
}
export async function complete_Order(uid, customerId, enumComplete) {
    return await completeOrder(uid, customerId, enumComplete, db)
}
export async function complete_OrderItems(uid,name, items, enumComplete) {
    return await completeOrderItems(uid,name, items, enumComplete, db)
}
export async function getPending_Payments(uid) {
    return await getPendingPayments(uid, db);
}
export async function getCategoriesForOrder(name) {
    return await getDocs(query(collection(db, 'restaurants'), where("businessName", "==", name))).then((res) => {
        businessModelStore.update((e) => {
            return { orderToggle: res.docs[0].data().orderToggle, businessName: res.docs[0].data().businessName }
        })
        return res.docs[0].data().BusinessId
    })
}
export async function orderTogglesettings(b_Id, toggle) {
    return await customerOrderToggle(db, b_Id, toggle)
}


export async function getCategories(uid) {
    onSnapshot(query(collection(db, 'restaurants', uid, 'menu')), async (fb) => {
        let list = [];
        if (fb.docs.length != 0) {

            fb.docs.forEach((val) => {
                list = [...list, val.data()]
            })
            categoryStore.update((e) => {
                return { value: list, uid: uid };
            });
        }
    })
}

export async function businessSnapshot(b_Id) {
    await businessListener(restaurantDoc(b_Id))
}
export async function collabListSnapshot(b_Id) {
    streamUsersById(db, b_Id)
}
export async function getMenuItems(uid) {
    onSnapshot(query(collection(db, 'menuItems'), where("menuId", "==", uid), limit(100)), async (fb) => {
        let list = [];
        if (fb.docs.length != 0) {
            fb.docs.forEach((val) => {
                list = [...list, val.data()]
            })
            fbMenuStore.update((e) => {
                return { value: list };
            });
        }
    })
}
///////////////////////Business Signup/////////////////////////////////////////
export async function createBusiness(businessName, userName, uid) {
    return await createNewBusiness(auth, restaurantDoc(businessId), userName, businessName, restaurantDoc, collaboratorDoc(uid))
}
///////////////////////collaborator Signup/////////////////////////////////////////
export async function createCollaborator(businessId, userName, uid) {
    await updateProfile(auth.currentUser, { displayName: userName, });
    await createUser(auth, restaurantDoc(businessId), collaboratorDoc(uid), businessId, roles.unallocated)

    await getDoc(doc(db, "restaurants", businessId)).then(async (business) => {
        await updateBusinessStore(business.data())
        await updateUserStore('authorized')
    })

    location.replace("/home")

    // createNewBusiness(auth, userName, businessName, restaurantDoc,collaboratorDoc(uid))
}
export async function updateCollabRole(c_Id, role) {
    await updateCollabRoleById(db, c_Id, role)
}
// getBusinessByCollaboratorIdQuery
export async function getBusinessId(uid) {
    try {
        let user = (await getDoc(doc(db, "collaborators", uid))).data()
        let business = (await getDoc(doc(db, 'restaurants', user.BusinessId))).data();
        return { user: user, business: business }
    } catch (error) {
        console.log(error);
    }

}

///////////////////////Create_Categories/////////////////////////////////////////
export async function createCategory(data) {
    try {
        return await setDoc(doc(db, 'restaurants', data.menuId, 'menu', data.title), {
            // some additional inputs here...
            name: data.title,
            subMenu: data.submenu,
            menuId: data.menuId,
            categoryId: data.categoryId,
            hasSubmenu: false
        }).then((e) => {
            return { name: data.title, message: 'success', created: true }
        })
    } catch (error) {
        return { name: data.title, message: 'error', created: false }

    }
}

///////////////////////Create_SubItems/////////////////////////////////////////
export async function createSubItems(data, business_id) {
    try {
        console.log(data);
        if (data.submenu != null && data.submenu.length > 0) {
            await data.submenu.forEach(async element => {
                console.log(element);
                await updateDoc(doc(db, 'restaurants', business_id, 'menu', element.cat_name,), {
                    hasSubmenu: true,
                    subMenu: arrayUnion({
                        value: element.value,
                        id: element.id
                    })
                });
            })
            return { name: 'Items Added', message: "success", created: true }

        }
    } catch (error) {
        console.log(error);
        return { name: data.value, message: "Danger", created: false }

    }
}

///////////////////////Create_MenuItem/////////////////////////////////////////
export async function createMenuItem(data) {
    console.log(data);
    try {
        let imageUrl = await uploadItemImage(data, auth);
        let originalName = (data.businessName + '_' + data.name).trim()
        return await setDoc(doc(db, 'menuItems', originalName,), {
            avatar: imageUrl,
            description: data.description,
            itemId: data.itemId,
            name: data.name,
            originalName: originalName,
            price: data.price,
            subItemId: data.subItemId,
            categoryId: data.categoryId,
            menuId: data.businessId,
            pin: false
        }).then((e) => {
            return { name: data.name, message: 'success', created: true }
        })
    } catch (error) {
        console.log(error);
        return { name: data.name, message: 'error', created: false }
    }
}
export async function updateMenuItem(data, originalName, newImage) {
    console.log(data);
    try {
        let imageUrl =
            newImage ?
                await uploadItemImage(data, auth) : data.avatar;
        return await updateDoc(
            doc(db, 'menuItems', data.originalName,
            ), {
            avatar: imageUrl,
            description: data.description,
            itemId: data.itemId,
            name: data.name,
            price: data.price,
            subItemId: data.subItemId,
            categoryId: data.categoryId,
            menuId: data.menuId
        }).then((e) => {
            return { name: data.name, message: 'success', created: true }
        })
    } catch (error) {
        console.log(error);
        return { name: data.name, message: 'error', created: false }
    }
}
export async function updateMenuItemPin(data) {
    console.log(data);
    try {
        return await updateDoc(
            doc(db, 'menuItems', data.originalName,
            ), {
            pin: data.pin,
        }).then((e) => {
            return { name: data.name, message: 'success', created: true }
        })
    } catch (error) {
        console.log(error);
        return { name: data.name, message: 'error', created: false }
    }
}
export async function createOrder(businessId, uid, data, restaurant, tableNum, openTime, orderTime) {
    let orderId = uid;
    return new Promise(async (resolve, reject) => {
        try {
            return await getDoc(doc(db, 'restaurants', businessId, 'orders', orderId,)).then(async (e) => {
                if (e.exists() == false) {//doesn't exist
                    return await setDoc(doc(db, 'restaurants', businessId, 'orders', orderId,), {
                        table: tableNum,
                        restaurant: restaurant,
                        customerId: orderId,
                        openappTimestamp: openTime,
                        orderTimestamp: orderTime,
                        state: 'active',//closed/// closed when paid
                        order: []
                    }).then(async (e) => {
                        return await submitOrder(data, orderId, businessId, orderTime).then((e) => {
                            resolve(e)
                        })
                    })
                } else {
                    console.log(e.data());
                    return await submitOrder(data, orderId, businessId, orderTime).then((e) => {
                        resolve(e)
                    })
                }
            })

        } catch (error) {
            reject(false)
        }
    })
}

async function submitOrder(data, customerId, uid, orderTime) {
    return new Promise((resolve, reject) => {
        return data.forEach(async (order) => {
            let orderId = v4()

            try {
                await setDoc(doc(db, 'restaurants', uid, 'order_detail', orderId), {
                    total: (order.count * order.price),
                    qty: order.count,
                    orderTimestamp: orderTime,
                    category: order.category,
                    name: order.val,
                    price: order.price
                    , notes: order.notes,
                    customerId: customerId,
                    status: 'unserved',//served
                    state: 'active'//paymentPending //complete
                }).then(async (e) => {
                    await updateDoc(doc(db, 'restaurants', uid, 'orders', customerId), {
                        state: 'active',
                        order: arrayUnion({
                            orderId
                        })
                    }).then((e) => {
                        resolve(true);
                    })
                })
            } catch (error) {
                console.log(error);
                reject(false);
            }
        })
    })

}


///////////////////////LoadUserData/////////////////////////////////////////
export async function loadUser(user) {
    let timer = setInterval(async () => {
        console.log(auth.currentUser);
        console.log(user);
        if (auth.currentUser != null) {
            if (user.uid == null || user.uid == undefined) {
                await getDoc(doc(db, 'collaborators', auth.currentUser.uid)).then(async (user) => {
                    console.log(user.data());
                    await userModelStore.update((e) => {
                        return {
                            displayName: auth.currentUser.displayName, email: auth.currentUser.email, uid: auth.currentUser.uid,
                            BusinessId: user.BusinessId,
                            role: user.role,//admin/cashier/manager/kitchen&waiter.waiteress...,  
                            status: user.status,
                        }
                    })
                })
            }
            else if (user.uid == auth.currentUser.uid) {
                await userModelStore.update((e) => {
                    return userTranslate(user, auth)
                })
            }

            clearInterval(timer)
        }
    }, 1000)

}
export var userTranslate = (user, auth) => (
    {
        displayName: auth.currentUser.displayName, email: auth.currentUser.email, uid: auth.currentUser.uid,
        BusinessId: user.BusinessId,
        role: user.role,//admin/cashier/manager/kitchen&waiter.waiteress...,  
        status: user.status,
    })



// if no submenu then the category is the main category