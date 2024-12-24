import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };
  const storage = getStorage();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const storageRef = ref(storage, path);
      const url = await getDownloadURL(storageRef);
      setAvatarUrl(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Error', 'Failed to download image.');
    }
  }

  async function uploadImage() {
    try {
      setUploading(true);
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri } = result.assets[0];
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `avatars/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Handle progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Error uploading image:', error);
            setUploading(false);
            Alert.alert('Error', 'Failed to upload image.');
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setAvatarUrl(downloadURL);
            onUpload(downloadURL);
            setUploading(false);
          }
        );
      } else {
        setUploading(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      Alert.alert('Error', 'Failed to upload image.');
    }
  }

  return (
    <View style={styles.container}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={[styles.avatar, avatarSize]} />
      ) : (
        <View style={[styles.avatar, avatarSize]} />
      )}
      <Button title="Upload" onPress={uploadImage} disabled={uploading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 75,
    backgroundColor: '#ccc',
  },
});