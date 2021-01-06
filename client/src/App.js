import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage } from "./pages/landing/LandingPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { PageNotFound } from "./pages/page-not-found/PageNotFound";
import { Navbar } from "./components/navbar/Navbar";
import AuthContextProvider from "./context/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
