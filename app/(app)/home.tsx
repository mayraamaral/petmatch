import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Dog1Svg from "@/assets/images/dog-1.svg";
import { Button } from "@/components/ui/button";
import { LogoFull } from "@/components/ui/logo-full";
import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";
import { useAuth } from "@/features/auth/context/auth.context";

export default function HomeScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <LogoFull size="sm" />
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
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            ENCONTRE O SEU NOVO{"\n"}AMIGO DE QUATRO PATAS!
          </Text>
          <View style={styles.dogContainer}>
            <Dog1Svg width={280} height={280} style={styles.dogImage} />
          </View>
        </View>
      </View>

      <View style={styles.footerWrapper}>
        <View style={styles.footer}>
          <Button
            label="COMEÇAR"
            variant="primary"
            size="md"
            fullWidth={false}
            onPress={() => router.push("/find-pet" as any)}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.colors.white,
  },
  headerWrapper: {
    backgroundColor: tokens.colors.brand.background,
  },
  header: {
    backgroundColor: tokens.colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: tokens.spacing[4],
    paddingHorizontal: tokens.spacing[4],
    gap: tokens.spacing[2],
    borderBottomLeftRadius: tokens.radius.xl,
    borderBottomRightRadius: tokens.radius.xl,
    position: "relative",
  },
  logoutButton: {
    position: "absolute",
    right: tokens.spacing[4],
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: tokens.spacing[2],
  },
  logoutText: {
    fontFamily: Fonts.medium,
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.brand.primary,
  },
  body: {
    flex: 1,
    backgroundColor: tokens.colors.brand.background,
    padding: tokens.spacing[6],
    justifyContent: "center",
  },
  card: {
    backgroundColor: tokens.colors.brand.green,
    borderRadius: tokens.radius.xl,
    paddingTop: tokens.spacing[8],
    paddingHorizontal: tokens.spacing[4],
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    maxHeight: 480,
    overflow: "hidden",
  },
  cardText: {
    fontFamily: Fonts.secondary,
    fontSize: 24,
    color: tokens.colors.white,
    textAlign: "center",
    lineHeight: 32,
    marginBottom: tokens.spacing[4],
  },
  dogContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
  },
  dogImage: {
    marginBottom: -20,
  },
  footerWrapper: {
    backgroundColor: tokens.colors.brand.background,
  },
  footer: {
    backgroundColor: tokens.colors.white,
    paddingVertical: tokens.spacing[8],
    paddingHorizontal: tokens.spacing[6],
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: tokens.radius.xl,
    borderTopRightRadius: tokens.radius.xl,
  },
  buttonContainer: {
    paddingHorizontal: tokens.spacing[10],
  },
});
