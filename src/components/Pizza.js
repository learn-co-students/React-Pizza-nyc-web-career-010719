import React from "react"

const Pizza = (props) => {

  const renderVegetarian = () => {
    if (props.pizza.vegetarian === true) {
      return <td>Vegetarian</td>
    } else {
      return <td>Not Vegetarian</td>
    }
  }

  const handleClick = () => {
    props.getPizza(props.pizza.id)
  }

  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      {renderVegetarian()}
      <td><button type="button" className="btn btn-primary" onClick={handleClick}>
        Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
