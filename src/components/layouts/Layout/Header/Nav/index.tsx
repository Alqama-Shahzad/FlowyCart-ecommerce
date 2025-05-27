import { NavLink, Link } from "react-router-dom";
import { RiSearch2Line, RiUserLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import styles from "./index.module.scss";
import { navData } from "../../../../../data/navItems";
import CartIcon from "./CartIcon";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavBarProps {
  handleShow: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ handleShow }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resizeHeaderOnScroll = () => {
    setHasScrolled((hasScrolled) => {
      if (
        !hasScrolled &&
        (document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20)
      ) {
        return true;
      }

      if (
        hasScrolled &&
        document.body.scrollTop < 4 &&
        document.documentElement.scrollTop < 4
      ) {
        return false;
      }

      return hasScrolled;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const navStyles = hasScrolled
    ? `${styles.nav} ${styles.hasScrolled}`
    : styles.nav;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={navStyles}>
      <div className={styles.container_bottom}>
        <Link to="/" className={styles.title}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Flowy Cart
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className={styles.links}>
          {navData.map((option, index) => {
            return (
              <motion.li
                key={option.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NavLink 
                  to={`/catalog/${option.name}`} 
                  className={({ isActive }) => 
                    isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                  }
                >
                  {option.name}
                </NavLink>
              </motion.li>
            );
          })}
        </ul>
        
        <div className={styles.rightSection}>
          {/* Mobile menu toggle */}
          <button 
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>

          <ul className={styles.icons_menu}>
            <li>
              <NavLink to={"/"} className={styles.link} aria-label="Search">
                <RiSearch2Line />
              </NavLink>
            </li>
            <li>
              <button 
                className={styles.link} 
                onClick={handleShow}
                aria-label="Cart"
              >
                <CartIcon />
              </button>
            </li>
            <li>
              <NavLink to={`/login`} className={styles.link} aria-label="Account">
                <RiUserLine />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mobileLinks}>
              {navData.map((option, index) => (
                <motion.li 
                  key={option.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink 
                    to={`/catalog/${option.name}`}
                    className={({ isActive }) => 
                      isActive ? `${styles.mobileLink} ${styles.activeLink}` : styles.mobileLink
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {option.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
