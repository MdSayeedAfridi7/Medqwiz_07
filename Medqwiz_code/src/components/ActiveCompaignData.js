import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, CardText, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane, UncontrolledDropdown } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
// import { setActiveCampaign } from '../store/ActiveCampaignSlice';
import ActiveCampaignAPI from '../API/ActiveCampaignAPI';
import moment from 'moment';
import { MoreVertical, Search, Filter } from "react-feather"
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCircle } from "react-icons/fa"
import { FiFilter } from 'react-icons/fi';


const ActiveCampaignData = () => {

  //dispatch
  const dispatch = useDispatch()

  //useState
  const [activeTab, setActiveTab] = useState("1")
  //useSelector
  const activeCampaignList = useSelector((state) => state?.reducer?.ActiveCampaignSlice) || []
  console.log(activeCampaignList);

  const CCStep2Data = useSelector((state) => state?.reducer?.CCStep2Slice)
  console.log(CCStep2Data);

  // useState


  const [pageData, setPageData] = useState({
    pageNo: 1,
    limit: 5
  });

  const [totalRows, setTotalRows] = useState(0)
  console.log(totalRows);

  const [searchCamapaign, setSearchCampaign] = useState("")

  const [selectedFilters, setSelectedFilters] = useState("Live");

  const [searchState, setSearchState] = useState({
    search: false,
  })

  const [spinner, setSpinner] = useState(true)




  //useEffect
  useEffect(() => {
    if (activeCampaignList !== null) {
      dispatch(ActiveCampaignAPI(pageData, { setTotalRows }, selectedFilters, searchCamapaign))
      setSpinner(false)
    }
  }, [pageData, selectedFilters, searchCamapaign])

  //useNavigate
  const navigate = useNavigate()

  // handles

  //handle pagination 

  const handleEditCampaign = (index) => {
    console.log("edit", index);
    navigate(`/campaignCreateFlow/${'step2'}/${index.id}`)
  }


  const handlePageChange = (page, totalRows) => {
    console.log(page, totalRows);
    setPageData((prevState) => ({
      ...prevState,
      pageNo: page
    }))

  };


  const handlePerPageChange = (currentRowsPerPage, currentPage) => {
    console.log(currentRowsPerPage, currentPage);
    setPageData((prevState) => ({
      ...prevState,
      limit: currentRowsPerPage
    }))
  };



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
      cell: (index) => {
        return (
          <>
            <span>

              <UncontrolledDropdown
                className="me-2"
                direction='down'
              >
                <DropdownToggle
                  className='p-0 bg-white text-dark border border-0'
                >
                  <MoreVertical className='cursor_pointer' height={12} width={12} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className='d-flex align-items-center' onClick={() => handleEditCampaign(index)}>
                    <FaRegCircle className='me-2' /> <span className='text_85'>Edit Campaign </span>
                  </DropdownItem>
                  <DropdownItem className='d-flex align-items-center'>
                    <FaRegCircle className='me-2' /> <span className='text_85'>Delete Campaign</span>
                  </DropdownItem>

                </DropdownMenu>
              </UncontrolledDropdown>
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


  const handleSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      search: true,
    }))
  }

  const handleSearchClose = () => {
    setSearchState((prevState) => ({
      ...prevState,
      search: false,
    }))
    setSearchCampaign("")
  }

  console.log(searchCamapaign);

  const handleSearchCampaign = (e) => {
    setSearchCampaign(e.target.value)
  }

  //handle Filters

  const handleFilterFunction = (filterId) => {
    setSelectedFilters(filterId);
  };




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
            <Search className={`ms-2 me-3 text-secondary cursor_pointer ${searchState?.search === true ? "d-none" : "d-flex"}`} onClick={handleSearch} />
            <UncontrolledDropdown
              className="me-2"
              direction='down'
            >
              <DropdownToggle
                className='p-0 text-dark border border-0 bg_meddqwiz'
              >
                <FiFilter className='bg_meddqwiz cursor_pointer fs-4 text-secondary' />
              </DropdownToggle>
              <DropdownMenu className='filter_dropdown mt-3'>
                <span className='p-3 mb-2'>Filter</span>
                <DropdownItem className='d-flex align-items-center' onClick={() => handleFilterFunction("Live")}>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      id="Live"
                      checked={selectedFilters === "Live"}
                    />
                    {' '}
                    <Label htmlFor="Live" className='text_85'>
                      All
                    </Label>
                  </FormGroup>
                </DropdownItem>
                <DropdownItem className='d-flex align-items-center' onClick={() => handleFilterFunction("Active")}>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      id="Active"
                      checked={selectedFilters === "Active"}
                    />
                    {' '}
                    <Label check htmlFor="Active" className='text_85'>
                      Active
                    </Label>
                  </FormGroup>

                </DropdownItem>
                <DropdownItem className='d-flex align-items-center' onClick={() => handleFilterFunction("Draft")}>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      id="Draft"
                      checked={selectedFilters === "Draft"}
                    />
                    {' '}
                    <Label check htmlFor='Draft' className='text_85'>
                      Draft
                    </Label>
                  </FormGroup>
                </DropdownItem>
                <DropdownItem className='d-flex align-items-center' onClick={() => handleFilterFunction("Waiting%20for%20Approval")}>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      id="Waiting%20for%20Approval"
                      checked={selectedFilters === "Waiting%20for%20Approval"}
                    />
                    {' '}
                    <Label check htmlFor="Waiting%20for%20Approval" className='text_85'>
                      Waiting for approval
                    </Label>
                  </FormGroup>
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>

            <Link to="/campaignCreate">
              <Button className='Create_campaign_btn me-2' outline>
                Create Campaign
              </Button>
            </Link>

          </div>

        </div>
        {searchState?.search === true &&
          (<div className="serach_div">
            <Row className='my-3'>
              <Col xs={11} className='d-flex'>
                <Input className="inputFocus text_85 -sm me-3" placeholder='Search....' onChange={handleSearchCampaign} value={searchCamapaign}>searching..</Input>
              </Col>
              <Col xs={1}>
                <Button onClick={handleSearchClose} className='ps-3 pe-3 border border-danger text-danger bg_white'>Close</Button>
              </Col>
            </Row>
          </div>)}
        <TabPane tabId="1">
          <Row>
            <Col sm="12" className='active_table_column'>

              {spinner ?
                (<Spinner className='active_table_spinner'>
                  Loading...
                </Spinner>) : 
                (<DataTable
                  columns={columns}
                  data={activeCampaignList}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                  paginationPerPage={pageData?.limit}
                  onChangeRowsPerPage={handlePerPageChange}
                  onChangePage={handlePageChange}
                  paginationRowsPerPageOptions={[7, 10, 13, 16]}
                />)}

              {/* <DataTable
                columns={columns}
                data={activeCampaignList}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationPerPage={pageData?.limit}
                onChangeRowsPerPage={handlePerPageChange}
                onChangePage={handlePageChange}
                paginationRowsPerPageOptions={[7, 10, 13, 16]}
              /> */}



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




