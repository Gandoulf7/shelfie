import { StyleSheet, Text, Image } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from "react"
import { useBooks } from "../../../hooks/useBooks"

// themed components
import ThemedText from "../../../components/ThemedText"
import ThemedButton from "../../../components/ThemedButton"
import ThemedView from "../../../components/ThemedView"
import Spacer from "../../../components/Spacer"
import ThemedCard from "../../../components/ThemedCard"
import ThemedLoader from "../../../components/ThemedLoader"
import { Colors } from '../../../constants/Colors'

const BookDetails = () => {
  const [book, setBook] = useState(null)

    const { id } = useLocalSearchParams()
    const { fetchBookById, deleteBook } = useBooks()
    const router = useRouter()

    const handleDelete = async () => {
        await deleteBook(id)
        setBook(null)
        router.replace('/books')
    }

    useEffect(() => {
        async function loadBook() {
            const bookData = await fetchBookById(id)
            setBook(bookData)
        }

        loadBook()
    }, [id])

    if (!book) {
        return (
            <ThemedView safe={true} style={styles.container}>
                <ThemedLoader />
            </ThemedView>
        )
    }
  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        {book.Image && (
          <Image source={{ uri: book.Image }} style={{ width: 120, height: 160, alignSelf: 'center', marginBottom: 10, borderRadius: 8 }} />
        )}
        <ThemedText style={styles.title}>{book.title || book.Title}</ThemedText>
        <ThemedText>Written by {book.author || book.Author}</ThemedText>
        <Spacer />

        <ThemedText title={true}>Book description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{book.description || book.Description}</ThemedText>
      </ThemedCard>

      <ThemedButton style={styles.delete} onPress={handleDelete}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
            Delete Book
        </Text>
      </ThemedButton>
    </ThemedView>
  )
}

export default BookDetails

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center"
  }
})