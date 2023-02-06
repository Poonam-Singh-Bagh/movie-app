import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme} bgcolor="#4169E1">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
