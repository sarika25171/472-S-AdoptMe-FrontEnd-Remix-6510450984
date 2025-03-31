import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import type { Cart } from "~/models/cart";
import { useFetcher } from "@remix-run/react";

interface CartDrawerProps {
  carts: Cart[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ carts, isOpen, onClose }: CartDrawerProps) {
  const fetcher = useFetcher<{ carts: Cart[] }>();
  const isSubmitting = fetcher.state === "submitting";
  
  // Use fetcher data if available, otherwise use initial cart
  // const carts = fetcher.data?.carts ?? initialCart;
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const formData = new FormData();
    formData.append("intent", "update");
    formData.append("productId", productId.toString());
    formData.append("quantity", newQuantity.toString());
    
    fetcher.submit(formData, { 
      method: "post",
      action: "/cart"
    });
  };

  const handleCheckout = () => {
    const formData = new FormData();
    formData.append("intent", "checkout");
    formData.append("carts", JSON.stringify(carts));
    
    fetcher.submit(formData, {
      method: "post",
      action: "/cart"
    });
  }

  const handleRemoveItem = (productId: number) => {
    const formData = new FormData();
    formData.append("intent", "remove");
    formData.append("productId", productId.toString());
    
    fetcher.submit(formData, { 
      method: "post",
      action: "/cart"
    });
  };

  const handleClearCart = () => {
    const formData = new FormData();
    formData.append("intent", "clear");
    
    fetcher.submit(formData, { 
      method: "post",
      action: "/cart"
    });
  };

  let total: number = 0;
  carts.forEach((cart) => {
    total += cart.product.price * cart.quantity;
  });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-primary-orange flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {carts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {carts.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.product.imageurl} 
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">${item.product.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                          className="px-2 py-1 border rounded"
                          disabled={isSubmitting}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                          className="px-2 py-1 border rounded"
                          disabled={isSubmitting}
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.product_id)}
                        className="text-red-500 hover:text-red-700"
                        disabled={isSubmitting}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">
                Total: ${total}
              </div>

              {/* Clear Cart */}
              {carts.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700"
                  disabled={isSubmitting}
              >
                Clear Cart
              </button>
              )}

            </div>

            {/* Checkout Button */}
            <button
              className="w-full px-4 py-2 bg-primary-orange text-white rounded hover:bg-opacity-90 transition-colors"
              disabled={isSubmitting || carts.length === 0}
              onClick={handleCheckout}
            >
              Checkout
            </button>

          </div>
        </div>
      </div>
    </>
  );
} 