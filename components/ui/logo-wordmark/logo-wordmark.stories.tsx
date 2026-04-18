import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { LogoWordmark } from "./index";

const meta = {
  title: "UI/LogoWordmark",
  component: LogoWordmark,
} satisfies Meta<typeof LogoWordmark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16, padding: 16 }}>
      <LogoWordmark size="sm" />
      <LogoWordmark size="md" />
      <LogoWordmark size="lg" />
    </View>
  ),
};
