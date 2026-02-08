import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.scss";

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navItems = [
    { label: t("navbar.home"), path: "/" },
    { label: t("navbar.products"), path: "/products" },
    { label: t("navbar.addProduct"), path: "/edit-product" },
    { label: t("navbar.login"), path: "/login" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <AppBar className={styles.navbar}>
      <AppBarSection>
        <div className={styles.navbarBrand} onClick={() => navigate("/")}>
          <h1 className={styles.navbarTitle}>{t("navbar.appTitle")}</h1>
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

      <AppBarSection>
        <select
          className={styles.langSwitcher}
          value={i18n.language}
          onChange={handleLanguageChange}
        >
          {languages.map((lng) => (
            <option key={lng.code} value={lng.code}>
              {lng.label}
            </option>
          ))}
        </select>
      </AppBarSection>
    </AppBar>
  );
}

export default Navbar;
