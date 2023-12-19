import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import NoteState from './Context/notes/NoteState';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Alert from './Component/Alert';
import { AlertState } from './Context/Alert/AlertState';
function App() {
  return (
    <AlertState>
      <NoteState>

        <Router>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/registration" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>

      </NoteState>
    </AlertState>
  );
}

export default App;
