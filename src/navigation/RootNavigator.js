import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DrawerNavigator from './DrawerNavigator';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { useDictionary } from '../context/DictionaryContext';
import { colors } from '../theme/colors';

const RootStack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View style={styles.loadingScreen}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

export default function RootNavigator() {
  const { profile, profileLoading } = useDictionary();

  if (profileLoading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text, fontWeight: '800' },
        headerTintColor: colors.text,
      }}>
      {!profile ? (
        <>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'Sign In',
              headerShadowVisible: false,
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()} style={styles.headerButton}>
                  <Ionicons name="chevron-back" size={22} color={colors.text} />
                </Pressable>
              ),
            })}
          />
        </>
      ) : (
        <RootStack.Screen name="MainDrawer" component={DrawerNavigator} />
      )}
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    marginRight: 12,
    padding: 4,
  },
});
