/** Dependencies */
import { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

/** Stores */
import store from "store/store.jsx";

/** Pages */
import Home from "./pages/Home/HomeContainer.js";
import Landing from "./pages/Landing/Landing.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

/**Components */
import Header from "components/Header/Header.jsx";

function App() {
  useEffect(() => {
    // Global CSP violation listener
    const handleSecurityPolicyViolation = (event) => {
      console.warn("CSP Violation:", event.violatedDirective, event.blockedURI);
      // This will help with debugging CSP issues
    };

    document.addEventListener(
      "securitypolicyviolation",
      handleSecurityPolicyViolation
    );

    return () => {
      document.removeEventListener(
        "securitypolicyviolation",
        handleSecurityPolicyViolation
      );
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="appHolder">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
