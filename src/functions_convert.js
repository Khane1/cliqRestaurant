import { checkIfConnected } from './appscripts';
import { createCategory, createSubItems, createMenuItem, getCategories, getMenuItems, getCategoriesForOrder, updateMenuItem } from './firebase/functions/restaurant_funcs/restaurants';
import { categoryStore, createCategorySteps, fbMenuStore, } from './stores';

export async function submitCategory(data) {
  // changeToNextScreen(number)
  return await createCategory(data)
  // return await checkIfConnected(data)
}
export async function submitSubMenu(data) {
  // changeToNextScreen(number)
  return await createSubItems(data)
  // return await checkIfConnected(data)
}
export async function submitItems(data) {
  return await createMenuItem(data)
}
export async function submitItemUpdate(data,O_name,newImage) {
  return await updateMenuItem(data,O_name, newImage)
}
export function changeToNextScreen(number) {
  createCategorySteps.update((e) => {
    return { pn: number };
  });
}
export function getfbCategories(uid) {
  getfbMenu(uid);
  getCategories(uid);
}
export function customerOrder(name){
  getCategoriesForOrder(name).then(async (val)=>{
    getfbCategories(val)
  })
}

export function getfbMenu(uid) {
  getMenuItems(uid);
}
