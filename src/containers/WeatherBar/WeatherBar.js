import React, { Component } from 'react';
import styles from './WeatherBar.css';
import WeatherItem from '../../components/WeatherCard/WeatherItem/WeatherItem';
import ForecastCard from '../../components/ForecastCard/ForecastCard';
import Astronomy from '../../components/ForecastCard/Astronomy/Astronomy';

class WeatherBar extends Component {

    render() {

        let view = null;
        //checks object not empty
        if (Object.keys(this.props.weather).length) {

            let forecasts = [...this.props.weather.forecasts];
            forecasts.shift();
            let forecastsArray = forecasts.splice(0, 3);

            view = (
                <div className={styles.WeatherBar}>
                    <WeatherItem weather={this.props.weather} />
                    <ForecastCard forecasts={forecastsArray} />
                    <Astronomy 
                        astronomy={this.props.weather.astronomy} 
                        atmosphere={this.props.weather.atmosphere}
                        units={this.props.weather.units}
                    />
                </div>
            );
        }

        return view;
    }
}

export default WeatherBar;