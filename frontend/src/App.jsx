import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Title from './Componenets/Shared/Title.jsx'
import Container from 'react-bootstrap/Container'
import HomePage from './Pages/HomePage.jsx'
import Footer from './Componenets/Shared/Footer.jsx'
import Header from './Componenets/Shared/Header.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allPage min-width'>
        <Header />
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
