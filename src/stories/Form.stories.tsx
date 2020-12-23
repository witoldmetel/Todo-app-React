import React from 'react';
import { Meta } from '@storybook/react';

import { Form, Field } from '../components/shared';

export default {
  title: 'Form',
  component: Form
} as Meta;

const changeHandler = (e) => console.log(e.target.value);

export const General = () => (
  <Form>
    <Field id="email" label="Email" placeholder="Email" onChange={changeHandler} />
    <Field id="password" label="Password" placeholder="Password" onChange={changeHandler} />
  </Form>
);
