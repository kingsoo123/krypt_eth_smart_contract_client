import {Navbar, Transactions, Welcome, Loader, Services} from './components'
import Footer from './components/Footer'

function App() {

  return (
    <div className="min-h-screen">
      <div className='bg-black'>
        <Navbar />
        <Welcome/>
      </div>
      <Services />
      <Transactions />
      <Footer/>
    </div>
  )
}

export default App
