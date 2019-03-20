import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping"
            value={props.editTopping} onChange={(event) => props.handlePizzaInput(event)}/>
        </div>
        <div className="col">
          <select value={props.editSize}  onChange={(event) => props.handlePizzaInput(event)} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="isVeggie" onChange={(event) => props.handlePizzaInput(event)} value="Vegetarian" checked=
            {(props.editVegetarian === true) ? true : (props.editVegetarian === false) ? false : null } />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="isVeggie" value="Not Vegetarian" onChange={(event) => props.handlePizzaInput(event)} checked={(props.editVegetarian === true) ? false : (props.editVegetarian === false) ? true : null }/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={(id) => props.updatePizzas(props.editPizza.id)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
