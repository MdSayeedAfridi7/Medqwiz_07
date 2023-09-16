import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CCStep2API from '../API/CCStep2API';
import { useEffect } from 'react';
import CCContentBodyStep2 from './CCContentBodyStep2';
import CCContentBodyStep3 from './CCContentBodyStep3';
import { Col, Row } from 'reactstrap';
import CCContentHeader from './CCContentHeader';
import CCContentStepsFlow from './CCContentStepsFlow';
import CCContentBodyGameDetails from './CCContentBodyGameDetails';

const CCFlowParams = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const campaignDetailsData = useSelector((state) => state?.reducer?.CCStep3PostSlice)

    useEffect(() => {
        dispatch(CCStep2API(params?.id))
    }, [params, campaignDetailsData])


    console.log("params", params)
 
    return (
        <>
            <Row className="campaign_create_flow_step2 d-flex  flex-column rounded">
                <Col className="ccf_header  d-flex  justify-content-between align-items-center pt-2 pb-2">
                    <CCContentHeader/>
                </Col>
                <Col className="ccf_sub_header d-flex  flex-wrap  p-3 rounded shadow mb-3">
                    <CCContentStepsFlow />
                </Col>
                <Col className="ccf_main_content d-flex border border-dark flex-column">
                    {params.step === "step2" && <CCContentBodyStep2 />}
                    {params.step === "step3" && <CCContentBodyStep3 params={params}/>}
                    {params.step === "step4" && <CCContentBodyGameDetails params={params}/>}
                    
                </Col>
            </Row>


        </>
    )

}

export default CCFlowParams

