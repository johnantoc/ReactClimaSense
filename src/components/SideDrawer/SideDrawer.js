import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../assets/imgs/logo.png';
import Backdrop from '../UI/BackDrop/Backdrop';
import Aux from '../../hoc/AuxEl/AuxEl';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    let favoritePlacesList = props.favPlaces.map((place, index) => {
        return (
            <NavigationItem key={place + index} header={false} >{place}</NavigationItem>
        );
    });

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <img src={Logo} alt="logo" />
                <nav>
                    <ul>
                        <NavigationItem header={true} >Current Location</NavigationItem>
                        <NavigationItem header={false} >{props.currentLocation}</NavigationItem>
                        <NavigationItem header={false} cursor="pointer" >
                            {props.showSearchInput ?
                                <input value={props.searchValue} type="text" onChange={props.searchChangeHandler} autoFocus /> :
                                <div onClick={props.searchClickHandler}>search</div>}
                            <span onClick={props.searchPlace} ><FontAwesomeIcon icon="search" /></span>
                        </NavigationItem>
                    </ul>
                    <ul>
                        <NavigationItem header={true} >Favorite Places</NavigationItem>
                        {favoritePlacesList}
                        <NavigationItem header={false} cursor="pointer" >
                            {props.showAddPlaceInput ?
                                <input value={props.addPlaceValue} type="text" onChange={props.addPlaceChangeHandler} autoFocus /> :
                                <div onClick={props.addPlaceClickHandler}>Add a Place</div>}
                            <span onClick={props.addPlace}><FontAwesomeIcon icon="plus" /></span>
                        </NavigationItem>
                    </ul>
                    <ul>
                        <NavigationItem header={false} cursor="pointer" clicked={props.helpClick} >Help</NavigationItem>
                        <NavigationItem header={false} cursor="pointer" clicked={props.aboutClick} >About</NavigationItem>
                    </ul>
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;