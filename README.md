# Shelfie

A mobile reading-list app for iOS and Android. Sign up, add the books you are reading with a cover photo from your camera or library, and see your shelf update live.

## Features

- Email and password sign-up and login, with routes split for guests and signed-in users
- Create, view and delete books; each book is private to its owner (per-user read, update and delete permissions)
- Cover photos from the camera or photo library
- Live updates through Appwrite Realtime
- Light and dark themed components

## Stack

React Native 0.86 · Expo 57 · Expo Router · Appwrite (Auth, Databases, Realtime)

## Run it

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator or `a` for Android, or scan the QR code with Expo Go.

The Appwrite endpoint and project ID live in `lib/appwrite.js`. Point them at your own Appwrite project, with a `books` collection, to run against your own backend.
