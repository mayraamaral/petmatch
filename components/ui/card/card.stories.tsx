import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import LogoSvg from "../../../assets/images/logo.svg";
import { tokens } from "../../../constants/tokens";

import { Card } from "./index";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the card",
    },
    variant: {
      control: "select",
      options: ["normal", "info"],
      description: "Visual variant of the card",
    },
    infoText: {
      control: "text",
      description: "Text to display in the info area (only for info variant)",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Card component used to display content. Supports a normal variant and an info variant with a text area at the bottom.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    variant: "normal",
    size: "md",
  },
  render: (args) => (
    <View style={{ width: 300 }}>
      <Card {...args}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <LogoSvg width={81} height={82} color={tokens.colors.white} />
        </View>
      </Card>
    </View>
  ),
};

export const Info: Story = {
  args: {
    variant: "info",
    size: "md",
    infoText: `Friendly cat, 2 years old.\nVaccinated.\nReady for adoption.`,
  },
  render: (args) => (
    <View style={{ width: 300 }}>
      <Card {...args}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <LogoSvg width={81} height={82} color={tokens.colors.white} />
        </View>
      </Card>
    </View>
  ),
};
