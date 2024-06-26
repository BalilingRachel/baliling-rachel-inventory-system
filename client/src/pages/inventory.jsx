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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-center mb-6">Sample Inventory</h1>
            {message.text && (
                <div className={`mb-4 text-center py-2 ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-md`}>
                    {message.text}
                </div>
            )}
            <div className="flex justify-end mb-4">
                <button 
                    type="button"
                    className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                    onClick={goToAddProducts}
                >
                    Add Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b border-gray-300">Product ID</th>
                            <th className="py-2 px-4 border-b border-gray-300">Product Name</th>
                            <th className="py-2 px-4 border-b border-gray-300">Quantity</th>
                            <th className="py-2 px-4 border-b border-gray-300">Unit</th>
                            <th className="py-2 px-4 border-b border-gray-300">Price</th>
                            <th className="py-2 px-4 border-b border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-2 px-4 border-b border-gray-300">{product.product_id}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{product.product_name}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{product.quantity}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{product.unit}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{product.price}</td>
                                <td className="py-2 px-4 border-b border-gray-300 flex justify-center">
                                    <button 
                                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                        onClick={() => openUpdateModal(product)}
                                    >
                                        Edit
                                    </button>
                                    <span className="mx-2 text-gray-400">|</span>
                                    <button 
                                        className="text-red-600 hover:text-red-900 focus:outline-none"
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-md w-1/3">
                        <h2 className="text-2xl mb-4">Update Product</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Name</label>
                                <input 
                                    type="text" 
                                    value={currentProduct.product_name}
                                    onChange={(e) => setCurrentProduct({...currentProduct, product_name: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Quantity</label>
                                <input 
                                    type="number" 
                                    value={currentProduct.quantity}
                                    onChange={(e) => setCurrentProduct({...currentProduct, quantity: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Unit</label>
                                <input 
                                    type="text" 
                                    value={currentProduct.unit}
                                    onChange={(e) => setCurrentProduct({...currentProduct, unit: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price</label>
                                <input 
                                    type="number" 
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button 
                                    type="button"
                                    className="py-2 px-4 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none mr-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
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
