import React from 'react';
import { Field as FieldFormik } from 'formik';

export interface FieldProps {
  /**
   * field id
   */
  id: string;
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
   *  is field disabled?
   */
  disabled?: boolean;
  /**
   * field change handler
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Field = ({ ...props }: FieldProps) => {
  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      <FieldFormik
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  );
};
