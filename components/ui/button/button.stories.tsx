import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Button } from "./index";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Text content displayed inside the button",
    },
    variant: {
      control: "select",
      options: ["primary", "tertiary", "success", "danger", "warning", "link", "icon", "iconText"],
      description: "Visual variant of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the button",
    },
    shape: {
      control: "select",
      options: ["rounded", "pill"],
      description: "Shape of the button corners",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button should take up the full width of its container",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    uppercase: {
      control: "boolean",
      description: "Whether the label text should be uppercase",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Button component used for user interactions. Supports multiple variants, sizes, and shapes, as well as icons.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary Button",
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Primary button used for main actions.",
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    label: "Tertiary Button",
    variant: "tertiary",
    size: "md",
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Tertiary button used for secondary or less important actions.",
      },
    },
  },
};

export const Success: Story = {
  args: {
    label: "Success Button",
    variant: "success",
    size: "md",
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Success button used to indicate a positive action or state.",
      },
    },
  },
};

export const Danger: Story = {
  args: {
    label: "Danger Button",
    variant: "danger",
    size: "md",
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Danger button used for destructive actions like deleting.",
      },
    },
  },
};

export const Warning: Story = {
  args: {
    label: "Warning Button",
    variant: "warning",
    size: "md",
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Warning button used to indicate caution.",
      },
    },
  },
};

export const AllVariants: Story = {
  args: {} as any,
  render: () => (
    <View style={{ gap: 12, padding: 16 }}>
      <Button label="Primary" variant="primary" />
      <Button label="Tertiary" variant="tertiary" />
      <Button label="Success" variant="success" />
      <Button label="Danger" variant="danger" />
      <Button label="Warning" variant="warning" />
      <Button label="This is a link" variant="link" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: "Overview of all color variants.",
      },
    },
  },
};

export const IconAndIconText: Story = {
  args: {} as any,
  render: () => (
    <View style={{ gap: 12, padding: 16 }}>
      <Button variant="icon" iconName="paw" />
      <Button variant="iconText" label="Icon text" iconName="paw" size="lg" />
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons can display icons only, or icons with text.",
      },
    },
  },
};
