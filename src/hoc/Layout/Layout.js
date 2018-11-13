import React, { Component } from 'react';
import Aux from '../AuxEl/AuxEl'
import styles from './Layout.css';
import axios from 'axios';
import SideBar from '../../containers/SideBar/SideBar';
import WeatherBar from '../../containers/WeatherBar/WeatherBar';
import WeatherByCity from '../../containers/WeatherByCity/WeatherByCity';
import Backdrop from '../../components/UI/BackDrop/Backdrop';
import LoadMask from '../../components/UI/LoadMask/LoadMask';

class Layout extends Component {

    state = {
        farenheitTemp: false,
        mask: true,
        currentPlace: "kochi",
        favPlaces: ["", "", "", "", "", ""],
        weatherDataCurrentPlace: {},
        weatherDataFavPlaces: []
    }

    switchToggleHandler = () => {
        this.setState((prevState) => {
            return { farenheitTemp: !prevState.farenheitTemp }
        });
    }

    getWeatherData = () => {

        let tempUnit = "c";
        const favPlaces = [...this.state.favPlaces];

        if (this.state.farenheitTemp) {
            tempUnit = "f";
        }

        //mask
        this.setState({ mask: true });

        //current place
        axios.get(`yql?format=json&q=select * from weather.forecast where woeid in 
                    (select woeid from geo.places(1) where text="` +
            this.state.currentPlace + `") and u="` + tempUnit + `"`)
            .then(this.handleWeatherData);

        //fav places
        let axiosReqArray = favPlaces.map((place) => {

            let req = null;
            if(place){
                req = axios.get(`yql?format=json&q=select * from weather.forecast where woeid in 
                            (select woeid from geo.places(1) where text="` + place + `") and u="` + tempUnit + `"`);
            }
            return req;
        });

        axios.all(axiosReqArray)
            .then(axios.spread(this.handleWeatherData));
    }

    handleWeatherData = (...places) => {

        let atmosphereCodes = {
            "poo-storm": [0, 1, 2, 3, 4, 37, 38, 39, 45, 47],
            "cloud-showers-heavy": [5, 6, 8, 9, 10, 11, 12, 17, 18, 35, 40],
            "cloud-sun": [19, 20, 21, 22, 23, 24, 25, 26, 28, 30, 44],
            "snowflake": [7, 13, 14, 15, 16, 41, 42, 43, 46],
            "sun": [32, 34, 36],
            "cloud-moon": [27, 29, 31, 33]
        };

        let weatherDataArray = places.map((response) => {

            let weatherDataObj = {};
            if (response && response.status === 200) {

                if (response.data.query.count === 1) {

                    let weatherData = (response.data.query.results.channel !== undefined ?
                        response.data.query.results.channel : null);

                    if (weatherData !== null) {

                        let weatherDataImageCode = weatherData.item.condition.code;
                        let ImageKeys = Object.keys(atmosphereCodes);

                        let imageArray = ImageKeys.filter((imageKey) => {
                            return atmosphereCodes[imageKey].indexOf(parseInt(weatherDataImageCode, 10)) !== -1
                        });

                        weatherDataObj.place = weatherData.location.city;
                        weatherDataObj.temperature = weatherData.item.condition.temp;
                        weatherDataObj.date = (weatherData.item.condition.date.split(" ")[2] +
                            " " + weatherData.item.condition.date.split(" ")[1]);
                        weatherDataObj.time = (weatherData.item.condition.date.split(" ")[4] +
                            " " + weatherData.item.condition.date.split(" ")[5]);
                        weatherDataObj.temperatureString = weatherData.item.condition.text.toLowerCase();
                        weatherDataObj.image = imageArray[0] ? imageArray[0] : 'sun';
                        weatherDataObj.forecasts = weatherData.item.forecast;
                        weatherDataObj.astronomy = weatherData.astronomy;
                        weatherDataObj.atmosphere = weatherData.atmosphere;
                        weatherDataObj.units = weatherData.units;
                    }
                }
            }
            return weatherDataObj;
        });

        if (weatherDataArray.length > 1) {
            this.setState({ mask: false, weatherDataFavPlaces: weatherDataArray });
        } else {
            this.setState({ mask: false, weatherDataCurrentPlace: weatherDataArray[0] });
        }
    }

    componentDidUpdate(_, prevState) {
        if (prevState.farenheitTemp !== this.state.farenheitTemp ||
            prevState.favPlaces !== this.state.favPlaces ||
            prevState.currentPlace !== this.state.currentPlace) {
            this.getWeatherData();
        }
    }

    componentDidMount() {
        this.getWeatherData();
    }

    addFavPlace = (newPlace) => {
        if (newPlace) {
            let favPlaces = [...this.state.favPlaces];
            favPlaces.pop();
            favPlaces.unshift(newPlace);
            this.setState({ favPlaces: favPlaces });
        }
    }

    searchPlace = (searchPlace) => {
        if (searchPlace) {
            this.setState({ currentPlace: searchPlace });
        }
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.state.mask} />
                <LoadMask show={this.state.mask} />
                <div className={styles.Layout}>
                    <SideBar
                        favPlaces={this.state.favPlaces}
                        currentLocation={this.state.currentPlace}
                        switchToggleHandler={this.switchToggleHandler}
                        searchClickHandler={this.searchClickHandler}
                        helpClickHandler={this.helpClickHandler}
                        aboutClickHandler={this.aboutClickHandler}
                        addPlace={this.addFavPlace}
                        searchPlace={this.searchPlace}
                    />
                    <WeatherBar weather={this.state.weatherDataCurrentPlace} />
                    <WeatherByCity weather={this.state.weatherDataFavPlaces} />
                </div>
            </Aux>
        );
    }
}

export default Layout;