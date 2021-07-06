import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Grid, Header, Button, Tab, Card, Image } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import { deleteFromFirebaseStorage } from "../../../app/firestore/firebaseService";
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from "../../../app/firestore/fireStoreService";
import useFirestoreCollection from "../../../app/hooks/useFireStoreCollection";
import { listenToUserPhotos } from "../profileActions";

export default function PhotosTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  const { photos } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  const dispatch = useDispatch();
  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  const handleUpdateMainPhoto = async (photo, target) => {
    try {
      setUpdating({ isUpdating: true, target });
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeletePhoto = async (photo, target) => {
    setDeleting({
      isDeleting: true,
      target,
    });
    try {
      console.log(photo);
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Add photo"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group>
                    <Button
                      name={photo.id}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      onClick={(e) =>
                        handleUpdateMainPhoto(photo, e.target.name)
                      }
                      disabled={photo.url === profile.photoURL}

                      basic
                      color='green'
                      content='Main'
                    />
                    <Button
                      name={photo.id}
                      loading={deleting.isDeleting && photo.id === deleting.target}
                      disabled={photo.url === profile.photoURL}

                      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                      basic
                      color='red'
                      content='trash'
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
