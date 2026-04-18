import { theme } from "@storybook/react-native-theming";
import { view } from "./storybook.requires";

const StorybookUIRoot = view.getStorybookUI({
  theme: theme,
  storage: {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
  },
});

export default StorybookUIRoot;
