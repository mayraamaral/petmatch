import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Dog1Svg from "@/assets/images/dog-1.svg";
import { Button } from "@/components/ui/button";
import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";
import { useAuth } from "@/features/auth/context/auth.context";

const ANIMAL_CARD_SCREEN_RATIO = 0.9;

export function FindPetScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { width } = useWindowDimensions();
  const animalCardSize = Math.round(width * ANIMAL_CARD_SCREEN_RATIO);

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
        <Pressable
          onPress={() => {
            void logout();
          }}
          style={styles.logoutButton}
          accessibilityRole="button"
          accessibilityLabel="Sair"
        >
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.card,
            { width: animalCardSize, height: animalCardSize },
          ]}
        >
          <View
            style={[
              styles.dogContainer,
              { width: animalCardSize, height: animalCardSize },
            ]}
          >
            <Dog1Svg
              width={animalCardSize}
              height={animalCardSize}
              preserveAspectRatio="none"
            />
          </View>

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
  logoutButton: {
    minWidth: 28 + tokens.spacing[2] * 2,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: tokens.spacing[2],
  },
  logoutText: {
    fontFamily: Fonts.medium,
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.brand.primary,
  },
  content: {
    flex: 1,
    backgroundColor: tokens.colors.brand.background,
    paddingVertical: tokens.spacing[10],
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
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
    paddingVertical: tokens.spacing[12],
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
