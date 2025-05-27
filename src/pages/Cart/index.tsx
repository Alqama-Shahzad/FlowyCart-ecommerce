import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowLeft, 
  FiShoppingBag, 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiTag, 
  FiTruck, 
  FiRefreshCw, 
  FiShield, 
  FiCheck 
} from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  cartReset,
  incrementItemFromCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../features/cart/cartSlice";
import Button from "../../components/components/Button";
import Spinner from "../../components/components/Spinner";
import styles from "./index.module.scss";

const Cart = () => {
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((a, c) => a + c.quantity * c.product.price, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0; // 10% discount if coupon applied
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal - discount + shipping;
  
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    setIsApplyingCoupon(true);
    
    // Simulate API call for coupon validation
    setTimeout(() => {
      setCouponApplied(true);
      setIsApplyingCoupon(false);
    }, 800);
  };
  
  const handleEmptyCart = () => {
    if (window.confirm("Are you sure you want to empty your cart?")) {
      dispatch(cartReset());
    }
  };
  
  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner className={styles.spinner} />
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <motion.div 
          className={styles.pageHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            className={styles.backButton} 
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FiArrowLeft />
          </button>
          
          <h1 className={styles.pageTitle}>Your Shopping Bag</h1>
          
          {cartItems.length > 0 && (
            <div className={styles.cartSummary}>
              <FiShoppingBag className={styles.bagIcon} />
              <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} items</span>
            </div>
          )}
        </motion.div>

        {cartItems.length > 0 ? (
          <div className={styles.cartContent}>
            <motion.div 
              className={styles.cartItems}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.cartHeader}>
                <h2>Items in Your Bag</h2>
                <button 
                  className={styles.emptyCartButton}
                  onClick={handleEmptyCart}
                >
                  <FiTrash2 />
                  <span>Empty Cart</span>
                </button>
              </div>
              
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.product.id}
                    className={styles.cartItem}
                    variants={itemVariants}
                    exit={{ opacity: 0, x: -100 }}
                    layout
                  >
                    <div className={styles.productImage}>
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                      />
                    </div>
                    
                    <div className={styles.productInfo}>
                      <div className={styles.productDetails}>
                        <Link to={`/products/${item.product.id}`} className={styles.productTitle}>
                          {item.product.title}
                        </Link>
                        <div className={styles.productCategory}>
                          Category: {item.product.category}
                        </div>
                        <div className={styles.productPrice}>
                          ${item.product.price.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className={styles.productMeta}>
                        <div className={styles.deliveryInfo}>
                          <div className={styles.infoItem}>
                            <FiRefreshCw className={styles.infoIcon} />
                            <span>14 days return available</span>
                          </div>
                          <div className={styles.infoItem}>
                            <FiTruck className={styles.infoIcon} />
                            <span>Delivery in 2-3 business days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.productActions}>
                      <div className={styles.quantityControl}>
                        <button 
                          className={styles.quantityButton}
                          onClick={() => dispatch(reduceItemFromCart(item.product))}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button 
                          className={styles.quantityButton}
                          onClick={() => dispatch(incrementItemFromCart(item.product))}
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      
                      <button 
                        className={styles.removeButton}
                        onClick={() => handleRemoveItem(item.product.id)}
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              className={styles.cartSidebar}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.orderSummary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                
                <div className={styles.couponSection}>
                  <div className={styles.couponForm}>
                    <div className={styles.couponInput}>
                      <FiTag className={styles.couponIcon} />
                      <input 
                        type="text" 
                        placeholder="Enter coupon code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                      />
                    </div>
                    <button 
                      className={`${styles.couponButton} ${couponApplied ? styles.applied : ''}`}
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || couponApplied || !couponCode}
                    >
                      {isApplyingCoupon ? (
                        <Spinner className={styles.smallSpinner} />
                      ) : couponApplied ? (
                        <FiCheck />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                  
                  {couponApplied && (
                    <div className={styles.appliedCoupon}>
                      <FiCheck className={styles.checkIcon} />
                      <span>10% discount applied!</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className={styles.summaryRow}>
                      <span>Discount</span>
                      <span className={styles.discountValue}>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className={styles.totalRow}>
                    <span>Total</span>
                    <span className={styles.totalAmount}>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className={styles.checkoutButton}>
                  Proceed to Checkout
                </button>
                
                <div className={styles.continueShoppingLink}>
                  <Link to="/catalog/All">
                    <FiArrowLeft />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
              
              <div className={styles.secureCheckout}>
                <div className={styles.secureItem}>
                  <FiShield className={styles.secureIcon} />
                  <div>
                    <h4>Secure Checkout</h4>
                    <p>Your payment information is encrypted</p>
                  </div>
                </div>
                
                <div className={styles.secureItem}>
                  <FiTruck className={styles.secureIcon} />
                  <div>
                    <h4>Free Shipping</h4>
                    <p>On orders over $100</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className={styles.emptyCartContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.emptyCartContent}>
              <div className={styles.emptyCartIcon}>
                <FiShoppingBag />
              </div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <Link to="/catalog/All" className={styles.shopNowButton}>
                Start Shopping
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Cart;
