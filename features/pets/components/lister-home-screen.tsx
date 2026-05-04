import { Redirect, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddAnimalSvg from "@/assets/images/add-animal.svg";
import { LogoFull } from "@/components/ui/logo-full";
import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";
import { useAuth } from "@/features/auth/context/auth.context";
import type { ListerAnimal } from "../domain/entities/lister-animal.entity";
import { useListerHome } from "../hooks/use-lister-home";
import { ListerAnimalCard } from "./lister-animal-card";

export function ListerHomeScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { isLoading, isLister, hasAnimals, animals } = useListerHome();

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

  const renderAnimalCard = ({ item }: { item: ListerAnimal }) => (
    <ListerAnimalCard animal={item} />
  );

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
          <FlatList
            data={animals}
            keyExtractor={(item) => item.id}
            renderItem={renderAnimalCard}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Meus pets cadastrados</Text>
                <Pressable
                  onPress={() => router.push("/add-animal" as any)}
                  style={styles.headerAddButton}
                >
                  <Text style={styles.headerAddButtonText}>+ Novo pet</Text>
                </Pressable>
              </View>
            }
          />
        ) : (
          <View style={styles.emptyStateContainer}>
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
          </View>
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
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
  },
  emptyStateTextWrapper: {
    alignItems: "center",
    gap: tokens.spacing[2],
    marginBottom: tokens.spacing[6],
    paddingHorizontal: tokens.spacing[5],
    paddingTop: tokens.spacing[8],
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
    width: "85%",
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
    textAlign: "center",
  },
  listContainer: {
    padding: tokens.spacing[5],
    gap: tokens.spacing[4],
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacing[2],
  },
  listTitle: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize.xl,
    color: tokens.colors.brand.primary,
  },
  headerAddButton: {
    backgroundColor: tokens.colors.brand.green,
    paddingHorizontal: tokens.spacing[3],
    paddingVertical: tokens.spacing[2],
    borderRadius: tokens.radius.full,
  },
  headerAddButtonText: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.white,
    textTransform: "uppercase",
  },
});
