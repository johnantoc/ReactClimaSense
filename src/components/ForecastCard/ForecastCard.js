import React from 'react';
import styles from './ForecastCard.css';
import ForecastItem from './ForecastItem/ForecastItem';

const ForecastCard = (props) => {

    let atmosphereCodes = {
        "poo-storm": [0, 1, 2, 3, 4, 37, 38, 39, 45, 47],
        "cloud-showers-heavy": [5, 6, 8, 9, 10, 11, 12, 17, 18, 35, 40],
        "cloud-sun": [19, 20, 21, 22, 23, 24, 25, 26, 28, 30, 44],
        "snowflake": [7, 13, 14, 15, 16, 41, 42, 43, 46],
        "sun": [32, 34, 36],
        "cloud-moon": [27, 29, 31, 33]
    };

    let ImageKeys = Object.keys(atmosphereCodes);

    let forecasts = props.forecasts.map((forecast, index) => {

        let darkBack = true;
        let dateStr = forecast.date.split(" ")[1];
        let imageArray = ImageKeys.filter((imageKey) => {
            return atmosphereCodes[imageKey].indexOf(parseInt(forecast.code, 10)) !== -1
        });

        if (index % 2 !== 0) {
            darkBack = false;
        }
        
        return (
            <ForecastItem
                key={index}
                date={dateStr}
                temperatureHigh={forecast.high}
                temperatureLow={forecast.low}
                image={imageArray[0]}
                darkBackground={darkBack}
            />
        );
    });

    return (
        <div className={styles.ForecastCard}>
            <ul>{forecasts}</ul>
        </div>
    );
}

export default ForecastCard;