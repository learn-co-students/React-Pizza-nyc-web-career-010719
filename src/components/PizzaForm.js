import React from "react"

const PizzaForm = (props) => {
  console.log(props.pizzaForEdit)
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder={props.pizzaForEdit.topping} value={
                null
              } onChange={(e) => props.updatePizzaTopping(e.target.value)}/>
        </div>
        <div className="col">
          <select value={props.pizzaForEdit.size} className="form-control" onChange={(e) => props.updatePizzaSize(e.target.value)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" checked={props.pizzaForEdit.vegetarian} onChange={(e) => props.updatePizzaVeg("Vegetarian")}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!props.pizzaForEdit.vegetarian} onChange={(e) => props.updatePizzaVeg(false)}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={() => props.submitPizzaEdit(props.pizzaForEdit)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
