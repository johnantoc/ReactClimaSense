import React, { Component } from 'react';
import styles from './SideBar.css';
import TempUnitSelect from '../../components/TempUnitSelect/TempUnitSelect';
import DrawerToggle from '../../components/SideDrawer/DrawerToggle/DrawerToggle';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Modal from '../../components/UI/Modal/Modal';
import Help from '../../components/Help/Help';
import About from '../../components/About/About';

class SideBar extends Component {

    state = {
        showSideDrawer: false,
        showAddPlaceInput: false,
        addedPlace: "",
        showSearchInput: false,
        searchValue: "",
        helpModal: false,
        aboutModal: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false,
            showAddPlaceInput: false,
            addedPlace: "",
            showSearchInput: false,
            searchValue: ""
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    addPlaceClickHandler = () => {
        this.setState({ showAddPlaceInput: true });
    }

    addPlaceChangeHandler = (event) => {
        this.setState({ addedPlace: event.target.value });
    }

    searchChangeHandler = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    searchClickHandler = () => {
        this.setState({ showSearchInput: true });
    }

    helpClickHandler = () => {
        this.sideDrawerCloseHandler();
        this.setState({ helpModal: true });
    }

    aboutClickHandler = () => {
        this.sideDrawerCloseHandler();
        this.setState({ aboutModal: true });
    }

    closeModal = () => {
        this.setState({ helpModal: false });
        this.setState({ aboutModal: false });
    }

    render() {
        return (
            <aside className={styles.SideBar}>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                    favPlaces={this.props.favPlaces}
                    currentLocation={this.props.currentLocation}
                    showAddPlaceInput={this.state.showAddPlaceInput}
                    addPlaceValue={this.state.addedPlace}
                    addPlaceChangeHandler={this.addPlaceChangeHandler}
                    addPlaceClickHandler={this.addPlaceClickHandler}
                    addPlace={() => {
                        this.props.addPlace(this.state.addedPlace);
                        this.setState({
                            showAddPlaceInput: false,
                            addedPlace: "",
                            showSideDrawer:false
                        });
                    }}
                    showSearchInput={this.state.showSearchInput}
                    searchValue={this.state.searchValue}
                    searchChangeHandler={this.searchChangeHandler}
                    searchClickHandler={this.searchClickHandler}
                    searchPlace={() => {
                        this.props.searchPlace(this.state.searchValue);
                        this.setState({
                            showSearchInput: false,
                            searchValue: "",
                            showSideDrawer:false
                        });
                    }}
                    helpClick={this.helpClickHandler}
                    aboutClick={this.aboutClickHandler}
                />
                <DrawerToggle clicked={this.sideDrawerToggleHandler} />
                <TempUnitSelect switch={this.props.switchToggleHandler} />
                <Modal show={this.state.helpModal || this.state.aboutModal} modalClosed={this.closeModal}>
                    {(this.state.helpModal) ? <Help /> : null}
                    {(this.state.aboutModal)? <About /> : null}
                </Modal>

            </aside>
        );
    }
}

export default SideBar;