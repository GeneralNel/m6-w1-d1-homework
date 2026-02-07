import './App.css';
import Home from './Home';
import InventoryList from './IntentoryList';
import InventoryEdit from './InventoryEdit';
import { Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/inventories/:id" element={<InventoryEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
