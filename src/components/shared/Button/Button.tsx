import React from 'react';
import classnames from 'classnames';

export interface ButtonProps {
  /**
   * Click handler
   */
  onClick: () => void;
  /**
   * Label content
   */
  label?: string;
  /**
   * Optional class name
   */
  className?: string;
  /**
   * Is button disabled
   */
  disabled?: boolean;
  /**
   * custom content
   */
  children?: unknown;
}

export const Button = ({ ...props }: ButtonProps) => {
  const className = classnames('ui button', props.className);

  return (
    <button className={className} onClick={props.onClick} disabled={props.disabled}>
      {props.label}
      {props.children}
    </button>
  );
};
