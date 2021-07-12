import * as React from 'react';
import {Button, Alert} from 'react-native';
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "react-native-screens/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{stackPresentation: 'push', preventSwipeDismiss: true, onSwipeCancelled: () => console.warn('swipe cancelled')}}>
        <Stack.Screen name="First" component={First} />
        <Stack.Screen
          name="Second"
          component={Second}
          options={{gestureEnabled: true}}
        />
        <Stack.Screen
          name="Modal"
          component={Second}
          options={{gestureEnabled: true, stackPresentation: 'modal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function First({navigation}: {navigation: NativeStackNavigationProp<ParamListBase>}) {
  return (
    <>
      <Button title="Tap me for second screen" onPress={() => navigation.navigate('Second')} />
      <Button title="Tap me for Modal" onPress={() => navigation.navigate('Modal')} />
    </>
  );
}

function Second({navigation}: {navigation: NativeStackNavigationProp<ParamListBase>}) {
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation]
  );

  return (
    <Button title="Tap me to go back" onPress={() => navigation.goBack()} />
  );
}
