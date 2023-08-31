import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
// import { setActiveCampaign } from '../store/ActiveCampaignSlice';
import ActiveCampaignAPI from '../API/ActiveCampaignAPI';
import moment from 'moment';
import { MoreVertical, Search, Filter } from "react-feather"
import { Link } from 'react-router-dom';


const ActiveCampaignData = () => {

  //dispatch
  const dispatch = useDispatch()

  //useState
  const [activeTab, setActiveTab] = useState("1")
  //useSelector
  const activeCampaignList = useSelector((state) => state?.reducer?.ActiveCampaignSlice)
  // console.log("activeCampaignList", activeCampaignList);

  //useEffect
  useEffect(() => {
    dispatch(ActiveCampaignAPI())
  }, [])

  const columns = [
    {
      name: 'CAMPAIGN ID',
      selector: "id",
      sortable: true,
    },
    {
      name: 'CAMPAIGN NAME',
      selector: "campName",
      sortable: true,
    },
    {
      name: 'CAMPAIGN TYPE',
      selector: "campType",
      sortable: true,
    },
    {
      name: 'CREATED BY',
      selector: "",
      sortable: true,
      cell: () => {
        return (
          "Self"
        )
      }
    },
    {
      name: 'STATUS',
      selector: "Status",
      sortable: true,
    },
    {
      name: 'LAST UPDATE',
      selector: "updatedAt",
      sortable: true,
      cell: (e) => {
        return (
          <>
            {moment(e.updatedAt).format("MMMM Do YYYY, h:mm a")}
          </>
        )
      }
    },
    {
      name: 'ACTIONS',
      selector: "",
      sortable: true,
      cell: () => {
        return (
          <>
            <span>
              <MoreVertical />
            </span>
          </>
        )
      }
    },

  ];


  const handleActiveCampaignTabs = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  return (

    <div className='active_allCampaign d-flex  flex-column p-3 rounded'>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === "1" ? "active" : ""}
            onClick={() => handleActiveCampaignTabs("1")}
          >
            All Campaigns
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => handleActiveCampaignTabs("2")}
          >
            Templates
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className='p-3'>
        <div className="search_filter_taskbar d-flex flex-fill align-items-center mb-3">
          <div className="active_table_header d-flex flex-fill justify-content-start fs-5 ">
            All Campaigns List
          </div>
          <div className="ac_task_tools d-flex flex-fill justify-content-end align-items-center">
            <Search className='ms-2 me-3' />
            <Filter className='me-3' />
            <Link to="/campaignCreate">
              <Button className='Create_campaign_btn me-2' outline>
                Create Campaign
              </Button>
            </Link>
          </div>
        </div>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">

              <DataTable
                columns={columns}
                data={activeCampaignList}
                pagination
              />

            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>
                  Special Title Treatment
                </CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional content.
                </CardText>
                <Button>
                  Go somewhere
                </Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>
                  Special Title Treatment
                </CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional content.
                </CardText>
                <Button>
                  Go somewhere
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>

  )
}

export default ActiveCampaignData;




