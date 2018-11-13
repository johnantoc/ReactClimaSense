import React from 'react';
import styles from './Navigation.css';

const NavigationItem = (props) => {

    return (
        <li className={props.header ?
            [styles.NavigationItem, styles.header].join(' ') : styles.NavigationItem}
            style={props.cursor ? { cursor: "pointer" } : null}
            onClick={props.clicked}
        >   {props.children}
        </li>
    );
}

export default NavigationItem;