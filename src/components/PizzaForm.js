import React from "react"

const PizzaForm = (props) => {

  const postTopping = () => {
    if (props.pizza === null) {
      return "Pizza Topping"
    } else {
      return props.pizza.topping
    }
  }

  const postSize = () => {
    if (props.pizza === null) {
      return ""
    } else {
      return props.pizza.size
    }
  }

  const veggieCheck = () => {
    if (props.pizza === null) {
      return null
    } else if (props.pizza.vegetarian === true) {
      return true
    } else if (props.pizza.vegetarian === false) {
      return false
    }
  }

  const handleChange = (e) => {
    props.handleChange(e.target)
  }

  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" onChange={handleChange} name="topping" className="form-control" placeholder={postTopping()} value={
                props.topping
              } />
        </div>
        <div className="col">
          <select value={postSize()} name="size" className="form-control" onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" onChange={handleChange} name="vegetarian" type="radio" value={props.vegetarian} checked={veggieCheck()}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" onChange={handleChange} name="vegetarian" type="radio" value={props.vegetarian} checked={!veggieCheck()}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handleClick}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
