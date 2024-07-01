import { useState } from "react";
import { addProducts } from "../api/products";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            const response = await addProducts(productId, productName, quantity, unit, price);
            alert("Product added successfully!");
            navigate('/inventory'); // Navigate to the inventory page
        } catch (error) {
            alert("Failed to add product. Please try again.");
            console.error(error);
        }
    };

    return (
        <div style={{ 
            height: '100vh', 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'linear-gradient(to bottom right, #ffccff, #ff99cc)' 
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '400px', 
                padding: '20px', 
                backgroundColor: 'white', 
                borderRadius: '15px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    color: '#ff66b2', 
                    marginBottom: '20px',
                    fontFamily: 'cursive' 
                }}>Add Product</h2>
                <form style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '15px' 
                }} onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
                    <div>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '14px', 
                            fontWeight: 'medium', 
                            color: '#ff66b2' 
                        }}>Product ID</label>
                        <input
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            style={{ 
                                marginTop: '5px', 
                                display: 'block', 
                                width: '100%', 
                                padding: '10px', 
                                backgroundColor: 'white', 
                                border: '1px solid #ff66b2', 
                                borderRadius: '10px', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                fontSize: '14px',
                                color: '#ff66b2'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '14px', 
                            fontWeight: 'medium', 
                            color: '#ff66b2' 
                        }}>Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            style={{ 
                                marginTop: '5px', 
                                display: 'block', 
                                width: '100%', 
                                padding: '10px', 
                                backgroundColor: 'white', 
                                border: '1px solid #ff66b2', 
                                borderRadius: '10px', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                fontSize: '14px',
                                color: '#ff66b2'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '14px', 
                            fontWeight: 'medium', 
                            color: '#ff66b2' 
                        }}>Quantity</label>
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            style={{ 
                                marginTop: '5px', 
                                display: 'block', 
                                width: '100%', 
                                padding: '10px', 
                                backgroundColor: 'white', 
                                border: '1px solid #ff66b2', 
                                borderRadius: '10px', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                fontSize: '14px',
                                color: '#ff66b2'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '14px', 
                            fontWeight: 'medium', 
                            color: '#ff66b2' 
                        }}>Unit</label>
                        <input
                            type="text"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            style={{ 
                                marginTop: '5px', 
                                display: 'block', 
                                width: '100%', 
                                padding: '10px', 
                                backgroundColor: 'white', 
                                border: '1px solid #ff66b2', 
                                borderRadius: '10px', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                fontSize: '14px',
                                color: '#ff66b2'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '14px', 
                            fontWeight: 'medium', 
                            color: '#ff66b2' 
                        }}>Price</label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{ 
                                marginTop: '5px', 
                                display: 'block', 
                                width: '100%', 
                                padding: '10px', 
                                backgroundColor: 'white', 
                                border: '1px solid #ff66b2', 
                                borderRadius: '10px', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                fontSize: '14px',
                                color: '#ff66b2'
                            }}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                backgroundColor: '#ff66b2', 
                                color: 'white', 
                                fontWeight: 'bold', 
                                borderRadius: '10px', 
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                cursor: 'pointer', 
                                transition: 'background-color 0.3s',
                                border: 'none'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#ff85c0'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#ff66b2'}
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
