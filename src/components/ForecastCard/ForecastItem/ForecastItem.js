import React from 'react';
import styles from './ForecastItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ForecastItem = (props) => {

    return (
        <li className={styles.ForecastItem} style={ props.darkBackground ? {backgroundColor: "#A6913B"} : null}>
            <div style={{ textAlign: "center", color: "black" }}>{props.date}</div>
            <div style={{ fontSize: "1.8rem", textAlign: "center", color: "black" }}>
                {props.temperatureHigh}<sup>o</sup>/  
                <span style={{fontSize: "1.2rem", textAlign: "center", color: "black"}}>
                {props.temperatureLow}</span><sup style={{fontSize: "0.5rem"}}>o</sup>
            </div>
            <div style={{ fontSize: "2.5rem", textAlign: "center"}}>
                {props.image ? <FontAwesomeIcon icon={props.image} /> : null}
            </div>
        </li>
    );
}

export default ForecastItem;