import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiPlus, FiMinus, FiTruck, FiRefreshCw } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  incrementItemFromCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../../features/cart/cartSlice";
import Spinner from "../../../components/components/Spinner";
import { CartItem } from "../../../types/cart";
import styles from "./index.module.scss";

interface CartProps {
  item: CartItem;
  onClick?: () => void;
}

const CartProduct: FC<CartProps> = ({ item, onClick }) => {
  const { isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (isLoading) return <Spinner className={styles.spinner} />;

  return (
    <motion.div 
      className={styles.cartItem}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
      transition={{ duration: 0.3 }}
    >
      <div className={styles.productImage}>
        <img src={item.product.image} alt={item.product.title} />
      </div>
      
      <div className={styles.productInfo}>
        <div className={styles.productDetails}>
          <Link 
            to={`/products/${item.product.id}`} 
            className={styles.productTitle}
            onClick={onClick}
          >
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
          onClick={() => dispatch(removeItemFromCart(item.product.id))}
          aria-label="Remove item"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default CartProduct;
