import React, {useState} from 'react';
import {Row, Col} from 'react-bootstrap'
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage } from './components/HomePage';
import { SideBar } from './components/SideBar';
import { CreateTask } from './components/CreateTask';
import { Reports } from './components/Reports';
import { SaveTask } from './components/SaveTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isSidebarShrunk, setIsSidebarShrunk] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarShrunk(!isSidebarShrunk)
  }
  return (
    <Router  basename='/task-tracker'>
      <Provider store={store}>
        <Row className="parent-container">
            <Col lg={isSidebarShrunk ? '1' : '2'} className='sidebar-container'>
                <SideBar
                    isSidebarShrunk={isSidebarShrunk}
                    toggleSidebar={toggleSidebar}
                />
            </Col>
            <Col>
              <Routes>
                  <Route path='/' element={<HomePage/>}></Route>
                  <Route path='/create-task' element={<CreateTask/>}></Route>
                  <Route path='/save-task' element={<SaveTask/>}></Route>
                  <Route path='/reports' element={<Reports/>}></Route>
              </Routes>
            </Col>
        </Row> 
      </Provider>
    </Router>
  )
}

export default App;
