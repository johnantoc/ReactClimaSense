import React from 'react';
import styles from './WeatherCard.css';
import randomColor from 'randomcolor';
import WeatherItem from './WeatherItem/WeatherItem';

const WeatherCard = (props) => {

    const colorStr = randomColor({
        luminosity: 'light',
        format: 'rgba',
        alpha: 0.7
    });

    let view = null;
    if (Object.keys(props.weather).length) {
        view = (
            <div className={styles.WeatherCard} style={{
                backgroundColor: colorStr
            }}>
                <WeatherItem weather={props.weather} />
            </div>
        );
    }
    return view;
}

export default WeatherCard;