import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Dog1Svg from "@/assets/images/dog-1.svg";
import { LogoFull } from "@/components/ui/logo-full";
import { Button } from "@/components/ui/button";
import { tokens } from "@/constants/tokens";
import { Fonts } from "@/constants/theme";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <LogoFull size="sm" />
        </View>
      </View>

      {/* Body */}
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

      {/* Footer */}
      <View style={styles.footerWrapper}>
        <View style={styles.footer}>
          <Button
            label="COMEÇAR"
            variant="primary"
            size="md"
            fullWidth={false}
            onPress={() => router.push("/login" as any)}
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
    gap: tokens.spacing[2],
    borderBottomLeftRadius: tokens.radius.xl,
    borderBottomRightRadius: tokens.radius.xl,
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
    marginBottom: -20, // To make it look like it's cut off at the bottom like the image
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
