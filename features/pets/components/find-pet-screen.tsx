import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Dog1Svg from "@/assets/images/dog-1.svg";
import { Button } from "@/components/ui/button";
import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";

export function FindPetScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={tokens.colors.brand.orange}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Encontre seu pet</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.dogContainer}>
            <Dog1Svg width={320} height={320} style={styles.dogImage} />
          </View>

          {/* Name Badge */}
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>BULMA, 4 ANOS</Text>
          </View>
        </View>
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <Button
          variant="icon"
          iconName="close"
          size="lg"
          shape="rounded"
          containerStyle={[styles.actionButton, styles.rejectButton]}
          iconColor={tokens.colors.white}
          onPress={() => console.log("Rejected")}
        />
        <Button
          variant="icon"
          iconName="heart"
          size="lg"
          shape="rounded"
          containerStyle={[styles.actionButton, styles.acceptButton]}
          iconColor={tokens.colors.white}
          onPress={() => console.log("Accepted")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: tokens.spacing[6],
    paddingVertical: tokens.spacing[4],
    backgroundColor: tokens.colors.white,
  },
  backButton: {
    padding: tokens.spacing[2],
    marginLeft: -tokens.spacing[2],
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize["2xl"],
    color: tokens.colors.brand.primary,
  },
  headerRightSpacer: {
    width: 28 + tokens.spacing[2] * 2, // Same width as back button to keep title centered
  },
  content: {
    flex: 1,
    backgroundColor: tokens.colors.brand.background,
    paddingHorizontal: tokens.spacing[6],
    paddingVertical: tokens.spacing[10], // Add more vertical padding to shrink the card
    justifyContent: "center", // Changed back to center to move it lower
  },
  card: {
    width: "100%",
    aspectRatio: 1, // Makes it a perfect square like the image
    backgroundColor: tokens.colors.brand.green,
    borderRadius: tokens.radius.xl,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  dogContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  dogImage: {
    // Adjust if needed to match the mockup
  },
  badgeContainer: {
    position: "absolute",
    bottom: tokens.spacing[4],
    backgroundColor: tokens.colors.brand.orange,
    paddingVertical: tokens.spacing[2],
    paddingHorizontal: tokens.spacing[4],
    borderRadius: tokens.radius.sm,
  },
  badgeText: {
    fontFamily: Fonts.secondary,
    fontSize: tokens.fontSize.base,
    color: tokens.colors.white,
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: tokens.spacing[12], // Increase footer height to match mockup
    paddingHorizontal: tokens.spacing[6],
    backgroundColor: tokens.colors.white,
  },
  actionButton: {
    width: 80,
    height: 80,
    borderRadius: tokens.radius.xl,
  },
  rejectButton: {
    backgroundColor: tokens.colors.gray[400],
  },
  acceptButton: {
    backgroundColor: tokens.colors.red[500],
  },
});
