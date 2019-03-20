import React from "react"

const Pizza = (props) => {

  const editLocal = () =>{
    props.editPizza(props.id)
   }

  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{props.vegetarian ? "yes" : "no"}</td>
      <td><button type="button" className="btn btn-primary" onClick={editLocal}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
