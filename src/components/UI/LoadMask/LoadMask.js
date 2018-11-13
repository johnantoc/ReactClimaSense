import React from 'react';
import styles from './LoadMask.css';

const LoadMask = (props) => (
    props.show ? <div className={styles.loadmask}> </div> : null
);

export default LoadMask;