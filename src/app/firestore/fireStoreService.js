import cuid from 'cuid';
import firebase from '../config/firebase';

const db = firebase.firestore();

export const  dataFromSnapshot = (snapshot) => {

    if (!snapshot.exists) 
        return undefined;
        const data = snapshot.data();
        return {

            ...data,
            id:snapshot.id,
            date: data.date?.toDate(),
            createdAt:data.createdAt?.toDate(),
            updatedAt:data.updatedAt?.toDate()
            
        }
}

export const listenToEventsFromFirestore = () => {
    return db.collection('events').orderBy('updatedAt', 'desc');
}

export const listenToEventFromFirestore = (eventId) => {
    return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event) {
    return db.collection('events').add({
        ...event,
        hostedBy:'Diana',
        hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id:cuid(),
            name:'Diana',
            photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'
        })
    })
}

export function updateEventInFirestore(event){
    return db.collection('events').doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId){
    return db.collection('events').doc(eventId).delete();
}

export function setUserProfileData(user){
    return db.collection('users').doc(user.uid).set({
        displayName:user.displayName,
        email:user.email,
        photoURL:user.photoURL || null,
        createdAt:firebase.firestore.FieldValue.serverTimestamp()
    })
}

export function getUserProfile(userId){
    return db.collection('users').doc(userId);
}

export async function updateUserProfile(profile) {
    const user = firebase.auth().currentUser;
    try {
      if (user.displayName !== profile.displayName) {
        await user.updateProfile({
          displayName: profile.displayName,
        });
      }
      return await db.collection('users').doc(user.uid).update(profile);
    } catch (error) {
      throw error;
    }
  }

  export async function updateUserProfilePhoto(downloadURL, filename) {
    const user = firebase.auth().currentUser;
    const userDocRef = db.collection('users').doc(user.uid);
    try {
      const userDoc = await userDocRef.get();
      if (!userDoc.data().photoURL) {
        await db.collection('users').doc(user.uid).update({
          photoURL: downloadURL,
        });
        await user.updateProfile({
          photoURL: downloadURL,
        });
      }
      return await db.collection('users').doc(user.uid).collection('photos').add({
        name: filename,
        url: downloadURL,
      });
    } catch (error) {
      throw error;
    }
  }

  export function getUserPhotos(uid){
      return db.collection('users').doc(uid).collection('photos');
  }

  export async function setMainPhoto(photo){
    const user = firebase.auth().currentUser;
    try {
        await db.collection('users').doc(user.uid).update({
            photoURL:photo.url
        })
        return await user.updateProfile({
            photoURL: photo.url
        })

    } catch (error) {
        throw error;
    }
  }

  export function deletePhotoFromCollection(photoId){
    const userUid = firebase.auth().currentUser.uid;
    return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete();
  }