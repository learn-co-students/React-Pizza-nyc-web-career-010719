import React from "react"

const Pizza = (props) => {

  let handle = (e) => {
    props.edit(props.id)
  }

  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{props.vegetarian ? "Yes" : "No"}</td>
      <td><button type="button" className="btn btn-primary" onClick={handle}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
