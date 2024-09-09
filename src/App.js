import logo from "./logo.svg";
import "./App.css";
// useState built in hook in react.
import { useState } from "react";
import { StatesAndCapitals } from "./Data";

// this is the function or the component entery point, this will run all code place inside it.
function App() {
  // State to keep track of the user's search
  const [search, setSearch] = useState("");

  // Filter the list of states and capitals based on the search query from the user
  const filteredStates = StatesAndCapitals.filter(
    (item) =>
      item.state.toLowerCase().includes(search.toLowerCase()) || // Check if the state name includes the search query
      item.capital.toLowerCase().includes(search.toLowerCase()) // Check if the capital name includes the search query
  );

  // state used for saving the input
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    telephone: "",
    isEdit: false,
  });

  // list that accept and hold input details submitted by user. it accept an array
  const [list, setList] = useState([]);

  // this is a function that handles the the changes that are made while the user type in the input tag.
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // this function is used to save the from the formData state to the list and it create a unique id using the length of the List state.
  const handleSave = () => {
    let item = {
      ...formData,
      id: Number(list.length) + 1,
    };

    // this update the list of state with the data stored in the item.
    setList(list.concat(item));

    // this set the form data empty after successfull saving updateing the List state.
    setFormData({ name: "", address: "", telephone: "" });
  };

  // this is a function that handles delete logic, it accept and parameter Id.
  const handleDelete = (id) => {
    // this is used to filter data from the List of data using the id which is unque.
    // this filter finctionality filters and remove all data that it's id is not equal to the particular id pass in the function.
    const nList = list.filter((ls) => ls.id !== id);

    // this updates the list with the that returned after the filter operation is completed.
    setList(nList);
  };

  // this is a function that handles edit logic, accept a parameter LS.
  const handleEdit = (ls) => {
    // this update the formdata by destructuring the Ls(data) and setting isEdit to true value.
    setFormData({ ...ls, isEdit: true });
  };

  // this is a function that handles update functionality.
  const handleUpdate = () => {
    // this fiter the list using the id and remove data from the list that it's id is not equal to ls.id.
    const nList = list.filter((ls) => ls.id !== formData.id);
    // this update the List data by concating(joining) the Nlist which is what was filter and the formData.
    setList(nList.concat(formData));
    // this set the form data empty.
    setFormData({ name: "", address: "", telephone: "", isEdit: false });
  };

  return (
    <>
      <div className="container">
        <div className="card mt-3">
          <div className="card-body">
            <h5>Add New Contact</h5>
            <div className="border border-primary border-2 p-3">
              <form action="">
                {/* name */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="" className="mb-2 fw-bold">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        // name value from the forData state
                        value={formData.name}
                        className="form-control"
                        // onchange function that runs when the user starts typing.
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* address */}
                <div className="row mt-2">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="" className="mb-2 fw-bold">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        // address value from the forData state
                        value={formData.address}
                        className="form-control"
                        // onchange function that runs when the user starts typing.
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* telephone number */}
                <div className="row mt-2">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="" className="mb-2 fw-bold">
                        Telephone Number
                      </label>
                      <input
                        type="text"
                        name="telephone"
                        // telephone value from the forData state
                        value={formData.telephone}
                        className="form-control"
                        // onchange function that runs when the user starts typing.
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* horizontal rule */}
                <hr />
                {/* button */}
                <button
                  type="button"
                  // the button style is pass base on the state of isEdit.
                  // if the formData.isEdit == true else
                  className={
                    formData.isEdit ? "btn btn-success" : "btn btn-primary"
                  }
                  // the onclick function also is rendered babe on the value of is edit.
                  onClick={formData.isEdit ? handleUpdate : handleSave}
                >
                  {/* same here as well  */}
                  {formData.isEdit ? "Update Contact" : "Save Contact"}
                </button>
              </form>
            </div>

            <div className="border border-2 mt-5 p-3">
              <h5>Contact List</h5>

              {/* the list data is used to map a div that display the details it holds dynamically */}
              {/* li represent the data, while index represent the index or undering of data. this it to make the mapping of data unique */}
              {list.map((ls, index) => (
                // the key is used to hold index(id) value of the main div so all mapped details can be unique.
                <div className="text-wrapper" key={index}>
                  <div>
                    {/* this holdes the data.name, this is the name entered by the user. */}
                    <h5>{ls.name}</h5>
                    <p>
                      {/* this holdes the data.address, this is the name entered by the user. */}
                      {ls.address} &nbsp;
                      <span className="fw-bold text-danger">
                        {/* this holdes the data.address, this is the name entered by the user. */}
                        {ls.telephone}
                      </span>
                    </p>
                  </div>
                  <div className="btn-group">
                    {/* button to Edit a particular data from the mapped datas it accept the ls */}
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleEdit(ls)}
                    >
                      Edit
                    </button>
                    &nbsp;
                    {/* button to delete a particular data from the mapped datas is accepts an id */}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(ls.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="App">
            <h4>Nigerian States and Their Capitals</h4>
            <input
              type="text"
              placeholder="Search for a state or capital..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                marginBottom: "20px",
                width: "100%",
                maxWidth: "400px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            <div className="d-flex justify-content-center">
              <div className="">
                {filteredStates.map((item, index) => (
                  <div key={index} className="d-flex p-2 bd-highlight">
                    <p>{item.state} : </p> <span> {item.capital}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// this export App component, make it accessable to other component
// meaning it can be used by other component.
export default App;
