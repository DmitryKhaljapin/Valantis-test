import React from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({children, className, isDisabled, ...props}) => {
    return (<button className={cn(styles.button, className, {
        [styles.disabled]: isDisabled,
        [styles.nav]: !children,
    })} {...props}>{children && children}</button>);
}