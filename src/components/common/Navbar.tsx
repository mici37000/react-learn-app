import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Add Product", path: "/edit-product" },
    { label: "Login", path: "/login" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar className={styles.navbar}>
      <AppBarSection>
        <div className={styles.navbarBrand} onClick={() => navigate("/")}>
          <h1 className={styles.navbarTitle}>React Learn App</h1>
        </div>
      </AppBarSection>

      <AppBarSpacer />

      <AppBarSection>
        <ul className={styles.navbarMenu}>
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`${styles.navbarItem} ${isActive(item.path) ? styles.active : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </AppBarSection>
    </AppBar>
  );
}

export default Navbar;
