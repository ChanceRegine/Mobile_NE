import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { DictionaryProvider } from './src/context/DictionaryContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

export default function App() {
  return (
    <DictionaryProvider>
      <NavigationContainer theme={appTheme}>
        <RootNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </DictionaryProvider>
  );
}
