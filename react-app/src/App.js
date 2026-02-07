import './App.css';
import Home from './Home';
import InventoryList from './IntentoryList';
import InventoryEdit from './InventoryEdit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/inventories/:id" element={<InventoryEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
