import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import SearchScreen from '../screens/SearchScreen';
import WordDetailScreen from '../screens/WordDetailScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

function HeaderIconButton({ onPress, icon, subtle = false }) {
  return (
    <Pressable onPress={onPress} style={[styles.headerIconButton, subtle && styles.headerIconButtonSubtle]}>
      <Ionicons name={icon} size={20} color={subtle ? colors.primary : colors.text} />
    </Pressable>
  );
}

function SearchHeaderTitle() {
  return (
    <View style={styles.headerTitleWrap}>
      <Text style={styles.headerEyebrow}>LexiDict</Text>
      <Text style={styles.headerTitle}>Search</Text>
    </View>
  );
}

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { fontWeight: '800', color: colors.text },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="SearchHome"
        component={SearchScreen}
        options={({ navigation }) => ({
          headerTitle: () => <SearchHeaderTitle />,
          headerLeft: () => (
            <HeaderIconButton onPress={() => navigation.getParent()?.toggleDrawer()} icon="grid-outline" />
          ),
          headerRight: () => <HeaderIconButton onPress={() => {}} icon="sparkles-outline" subtle />,
        })}
      />
      <Stack.Screen
        name="WordDetails"
        component={WordDetailScreen}
        options={({ navigation }) => ({
          title: 'Word Details',
          headerLeft: () => (
            <HeaderIconButton onPress={() => navigation.goBack()} icon="chevron-back" />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconButtonSubtle: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.drawerBorder,
  },
  headerTitleWrap: {
    gap: 1,
  },
  headerEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
});
