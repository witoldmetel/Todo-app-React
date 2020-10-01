import React from 'react';
import classnames from 'classnames';

export interface ButtonProps {
  /**
   * click handler
   */
  onClick: () => void;
  /**
   * label title
   */
  label?: string;
  /**
   * optional class name
   */
  className?: string;
  /**
   * is button disabled
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
