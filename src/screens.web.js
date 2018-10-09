import { Animated, View } from 'react-native';

export function useScreens(shouldUseScreens = true) {
  if (shouldUseScreens) {
    console.warn('react-native-screens is not support on this platform.');
  }
}

export function screensEnabled() {
  return false;
}

export const Screen = Animated.View;

export const ScreenContainer = View;

export const createScreenComponents = (
  wrap = Animated.createAnimatedComponent
) => {
  return {
    Screen:
      wrap === Animated.createAnimatedComponent ? Animated.View : wrap(View),
    ScreenContainer: ContainerComponent,
  };
};
