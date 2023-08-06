import React, { useState, useEffect } from "react";
import "./Product.css";
import { useParams,useNavigate  } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";

/*function getAccessToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split("; access_token=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}*/

const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams();
  const productID = params.productID;

  

  const cartHandling = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    if (!token) {
        navigate('/login');
        return;
    }

    try {
        const response = await axios.post(`http://localhost:3001/cart/${localStorage.getItem('userId')}/${productID}`, {quantity}, {
            headers: {
                token: `Bearer ${token}`,
            },
        });
       
        console.log("Cart Added successfully!");
        navigate("/cart");
        console.log(response);
        console.log(quantity);
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log("Token is not valid!");
            navigate('/login');
        } else {
            console.error("Cart Add failed:", error);
            console.log(quantity);
        }
    }
};

  useEffect(() => {
    axios
      .get("http://localhost:3001/products/find/" + productID)
      .then((result) => {
        console.log(result.data);
        setProduct(result.data);
      })
      .catch((error) => console.error(error));
  }, [productID]); // Add id as a dependency to the useEffect hook

  // Check if the product data is available before rendering
  if (!product) {
    return <div style={{display:'flex',justifyContent:'center',color:'var(--primary-color)',fontSize:'x-large'}}>Loading...</div>;
  }

  const isFoodCategory = product.category === "Food";
  

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="product-card-container">
      <div className="product-card">
        <div className="card__wrapper">
        <div className="card__back">
            <button onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
          {isFoodCategory && <div className="card__menu" onClick={handleMenuClick}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          }
          
        </div>

        {isMenuOpen ? (
          <div className="card__img" style={{ display: "none" }}>
            <img style={{ display: "none" }} alt="" />
          </div>
        ) : (
          <div className="card__img">
            <img src={product.image} alt={product.image} />
          </div>
        )}

        <div className="card__title">
          {isMenuOpen ? (
            <>
              <div>Quantity: {product.quantity}</div>
              <div>Weight: {product.weight}g</div>
            </>
          ) : (
            product.name
          )}
        </div>

        <div className="card__subtitle">
          {isMenuOpen && isFoodCategory ? (
            <>
              <div>
                <span className="card__subtitle-span">Recipes:</span>
              </div>
              <div>
                <span className="card__subtitle-span">Ingredient:</span>
                {product.recipes.ingredient}
              </div>
              <div>
                <span className="card__subtitle-span">Time:</span>
                {product.recipes.time}m
              </div>
              <div>
                <span className="card__subtitle-span">Method:</span>
                {product.recipes.method}
              </div>
            </>
          ) : (
            product.description
          )}
        </div>

        <div className="card__wrapper">
          <div className="card__price">${product.price}</div>
          <div className="card__counter">
            
            <button className="card__btn" onClick={handleDecrement}>
              -
            </button>
            <input
              className="card__counter-score"
              value={quantity}
              onChange={handleQuantityChange}
            ></input>
            <button className="card_btn card_btn-plus" onClick={handleIncrement}>
              +
            </button>
            
          </div>
          
        </div>
            <form style={{display:"flex",justifyContent:"center"}} onSubmit={cartHandling} action="">
            <button type="submit" className="card__counter-submit-btn">Add To Cart</button>
            </form> 
      </div>
    </div>
  );
};

export default Product;