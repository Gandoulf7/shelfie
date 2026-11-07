import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors.js'
import { useState} from 'react'
import { useUser } from '../../hooks/useUser.js'

// Themed components
import ThemedView from '../../components/ThemedView.jsx'
import ThemedText from '../../components/ThemedText.jsx'
import Spacer from '../../components/Spacer.jsx'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput.jsx'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const { login } = useUser() // Get the user and login function from context
    
    const handleSubmit = async() => {
        setError(null) // Clear previous errors

        try {
            await login(email, password)
        } catch (error) {
            setError(error.message) // Set the error message to display to the user
        }
    }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style={styles.container}>

        <Spacer />
        <ThemedText style={styles.title} title={true}>
            Login To Your Account
        </ThemedText>

        <ThemedTextInput 
            style={{width: "80%", marginBottom: 20}}
            placeholder="Email" 
            keyBoardType="email-address"
            onChangeText={setEmail}
            value={email}
        />

        <ThemedTextInput 
            style={{width: "80%", marginBottom: 20}}
            placeholder="Password" 
            onChangeText={setPassword}
            value={password}
            secureTextEntry
        />

         <ThemedButton onPress={handleSubmit}>
            <Text style={{color: "#f2f2f2" }}>Login</Text>
         </ThemedButton>

         <Spacer />
            {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={100} />
        <Link href="/register">
            <ThemedText style ={{textAlign: "center"}}>
                Register instead
            </ThemedText>
        </Link>

    </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
    pressed: {
        opacity: 0.8,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
})