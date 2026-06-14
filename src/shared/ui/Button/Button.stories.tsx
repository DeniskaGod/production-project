import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { ThemeButton } from "./Button";
// Временно закомментируйте эти импорты
// import { Theme } from "@/app/providers/ThemeProvider";
// import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

export default {
  title: "shared/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: Story<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Text",
};

export const Clear = Template.bind({});
Clear.args = {
  children: "Text",
  theme: ThemeButton.CLEAR,
};
