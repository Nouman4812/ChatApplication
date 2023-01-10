import logo from './logo.svg';
import './App.css';
import LoginScreen from "./Components/InputComponents/LoginScreen"
import Randerpage from "./Components/InputComponents/Randerpage"
import Register from './Components/InputComponents/Register';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { children, useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    debugger
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">

          <Route index element={
            <ProtectedRoute>
              <Randerpage />
            </ProtectedRoute>} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
