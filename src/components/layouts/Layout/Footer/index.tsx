import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaPinterest,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./index.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <motion.div 
            className={styles.brandSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.logoWrapper}>
              <h2 className={styles.logo}>Flowy Cart</h2>
              <p className={styles.tagline}>Elevate Your Style Journey</p>
            </div>
            <p className={styles.description}>
              Discover the latest trends and express yourself with our premium collection of fashion essentials. Flowy Cart brings you curated styles for every occasion.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt />
                <span>123 Fashion Street, Style City</span>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope />
                <span>support@flowycart.com</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </motion.div>
          
          <div className={styles.linksSection}>
            <motion.div 
              className={styles.linkColumn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className={styles.columnTitle}>Shop</h3>
              <motion.ul className={styles.linkList} variants={staggerContainer}>
                <motion.li variants={fadeInUp}><Link to="/catalog/Men">Men</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/catalog/Women">Women</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/catalog/New">New Arrivals</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/catalog/All">All Collections</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/catalog/Sale">Sale</Link></motion.li>
              </motion.ul>
            </motion.div>
            
            <motion.div 
              className={styles.linkColumn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className={styles.columnTitle}>Help</h3>
              <motion.ul className={styles.linkList} variants={staggerContainer}>
                <motion.li variants={fadeInUp}><Link to="/help/faq">FAQ</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/help/shipping">Shipping Info</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/help/returns">Returns & Exchanges</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/help/size-guide">Size Guide</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/help/contact">Contact Us</Link></motion.li>
              </motion.ul>
            </motion.div>
            
            <motion.div 
              className={styles.linkColumn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className={styles.columnTitle}>About</h3>
              <motion.ul className={styles.linkList} variants={staggerContainer}>
                <motion.li variants={fadeInUp}><Link to="/about/our-story">Our Story</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/about/sustainability">Sustainability</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/about/careers">Careers</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/about/press">Press</Link></motion.li>
                <motion.li variants={fadeInUp}><Link to="/about/blog">Blog</Link></motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className={styles.newsletterSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.newsletterContent}>
            <h3>Join Our Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          </div>
          <form className={styles.subscribeForm}>
            <input type="email" placeholder="Enter your email address" aria-label="Email address" />
            <button type="submit" aria-label="Subscribe">Subscribe</button>
          </form>
        </motion.div>
        
        <div className={styles.bottomSection}>
          <motion.div 
            className={styles.socialLinks}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" variants={fadeInUp}>
              <FaInstagram />
            </motion.a>
            <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" variants={fadeInUp}>
              <FaFacebook />
            </motion.a>
            <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" variants={fadeInUp}>
              <FaTwitter />
            </motion.a>
            <motion.a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" variants={fadeInUp}>
              <FaTiktok />
            </motion.a>
            <motion.a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" variants={fadeInUp}>
              <FaYoutube />
            </motion.a>
            <motion.a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" variants={fadeInUp}>
              <FaPinterest />
            </motion.a>
          </motion.div>
          
          <div className={styles.footerBottom}>
            <div className={styles.copyright}>
              &copy; {currentYear} Flowy Cart. All rights reserved.
            </div>
            <div className={styles.legalLinks}>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/accessibility">Accessibility</Link>
            </div>
            <div className={styles.paymentMethods}>
              <span>We accept:</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon}>Visa</span>
                <span className={styles.paymentIcon}>MC</span>
                <span className={styles.paymentIcon}>Amex</span>
                <span className={styles.paymentIcon}>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
