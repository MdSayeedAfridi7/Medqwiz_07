import React from "react";
import { Col, Row } from "reactstrap";
import CCContentHeader from "./CCContentHeader";
import CCContentStepsFlow from "./CCContentStepsFlow";
import CCContentBodyStep2 from "./CCContentBodyStep2";
import { useSelector } from "react-redux";
import CCContentBodyStep3 from "./CCContentBodyStep3";
import { useEffect } from "react";
import CCStep2API from "../API/CCStep2API";
import CCContentBodyGameDetails from "./CCContentBodyGameDetails";


const CCFStep2 = () => {
    //useSelector

    const CCStep2Data = useSelector((state) => state?.reducer?.CCStep2Slice);
    console.log(CCStep2Data);

    // useEffect(() => {
    //     dispatch(CCStep2API(params?.id))
    // }, [CCStep2Data])

    return (
        <Row className="campaign_create_flow_step2 d-flex  flex-column rounded">
            <Col className="ccf_header  d-flex  justify-content-between align-items-center pt-2 pb-2">
                <CCContentHeader />
            </Col>
            <Col className="ccf_sub_header d-flex  flex-wrap  p-3 rounded shadow mb-3">
                <CCContentStepsFlow />
            </Col>
            <Col className="ccf_main_content d-flex border border-dark flex-column">
                <CCContentBodyStep2 />
                <CCContentBodyStep3 />
                <CCContentBodyGameDetails/>
            </Col>
        </Row>
    );
};

export default CCFStep2;

