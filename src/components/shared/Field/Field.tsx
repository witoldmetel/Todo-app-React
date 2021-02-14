import React from 'react';
import { Field as FieldFormik } from 'formik';
import classnames from 'classnames';

export interface FieldProps {
  /**
   * field id
   */
  id?: string;
  /**
   * field name
   */
  name?: string;
  /**
   * field value
   */
  value?: string;
  /**
   * label title
   */
  label?: string;
  /**
   * placeholder
   */
  placeholder?: string;
  /**
   *  HTML input type
   */
  type?: string;
  /**
   *  is field checked (for radio button / checkbox)
   */
  checked?: boolean;
  /**
   *  is field disabled?
   */
  disabled?: boolean;
  /**
   *  field class name
   */
  fieldClassName?: string;
  /**
   * field change handler
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Field = ({ ...props }: FieldProps) => {
  const fieldClassName = classnames('field', {
    [`${props.fieldClassName}`]: props.fieldClassName
  });

  return (
    <div className={fieldClassName}>
      <label htmlFor={props.id}>{props.label}</label>
      <FieldFormik
        id={props.id}
        name={props.id || props.name}
        value={props.value}
        checked={props.checked}
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  );
};
