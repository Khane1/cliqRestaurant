import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
const storage = getStorage();
const storageRef = (restaurant, ref_child) => ref(storage, (restaurant + '/' + ref_child + '.jpg'))

///////////////////////Image_Upload/////////////////////////////////////////
export async function uploadItemImage(data,auth) {
    try {
        const image = data.avatar;
        let snapshot = await uploadString(storageRef(auth.currentUser.displayName, data.name), image, 'data_url');
        // console.log('Uploaded a data_url string!');
        let url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.log(error);
    }
}