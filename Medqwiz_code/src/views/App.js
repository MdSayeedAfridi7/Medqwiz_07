import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import InternalEmployeeManagement from '../components/InternalEmployeeManagement';
import CreateData from '../components/CreateData';
import ActiveCampaignData from '../components/ActiveCompaignData';
import Completed from '../components/Completed';
import Invoices from '../components/Invoices';
import MyWallet from '../components/MyWallet';
import FAQ from '../components/FAQ';
import ChangeLog from "../components/ChangeLog";
import Sidebar from '../components/Sidebar';
import { Col, Row } from 'reactstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PerfectScrollBar from "react-perfect-scrollbar"
import CCFlowParams from '../components/CCFlowParams';



function App() {
  const location = useLocation()
  const hiddenPaths = ["/"];
  const hiddenComponents = hiddenPaths.includes(location.pathname)



  return (
    <div>
      <Row className='App_view'>
        <Col className="sidebar_div " style={{ display: hiddenComponents ? "none" : "flex" }}>
          {/* {hiddenComponents ? null : <Sidebar />} */}
          <Sidebar />
        </Col>
        <Col className="dash_div d-flex flex-fill">
          <PerfectScrollBar id="main_content_scroll">
            <Row className='d-flex flex-column flex-fill pe-3'>
              <Col className="nav_div flex-fill" style={{ display: hiddenComponents ? "none" : "flex" }}>
                {/* {hiddenComponents ? null : <Navbar className="mh-25" />} */}
                <Navbar className="mh-25" />
              </Col>
              <Col className="action_div d-flex flex-fill rounded">
                <Routes>
                  <Route path="/" exact element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/internalempmanagement" element={<InternalEmployeeManagement />} />
                  <Route path="/campaignCreate" element={<CreateData />} />
                  <Route path="/campaign/all" element={<ActiveCampaignData />} />
                  <Route path="/campaignhistory/all" element={<Completed />} />
                  <Route path="Invoices" element={<Invoices />} />
                  <Route path="/pharma/wallet" element={<MyWallet />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/changelog" element={<ChangeLog />} />
                  {/* <Route path="/campaignCreateFlow/:step/:id" element={<CCStep2/>}/> */}
                  <Route path="/campaignCreateFlow/:step/:id" element={<CCFlowParams/>}/>
                </Routes>
              </Col>
              <Col className="foot_div flex-fill mh-25" style={{ display: hiddenComponents ? "none" : "flex" }}>
                <Footer />
              </Col>
            </Row>
          </PerfectScrollBar>
        </Col>
      </Row>
    </div>
  );
}

export default App;
