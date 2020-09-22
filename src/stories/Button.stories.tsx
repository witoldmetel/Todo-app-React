import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '../components/shared';

export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'on button click' } },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

const Positive = Template.bind({});
Positive.args = {
  className: 'positive',
  label: 'Positive',
};

const Negative = Template.bind({});
Negative.args = {
  className: 'negative',
  label: 'Negative',
};

export const General = (args: ButtonProps) => (
  <>
    <Button {...args} {...Positive.args} />
    <Button {...args} {...Negative.args} />
  </>
);
