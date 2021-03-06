import { toast } from "react-toastify";
import firebase from "../config/firebase";
import { setUserProfileData } from "./fireStoreService";

export function firebaseObjectToArray(snapshot){
  if(snapshot){
    return Object.entries(snapshot).map(e => Object.assign({}, e[1], {id:e[0]}));
  }
}

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFromFirebase() {
  return firebase.auth().signOut();
}


export async function registerInFirebase(creds){

  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password);
    await result.user.updateProfile({
      displayName:creds.displayName,
    });
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword1);
}

export function uploadToFirebaseStorage(file, filename){
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref(); 
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export function deleteFromFirebaseStorage(filename){
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
  return photoRef.delete();
}

export function addEventChatComment(eventId, values){
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName:user.displayName,
    photoURL: user.photoURL,
    uid:user.uid,
    text:values.comment,
    date:Date.now(),
    parentId: values.parentId
  }

  return firebase.app().database('https://revents-99de8-default-rtdb.europe-west1.firebasedatabase.app').ref(`chat/${eventId}`).push(newComment);
}

export function getEventChatRef(eventId) {
  return firebase.app().database('https://revents-99de8-default-rtdb.europe-west1.firebasedatabase.app').ref(`chat/${eventId}`).orderByKey();
}