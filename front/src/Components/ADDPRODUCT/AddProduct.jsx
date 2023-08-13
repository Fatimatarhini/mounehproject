import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import recipesImage from '../../images/Recipe book.gif';
import chefImage from '../../images/Chef-pana.png';
import './AddProduct.css';
import axios from 'axios';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const navigate = useNavigate();
const token = localStorage.getItem('access_token');

const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [category, setCategory] = useState("");
 const [categoryError, setCategoryError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");
  const [imagePath, setImage] = useState(null);
  const [imageError, setimageError] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientError, setIngredientError] = useState("");
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const [method, setMethod] = useState("");
  const [methodError, setMethodError] = useState("");

  
    const formRef = useRef(null); 
    const notify = () => toast.success('Product Added', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!token) {
            navigate('/login');
            return;
        }
        
        // Reset all the previous error messages
    setNameError("");
    setDescriptionError("");
    setPriceError("");
    setCategoryError("");
    setQuantityError("");
    setWeightError("");
  
    // Validate the input fields
    if (!name) {
      setNameError("Product name is required.");
      return;
    }
    if (!description) {
      setDescriptionError("Product description is required.");
      return;
    }
    if (!price) {
      setPriceError("Product price is required.");
      return;
    }
    if (!category) {
      setCategoryError("Product category is required.");
      return;
    }
    if (!quantity) {
      setQuantityError("Product quantity is required.");
      return;
    }
    if(!imagePath){
      setimageError("Product image  is required.");
    }
    
  
    try {
      console.log("Form submitted. Starting product creation...");
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("imagePath", imagePath);
      productData.append("category", category);
  
      // Additional check for 'Food' category before adding recipe data
      if (category === "Food") {
        if (!weight) {
          setWeightError("Product weight is required.");
          return;
        }
        if(!ingredient){
          setIngredientError("Product ingredient is required.");
          return;
        }
        if(!time){
          setTimeError("Product time is required.");
          return;
        }
        if(!method){
          setMethodError("Product method is required.");
          return;
        }
        productData.append("weight", weight);
        productData.append("ingredient", ingredient); // Corrected key here
        productData.append("time", time); // Corrected key here
        productData.append("method", method); // Corrected key here
      }

      console.log(category);

      console.log("Product data before sending request:", Object.fromEntries(productData)); // Log productData

      // Set the token in the request headers
      const headers = {
        token: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:3001/products",
        productData,
        { headers }
      );
      console.log("Product creation response:", response.data);
      if (response.data?.success) {
        notify();
      } else {
        notify();
      }
    } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log("Token is not valid!");
                navigate('/login');
            } else {
                console.error("Product Add failed:", error);
            }
        }
    };
    
    
    

    const driverObj1 = driver({
        showProgress: true,
        steps: [
          { element: '.add-product-container-form-left', popover: { title: 'Form', description: "This is the form where you will add the informations you're product." } },
          { element: '.product-name ', popover: { title: 'Product Name', description: 'First, Enter the name of the product you want to add.' } },
          { element: '.product-price', popover: { title: 'Product Price', description: 'Second, Determine how much you want to sell this product.' } },
          { element: '.product-quantity', popover: { title: 'Product Quantity', description: 'Then, Decide how many you want to sell.' } },
          { element: '.product-description', popover: { title: 'Product Description', description: 'Type an appropriate description, it must be more than 10 characters.' } },
          { element: '.product-category', popover: { title: 'Product Category', description: 'We allow you to sell two types of products, Choose one of them.' } },
        ]
      });
      

      const handleHelp = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    
        setTimeout(() => {
            driverObj1.drive();
        }, 450); 
    };
    
      
      

    return (
        <>
                <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

            <h1 className='add-product-container-header'>Add your Own Product</h1>
            <div className="add-product-container">
                <img src={recipesImage} alt="Recipe" />
                <div className="add-product-container-right">
                    <h1>Source of Magic</h1>
                    <p>
                        Here, you can add your own products
                        and provide details about them. Fill out the necessary information
                        and submit to add a new product to our collection.
                    </p>
                    <div>
                    <button onClick={handleHelp}>Need Help</button>
                    </div>
                </div>
            </div>
            <div ref={formRef} className="add-product-container-form">
                <form className='add-product-container-form-left'>
                    <div className="add-product-container-form-section product-name">
                        <label htmlFor="name">Product Name</label>
                        <input
                        type="text"
                        value={name}
                        placeholder="Write a name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      {nameError && (
                        <span className="error-message">{nameError}</span>
                      )}
                    </div>
                    <div className="add-product-container-form-section product-price">
                        <label htmlFor="price">Price/$</label>
                        <input
                        type="number"
                        value={price}
                        placeholder="Write a Price"
                        className="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      {priceError && (
                        <span className="error-message">{priceError}</span>
                      )}
                    </div>
                    <div className="add-product-container-form-section product-quantity">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                        type="number"
                        value={quantity}
                        placeholder="Write a quantity"
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      {quantityError && (
                        <span className="error-message">{quantityError}</span>
                      )}
                    </div>
                    <div className="add-product-container-form-section product-description">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                        value={description}
                        placeholder="Write a description"
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      {descriptionError && (
                        <span className="error-message">{descriptionError}</span>
                      )}
                    </div>
                    <div className="add-product-container-form-section product-category">
                        <label htmlFor="category">Category</label>
                        <div className="category-checkboxes">
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Food"
                                    checked={category === 'Food'}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                Food
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Craft"
                                    checked={category === 'Craft'}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                Craft
                            </label>
                            {categoryError && 
                            <span className="error-message">{categoryError}</span>
                            }
                        </div>
                    </div>
                    {category === 'Food' && (
                        <>
                            <div className="add-product-container-form-section product-ingredient">
                <label htmlFor="recipes.ingredient">Ingredient</label>
                <input
                            type="text"
                            value={ingredient}
                            placeholder="Ingredient"
                            className="form-control"
                            onChange={(e) => setIngredient(e.target.value)}
                          />
            </div>
            {ingredientError && (
                        <span className="error-message">{ingredientError}</span>
                      )}
            <div className="add-product-container-form-section product-time">
                                <label htmlFor="recipes.time">Time/minutes</label>
                                <input
                            type="number"
                            value={time}
                            placeholder="Time"
                            className="form-control"
                            onChange={(e) => setTime(e.target.value)}
                          />
                            </div>
                            {timeError && (
                        <span className="error-message">{timeError}</span>
                      )}
                            <div className="add-product-container-form-section product-weight">
                                <label htmlFor="recipes.weight">Weight/gram</label>
                                <input
                            type="number"
                            value={weight}
                            placeholder="Weight"
                            className="form-control"
                            onChange={(e) => setWeight(e.target.value)}
                          />
                          {weightError && (
                            <span className="error-message">{weightError}</span>
                          )}
                            </div>
                            <div className="add-product-container-form-section">
                                <label htmlFor="recipes.method">Method</label>
                                <input
                            type="text"
                            value={method}
                            placeholder="Method"
                            className="form-control"
                            onChange={(e) => setMethod(e.target.value)}
                          />
                          {methodError && (
                            <span className="error-message">{methodError}</span>
                          )}
                            </div>
                        </>
                    )}
                    <div className="add-product-container-form-section">
                        <label htmlFor="image">Upload an Image</label>
                        <input
                          type="file"
                          name="imagePath"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        {imageError && (
                            <span className="error-message">{imageError}</span>
                          )}
                    </div>
                    <button type='submit' onClick={handleSubmit}>Add Product</button>
                </form>
                <img src={chefImage} alt="Chef" />
            </div>
        </>
    );
}

export default AddProduct;
