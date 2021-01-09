import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
const sideDrawer=(props)=>{
    let attatchedClasses=[classes.SideDrawer, classes.Close]
    if(props.open){
        attatchedClasses=[classes.SideDrawer,classes.Open];
    }
    return(
        <Auxiliary>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attatchedClasses.join(' ')} onClick={props.closed}>
            <Logo className={classes.Logo} height="11%"/>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </Auxiliary>
    );
}
export default sideDrawer;