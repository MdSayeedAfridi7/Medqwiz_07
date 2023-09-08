import React from 'react'
import { Button, Col, Input, InputGroup, Label, Row } from 'reactstrap'
import Select from "react-select";
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { setCCStep1APIReset } from "../store/CCStep1Slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CCStep3PostAPI, CCStepsTrueFalseAPI } from "../API/IndexAPIs";
import { useState } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { IoArrowForward } from 'react-icons/io5';
import CCStep2API from '../API/CCStep2API';


const selectRunTime = [
    { value: 1, label: "3 Days" },
    { value: 2, label: "7 Days" },
    { value: 3, label: "15 Days" },
    { value: 4, label: "30 Days" },
];

const CCContentBodyStep2 = () => {

    const CCStep2Data = useSelector((state) => state?.reducer?.CCStep2Slice);
    console.log(CCStep2Data);

    const CCStepsTFData = useSelector((state) => state?.reducer?.CCStepT_F_Slice)
    console.log(CCStepsTFData)

    

    // useState
    const [runTimeDropdownState, setRunTimeDropdownState] = useState({
        value: CCStep2Data?.id,
        label: CCStep2Data?.campRunTime,
    });

    const [inputState, setInputState] = useState({
        campName: CCStep2Data?.campName,
        campTitle: CCStep2Data?.campTitle,
        campTag: CCStep2Data?.campTag,
        descTitle: CCStep2Data?.descTitle,
        descInformation: CCStep2Data?.descInformation,
        cardCampName: CCStep2Data?.campName,
        cardCampDescinformation: CCStep2Data?.descInformation,
        cardCampcampImage: CCStep2Data?.campImage?.url,
        cardCampPharmaLogo: CCStep2Data?.PharmaLogo?.url,
        campNameCharCount: CCStep2Data?.campName?.length,
        campTitleCharCount: CCStep2Data?.campTitle?.length,
        campTagCharCount: CCStep2Data?.campTag.length,
        descTitleCharCount: CCStep2Data?.descTitle.length,
        descInformationCharCount: CCStep2Data?.descInformation.length,
    });

    console.log(CCStep2Data?.campImage?.url);

    const [uploadS2File, setUploadS2File] = useState({
        cardCampcampImage: CCStep2Data?.campImage?.url,
        cardCampPharmaLogo: CCStep2Data?.PharmaLogo?.url,
    });

    // console.log(uploadS2File);
    const [campaignCategory, setCampaignCategory] = useState({
        campaignCategory: CCStep2Data?.campRelatedTo,
    });

    //
    const [apiData, setApiData] = useState({
        id: CCStep2Data?.id,
        img: null,
        logo: null,
        campName: inputState?.campName,
        campRunTime: runTimeDropdownState?.label,
        campTag: inputState?.campTag,
        campTitle: inputState?.campTitle,
        descInfo: inputState?.descInformation,
        descTitle: inputState?.descTitle,
        campViewType: CCStep2Data?.campViewType,
        campRelatedTo: CCStep2Data?.campRelatedTo
    });

    console.log(apiData);

    const [formInteracted, setFormInteracted] = useState(false);

    const [steps, setSteps] = useState({
        Step1: false,
        Step2: false,
        Step3: false,
        Step4: false,
        Step5: false,
        Step6: false,
    })


    // const [validState, setValidState] = useState({
    //     isValid: false
    // })

    //useNavigate
    const navigate = useNavigate();

    //useDispatch
    const dispatch = useDispatch();

    // useEffect
    useEffect(() => {
        setInputState((prevState) => ({
            ...prevState,
            campName: CCStep2Data?.campName,
            campTitle: CCStep2Data?.campTitle,
            campTag: CCStep2Data?.campTag,
            descTitle: CCStep2Data?.descTitle,
            descInformation: CCStep2Data?.descInformation,
            cardCampcampImage: CCStep2Data?.campImage?.url,
            cardCampPharmaLogo: CCStep2Data?.PharmaLogo?.url,
            cardCampName: CCStep2Data?.campName,
            cardCampDescinformation: CCStep2Data?.descInformation,
            campNameCharCount: CCStep2Data?.campName?.length,
            campTitleCharCount: CCStep2Data?.campTitle?.length,
            campTagCharCount: CCStep2Data?.campTag.length,
            descTitleCharCount: CCStep2Data?.descTitle.length,
            descInformationCharCount: CCStep2Data?.descInformation.length,
        }));
    }, [CCStep2Data]);

    // useEffect(() => {
    //     dispatch(CCStep2API(params?.id))
    // }, [campaignDetailsData])

    useEffect(() => {
        setUploadS2File((prevState) => ({
            ...prevState,
            cardCampcampImage: CCStep2Data?.campImage?.url,
            cardCampPharmaLogo: CCStep2Data?.PharmaLogo?.url,
        }));
    }, [CCStep2Data?.campImage?.url]);

    useEffect(() => {
        setRunTimeDropdownState((prevState) => ({
            ...prevState,
            value: CCStep2Data?.id,
            label: CCStep2Data?.campRunTime,
        }));
    }, [CCStep2Data?.campRunTime]);

    useEffect(() => {
        setCampaignCategory((prevState) => ({
            ...prevState,
            campaignCategory: CCStep2Data?.campRelatedTo,
        }));
    }, [CCStep2Data?.campRelatedTo]);

    useEffect(() => {
        setApiData((prevState) => ({
            ...prevState,
            id: CCStep2Data?.id,
            img: null,
            logo: null,
            campName: inputState?.campName,
            campRunTime: runTimeDropdownState?.label,
            campTag: inputState?.campTag,
            campTitle: inputState?.campTitle,
            descInfo: inputState?.descInformation,
            descTitle: inputState?.descTitle,
            campViewType: CCStep2Data?.campViewType,
            campRelatedTo: CCStep2Data?.campRelatedTo
        }))
    }, [CCStep2Data])

    console.log(apiData);


    console.log(CCStepsTFData);

    useEffect(() => {
        if (CCStepsTFData && CCStepsTFData.Step1 === true) {
            navigate(`/campaignCreateFlow/${'step3'}/${CCStep2Data.id}`)
        }
    }, [CCStepsTFData?.Step1])

    console.log(CCStepsTFData);


    //handle events

    const handleStep2 = () => {

        if (formInteracted) {
            dispatch(CCStep3PostAPI(apiData));
            dispatch(CCStepsTrueFalseAPI({ ...steps, Step1: true }, CCStep2Data))

        }
        else {
            dispatch(CCStepsTrueFalseAPI({ ...steps, Step1: true }, CCStep2Data))

        }
    };

    const handleCCStep2Back = () => {
        dispatch(setCCStep1APIReset());
        navigate("/campaignCreate");
    };

    const handle_Step2_inputs = (event) => {
        const { name, value } = event.target;
        let maxLength;
        if (name === "campName") {
            maxLength = 32;
        } else if (name === "campTitle") {
            maxLength = 16;
        } else if (name === "campTag") {
            maxLength = 8;
        } else if (name === "descTitle") {
            maxLength = 32;
        } else if (name === "descInformation") {
            maxLength = 256;
        }


        if (value.length <= maxLength) {
            setInputState((prevState) => ({
                ...prevState,
                [name]: value,
                [`${name}CharCount`]: value.length,
            }));
            setApiData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
            setFormInteracted(true)
            // setValidState((prevState) => ({
            //     ...prevState,
            //     [name]: isValid
            // }))
        };
    }

    const handle_step2_upload = (event) => {

        const { name, files } = event.target;
        const imageURL = URL.createObjectURL(files[0]);

        // setUploadS2File((prevState) => ({
        //     ...prevState,
        //     [name]: imageURL,
        // }));

        if (name === "cardCampcampImage") {
            setUploadS2File((prevState) => ({
                ...prevState,
                cardCampcampImage: imageURL,
            }));
            setApiData((prevState) => ({
                ...prevState,
                img: files[0],
            }));

            setFormInteracted(true)
        } else if (name === "cardCampPharmaLogo") {
            setUploadS2File((prevState) => ({
                ...prevState,
                cardCampPharmaLogo: imageURL,
            }));
            setApiData((prevState) => ({
                ...prevState,
                logo: files[0],
            }));

            setFormInteracted(true)
        }

    };

    const handle_product = () => {
        setCampaignCategory({
            campaignCategory: "product",
        });
        setApiData((prevState) => ({
            ...prevState,
            campRelatedTo: "product"
        }))
        setFormInteracted(true)
    };
    const handle_disease = () => {
        setCampaignCategory({
            campaignCategory: "disease",
        });
        setApiData((prevState) => ({
            ...prevState,
            campRelatedTo: "disease"
        }))
        setFormInteracted(true)
    };
    const handle_healthcare_news = () => {
        setCampaignCategory({
            campaignCategory: "health",
        });
        setApiData((prevState) => ({
            ...prevState,
            campRelatedTo: "health"
        }))
        setFormInteracted(true)
    };


    const handleRunTime = (selectedOption) => {
        const selectedLabel = selectedOption.label
        const intValueRunTime = parseInt(selectedLabel, 10)
        setRunTimeDropdownState(selectedOption)
        setApiData((prevState) => ({
            ...prevState,
            campRunTime: intValueRunTime
        }))
        setFormInteracted(true)
    }


    return (
        <div className='d-flex flex-column'>
            <div className="cc_step2_content row d-flex flex-fill p-3">
                <div className="cc_step2_inputLabelDiv col-lg-8 flex-column d-flex">
                    <div className="cc_step2_input_field">
                        <div className="cc_step2_input_text mt-3 mb-1">
                            <span>
                                Campaign Name<span className="text-danger">*</span>
                            </span>
                        </div>
                        <div className="cc_step2_input_input mb-3 pe-3 cc_step2_input_Rel">
                            <Input
                                name="campName"
                                className="shadow-none inputText"
                                value={inputState?.campName}
                                onChange={handle_Step2_inputs}
                            />
                            <div className="char-count cc_step2_input_Abs">
                                {inputState?.campNameCharCount}/{32}
                            </div>
                        </div>
                    </div>
                    <div className="cc_step2_input_field">
                        <div className="cc_step2_input_text mt-3 mb-1">
                            <span>
                                Campaign Title Alias<span className="text-danger">*</span>
                            </span>
                        </div>
                        <div className="cc_step2_input_input mb-3 pe-3 cc_step2_input_Rel">
                            <Input
                                name="campTitle"
                                className="shadow-none inputText"
                                value={inputState?.campTitle}
                                onChange={handle_Step2_inputs}
                            />
                            <div className="char-count cc_step2_input_Abs">
                                {inputState?.campTitleCharCount}/{16}
                            </div>
                        </div>
                    </div>
                    <div className="cc_step2_l_btn d-flex flex-column">
                        <div className="cc_step2_input_text mt-3 mb-1">
                            <span>
                                Select Campaign category<span className="text-danger">*</span>
                            </span>
                        </div>

                        <Row className="cc_step2_input_select_div d-flex">
                            <Col lg="4">
                                <div
                                    className={`cc_step2_input_S1 d-flex flex-column p-3 text-center rounded mt-1 ms-2 me-2 flex-fill ${campaignCategory.campaignCategory === "product"
                                        ? "active_camp_cate"
                                        : ""
                                        }`}
                                    onClick={handle_product}
                                >
                                    <h5 className="text_size_s2Tabs">Product</h5>
                                    <p className="text_size_s2Tabs">
                                        Indication specific Product
                                    </p>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div
                                    className={`cc_step2_input_S2 d-flex flex-column p-3 text-center rounded mt-1 ms-2 me-2 flex-fill ${campaignCategory.campaignCategory === "disease"
                                        ? "active_camp_cate"
                                        : ""
                                        }`}
                                    onClick={handle_disease}
                                >
                                    <h5 className="text_size_s2Tabs">Disease</h5>
                                    <p className="text_size_s2Tabs">
                                        Campaign focus is on indication
                                    </p>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div
                                    className={`cc_step2_input_S3 d-flex flex-column p-3 text-center rounded mt-1 ms-2 me-2 flex-fill ${campaignCategory.campaignCategory === "health"
                                        ? "active_camp_cate"
                                        : ""
                                        }`}
                                    onClick={handle_healthcare_news}
                                >
                                    <h5 className="text_size_s2Tabs">Healthcare News</h5>
                                    <p className="text_size_s2Tabs">Medical industry updates</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="cc_step_2_tag_pharma_img mt-2 mb-3">
                        <Row>
                            <Col lg="4" className="pe-4">
                                <Label for="campaign_tag">
                                    <span>
                                        Campaign Tag<span className="text-danger">*</span>
                                    </span>
                                </Label>
                                <InputGroup className="cc_step2_input_Rel">
                                    <Input
                                        id="campaign_tag"
                                        name="campTag"
                                        type="text"
                                        className="shadow-none inputFocus inputText"
                                        placeholder="Ex: Drug Class"
                                        value={inputState?.campTag}
                                        onChange={handle_Step2_inputs}
                                    />
                                    <div className="char-count cc_step2_input_Abs">
                                        {inputState?.campTagCharCount}/{8}
                                    </div>
                                </InputGroup>
                            </Col>
                            <Col lg="4" className="pe-4">
                                <Label>
                                    <span>
                                        Change Pharma Logo<span className="text-danger">*</span>
                                    </span>
                                </Label>
                                <InputGroup>
                                    <Input
                                        name="cardCampPharmaLogo"
                                        direction="end"
                                        type="file"
                                        className="shadow-none inputFocus inputText"
                                        placeholder="choose file"
                                        onChange={handle_step2_upload}
                                    />
                                </InputGroup>
                            </Col>
                            <Col lg="4" className="pe-4">
                                <Label>
                                    <span>
                                        Change Campaign Image
                                        <span className="text-danger">*</span>
                                    </span>
                                </Label>
                                <InputGroup>
                                    <Input
                                        name="cardCampcampImage"
                                        className="shadow-none inputFocus"
                                        placeholder="choose file"
                                        type="file"
                                        onChange={handle_step2_upload}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                    <div className="cc_step_2_runtime_desc mt-3 mb-2">
                        <Row>
                            <Col lg="6" className="pe-4">
                                <Label>
                                    <span>
                                        Campaign Runtime in days
                                        <span className="text-danger">*</span>
                                    </span>
                                </Label>
                                <Select
                                    value={runTimeDropdownState}
                                    options={selectRunTime}
                                    onChange={handleRunTime}
                                    className="step2_select1 inputText"
                                />
                            </Col>
                            <Col lg="6" className="pe-3">
                                <Label>
                                    <span>Description Title</span>
                                </Label>
                                <div className="cc_step2_input_Rel">
                                    <Input
                                        name="descTitle"
                                        className="shadow-none inputFocus inputText"
                                        value={inputState?.descTitle}
                                        onChange={handle_Step2_inputs}
                                        placeholder="Enter the title"
                                    />
                                    <div className="char-count cc_step2_input_Abs">
                                        {inputState?.descTitleCharCount}/{32}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="step_2_description mt-3">
                        <Row>
                            <Col className="pe-3">
                                <Label>
                                    <span>
                                        Description<span className="text-danger">*</span>
                                    </span>
                                </Label>
                                <div className="cc_step2_input_Rel">
                                    <Input
                                        name="descInformation"
                                        type="textarea"
                                        rows={4}
                                        className="shadow-none inputFocus mb-5 inputText"
                                        value={inputState?.descInformation}
                                        onChange={handle_Step2_inputs}
                                        placeholder="Brief information"
                                    />
                                    <div className="char-count cc_step2_input_desc_Abs rounded-start">
                                        {inputState?.descInformationCharCount}/{256}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="cc_step2_card d-flex col-lg-4">
                    <div className="step_2_card_preview d-flex flex-column flex-fill ms-3 p-3">
                        <p>Card Preview</p>
                        <Label>
                            This is how the campaign preview will appear for HCPs
                        </Label>
                        <Row className="d-flex flex-column  rounded flex-fill rounded border border-dark">
                            <Col className="step2_card_img_bg position-relative">
                                <img
                                    src={uploadS2File?.cardCampcampImage}
                                    alt=""
                                    className="rounded-top"
                                    name="cardCampcampImage"
                                />
                                <div className="step2_heart_icon position-absolute d-flex justify-content-center align-items-center">
                                    <AiFillHeart />
                                </div>
                            </Col>
                            <Col className="mt-2">
                                <AiFillStar className="ms-2 text-warning" />{" "}
                                <span className="text-warning">5.0</span>{" "}
                                <span>(0 Rating)</span>
                            </Col>

                            <Col className="mt-2">
                                <span
                                    name="cardCampName"
                                    className="ms-2 fw-bold"
                                    onChange={handle_Step2_inputs}
                                >
                                    {inputState?.campName}
                                </span>
                                <span
                                    name="cardCampDescinformation"
                                    onChange={handle_Step2_inputs}
                                    className="ms-2"
                                >
                                    {inputState?.descInformation}
                                </span>
                            </Col>
                            <Col className="mt-2">
                                <div className="step2_card_expiry d-flex justify-content-end align-item-center">
                                    <span className="ps-2 pt-1">
                                        Expires on August 21st 2023
                                    </span>
                                </div>
                            </Col>
                        </Row>

                    </div>

                </div>
            </div>
            <div className="cc_step2_content_footer border-top border-secondary pt-3 pb-3 d-flex justify-content-between">
                <Button className="ms-5 text_85" onClick={handleCCStep2Back}>
                    <BiArrowBack className='text_85'/> Go Back
                </Button>
                <Button className="me-5 text_85" onClick={handleStep2}>
                    Save and Continue <IoArrowForward />
                </Button>
            </div>
        </div>
    )
}

export default CCContentBodyStep2
