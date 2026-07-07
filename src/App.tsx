import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Content from "./components/common/Content";
import "./App.scss";
import { GpButton, GpThemeProvider, useGpTheme } from "@genpact/ui";

function App() {
  return (
    <GpThemeProvider defaultMode="light">
      <Header />
      <Navbar />
      <ThemeToggle />
      <Content />
      <Footer />
    </GpThemeProvider>
  );

  function ThemeToggle() {
    const { mode, toggle } = useGpTheme(); // mode: 'light' | 'dark'
    return (
      <div className="theme-toggle">
        <GpButton onClick={toggle}>Toggle theme (Current: {mode})</GpButton>
      </div>
    );
  }
}

export default App;
