import React from 'react';
import { Formik, Form as FormFormik } from 'formik';
import { noop } from 'lodash';

export interface FormProps {
  /**
   * show error message
   */
  errorMessage?: string;
  children: any;
  initialValues?: any;
  /**
   * field submit handler
   */
  onSubmit?: () => void;
}

export const Form = ({ ...props }: FormProps) => {
  const errorMessage = props.errorMessage ? <div className="ui red message">{props.errorMessage}</div> : null;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.onSubmit && props.onSubmit();
    }
  };

  return (
    <Formik initialValues={props.initialValues} onSubmit={noop}>
      <FormFormik className="ui form content" onKeyPress={handleKeyPress}>
        {props.children}
        {errorMessage}
      </FormFormik>
    </Formik>
  );
};
