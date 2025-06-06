import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CgShoppingBag } from "react-icons/cg";
import { FiHeart, FiEye } from "react-icons/fi";

import styles from "./index.module.scss";
import { Product } from "../../../types/product";
import { useAppDispatch } from "../../../app/hooks";
import { CartItem } from "../../../types/cart";
import { addToCart } from "../../../features/cart/cartSlice";
import Spinner from "../Spinner";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
}) => {
  const dispatch = useAppDispatch();
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const addToCartHandler = () => {
    setIsLoadingProduct(true);

    const cartProduct: CartItem = {
      quantity: 1,
      product: {
        id: product.id,
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

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.badgeContainer}>
        <span className={styles.categoryBadge}>{product.category}</span>
        {Math.random() > 0.7 && <span className={styles.saleBadge}>SALE</span>}
      </div>
      
      <Link to={`/products/${String(product.id)}`} className={styles.imageContainer}>
        <motion.img 
          src={product.image} 
          alt={product.title}
          className={styles.productImage}
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.quickActions}>
            <motion.button 
              className={styles.actionButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Quick view"
            >
              <FiEye />
            </motion.button>
            
            <motion.button 
              className={styles.actionButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Add to wishlist"
            >
              <FiHeart />
            </motion.button>
          </div>
        </motion.div>
      </Link>
      
      <div className={styles.contentContainer}>
        <div className={styles.details}>
          <Link to={`/products/${String(product.id)}`} className={styles.titleLink}>
            <h3 className={styles.title}>{product.title}</h3>
          </Link>
          
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {Math.random() > 0.7 && (
              <span className={styles.originalPrice}>${(product.price * 1.2).toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <motion.button 
          className={styles.addToCartButton}
          onClick={addToCartHandler}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoadingProduct}
        >
          {isLoadingProduct ? (
            <Spinner className={styles.spinner} />
          ) : (
            <>
              <CgShoppingBag className={styles.icon} />
              <span className={styles.buttonText}>Add to Cart</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
