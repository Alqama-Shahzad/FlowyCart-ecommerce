import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";

import { collectionImages } from "../../../data/images";
import styles from "./index.module.scss";

const Collections = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerContent}>
            <span className={styles.sectionSubtitle}>Explore Our</span>
            <h2 className={styles.sectionTitle}>Featured Collections</h2>
            <p className={styles.sectionDescription}>
              Discover our carefully curated collections designed for your lifestyle
            </p>
          </div>
          
          <Link to="/catalog/All" className={styles.viewAllLink}>
            <span>View All</span>
            <FiChevronRight />
          </Link>
        </motion.div>

        <motion.div 
          className={styles.productList}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.collectionContainer}>
            {collectionImages.map((item, index) => (
              <motion.div
                key={item.id}
                className={`${styles[`div${index + 1}`]} ${styles.collectionItem}`}
                variants={itemVariants}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ y: -5 }}
              >
                <Link to={item.link} className={styles.collectionLink}>
                  <div className={styles.imageWrapper}>
                    <img
                      srcSet={item.path}
                      className={styles.image}
                      alt={`${item.name} Collection`}
                      loading="lazy"
                    />
                    
                    <motion.div 
                      className={styles.overlay}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredItem === index ? 0.4 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <motion.div 
                    className={styles.iconContainer}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      scale: hoveredItem === index ? 1 : 0.8,
                      opacity: hoveredItem === index ? 1 : 0.9
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiArrowUpRight className={styles.icon} />
                  </motion.div>
                  
                  <motion.div 
                    className={styles.titleContainer}
                    variants={titleVariants}
                  >
                    <h3 className={styles.title}>{item.name}</h3>
                    <div className={styles.itemCount}>
                      <span>Explore Collection</span>
                      <FiChevronRight className={styles.arrowIcon} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.collectionCta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/catalog/All" className={styles.browseButton}>
            Browse All Collections
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Collections;
