import React from "react"

const Pizza = (props) => {

  const handleClick = () => {
    props.editPizza(props)
  }

  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{props.vegetarian ? "yes" : null}</td>
      <td><button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
