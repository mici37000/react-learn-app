import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";

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
    <AppBar className="navbar">
      <AppBarSection>
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <h1 className="navbar-title">React Learn App</h1>
        </div>
      </AppBarSection>

      <AppBarSpacer />

      <AppBarSection>
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`navbar-item ${isActive(item.path) ? "active" : ""}`}
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
