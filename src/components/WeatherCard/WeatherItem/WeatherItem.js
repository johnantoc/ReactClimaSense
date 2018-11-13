import React from 'react';
import styles from './WeatherItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WeatherItem = (props) => (
    <div className={styles.weatherItem}>
        <div className={styles.weatherDate}>{props.weather.date}</div>
        <div className={styles.weatherImg}>
            {props.weather.image ? <span><FontAwesomeIcon icon={props.weather.image} /></span> : null }
        </div>
        <div className={styles.weatherTemp}>
            {props.weather.temperature} <sup>o</sup>
            <span>{props.weather.temperatureString}</span>
        </div>
        <div className={styles.weatherPlace}>{props.weather.place}</div>
    </div>
);

export default WeatherItem;