import Link from 'next/link';
import React from 'react';
import styles from './Button.module.scss';

const Button = ({children, variant = "purple", to = "#", className = "", onClick = ""}) => {
  const color = {
    purple: `${styles.purple}`,
    white: `${styles.white} font-semibold`
  };
  
  return (
    <Link href={to}>
      <a 
        onClick={onClick}
        className={`${styles.container} py-2 px-8 max-h-14 max-w-12 text-base font-bold inline-block text-center h-auto rounded-md ${color[variant]} ${className}`}>
        {children}
      </a>
    </Link>
  );
};

export default Button;
