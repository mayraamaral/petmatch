import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SittingCatSvg from "@/assets/images/sitting-cat.svg";
import SittingDogSvg from "@/assets/images/sitting-dog.svg";
import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { tokens } from "@/constants/tokens";

const splashCream = "#FFD2A6";
const splashGlow = "rgba(255, 210, 166, 0.16)";

export function SplashLoader() {
  return (
    <View style={styles.container}>
      <View style={[styles.glow, styles.topGlow]} />
      <View style={[styles.glow, styles.bottomGlow]} />

      <View style={styles.hero}>
        <LogoWordmark size="lg" negative />
      </View>

      <View style={styles.petScene} accessibilityElementsHidden>
        <MaterialCommunityIcons name="heart" size={34} color={splashCream} style={styles.petHeart} />
        <SittingDogSvg width={170} height={180} fill={splashCream} style={styles.dog} />
        <SittingCatSvg width={168} height={174} fill={splashCream} style={styles.cat} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    backgroundColor: tokens.colors.brand.orange,
    paddingHorizontal: tokens.spacing[8],
  },
  glow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: splashGlow,
  },
  topGlow: {
    top: -116,
    right: -112,
  },
  bottomGlow: {
    bottom: -128,
    left: -96,
  },
  hero: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    transform: [{ translateY: -42 }],
  },
  petScene: {
    width: 318,
    height: 226,
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -159 }],
  },
  petHeart: {
    position: "absolute",
    top: 0,
    left: 140,
    zIndex: 2,
  },
  dog: {
    position: "absolute",
    left: -8,
    bottom: 0,
    marginBottom: -tokens.spacing[4],
    transform: [{ scaleX: -1 }],
  },
  cat: {
    position: "absolute",
    right: -16,
    bottom: 0,
    marginBottom: -tokens.spacing[6],
    transform: [{ scaleX: -1 }],
  },
});
