import React from "react"

const Pizza = (props) => {
  console.log("pizza props", props)
  return(

    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => {props.pizzaEdit(props.pizza.id)}}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
