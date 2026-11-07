import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Image, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useBooks } from "../../hooks/useBooks"
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'

// themed components
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedTextInput from "../../components/ThemedTextInput"
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'


const Create = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    async function requestPermissions() {
      const mediaResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      const cameraResult = await ImagePicker.requestCameraPermissionsAsync()
      setHasPermission(mediaResult.granted && cameraResult.granted)
    }
    requestPermissions()
  }, [])

  const pickImage = async () => {
    if (!hasPermission) {
      alert('Camera and media library permissions are required to select a book image.')
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    if (!hasPermission) {
      alert('Camera and media library permissions are required to take a book photo.')
      return
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const { createBook } = useBooks()
  const router = useRouter()

  async function handleSubmit()  {
    if (!title.trim() || !author.trim() || !description.trim()) return

    setLoading(true)

    try {
      await createBook({ Title: title, Author: author, Description: description, Image: image })

      setTitle("")
      setAuthor("")
      setDescription("")
      setImage(null)

      router.replace('/books')
    } catch (error) {
      alert(error?.message || 'Failed to create book')
    } finally {
      setLoading(false)
    }
  }

  return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <ThemedView style={styles.container}>

        <ThemedText title={true} style={styles.heading}>
          Add a New Book
        </ThemedText>

        <Spacer />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ThemedButton onPress={pickImage} style={{ marginRight: 10 }}>
            <Text style={{ color: '#fff' }}>Pick Image</Text>
          </ThemedButton>
          <ThemedButton onPress={takePhoto}>
            <Text style={{ color: '#fff' }}>Take Photo</Text>
          </ThemedButton>
        </View>
        {image && (
          <Image source={{ uri: image }} style={{ width: 120, height: 160, alignSelf: 'center', marginVertical: 10, borderRadius: 8 }} />
        )}
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          placeholder="Book Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: '#fff' }}>
            {loading ? "Saving..." : "Create Book"}
          </Text>
        </ThemedButton>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
})