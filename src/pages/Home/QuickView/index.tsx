import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";

import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getCategory,
  getProducts,
} from "../../../features/product/productSlice";
import ProductCard from "../../../components/components/ProductCard";
import { navData } from "../../../data/navItems";
import { ROUTES } from "../../../constants/Route";

const QuickView = () => {
  const { products, loading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    setIsVisible(true);
  }, [dispatch]);

  const handleCategory = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    setSelectedCategory(target.id);
    
    // Reset visibility for animation
    setIsVisible(false);
    
    setTimeout(() => {
      if (target.value !== "all") {
        const pathUrl = ROUTES.filter((item) => {
          return item.name.toLowerCase() === target.value.toLowerCase();
        });
        dispatch(getCategory(pathUrl[0].url.toLowerCase()));
      } else {
        dispatch(getProducts());
      }
      setIsVisible(true);
    }, 300);
  };

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

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.titleWrapper}>
            <span className={styles.sectionTag}>Explore Our Collection</span>
            <h2 className={styles.sectionTitle}>Quick View</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          
          <Link
            to={`/catalog/${String(selectedCategory)}`}
            className={styles.viewAllLink}
          >
            <span>View All Products</span>
            <MdArrowRightAlt className={styles.icon} />
          </Link>
        </motion.div>

        <motion.div 
          className={styles.categories}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.buttonContainer}>
            {navData?.map((item, index) => (
              <motion.div 
                className={styles.button} 
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <input
                  type="radio"
                  id={item.name}
                  name="category"
                  value={item.value}
                  defaultChecked={item.name === "All"}
                  onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => handleCategory(e)}
                />
                <label className={`${styles.categoryLabel} ${selectedCategory === item.name ? styles.active : ''}`} htmlFor={item.name}>
                  {item.name}
                </label>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div 
                className={styles.productList}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {products?.slice(0, 8)?.map((product, index) => (
                  <motion.div 
                    key={product.id} 
                    className={styles.productItem}
                    variants={itemVariants}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ProductCard
                      id={product.id}
                      key={index}
                      title={product.title}
                      price={product.price}
                      category={product.category}
                      description={product.description}
                      image={product.image}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
        
        <motion.div 
          className={styles.browseMore}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to={`/catalog/${String(selectedCategory)}`} className={styles.browseMoreButton}>
            Browse {selectedCategory} Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickView;
