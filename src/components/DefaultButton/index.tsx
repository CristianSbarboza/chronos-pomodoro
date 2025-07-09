import type React from 'react';
import styles from './styles.module.css';

type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: 'green' | 'red'
} & React.ComponentProps<'button'>;

export function DefaultButton({color = 'green', icon, ...props }: DefaultButtonProps) {

  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
