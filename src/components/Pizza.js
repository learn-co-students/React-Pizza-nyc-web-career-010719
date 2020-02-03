import React from "react"

const Pizza = (props) => {

  const handleOnClick = () => {
    props.handlePizzaEdit(props.pizza.id, props.pizza.topping, props.pizza.size, props.pizza.vegetarian)
  }

  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian ? "Yes" : "No"}</td>
      <td><button type="button" className="btn btn-primary" onClick={handleOnClick}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
