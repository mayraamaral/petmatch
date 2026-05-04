import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddAnimalSvg from "@/assets/images/add-animal.svg";
import { LogoFull } from "@/components/ui/logo-full";
import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";
import { useAuth } from "@/features/auth/context/auth.context";
import { useListerHome } from "../hooks/use-lister-home";

export function ListerHomeScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { isLoading, isLister, hasAnimals } = useListerHome();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator color={tokens.colors.brand.green} size="large" />
      </SafeAreaView>
    );
  }

  if (!isLister) {
    return <Redirect href="/find-pet" />;
  }

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

      <View style={styles.content}>
        {hasAnimals ? (
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>Você já tem pets cadastrados</Text>
            <Text style={styles.placeholderSubtitle}>
              A listagem de pets será implementada no próximo passo.
            </Text>
            <Pressable
              onPress={() => router.push("/add-animal" as any)}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Adicionar outro pet</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.emptyStateTextWrapper}>
              <Text style={styles.title}>Boas vindas!</Text>
              <Text style={styles.subtitle}>
                Parece que você ainda não tem nenhum animal para adoção.
              </Text>
            </View>

            <Pressable
              onPress={() => router.push("/add-animal" as any)}
              style={styles.addCard}
              accessibilityRole="button"
              accessibilityLabel="Adicionar pet"
            >
              <AddAnimalSvg width={52} height={52} />
              <Text style={styles.addCardText}>Adicionar pet</Text>
            </Pressable>

            <Text style={styles.footerHint}>Vamos adicionar algum pet!</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tokens.colors.brand.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: tokens.colors.white,
  },
  headerWrapper: {
    backgroundColor: tokens.colors.white,
  },
  header: {
    paddingVertical: tokens.spacing[4],
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoutButton: {
    position: "absolute",
    right: tokens.spacing[5],
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: tokens.spacing[2],
    paddingVertical: tokens.spacing[1],
  },
  logoutText: {
    fontFamily: Fonts.medium,
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.brand.primary,
  },
  content: {
    flex: 1,
    backgroundColor: tokens.colors.brand.background,
    paddingHorizontal: tokens.spacing[5],
    paddingTop: tokens.spacing[8],
    alignItems: "center",
  },
  emptyStateTextWrapper: {
    alignItems: "center",
    gap: tokens.spacing[2],
    marginBottom: tokens.spacing[6],
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize["2xl"],
    color: tokens.colors.gray[700],
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: tokens.fontSize.xl,
    color: tokens.colors.gray[500],
    textAlign: "center",
    lineHeight: tokens.lineHeight.xl,
    maxWidth: 320,
  },
  addCard: {
    width: "100%",
    backgroundColor: tokens.colors.white,
    borderRadius: tokens.radius.lg,
    paddingVertical: tokens.spacing[6],
    paddingHorizontal: tokens.spacing[5],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing[4],
  },
  addCardText: {
    fontFamily: Fonts.secondary,
    fontSize: tokens.fontSize["2xl"],
    color: tokens.colors.brand.green,
    textTransform: "uppercase",
  },
  footerHint: {
    marginTop: tokens.spacing[6],
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize.xl,
    color: tokens.colors.gray[500],
  },
  placeholderCard: {
    width: "100%",
    backgroundColor: tokens.colors.white,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing[6],
    gap: tokens.spacing[4],
  },
  placeholderTitle: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize.xl,
    color: tokens.colors.brand.primary,
  },
  placeholderSubtitle: {
    fontFamily: Fonts.primary,
    fontSize: tokens.fontSize.base,
    color: tokens.colors.gray[700],
    lineHeight: tokens.lineHeight.base,
  },
  secondaryButton: {
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.brand.green,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: tokens.spacing[4],
  },
  secondaryButtonText: {
    fontFamily: Fonts.bold,
    color: tokens.colors.white,
    fontSize: tokens.fontSize.base,
    textTransform: "uppercase",
  },
});
