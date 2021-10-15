import React, { useState, useEffect } from "react";

import * as yup from 'yup'
import axios from 'axios'
import schema from './validation/formSchema'
import Form from './components/form'
import {BrowserRouter, Route, Link, useHistory} from 'react-router-dom'

//if break, check false value, maybe string?
const initialFormValues = { 
//text 
name: '',
instructions: '',
//dropdown
size: '',
//radio button
sauce: '',
pepperoni:false,
mushrooms: false,
extraCheese: false,
gabagool: false,
}
const initialFormErrors = {
name: '',
size:'',
// instructions: '',
}
const initialOrders = []
const initialDisabled = true

export default function App(){
  const [order, setOrder] = useState(initialOrders);
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // const newOrder = () => {
  //   axios.get('https://reqres.in/api/orders')
  //   .then(response => {
  //     setOrder([response.data, ...order]);
  //   }).catch(error => {
  //     console.error(error)
  //   })
  // }
const postNewOrder = newOrder => {
  axios.post('https://reqres.in/api/orders', newOrder)
  .then(res => {
    setOrder([res.data, ...order])
  }).catch(error => {
    console.error(error);
  }).finally(() => {
    setFormValues(initialFormValues)
  })
}


const validate = (name, value) => {
  yup.reach(schema, name)
  .validate(value)
  .then(() => setFormErrors({...formErrors, [name]: ''}))
  .catch(error => setFormErrors({...formErrors, [name]: error.errors[0]}))
}
const inputChange = (name, value) => {
  validate(name, value);
  setFormValues({
    ...formValues,
    [name]: value
  })
}
const formSubmit = () => {
  const newOrder = {
    name:formValues.name.trim(),
    size:formValues.size.trim(),
    instructions:formValues.instructions.trim(),
    sauce: formValues.sauce.trim(),
    toppings: [ 'pepperoni', 'mushrooms', 'extraCheese', 'pineapple'].filter(topping => !!formValues[topping])
  }
postNewOrder(newOrder)
}
// useEffect(() => {
//   newOrder()
// })
useEffect(() => {
  schema.isValid(formValues).then(valid => setDisabled(!valid))
}, [formValues])

  return (
    <div>
      <BrowserRouter>
      <Route exact path='/'>
      <h1>Lambda Eats</h1>
      <p>lets get some 'za family style</p>
      <Link id='order-pizza' to='/pizza'>Pizza time</Link>
      </Route>
      <Route path='/pizza'>
    <Form
    values={formValues}
    change={inputChange}
    submit={formSubmit}
    disabled={disabled}
    errors={formErrors}
    />
    </Route>
    </BrowserRouter>
</div>
  );
};

