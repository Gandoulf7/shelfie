import { Client, Account, Avatars, Databases, Storage } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint("https://sfo.cloud.appwrite.io/v1") // Your Appwrite Endpoint
    .setProject("6982c0fe0016abd6bfb1")
    .setEndpoint("https://sfo.cloud.appwrite.io/v1")

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
