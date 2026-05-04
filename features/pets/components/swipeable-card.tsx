import React, { useCallback, forwardRef, useImperativeHandle } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const SWIPE_OUT_DURATION = 300;

export interface SwipeableCardRef {
  swipeLeft: () => void;
  swipeRight: () => void;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeComplete?: () => void;
}

export const SwipeableCard = forwardRef<SwipeableCardRef, SwipeableCardProps>(
  ({ children, onSwipeLeft, onSwipeRight, onSwipeComplete }, ref) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const SWIPE_DISTANCE = SCREEN_WIDTH * 1.5;
  const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
  const ROTATION_FACTOR = 15;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const executeSwipe = useCallback(
    (direction: "left" | "right") => {
      const multiplier = direction === "left" ? -1 : 1;

      translateX.value = withTiming(
        SWIPE_DISTANCE * multiplier,
        { duration: SWIPE_OUT_DURATION },
        (finished) => {
          if (!finished) return;
          if (direction === "left") {
            scheduleOnRN(onSwipeLeft);
          } else {
            scheduleOnRN(onSwipeRight);
          }
          if (onSwipeComplete) {
            scheduleOnRN(onSwipeComplete);
          }
        }
      );
    },
    [SWIPE_DISTANCE, onSwipeLeft, onSwipeRight, onSwipeComplete, translateX]
  );

  useImperativeHandle(ref, () => ({
    swipeLeft: () => executeSwipe("left"),
    swipeRight: () => executeSwipe("right"),
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const isSwipeOut = Math.abs(event.translationX) > SWIPE_THRESHOLD;
      const direction = event.translationX > 0 ? "right" : "left";

      if (isSwipeOut) {
        scheduleOnRN(executeSwipe, direction);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-ROTATION_FACTOR, 0, ROTATION_FACTOR],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </GestureDetector>
  );
});

SwipeableCard.displayName = "SwipeableCard";
