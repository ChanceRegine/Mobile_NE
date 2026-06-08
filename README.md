# LexiDict - Dictionary Mobile App

A cross-platform dictionary app built with React Native and Expo.

## Features

- Word search with Axios and the Free Dictionary API
- Detailed word view with phonetics, parts of speech, definitions, and examples
- Audio pronunciation with Expo AV
- Local search history with AsyncStorage
- Drawer navigation for Search and History
- Loading, empty, and error states

## Project Structure

```text
App.js
src/
  components/
  context/
  navigation/
  screens/
  services/
  storage/
  utils/
```

## Clean Submission Notes

- The project uses a single navigation system with React Navigation.
- Unused Expo Router starter files and template components were removed.
- Only the dictionary app files and required dependencies are kept.

## API Endpoint

- `GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}`

## Screens

- Search Screen
- Word Detail Screen
- History Screen

## Entities / Models

- `DictionaryEntry`
- `Phonetic`
- `Meaning`
- `Definition`
- `SearchHistoryItem`

## Flow Diagram

```mermaid
flowchart TD
  A[Open App] --> B[Search Screen]
  B --> C[Validate Input]
  C -->|Invalid| D[Show Validation Message]
  C -->|Valid| E[Axios GET Free Dictionary API]
  E -->|Success| F[Store Recent Search]
  F --> G[Open Word Detail Screen]
  G --> H[Show Definitions, Examples, Audio]
  E -->|404| I[Word Not Found Message]
  E -->|Network/Server Error| J[Error Message + Retry]
  B --> K[Tap History Item]
  K --> E
```

## Architecture Diagram

```mermaid
flowchart LR
  APP[App.js] --> NAV[React Navigation Drawer + Stack]
  NAV --> UI[React Native Screens]
  UI --> SVC[Dictionary API Service]
  UI --> STG[AsyncStorage History]
  UI --> AUD[Expo AV Audio Player]
  SVC --> API[Free Dictionary API]
  STG --> UI
  AUD --> OS[Device Audio Output]
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Run on Android:

```bash
npm run android
```

4. Run on iOS:

```bash
npm run ios
```

## Notes

- Search accepts English words only.
- Search history is stored locally and persists after restart.
- Audio playback uses the first valid pronunciation audio returned by the API.
- The app is ready for Android, iOS, and web through Expo.
