import { ScrollView, StyleSheet, View } from "react-native";
import LogoSvg from "@/assets/images/logo.svg";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogoWordmark } from "@/components/ui/logo-wordmark";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { tokens } from "@/constants/tokens";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <LogoWordmark size="sm" />
        <ThemedText style={styles.subtitle}>
          Base project configured and ready.
        </ThemedText>
        <View style={styles.buttons}>
          <Button label="Start" variant="primary" />
          <Button label="Danger" variant="danger" />
          <Button label="Warning" variant="warning" />
          <Button label="Success" size="lg" />
          <Button label="Tertiary" variant="tertiary" />
          <Button variant="icon" iconName="paw" />
          <Button variant="icon" iconName="paw" shape="rounded" />
          <Button
            variant="iconText"
            label="Icon Text"
            iconName="paw"
            shape="pill"
            size="lg"
          />
          <Button label="This is a link" variant="link" />
        </View>
        <View style={styles.cards}>
          <Card size="sm">
            <View style={styles.cardLogoContainer}>
              <LogoSvg width={96} height={96} color={tokens.colors.white} />
            </View>
          </Card>
          <Card
            variant="info"
            size="sm"
            infoText={`Friendly cat, 2 years old.
Vaccinated.
Ready for adoption.`}
          />
          <View style={styles.outsideLogoTest}>
            <LogoSvg width={96} height={96} color={tokens.colors.brand.green} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingHorizontal: tokens.spacing[6],
    paddingVertical: tokens.spacing[10],
    paddingBottom: tokens.spacing[16],
  },
  content: {
    gap: tokens.spacing[6],
  },
  subtitle: {
    color: Colors.light.muted,
  },
  buttons: {
    gap: tokens.spacing[4],
  },
  cards: {
    gap: tokens.spacing[4],
  },
  cardLogoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  outsideLogoTest: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colors.white,
    borderRadius: tokens.radius.md,
  },
});
