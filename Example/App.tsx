import React from 'react';
import {ScrollView, SafeAreaView, StyleSheet, Text} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {MenuItem} from './src/shared';

import SimpleNativeStack from './src/screens/SimpleNativeStack';
import StackPresentation from './src/screens/StackPresentation';
import HeaderOptions from './src/screens/HeaderOptions';
import StatusBar from './src/screens/StatusBar';
import Animations from './src/screens/Animations';
import BottomTabsAndStack from './src/screens/BottomTabsAndStack';
import StackReactNavigation4 from './src/screens/StackReactNavigation4';
import Modals from './src/screens/Modals';

enableScreens();

const SCREENS: Record<
  string,
  {
    title: string;
    component: () => JSX.Element;
    type: 'example' | 'playground';
  }
> = {
  SimpleNativeStack: {
    title: 'Simple Native Stack',
    component: SimpleNativeStack,
    type: 'example',
  },
  StackPresentation: {
    title: 'Stack Presentation',
    component: StackPresentation,
    type: 'example',
  },
  BottomTabsAndStack: {
    title: 'Bottom tabs and native stack',
    component: BottomTabsAndStack,
    type: 'example',
  },
  Modals: {
    title: 'Modals',
    component: Modals,
    type: 'example',
  },
  StackReactNavigation4: {
    title: 'Stack react-navigation v4',
    // @ts-ignore react-navigation v4 AppNavigator type
    component: StackReactNavigation4,
    type: 'example',
  },
  HeaderOptions: {
    title: 'Header Options',
    component: HeaderOptions,
    type: 'playground',
  },
  StatusBar: {
    title: 'Status bar (iOS)',
    component: StatusBar,
    type: 'playground',
  },
  Animations: {
    title: 'Animations',
    component: Animations,
    type: 'playground',
  },
};

type RootStackParamList = {
  Main: undefined;
} & {
  [P in keyof typeof SCREENS]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface MainScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
}

const MainScreen = ({navigation}: MainScreenProps): JSX.Element => (
  <ScrollView>
    <SafeAreaView>
      <Text style={styles.label}>Examples</Text>
      {Object.keys(SCREENS)
        .filter((name) => SCREENS[name].type === 'example')
        .map((name) => (
          <MenuItem
            key={name}
            title={SCREENS[name].title}
            onPress={() => navigation.navigate(name)}
          />
        ))}
      <Text style={styles.label}>Playgrounds</Text>
      {Object.keys(SCREENS)
        .filter((name) => SCREENS[name].type === 'playground')
        .map((name) => (
          <MenuItem
            key={name}
            title={SCREENS[name].title}
            onPress={() => navigation.navigate(name)}
          />
        ))}
    </SafeAreaView>
  </ScrollView>
);

const ExampleApp = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        statusBarStyle: 'dark',
      }}>
      <Stack.Screen
        name="Main"
        options={{title: '📱 React Native Screens Examples'}}
        component={MainScreen}
      />
      {Object.keys(SCREENS).map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          getComponent={() => SCREENS[name].component}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: 'black',
    margin: 10,
    marginTop: 15,
  },
});

export default ExampleApp;