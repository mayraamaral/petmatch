import type { Preview } from "@storybook/react-native";
import { View } from "react-native";

const preview: Preview = {
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
};

export default preview;