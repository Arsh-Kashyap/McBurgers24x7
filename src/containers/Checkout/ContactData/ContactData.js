import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkvalidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched:false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,

                },

                valid: false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value:'fastest',
                validation:{},
                valid: true,
                touched:false,
            }
        },
        formIsValid:false,
      
    }
    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier]['value'];
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
      
        
    }
    
    inputChangedHandler = (event, inputIdentifier) => {
        
        const updateOrderFormElement =updateObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkvalidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched:true,

        });
        const updatedOrderForm =updateObject(this.state.orderForm,{
            [inputIdentifier]:updateOrderFormElement
        })
        
        
        let formIsValid=true;
        for(let inputIdentifier in updatedOrderForm)
        {
            formIsValid=updatedOrderForm[inputIdentifier].valid&&formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm ,formIsValid:formIsValid});
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        label={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />

                ))}
                <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>
                    Enter Your Contact Data
            </h4>
                {form}

            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps=dipatch=>{
    return{
        onOrderBurger:(orderData,token)=>dipatch(actions.purchaseBurger(orderData,token))
    };
   
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));