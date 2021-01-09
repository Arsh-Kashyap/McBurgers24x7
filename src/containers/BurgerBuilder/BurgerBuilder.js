import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={...};
    // }
    state = {
        purchasing: false,
        
    }
    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum>0;
    }
    
    purchasehandler = () => {
        if(this.props.isAuthenticated)
        {
            this.setState({ purchasing: true });
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;


        let burger = this.props.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />

        if (this.props.ings) {

            burger = (<Auxiliary>
                <Burger ingredients={this.props.ings} />
                <BuildControls ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    ordered={this.purchasehandler}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    isAuth={this.props.isAuthenticated}
                />


            </Auxiliary>);
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }
       

        return (
            <Auxiliary>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}

                </Modal>
                {burger}


            </Auxiliary>

        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),    
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));