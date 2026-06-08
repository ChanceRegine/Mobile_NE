import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import StackNavigator from './StackNavigator';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useDictionary } from '../context/DictionaryContext';
import { colors } from '../theme/colors';

const Drawer = createDrawerNavigator();

function HeaderIconButton({ onPress, icon }) {
  return (
    <Pressable onPress={onPress} style={styles.headerButton}>
      <Ionicons name={icon} size={20} color={colors.text} />
    </Pressable>
  );
}

function DrawerHeaderTitle({ title }) {
  return (
    <View style={styles.screenHeaderTitle}>
      <Text style={styles.screenHeaderEyebrow}>LexiDict</Text>
      <Text style={styles.screenHeaderText}>{title}</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  const { history, searchWord } = useDictionary();

  const openHistoryWord = async (word) => {
    const result = await searchWord(word);
    if (result.ok) {
      props.navigation.navigate('SearchStack', { screen: 'WordDetails' });
      props.navigation.closeDrawer();
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerScroll}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerBadge}>LexiDict</Text>
        <Text style={styles.drawerTitle}>Menu</Text>
        <Text style={styles.drawerSubtitle}>Open a screen or pick a recent searched word.</Text>
      </View>

      <View style={styles.menuSection}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.historySection}>
        <View style={styles.historyHeading}>
          <Text style={styles.historyTitle}>Recent Searches</Text>
          <Ionicons name="time-outline" size={16} color={colors.textSoft} />
        </View>
        {history.length ? (
          history.map((item) => (
            <Pressable
              key={item}
              style={styles.historyChip}
              onPress={() => openHistoryWord(item)}>
              <Ionicons name="search-outline" size={16} color={colors.primary} />
              <Text style={styles.historyChipText}>{item}</Text>
            </Pressable>
          ))
        ) : (
          <Text style={styles.historyEmpty}>No searches yet.</Text>
        )}
      </View>

      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
        labelStyle={styles.closeLabel}
        style={styles.closeItem}
        icon={() => <Ionicons name="close-outline" size={18} color={colors.textMuted} />}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerStyle: { backgroundColor: colors.background, width: 304 },
        drawerLabelStyle: { marginLeft: -12, fontWeight: '700', fontSize: 15 },
        sceneStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text, fontWeight: '800' },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        drawerItemStyle: {
          borderRadius: 16,
          marginHorizontal: 0,
          marginVertical: 4,
          paddingHorizontal: 6,
        },
        drawerActiveBackgroundColor: colors.primarySoft,
      }}>
      <Drawer.Screen
        name="SearchStack"
        component={StackNavigator}
        options={{
          title: 'Search',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={({ navigation }) => ({
          headerTitle: () => <DrawerHeaderTitle title="History" />,
          headerLeft: ({ tintColor }) => (
            <HeaderIconButton onPress={() => navigation.navigate('SearchStack')} icon="chevron-back" />
          ),
          headerRight: ({ tintColor }) => (
            <HeaderIconButton onPress={() => navigation.toggleDrawer()} icon="menu-outline" />
          ),
          drawerIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: () => <DrawerHeaderTitle title="Profile" />,
          headerLeft: ({ tintColor }) => (
            <HeaderIconButton onPress={() => navigation.navigate('SearchStack')} icon="chevron-back" />
          ),
          headerRight: ({ tintColor }) => (
            <HeaderIconButton onPress={() => navigation.toggleDrawer()} icon="menu-outline" />
          ),
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        })}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerScroll: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  drawerHeader: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  drawerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    color: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    overflow: 'hidden',
    fontWeight: '800',
    fontSize: 12,
  },
  drawerTitle: {
    marginTop: 12,
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  drawerSubtitle: {
    marginTop: 6,
    color: colors.textMuted,
    lineHeight: 21,
  },
  menuSection: {
    marginTop: 14,
    borderRadius: 22,
    backgroundColor: colors.surface,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historySection: {
    marginTop: 12,
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },
  historyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 14,
    marginBottom: 8,
  },
  historyChipText: {
    color: colors.text,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  historyEmpty: {
    color: colors.textSoft,
  },
  closeItem: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeLabel: {
    color: colors.textMuted,
    fontWeight: '800',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenHeaderTitle: {
    gap: 1,
  },
  screenHeaderEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  screenHeaderText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
});
