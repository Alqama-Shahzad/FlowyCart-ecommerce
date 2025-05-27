import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { FiShoppingBag, FiHeart, FiShare2, FiChevronRight, FiStar, FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSingleProduct } from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { CartItem } from "../../types/cart";
import GoToTop from "../../components/components/GoToTop";
import Spinner from "../../components/components/Spinner";
import { sizeData } from "../../data/navItems";

import styles from "./index.module.scss";

const Product = () => {
  const { product, isLoading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    dispatch(getSingleProduct(Number(id)));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const addToCartHandler = () => {
    if (!selectedSize && product.category.includes("clothing")) {
      alert("Please select a size");
      return;
    }
    
    setIsLoadingProduct(true);
    
    const cartProduct: CartItem = {
      quantity: quantity,
      product: {
        id: Number(id),
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
      },
    };
    
    dispatch(addToCart(cartProduct)).then(() => {
      setIsLoadingProduct(false);
    });
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const breadcrumbItems = [
    { name: "Home", route: "/" },
    { name: "Products", route: "/catalog/All" },
    { name: product?.title || "Product Details", route: `/products/${id}` },
  ];

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner className={styles.spinner} />
        <p>Loading product details...</p>
      </div>
    );
  }

  // Calculate discount and ratings for display purposes
  const originalPrice = product?.price * 1.2;
  const discountPercentage = 20;
  const rating = 4.5;

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb}>
          {breadcrumbItems.map((item, index) => (
            <span key={item.name} className={styles.breadcrumbItem}>
              <Link 
                to={item.route}
                className={index === breadcrumbItems.length - 1 ? styles.active : ""}
              >
                {index === breadcrumbItems.length - 1 
                  ? item.name.length > 30 
                    ? item.name.substring(0, 30) + "..." 
                    : item.name
                  : item.name}
              </Link>
              {index < breadcrumbItems.length - 1 && <FiChevronRight className={styles.breadcrumbIcon} />}
            </span>
          ))}
        </nav>

        <div className={styles.productContainer}>
          {/* Product Image Section */}
          <motion.div 
            className={styles.productImageSection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.imageWrapper}>
              <img 
                src={product.image} 
                alt={product.title} 
                className={styles.productImage}
              />
              
              <div className={styles.productBadges}>
                {discountPercentage > 0 && (
                  <span className={styles.discountBadge}>-{discountPercentage}%</span>
                )}
                <span className={styles.categoryBadge}>{product.category}</span>
              </div>
            </div>
            
            <div className={styles.imageActions}>
              <button className={styles.actionButton} aria-label="Add to wishlist">
                <FiHeart />
                <span>Wishlist</span>
              </button>
              <button className={styles.actionButton} aria-label="Share product">
                <FiShare2 />
                <span>Share</span>
              </button>
            </div>
          </motion.div>

          {/* Product Details Section */}
          <motion.div 
            className={styles.productDetailsSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.productHeader}>
              <h1 className={styles.productTitle}>{product.title}</h1>
              
              <div className={styles.productMeta}>
                <div className={styles.ratings}>
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`${styles.star} ${i < Math.floor(rating) ? styles.filled : ''}`} 
                    />
                  ))}
                  <span className={styles.ratingText}>{rating} ({Math.floor(Math.random() * 100) + 20} reviews)</span>
                </div>
                
                <div className={styles.productId}>
                  <span>SKU: </span>
                  <span>FLOWY-{id}-{Math.floor(Math.random() * 1000)}</span>
                </div>
              </div>
            </div>

            <div className={styles.priceSection}>
              <div className={styles.priceDisplay}>
                <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                {discountPercentage > 0 && (
                  <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
                )}
              </div>
              
              {discountPercentage > 0 && (
                <div className={styles.savingsInfo}>
                  You save: <span>${(originalPrice - product.price).toFixed(2)} ({discountPercentage}%)</span>
                </div>
              )}
            </div>

            <p className={styles.productDescription}>
              {product.description}
            </p>

            {/* Size Selection */}
            {product.category.includes("clothing") && (
              <div className={styles.sizeSection}>
                <div className={styles.sectionTitle}>
                  <h3>Select Size</h3>
                  <Link to="/size-guide" className={styles.sizeGuideLink}>Size Guide</Link>
                </div>
                
                <div className={styles.sizeOptions}>
                  {sizeData?.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className={styles.quantitySection}>
              <h3 className={styles.sectionTitle}>Quantity</h3>
              
              <div className={styles.quantitySelector}>
                <button 
                  className={styles.quantityButton}
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button 
                  className={styles.quantityButton}
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className={styles.actionButtons}>
              <motion.button 
                className={styles.addToCartButton}
                onClick={addToCartHandler}
                disabled={isLoadingProduct}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoadingProduct ? (
                  <Spinner className={styles.buttonSpinner} />
                ) : (
                  <>
                    <FiShoppingBag className={styles.buttonIcon} />
                    <span>Add to Cart</span>
                  </>
                )}
              </motion.button>
              
              <Link to="/catalog/All" className={styles.continueShoppingButton}>
                Continue Shopping
              </Link>
            </div>

            {/* Product Features */}
            <div className={styles.productFeatures}>
              <div className={styles.featureItem}>
                <FiTruck className={styles.featureIcon} />
                <div className={styles.featureText}>
                  <h4>Free Shipping</h4>
                  <p>On orders over $50</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <FiRefreshCw className={styles.featureIcon} />
                <div className={styles.featureText}>
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <FiShield className={styles.featureIcon} />
                <div className={styles.featureText}>
                  <h4>Secure Checkout</h4>
                  <p>100% Protected Payment</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <div className={styles.productTabs}>
          <div className={styles.tabButtons}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'details' ? styles.active : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Additional Information
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({Math.floor(Math.random() * 100) + 20})
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              {activeTab === 'description' && (
                <div className={styles.descriptionTab}>
                  <h3>Product Description</h3>
                  <p>{product.description}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className={styles.detailsTab}>
                  <h3>Product Specifications</h3>
                  <table className={styles.specTable}>
                    <tbody>
                      <tr>
                        <td>Category</td>
                        <td>{product.category}</td>
                      </tr>
                      <tr>
                        <td>Material</td>
                        <td>Premium Quality</td>
                      </tr>
                      <tr>
                        <td>Brand</td>
                        <td>Flowy Cart</td>
                      </tr>
                      <tr>
                        <td>Product Code</td>
                        <td>FLOWY-{id}</td>
                      </tr>
                      <tr>
                        <td>Availability</td>
                        <td>In Stock</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className={styles.reviewsTab}>
                  <h3>Customer Reviews</h3>
                  <p className={styles.reviewNote}>Reviews are coming soon. Be the first to review this product!</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <GoToTop />
    </section>
  );
};

export default Product;
