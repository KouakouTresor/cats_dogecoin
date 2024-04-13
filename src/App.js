import "./App.css";
import Header from "./components/Header";
import Dashboard from "./dashboard/Dashboard";
import TableItems from "./websites/TableItems";
import TicketSelection from "./tickets/TicketsSelection"
import {Routes, Route } from 'react-router-dom';

function App() {

  return (
      <div className="App">
        <Header />
        <Routes>
        <Route  path="/" element={<Dashboard />} />
        <Route path="/websites" element={<TableItems />} />
        <Route path="/tickets" element={<TicketSelection />} />
      </Routes>
      </div>

  );
}

export default App;
