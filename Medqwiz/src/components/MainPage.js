import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
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

const MainPage = () => {
    return (
        <div>
            <PerfectScrollBar>
                <Row className='App_view'>
                    <Col sm={3} className="sidebar_div">
                        <Sidebar />
                    </Col>
                    <Col sm={9} className="dash_div d-flex flex-fill">
                        <Row className='d-flex flex-column flex-fill'>
                            <Col className="nav_div d-flex flex-fill">
                                <Navbar className="mh-25" />
                            </Col>
                            <Col className="action_div d-flex flex-fill rounded">
                                <Routes>
                                    <Route path="/" exact element={<Login />} />
                                    <Route path="/dashboard" element={<MainPage />} />
                                    <Route path="/internalempmanagement" element={<InternalEmployeeManagement />} />
                                    <Route path="/campaignCreate" element={<CreateData />} />
                                    <Route path="/campaign/all" element={<ActiveCampaignData />} />
                                    <Route path="/campaignhistory/all" element={<Completed />} />
                                    <Route path="Invoices" element={<Invoices />} />
                                    <Route path="/pharma/wallet" element={<MyWallet />} />
                                    <Route path="/faq" element={<FAQ />} />
                                    <Route path="/changelog" element={<ChangeLog />} />
                                </Routes>
                            </Col>
                            <Col className="foot_div d-flex flex-fill mh-25">
                                <Footer />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </PerfectScrollBar>
        </div>
    )
}

export default MainPage
