import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage } from "./pages/landing/LandingPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { PageNotFound } from "./pages/page-not-found/PageNotFound";
function App() {
  return (
    <div className="App">
      <Router>
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
    </div>
  );
}

export default App;
