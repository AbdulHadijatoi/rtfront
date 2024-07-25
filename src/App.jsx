import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { theme } from "./Theme";
import { SnackbarProvider } from "notistack";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Router from "./routes";
import "./App.css";
import Navbar from "./page/Component/Navbar";
import Footer from "./page/Component/Footer";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <ErrorBoundary>
              <Navbar />
              <Router />
              <Footer />
            </ErrorBoundary>
          </SnackbarProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
