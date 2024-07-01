import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct, updateProduct } from "../api/products";
import { useEffect, useState } from "react";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    const goToAddProducts = () => {
        navigate('/add-product');
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await deleteProduct(productId);
                if (response.success) {
                    setProducts(products.filter(product => product.product_id !== productId));
                    setMessage({ text: "Product deleted successfully!", type: "success" });
                } else {
                    setMessage({ text: "Failed to delete product. Please try again.", type: "error" });
                }
            } catch (error) {
                setMessage({ text: "Failed to delete product. Please try again.", type: "error" });
                console.error("Failed to delete product", error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProduct(
                currentProduct.product_id,
                currentProduct.product_name,
                currentProduct.quantity,
                currentProduct.unit,
                currentProduct.price
            );
            if (response.success) {
                setProducts(products.map(product => 
                    product.product_id === currentProduct.product_id ? currentProduct : product
                ));
                setIsModalOpen(false);
                setMessage({ text: "Product updated successfully!", type: "success" });
            } else {
                setMessage({ text: "Failed to update product. Please try again.", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Failed to update product. Please try again.", type: "error" });
            console.error("Failed to update product", error);
        }
    };

    const openUpdateModal = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div style={{ 
            container: '100vw', 
            margin: '0 auto', 
            padding: '20px 0', 
            fontFamily: 'cursive', 
            textAlign: 'center', 
            background: 'linear-gradient(to bottom right, #ffccff, #ff99cc)', 
            minHeight: '100vh'
        }}>
            <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: '#ff66b2', 
                marginBottom: '20px'
            }}>Sample Inventory</h1>
            {message.text && (
                <div style={{ 
                    marginBottom: '20px', 
                    padding: '10px 0', 
                    color: message.type === "success" ? "#28a745" : "#dc3545", 
                    backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da", 
                    borderRadius: '10px'
                }}>
                    {message.text}
                </div>
            )}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginBottom: '20px'
            }}>
                <button 
                    type="button"
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#ff66b2', 
                        color: 'white', 
                        borderRadius: '10px', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                        cursor: 'pointer', 
                        border: 'none'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#ff85c0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ff66b2'}
                    onClick={goToAddProducts}
                >
                    Add Product
                </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                    width: '100%', 
                    backgroundColor: 'white', 
                    border: '1px solid #ddd', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    borderRadius: '10px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f3e5f5' }}>
                            <th style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>Product ID</th>
                            <th style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>Product Name</th>
                            <th style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>Quantity</th>
                            <th style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>Unit</th>
                            <th style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>Price</th>
                            <th style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8bbd0' : '#ffc1e3' }}>
                                <td style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>{product.product_id}</td>
                                <td style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>{product.product_name}</td>
                                <td style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>{product.quantity}</td>
                                <td style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>{product.unit}</td>
                                <td style={{ padding: '10px 20px', borderBottom: '1px solid #ddd' }}>{product.price}</td>
                                <td style={{ padding: '10px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <button 
                                        style={{ 
                                            color: '#5c6bc0', 
                                            background: 'none', 
                                            border: 'none', 
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                        onClick={() => openUpdateModal(product)}
                                    >
                                        Edit
                                    </button>
                                    <span style={{ color: '#5c6bc0' }}>|</span>
                                    <button 
                                        style={{ 
                                            color: '#e53935', 
                                            background: 'none', 
                                            border: 'none', 
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                        onClick={() => handleDelete(product.product_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div style={{ 
                    position: 'fixed', 
                    top: '0', 
                    left: '0', 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
                }}>
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '10px', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                        width: '400px' 
                    }}>
                        <h2 style={{ 
                            fontSize: '24px', 
                            marginBottom: '20px' 
                        }}>Update Product</h2>
                        <form onSubmit={handleUpdate}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Product Name</label>
                                <input 
                                    type="text" 
                                    value={currentProduct.product_name}
                                    onChange={(e) => setCurrentProduct({...currentProduct, product_name: e.target.value})}
                                    style={{ 
                                        width: '100%', 
                                        padding: '10px', 
                                        border: '1px solid #ddd', 
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Quantity</label>
                                <input 
                                    type="number" 
                                    value={currentProduct.quantity}
                                    onChange={(e) => setCurrentProduct({...currentProduct, quantity: e.target.value})}
                                    style={{ 
                                        width: '100%', 
                                        padding: '10px', 
                                        border: '1px solid #ddd', 
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Unit</label>
                                <input 
                                    type="text" 
                                    value={currentProduct.unit}
                                    onChange={(e) => setCurrentProduct({...currentProduct, unit: e.target.value})}
                                    style={{ 
                                        width: '100%', 
                                        padding: '10px', 
                                        border: '1px solid #ddd', 
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Price</label>
                                <input 
                                    type="number" 
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                                    style={{ 
                                        width: '100%', 
                                        padding: '10px', 
                                        border: '1px solid #ddd', 
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button 
                                    type="button"
                                    style={{ 
                                        padding: '10px 20px', 
                                        backgroundColor: '#aaa', 
                                        color: 'white', 
                                        borderRadius: '10px', 
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                        cursor: 'pointer', 
                                        border: 'none'
                                    }}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    style={{ 
                                        padding: '10px 20px', 
                                        backgroundColor: '#ff66b2', 
                                        color: 'white', 
                                        borderRadius: '10px', 
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                        cursor: 'pointer', 
                                        border: 'none'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#ff85c0'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#ff66b2'}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
