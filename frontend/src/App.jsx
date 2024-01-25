import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Title from './Components/Shared/Title.jsx'
import "react-toastify/dist/ReactToastify.css";
import Container from 'react-bootstrap/Container'
import { HomePage } from './Pages/HomePage.jsx'
import Footer from './Components/Shared/Footer.jsx'
import Header from './Components/Shared/Header.jsx'
import SignIn from './Pages/SignIn.jsx'
import { ToastContainer } from 'react-toastify'
import SignUp from './Pages/SignUp.jsx';
import DescriptionPage from './Pages/DescriptionPage.jsx';

function App() {

  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allPage min-width'>
        <ToastContainer position="bottom-center" limit={1} />
        <Header />
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/product/:token" element={<DescriptionPage />}></Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
