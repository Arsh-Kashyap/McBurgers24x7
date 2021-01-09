import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
const checkoutSummary=(props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>
                Tastes Good
            </h1>
            <div style={{ width:'100%', margin:'auto',textAlign:'center'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutCancelled} btnType="Danger">Cancel</Button>
            <Button clicked={props.checkoutContinued} btnType="Danger">Continue</Button>
        </div>
    );
}
export default checkoutSummary;