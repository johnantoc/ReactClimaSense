import React from 'react';
import styles from './TempUnitSelect.css';

const TempUnitSelect = (props) => (
    <div className={styles.TempUnitSelect}>
        <div><sup>O</sup>C</div>
        <label className={styles.switch}>
            <input type="checkbox" onChange={props.switch}/>
            <span className={[styles.slider, styles.round].join(' ')}></span>
        </label>
        <div><sup>O</sup>F</div>
    </div>
);

export default TempUnitSelect;