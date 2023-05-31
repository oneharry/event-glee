import { Route, Routes, BrowserRouter } from "react-router-dom";
import {Home, Discover, Profile, Event, Login, Register} from './pages/index';
import { AuthProvider} from "./context/context";
import { Footer, Navbar } from "./components";



function App() {




  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/event" element={<Event />} />
              <Route exact path="/discover" element={<Discover />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
