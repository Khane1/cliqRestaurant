import { checkIfConnected } from './appscripts';
import { createCategory, createSubItems, createMenuItem, getCategories, getMenuItems, getCategoriesForOrder, updateMenuItem, getPending_Payments, getAllMyOrders, getOrders_ByDate, businessSnapshot } from './firebase/functions/restaurant_funcs/restaurants';
import { getDateToday } from './func_essential';
import { categoryStore, createCategorySteps, fbMenuStore, } from './stores';

export async function submitCategory(data) {
  // changeToNextScreen(number)
  return await createCategory(data)
  // return await checkIfConnected(data)
}
export async function submitSubMenu(data, b_id) {
  // changeToNextScreen(number)
  return await createSubItems(data, b_id)
  // return await checkIfConnected(data)
}
export async function submitItems(data) {
  return await createMenuItem(data)
}
export async function submitItemUpdate(data, O_name, newImage) {
  return await updateMenuItem(data, O_name, newImage)
}
export function changeToNextScreen(number) {
  createCategorySteps.update((e) => {
    return { pn: number };
  });
}
export async function getfbCategories(uid) {
  await getfbMenu(uid);
  await getCategories(uid);
}
export function customerOrder(name) {
  getCategoriesForOrder(name).then(async (val) => {
    getfbCategories(val)
  })
}

export async function getfbMenu(uid) {
  await getMenuItems(uid);
}

export async function onLoadApp(uid) {
  try {
    await getfbCategories(uid);
    await getPending_Payments(uid);
    await getAllMyOrders(uid, []);
    await historyOnAppStart(uid);
    await businessSnapshot(uid);
  } catch (error) {
    console.log(error);
  }
}

async function historyOnAppStart(uid) {
  let date = getDateToday();
  let from = date.year + '-' + date.month + '-' + (date.day - 1);
  let to = date.year + '-' + date.month + '-' + (date.day);

  await getOrders_ByDate(uid, from, to)//from and to
}

