import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import MarketView from "./pages/MarketView";
import AcquisitionView from "./pages/AcquisitionView";
import URLsView from "./pages/URLsView";
import Login from "./components/login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";
function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="market-view" element={<MarketView />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login/>} />
          <Route path="acquisition-view" element={<AcquisitionView />} />
          <Route path="urls" element={<URLsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
