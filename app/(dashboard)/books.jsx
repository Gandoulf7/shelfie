import { StyleSheet, FlatList, Pressable, Image } from 'react-native'
import { useBooks } from "../../hooks/useBooks"
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from "../../components/ThemedCard"

const Books = () => {
  const { books } = useBooks()
  const router = useRouter()
  return (
    <ThemedView style={styles.container} safe={true}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>

      <Spacer/>
      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const imageUrl = item.Image || null
          return (
            <Pressable onPress={() => router.push(`/books/${item.$id}`)}>
              <ThemedCard style={styles.card}>
                {imageUrl && (
                  <Image source={{ uri: imageUrl }} style={{ width: 60, height: 80, borderRadius: 6, alignSelf: 'center', marginBottom: 8 }} />
                )}
                <ThemedText style={styles.title}>{item.Title}</ThemedText>
                <ThemedText>Written by {item.Author}</ThemedText>
              </ThemedCard>
            </Pressable>
          )
        }}
      />


    </ThemedView>
  )
}

export default Books

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
})