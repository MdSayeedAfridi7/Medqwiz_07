import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux';
import CampTemTypAPI from '../API/CampTemTypAPI';
import { useNavigate } from 'react-router-dom';
import CCStep1API from '../API/CCStep1API';

const CreateData = () => {

    //dispatch
    const dispatch = useDispatch()

    //useDispatch


    //useSelector
    const CCStep1Data = useSelector((state) => state?.reducer?.CCStep1Slice)

    console.log(CCStep1Data);

    // useState
    // const [loader, setloader] = useState(false)
    const [state, setState] = useState({
        campType: "",
        FromArchive: false,
        campId: 0,
        campViewType: 0,
        internalName: "",
        dropdownTemplate: null,
        isValid: false
    });


    // useSelector

    const TypesOfCampTemp = useSelector((state) => state?.reducer?.TypesOfCampTempSlices?.campaign)

    // useEffect
    useEffect(() => {
        dispatch(CampTemTypAPI())
    }, [])

    useEffect(() => {
        if (CCStep1Data !== null) {
            navigate(`/campaignCreateFlow/${'step2'}/${CCStep1Data?.id}`)
        }
    }, [CCStep1Data])

    console.log(CCStep1Data);

    //useNavigate

    const navigate = useNavigate()
    console.log(state)

    //handle functions

    const handleCCStep1 = () => {
        // setloader(true)
        // dispatch(CCStep1API(state, { setloader }))
        // dispatch(CCStep1API(state.FromArchive, state.campId, state.campType, state.campViewType, state.internalName))
        dispatch(CCStep1API(state))
        console.log(CCStep1Data);
    }

    const handle_create_campaign_btn = () => {
        setState({
            ...state,
            campType: "promotional",
            FromArchive: false,
            campId: 0,
            campViewType: 2,
            internalName: "",
            dropdownTemplate: null,
            isValid: false

        })
    }

    const handle_promotional_campaign_btn = () => {
        setState({
            ...state,
            campType: "promotional",
            FromArchive: false,
            campId: 0,
            campViewType: 1,
            internalName: "",
            dropdownTemplate: null,
            isValid: false
        });
    }

    const handleSelectTemplateCheckboxChange = () => {
        if (!state.FromArchive) {
            setState({
                ...state,
                FromArchive: !state.FromArchive,
                dropdownTemplate: null,
                internalName: ""
            })
        } else {
            setState({
                ...state,
                FromArchive: !state.FromArchive
            })
        }
    }

    const handleInternalNameChange = (event) => {
        const internalName = event.target.value;
        setState({
            ...state,
            internalName,
            isValid: internalName.length >= 4
        });
    };

    const handleCampaignSelect = (selectedOption) => {
        const dropdownTemplate = selectedOption;
        const internalName = selectedOption.label;
        const campId = selectedOption.value
        const isValid = internalName.length >= 4;

        setState({
            ...state,
            dropdownTemplate,
            internalName,
            campId,
            isValid
        });
    };


  

    // react Select

    const selectCampaign = TypesOfCampTemp?.map((e) => {
        return (
            { value: e?.id, label: e?.internalName }
        )
    })

    console.log("TypesOfCampTemp", TypesOfCampTemp);



    return (
        <div className="create_campaign_page_one d-flex flex-column rounded p-3 ">
            <div className="CC_page_one_top">
                <Row className="CC_header_text_P1 mb-2 fs-4">
                    <span>Create Campaign</span>
                </Row>
                <Row className="CC_select_type_mandatory_text mb-2">
                    <span>Select the type of Campaign</span>
                </Row>
                <Row className="type_of_create_campaign_div ps-3 pe-3 mb-2">
                    <Col id="create_video_campaign" className={`Create_types_divs py-5 align-items-center justify-content-center rounded d-flex  text-center cursor-pointer mt-1 me-1 ${state.campViewType === 2 ? "active_CCStep1Btn" : ""}`}
                        onClick={handle_create_campaign_btn}>
                        <span> Create Video Campaign</span>
                    </Col>
                    <Col id="create_promotional_campaign" className={`Create_types_divs py-5 align-items-center justify-content-center rounded d-flex  text-center cursor-pointer mt-1 me-1 ${state.campViewType === 1 ? "active_CCStep1Btn" : ""}`}
                        onClick={handle_promotional_campaign_btn}>
                        <span>Create Promotional Campaign</span>
                    </Col>
                    <Col id="non_promotional_campaign" className="Create_types_divs py-5 align-items-center justify-content-center  rounded d-flex  text-center mt-1 me-1" disabled>
                        <span>Non promotional campaign <span className='text-danger'>(Coming soon)</span></span>
                    </Col>
                </Row>
                {
                    (state.campType === "promotional") && (
                        <div className="create_campaign_options mt-3">
                            <Row className="select_template_check ps-3 pe-3 mb-2">
                                <FormGroup check>
                                    <Input type="checkbox"
                                        id='select_template_checkbox'
                                        checked={state.FromArchive}
                                        className='shadow-none CCStep1Checkbox'
                                        onChange={handleSelectTemplateCheckboxChange}
                                    />
                                    {' '}
                                    <Label check htmlFor='select_template_checkbox' className='cc_checkbox_text'>
                                        Select from template
                                    </Label>
                                </FormGroup>
                            </Row>
                            {state.FromArchive && (
                                <Row className="campaign_from_template_div ps-3 pe-3 mb-2">
                                    <Col md={4} className="campaign_f_template_text mb-2">
                                        <span>Select Campaign From Template<span className='text-danger'>*</span></span>
                                    </Col>
                                    <Col className="select_template_dropdown">
                                        <FormGroup>
                                            <Select
                                                defaultValue={state.dropdownTemplate}
                                                onChange={handleCampaignSelect}
                                                options={selectCampaign}
                                            />

                                        </FormGroup>


                                    </Col>
                                </Row>)
                            }
                            <Row className="Camp_inter_name ps-3 pe-3 mb-2">
                                <Col md={4} className="camp_inter_text mb-2 ">
                                    <span>Campaign Internal Name<span className='text-danger'>*</span></span>
                                </Col>
                                <Col className="camp_inter_input">
                                    <Input
                                        id="camp_internal_input_bar"
                                        name="camp_internal_input_bar"
                                        placeholder="Enter Campaign Name"
                                        className='create_internal_in shadow-none inputFocus'
                                        value={state.internalName}
                                        onChange={handleInternalNameChange}
                                    />
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </div>


            <footer className='create_page_1_filter mt-5'>
                <Button className='me-3'>
                    close
                </Button>
                <Button disabled={!state.isValid} className='CCStep1CCBtn' onClick={handleCCStep1}>
                    {/* <Button className='CCStep1CCBtn' onClick={handleCCStep1}> */}
                    {/* <Link to="/campaignCreateFlow/step2/MTQy" className='text-decoration-none text-white'>Create Campaign</Link> */}
                    Create Campaign
                </Button>
            </footer>
        </div>
    )
}


export default CreateData;





