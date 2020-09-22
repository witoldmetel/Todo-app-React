import React from 'react';
import classnames from 'classnames';

export interface ButtonProps {
  /**
   * Label content
   */
  label: string;
  /**
   * Click handler
   */
  onClick: () => void;
  /**
   * Optional class name
   */
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ label = 'Button', ...props }: ButtonProps) => {
  const className = classnames('ui button', props.className);

  return (
    <button className={className} onClick={props.onClick}>
      {label}
    </button>
  );
};
