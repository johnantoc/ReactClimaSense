import React from 'react';
import styles from './About.css';
import Logo from '../../assets/imgs/logowhite.png';

const About = (props) => {
    return (
        <div className={styles.About}> 
            <img src={Logo} alt="logo" />
            <div> version : 1.0 </div>
            <div>&copy; 2018</div>
            <div>Sense your climate!</div>
        </div>
    );
}

export default About;