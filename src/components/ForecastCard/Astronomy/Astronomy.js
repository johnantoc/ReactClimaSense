import React from 'react';
import styles from './Astronomy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Astronomy = (props) => {

    let inlineStyleStyle = {
        textAlign: "center",
        color: "white",
        paddingRight: "10px",
        fontSize: "1.5rem"
    };

    let bar = (props.units.pressure === "mb") ?
        (props.atmosphere.pressure / 1000).toFixed(0) :
        (props.atmosphere.pressure * 0.0338639).toFixed(0);

    return (
        <div className={styles.AstronomyWrap}>
            <ul>
                <li className={styles.Astronomy} style={{ borderBottom: "2px solid white" }}>
                    <div><span style={inlineStyleStyle}><FontAwesomeIcon icon="tachometer-alt" /></span><span style={{ fontSize: "1.6rem", paddingRight: "2px" }}>{bar}</span> Bar</div>
                    <div><span style={inlineStyleStyle}><FontAwesomeIcon icon="sun" /></span>{props.astronomy.sunrise}</div>
                </li>
                <li className={styles.Astronomy}>
                    <div><span style={inlineStyleStyle}><FontAwesomeIcon icon="tint" /></span><span style={{ fontSize: "1.6rem", paddingRight: "2px" }}>{props.atmosphere.humidity}%</span></div>
                    <div><span style={inlineStyleStyle}><FontAwesomeIcon icon="moon" /></span>{props.astronomy.sunset}</div>
                </li>
            </ul>
        </div>
    );
}

export default Astronomy;