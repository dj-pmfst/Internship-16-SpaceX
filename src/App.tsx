import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Launches from './pages/Launches/Launches'
import LaunchDetail from './pages/LaunchDetail/LaunchDetail'
import Ships from './pages/Ships/Ships'
import ShipDetail from './pages/ShipDetail/ShipDetail'
import NotFound from './pages/Error/Error'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:id" element={<LaunchDetail />} />
        <Route path="/ships" element={<Ships />} />
        <Route path="/ships/:id" element={<ShipDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App