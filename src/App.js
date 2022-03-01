import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Member from './pages/Member';
import NotFound from './notfound';
import Paket from './pages/Paket';
import User from './pages/User';
import Transaksi from './pages/Transaksi';
import FormTransaksi from './pages/FormTransaksi';
import Login from './pages/Login';


function App() {
  return (
   
    <BrowserRouter>

    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/member">Member</Link>
        </li>

        <li>
          <Link to="/paket">Paket</Link>
        </li>

        <li>
          <Link to="/user">User</Link>
        </li>

        <li>
          <Link to="/transaksi">Transaksi</Link>
        </li>

        <li>
          <Link to="/formtransaksi">Form Transaksi</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path="/" element={App} />
        <Route path="/login" element={<Login />} />
        <Route path="/member" element={<Member />} />
        <Route path="/paket" element={<Paket />} />
        <Route path="/user" element={<User />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/formtransaksi" element={<FormTransaksi />} />
      </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
