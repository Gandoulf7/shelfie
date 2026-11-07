import { StyleSheet, Text } from 'react-native'
import{ Link } from 'expo-router'


// Themed components
import ThemedView from '../components/ThemedView.jsx'
import ThemedLogo from '../components/ThemedLogo.jsx'
import ThemedText from '../components/ThemedText.jsx'
import Spacer from '../components/Spacer.jsx'

const Home  = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer height={20} />

      <ThemedText style={styles.title} title={true}>
        The Number 1
      </ThemedText>

      <Spacer height={10} />
      <ThemedText>Reading List App</ThemedText>
      <Spacer />

      <Link style={styles.link} href="/login">
      <ThemedText>Login Page</ThemedText>
      </Link>

      <Link style={styles.link} href="/register">
      <ThemedText>Register Page</ThemedText>
      </Link>

       <Link style={styles.link} href="/profile">
      <ThemedText>Profile Page</ThemedText>
      </Link>


    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    },
})