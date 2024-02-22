import React from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({isDisabled, ...props}) => {
    return (<button className={cn(styles.button, {
        [styles.disabled]: isDisabled,
    })} {...props}></button>);
}