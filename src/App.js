import React, { Component } from 'react';
import axios from 'axios';
import Layout from './hoc/Layout/Layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlus, faSun, 
          faPooStorm, faCloudShowersHeavy, 
            faCloudSun, faSnowflake, faCloudMoon, 
              faMoon, faTint, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faPlus, faSun, 
              faPooStorm, faCloudShowersHeavy, 
                faCloudSun, faSnowflake, faCloudMoon, 
                  faMoon, faTint, faTachometerAlt);

axios.defaults.baseURL = 'https://query.yahooapis.com/v1/public/';

class App extends Component {
  render() {
    return (
      <Layout />
    );
  }
}

export default App;