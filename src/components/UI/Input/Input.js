import React from 'react';
import classes from './Input.css';

const input=(props)=>{
    let inputElement=null;
    const inputclasses=[classes.InputElement]
    let validationError=null;
    if(props.invalid&&props.shouldValidate&&props.touched)
    {
        inputclasses.push(classes.Invalid);
        validationError="Please Enter a valid "+props.label;

    }
    switch(props.elementType){
        case('input'):
        
        inputElement=<input onChange={props.changed} className={inputclasses.join(' ')} {...props.elementConfig} value={props.value}/>
        break;
        case ('textarea'):            
                inputElement=<textarea onChange={props.changed} className={inputclasses.join(' ')} {...props.elementConfig} value={props.value}/>
            break;
        case ('select'):
            inputElement=<select onChange={props.changed} className={inputclasses.join(' ')}
             value={props.value}>
                 {props.elementConfig.options.map(option=>(
                     <option key={option.value} value={option.value}>
                         {option.displayValue}
                     </option>
                 ))}
             </select>
             break;
        default:            
                inputElement=<input onChange={props.changed} className={inputclasses.join(' ')} {...props.elementConfig} value={props.value}/>
    }
    
    return(
        <div className={classes.Input}>
            {inputElement}
            {validationError}
        </div>
    );
}
export default input;