import React, { useState, ChangeEvent, FormEvent } from "react";
import ProductsTable from "../../components/add-product/table/tableAddProduct";

interface ProductFormData {
  housewareId: string;
  name: string;
  type: string;
  quantity: number;
  status: "Active" | "Inactive";
  price: number;
  productImage: File | null;
}

interface Product extends Omit<ProductFormData, 'productImage'> {
  id: string;
  imagePreview?: string;
}

const AddProduct: React.FC = () => {
  const housewareOptions = [
    { value: "HW001", label: "HW001 - Phòng khách" },
    { value: "HW002", label: "HW002 - Phòng ngủ" },
    { value: "HW003", label: "HW003 - Nhà bếp" },
    { value: "HW004", label: "HW004 - Phòng tắm" },
    { value: "HW005", label: "HW005 - Văn phòng" },
  ];

  const [formData, setFormData] = useState<ProductFormData>({
    housewareId: "",
    name: "",
    type: "",
    quantity: 0,
    status: "Active",
    price: 0,
    productImage: null,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, productImage: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === editingId ? {
          ...product,
          housewareId: formData.housewareId,
          name: formData.name,
          type: formData.type,
          quantity: formData.quantity,
          status: formData.status,
          price: formData.price,
          imagePreview: formData.productImage 
            ? URL.createObjectURL(formData.productImage) 
            : product.imagePreview
        } : product
      ));
      setEditingId(null);
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        housewareId: formData.housewareId,
        name: formData.name,
        type: formData.type,
        quantity: formData.quantity,
        status: formData.status,
        price: formData.price,
        imagePreview: formData.productImage ? URL.createObjectURL(formData.productImage) : undefined
      };
      
      setProducts([...products, newProduct]);
    }
    
    // Reset form
    setFormData({
      housewareId: "",
      name: "",
      type: "",
      quantity: 0,
      status: "Active",
      price: 0,
      productImage: null,
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setEditingId(updatedProduct.id);
    setFormData({
      housewareId: updatedProduct.housewareId,
      name: updatedProduct.name,
      type: updatedProduct.type,
      quantity: updatedProduct.quantity,
      status: updatedProduct.status,
      price: updatedProduct.price,
      productImage: null, // Keep existing image unless changed
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    if (editingId === productId) {
      setEditingId(null);
      setFormData({
        housewareId: "",
        name: "",
        type: "",
        quantity: 0,
        status: "Active",
        price: 0,
        productImage: null,
      });
    }
  };

  const handleClearAllProducts = () => {
    setProducts([]);
    // Also reset editing if in progress
    if (editingId) {
      setEditingId(null);
      setFormData({
        housewareId: "",
        name: "",
        type: "",
        quantity: 0,
        status: "Active",
        price: 0,
        productImage: null,
      });
    }
  };

  // const handleSaveAllToLocalStorage = () => {
  //   if (products.length === 0) {
  //     alert("No products to save!");
  //     return;
  //   }

  //   if (window.confirm(`Are you sure you want to save all ${products.length} products to localStorage and clear the table?`)) {
  //     try {
  //       // Get existing products from localStorage or initialize empty array
  //       const existingProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
        
  //       // Create new array with existing and current products
  //       const updatedProducts = [...existingProducts, ...products.map(product => {
  //         // Remove the imagePreview as it's a blob URL that won't persist
  //         const { imagePreview, ...productWithoutPreview } = product;
  //         return productWithoutPreview;
  //       })];
        
  //       // Save to localStorage
  //       localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
        
  //       // Clear the table
  //       handleClearAllProducts();
        
  //       alert(`Successfully saved ${products.length} products to localStorage!`);
  //     } catch (error) {
  //       console.error("Error saving to localStorage:", error);
  //       alert("Failed to save products to localStorage. Please try again.");
  //     }
  //   }
  // };

  return (
    <div className="w-full rounded-md bg-white flex items-center flex-col gap-5 p-5"> 
      <div className="w-full rounded-md bg-white p-5 ">
        <form
          className="w-full"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <h2 className="text-black text-xl font-semibold mb-6">
            {editingId ? "Update Product" : "Add New Product"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
            {/* Houseware ID */}
            <div>
              <label
                htmlFor="housewareId"
                className="block text-sm font-semibold text-black mb-1"
              >
                Houseware ID
              </label>
              <select
                id="housewareId"
                name="housewareId"
                value={formData.housewareId}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                required
              >
                <option value="" disabled>
                  Select houseware ID
                </option>
                {housewareOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-black mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                required
              />
            </div>
            
            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-semibold text-black mb-1"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                required
              >
                <option value="" disabled>
                  Select type
                </option>
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Type 3</option>
              </select>
            </div>
            
            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-black mb-1"
              >
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                required
              />
            </div>
            
            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-black mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-black mb-1"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                required
              />
            </div>
          </div>
          
          {/* Image */}
          <div className="mb-4">
            <label
              htmlFor="productImage"
              className="block text-sm font-semibold text-black mb-2"
            >
              Product Image
            </label>
            <div className="flex items-center gap-4">
              <input
                id="productImage"
                name="productImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex-1 rounded-md border border-gray-200 bg-white text-gray-700 file:bg-[#0a162c] file:text-white file:px-4 file:py-2 file:rounded-l-md file:border-none file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
              />
              {formData.productImage ? (
                <img 
                  src={URL.createObjectURL(formData.productImage)} 
                  alt="Preview" 
                  className="w-14 h-14 rounded-md object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-2xl cursor-pointer">
                  <i className="far fa-image" aria-hidden="true"></i>
                  <span className="sr-only">Product image icon</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#0a162c] text-white font-semibold py-3 rounded-md hover:bg-[#08122a] transition-colors"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    housewareId: "",
                    name: "",
                    type: "",
                    quantity: 0,
                    status: "Active",
                    price: 0,
                    productImage: null,
                  });
                }}
                className="flex-1 bg-gray-500 text-white font-semibold py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products Table */}
      <ProductsTable 
        products={products} 
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onClearAll={handleClearAllProducts}
      />
    </div>
  );
};

export default AddProduct;