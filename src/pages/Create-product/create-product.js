import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../validations/CreateProductValidation";
import Axios from "axios";

export const CreateProduct = () => {
  // Make tate to handle SKU unique error

  const [error, setError] = useState("");

  // Make state to display the inputs depends on they types [ex: type=book display input: size]

  const [type, setType] = useState("");

  // call the useNavigate() to navigate to products page

  const navigate = useNavigate();

  // Call useForm() , yuoResolver() & schema to handle the form validation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // function to handle form submit

  const sendData = (product) => {
    let deProduct = JSON.stringify(product);
    console.log(deProduct);
    PostProduct(deProduct);
  };

  // function to send new product to the database

  const PostProduct = (data) => {
    Axios.post("https://reactp-api.000webhostapp.com/api/addProduct.php", data)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  };

  // Return the view form

  return (
    <div className="container">
      <form className="mt-5 p-2 form-group " id="product_form" onSubmit={handleSubmit(sendData)}>
        <div className="header row p-2 ">
          <div className="title col-md-8 text-start">
            <h1>Add Product</h1>
          </div>
          <div className="buttons col-md-4 row justify-content-evenly">
            <input type="submit" className="btn btn-primary col-md-4 text-uppercase" value={"Save"} />
            <Link to={"/"} className="btn btn-danger col-md-4 text-uppercase" style={{ lineHeight: "40px" }}>
              Cancel
            </Link>
          </div>
        </div>
        <hr />
        <div className="body w-75 m-auto mt-5 bg-light p-4 rounded-4">
          <div className="input-group input-group-lg mb-3">
            <span className="input-group-text  w-25">SKU</span>
            <input type="text" id="sku" name="SKU" className="form-control" {...register("SKU")} />
          </div>
          <div className="d-flex justify-content-between  mb-3 w-100">
            <div>
              <div className="form-text text-start text-danger ">{error}</div>
              {errors.SKU ? <div className="form-text text-start text-danger">{errors.SKU.message}</div> : <></>}
            </div>
            <div className="form-text text-end">Please write the product's SKU</div>
          </div>
          <div className="input-group input-group-lg mb-3">
            <span className="input-group-text  w-25">Name</span>
            <input type="text" id="name" name="Name" className="form-control" {...register("Name")} />
          </div>
          <div className="d-flex justify-content-between  mb-3 w-100 ">
            <div>{errors.Name ? <div className="form-text text-start text-danger">{errors.Name.message}</div> : <></>}</div>
            <div className="form-text text-end">Please write the product's Name</div>
          </div>
          <div className="input-group input-group-lg mb-3">
            <span className="input-group-text w-25">Price</span>
            <input type="number" id="price" name="Price" className="form-control" {...register("Price")} />
            <span className="input-group-text">$</span>
          </div>
          <div className="d-flex justify-content-between  mb-3 w-100">
            <div>{errors.Price ? <div className="form-text text-start text-danger">{errors.Price.message}</div> : <></>}</div>
            <div className="form-text text-end">Please write the product's price</div>
          </div>
          <div className="input-group input-group-lg mb-3">
            <span className="input-group-text w-25">Type</span>
            <select
              tabIndex={"-1"}
              className="form-select"
              id="productType"
              name="Type"
              {...register("Type")}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option selected disabled></option>
              <option value={"Book"}>Book</option>
              <option value={"Dvd"}>DVD</option>
              <option value={"Furniture"}>Furniture</option>
            </select>
          </div>
          <div className="d-flex justify-content-between  mb-3 w-100">
            <div>{errors.Type ? <div className="form-text text-start text-danger">{errors.Type.message}</div> : <></>}</div>
            <div className="form-text text-end">Please write the product's Type</div>
          </div>
          {type === "Dvd" && (
            <div>
              <div className="input-group input-group-lg mb-3">
                <span className="input-group-text w-25">Size</span>
                <input type="number" className="form-control" id="size" name="Size" {...register("Size")} />
                <span className="input-group-text ">MB</span>
              </div>
              <div className="d-flex justify-content-between  mb-3 w-100">
                <div>{errors.Size ? <div className="form-text text-start text-danger">{errors.Size.message}</div> : <></>}</div>
                <div className="form-text text-end">Please write the DVD's Size</div>
              </div>
            </div>
          )}

          {type === "Book" && (
            <div>
              <div className="input-group input-group-lg mb-3">
                <span className="input-group-text w-25">Weight</span>
                <input type="number" id="weight" name="weight" className="form-control" {...register("Weight")} />
                <span className="input-group-text ">KG</span>
              </div>
              <div className="d-flex justify-content-between m-3 w-100">
                <div>{errors.Weight ? <div className="form-text text-start text-danger">{errors.Weight.message}</div> : <></>}</div>
                <div className="form-text text-end">Please write the Book's Weight</div>
              </div>
            </div>
          )}
          {type === "Furniture" && (
            <div>
              <div className="input-group input-group-lg mb-3">
                <span className="input-group-text w-25">Dimensions</span>
                <input type="number" id="height" name="Height" className="form-control" placeholder="Height" {...register("Height")} />
                <input type="number" id="width" name="Width" className="form-control" placeholder="Width" {...register("Width")} />
                <input type="number" id="length" name="Length" className="form-control" placeholder="Length" {...register("Length")} />
              </div>
              <div className="d-flex justify-content-between m-3 w-100">
                <div>
                  {errors.Height ? <div className="form-text text-start text-danger">{errors.Height.message}</div> : <></>}
                  {errors.Width ? <div className="form-text text-start text-danger">{errors.Width.message}</div> : <></>}
                  {errors.Length ? <div className="form-text text-start text-danger">{errors.Length.message}</div> : <></>}
                </div>
                <div className="form-text text-end">Please write the Furniture's Dimensions</div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
