import React, { Component } from 'react';
import styles from './WeatherByCity.css';
import WeatherCard from '../../components/WeatherCard/WeatherCard';

class WeatherByCity extends Component {

    state = {
        favCitiesPresent: false
    }

    componentDidUpdate (_, prevState) {

        this.props.weather.map((weatherObj, index) => {
            if (Object.keys(weatherObj).length && !this.state.favCitiesPresent) {
                this.setState({favCitiesPresent: true});
            }
            return index;
        });
    }

    render() {
        
        let weatherCards = this.props.weather.map((weatherObj, index) => {

            let view = null;
            if (Object.keys(weatherObj).length) {
                view = <WeatherCard key={index} weather={weatherObj} />
            }
            return view;
        });

        return (
            <div className={styles.WeatherByCity}>
                {(this.state.favCitiesPresent) ? weatherCards : <div className={styles.noCity}> Add favorite places. </div>}
            </div>
        );
    }
}

export default WeatherByCity;