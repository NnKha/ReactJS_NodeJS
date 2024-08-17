import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/UI/Header';
import Main from './components/UI/Main';
import ListProductUser from './components/UI/ListProductUser';
import DetailProductUser from './components/UI/DetailProductUser';
import Footer from './components/UI/Footer';
import Cart from './components/UI/Cart';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { useState, useEffect } from "react";

function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
   
    // console.log(fullName);
    if (storedUser) {
     const user = JSON.parse(storedUser)
    const fullName = user.data.fullName
        setUserName(fullName); 
    }
  }, []);

  

  return (
    <Router>
      <Header userName={userName} setUserName={setUserName} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/listPrd/:categoryId" element={<ListProductUser />} />
        <Route path="/productDetail/:id" element={<DetailProductUser />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
