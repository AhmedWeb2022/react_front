import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";

export const Home = () => {
  // make state to stor the deleted product ids

  const [getIds, setGetIds] = useState([]);

  // Get the products from database using useQuery hook

  const { data, isLoading, refetch } = useQuery(["productData"], () => {
    return Axios.get("https://reactp-api.000webhostapp.com/api/showProduct.php").then((res) => res.data);
  });

  // function to handle the checkbox and store the selected ids into setGitIds() state

  const handelChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setGetIds((pre) => [...pre, value]);
    }
  };

  // if the data take time to display use this until data comes from database

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // function to handel deleted product by sending the checked ids to database
  const deleteProduct = () => {
    // object to store ids in before sending them

    let productData = {
      id: getIds,
    };

    let d = JSON.stringify(productData);
    // check if there is data to delete before i click on mass Delete button

    data &&
      Axios.post(`https://reactp-api.000webhostapp.com/api/deleteProduct.php/`, d)
        .then((res) => console.log(res))
        .then(refetch)
        .catch((err) => console.log(err));
  };

  // display the showProducts view

  return (
    <div className="main container ">
      <div className="header row  pt-4">
        <h1 className="col-md-8 text-start">Product Page</h1>
        <div className="col-md-4 row justify-content-between ">
          <button className="mass-delete btn btn-danger col-md-5 text-uppercase" name="mass_delete" onClick={deleteProduct}>
            MASS DELETE
          </button>
          {/* <input type="submit" className="mass-delete btn btn-danger col-md-5 text-uppercase" value={"MASS DELETE"} onClick={deleteProduct}/> */}
          <Link to={"create"} className="col-md-5 ADD" role="button">
            <button className="btn btn-primary w-100 h-100 text-uppercase" name="ADD">ADD</button>
          </Link>
        </div>
      </div>
      <hr />
      <div className="product-list">
        {data ? (
          data.map((val) => {
            return (
              <div className="product card text-bg-light  mb-3" key={val?.id}>
                <div className="card-header">
                  <input type="checkbox" className="delete-checkbox" value={val?.id} onChange={handelChange} />
                  {val.SKU ? <p> {val.SKU} </p> : ""}
                </div>
                <div className="card-body">
                  {val.Name ? <h5 className="card-title text-start mb-4"> {val.Name} </h5> : ""}
                  {val.Type ? <p className="card-text text-start"> Type : {val.Type} </p> : ""}
                  {val.Price ? <p className="card-text text-start"> Price : {val.Price} $</p> : ""}
                  {val.Size ? <p className="card-text text-start"> Size : {val.Size} MB</p> : ""}
                  {val.Weight ? <p className="card-text text-start"> Weight : {val.Weight} KG</p> : ""}
                  {val.Dimensions ? <p className="card-text text-start"> Dimensions : {val.Dimensions}</p> : ""}
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h4>There is No Products</h4>
          </div>
        )}
      </div>
    </div>
  );
};
