import logo from './logo.svg';
import './App.css';
import LoginScreen from "./Components/LoginScreenComponent/LoginScreen"
import Randerpage from "./Components/RenderpageComponent/Renderpage"
import Register from './Components/RegisterComponent/Register';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
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
