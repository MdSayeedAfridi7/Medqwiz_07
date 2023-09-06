import React, { useState } from 'react'
import { setCCStepsTF, setCCStepsTFReset } from '../store/CCStepT_F_Slice';
import { Button, Col, Input, InputGroup, InputGroupText, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { BiArrowBack } from 'react-icons/bi';
import { IoArrowForward, IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CCStep3AddAPI, CCStep3DeleteAPI, CCStep3GetAPI, CCStep3UploadAPI, CCStepsTrueFalseAPI } from '../API/IndexAPIs';
import { useEffect } from 'react';
import { RiDeleteBinLine } from "react-icons/ri"
import quote_card from "../assets/quote_card.svg"
import textbox_card from "../assets/textbox_card.svg"
import slider_card from "../assets/slider_card.svg"
import mediabox_card from "../assets/mediabox_card.svg"
import step3_card_image from "../assets/eyeDrops_img_1.webp"
import PerfectScrollbar from 'react-perfect-scrollbar'
import step3_card_logo from "../assets/alergen.jpg"
import benefits_img from "../assets/eye_with_drop.jpg"
import img_slide_1 from "../assets/img_slide_1.webp"
import CCStep2API from '../API/CCStep2API';
import S3FormBodyWrap from './S3FormBodyWrap';


const CCContentBodyStep3 = ({ params }) => {

  // useSelector.
  const CCStep2Data = useSelector((state) => state?.reducer?.CCStep2Slice);
  console.log(CCStep2Data)

  const CCStep3PostData = useSelector((state) => state?.reducer?.CCStep3PostSlice)
  console.log(CCStep3PostData)

  const CCStepsTFData = useSelector((state) => state?.reducer?.CCStepT_F_Slice)
  console.log(CCStepsTFData)

  const CCStep3CardsData = useSelector((state) => state?.reducer?.CCStep3GetSlice)
  console.log(CCStep3CardsData);

  const CCStep3AddData = useSelector((state) => state?.reducer?.CCStep3AddSlice)
  console.log(CCStep3AddData);

  // useDispatch
  const dispatch = useDispatch()
  // useState


  const [tabState, setTabState] = useState({
    tab: ""
  })

  const [cardState, setCardState] = useState("")

  const [sliderUpload, setSliderUpload] = useState({
    cardId: "",
    img: null
  })

  // useEffect
  useEffect(() => {
    if (CCStepsTFData && CCStepsTFData.Step1 === false) {
      navigate(`/campaignCreateFlow/${'step2'}/${CCStep2Data.id}`);
    }
  }, [CCStepsTFData?.Step1])


  useEffect(() => {
    dispatch(CCStep3GetAPI(params.id))
  }, [])

  useEffect(() => {
    // dispatch(CCStep3DeleteAPI())
  }, [CCStep3CardsData])
  // useNavigate
  const navigate = useNavigate()



  // const 

  const handleCCStep3Back = () => {
    dispatch(CCStepsTrueFalseAPI({ ...CCStepsTFData, Step1: false }, CCStep2Data))

  }

  const handleStep3 = () => {
    console.log("clicked 3");
  }

  // Topics
  const handleAddTopicCard = (title, type) => {
    dispatch(CCStep3AddAPI([{
      campId: CCStep2Data?.id?.toString(),
      order: CCStep3CardsData?.length + 1,
      title: title,
      type: type
    }]))
    // setSelectedTopic(CCStep3CardsData?.length)
    // setTabState((prevState) => ({
    //   ...prevState,
    //   tab: type
    // }))
  };


  console.log(tabState);
  console.log(CCStep3CardsData);


  // delete function

  const handleDeleteFunction = (deletePayload, id) => {
    console.log(deletePayload, id);
    dispatch(CCStep3DeleteAPI(deletePayload, id, cardState, { setCardState }))
  }

  // handle upload


  const handel_slider_upload = (event, id) => {
    const { files } = event.target
    // setSliderUpload((prevState) => ({
    //   ...prevState,
    //   cardId: cardState?.id,
    //   img: files[0]
    // }))
    const formData = new FormData();
      formData.append("cardId", id);
      formData.append("img", files[0]);
      setTimeout(() => {
    dispatch(CCStep3UploadAPI(formData)) 
      }, 2000);
  }

  console.log("card-id", cardState?.id);

  return (
    <div>
      <div className='d-flex flex-column rounded'>
        <div className="CC_Step3_body d-flex flex-fill bg_white rounded">
          <Row className=" d-flex flex-fill p-3 bg_white rounded">
            <Col sm={4} lg={2} className="d-flex  border border-dark flex-column light_violet">
              <div className="CCStep3_sidebar d-flex felx-fill flex-column px-2">
                <span className='mt-2'>Topics</span>
                <div className="topics_tab mt-2" >
                  {CCStep3CardsData && (CCStep3CardsData.map((e, index) => {
                    // console.log(index);
                    return (
                      <>
                        <div className={`topic_tabs_divs bg_white p-2 fw-bold d-flex justify-content-start align-items-center rounded my-2 border_grey cursor_pointer ${e?.id === cardState?.id ? "activeS3_tab" : ""}`} key={index}
                          onClick={() => { setCardState(e) }}>
                          <span>{e?.title}</span>
                        </div>
                      </>
                    )
                  }))}
                </div>

              </div>
            </Col>

            <Col sm={8} lg={6} className="d-flex flex-fill  border border-dark ps-sm-3">
              <div className="CCStep3_main light_violet d-flex flex-column border border-dark flex-fill p-3">
                <span className='text_85'>Build Campaign</span>
                {/* <S3FormBodyWrap /> */}
                <div className="step3_form_wrap bg_white rounded d-flex flex-column mt-2">
                  {/* {CCStep3CardsData?.map((e, index) => {
                    // console.log(e[index]);
                    console.log(CCStep3CardsData);
                    console.log(e?.type);
                    return (
                      <>
                        {tabState.tab === e?.type && (
                          <>
                            <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                              <div className="about_header_name">
                                <span className='text_100'>{e?.type} Card</span>
                              </div>
                              <div className="about_header_delete_btn text_125">
                                <RiDeleteBinLine />
                              </div>
                            </div>
                            <div className="about_form_field d-flex flex-column p-3 bg_white rounded-bottom">
                              <div className="about_card_title d-flex flex-column">
                                <p className='text_75'>Enter the card Title <span className='text-danger'>*</span></p>
                                <Input
                                  type="text"
                                  className='text_100 inputFocus border border-secondary-subtle  mb-2'
                                />
                              </div>
                              <div className="about_decription">
                                <p className='text_75'>Description <span className='text-danger'>*</span></p>
                                <Input
                                  type='textarea'
                                  row={3}
                                  className='text_100 inputFocus border border-secondary-subtle mb-2'
                                />
                              </div>
                              <div className="about_tag">
                                <p className='text_75'>Tag <span className='text-danger'>*</span></p>
                                <Input
                                  type='text'
                                  className='text_100 inputFocus border border-secondary-subtle mb-2'
                                />
                              </div>
                              <div className="about_reference">
                                <p className='text_75'>Reference <span className='text-danger'>*</span></p>
                                <Input
                                  className='text_100 inputFocus border border-secondary-subtle mb-2'
                                />
                              </div>
                            </div>
                          </>
                        )}
                        {tabState.tab === e?.type && (
                          <>
                            <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                              <div className="about_header_name">
                                <span className='text_100'>{e?.type} Card</span>
                              </div>
                              <div className="about_header_delete_btn text_125">
                                <RiDeleteBinLine />
                              </div>
                            </div>
                            <div className="about_form_field d-flex flex-column p-3 bg_white rounded-bottom">
                              <div className="about_card_title d-flex flex-column">
                                <p className='text_75'>Enter the card Title <span className='text-danger'>*</span></p>
                                <Input
                                  type="text"
                                  className='text_100 inputFocus border border-secondary-subtle  mb-2'
                                />
                              </div>
                              <div className="about_decription">
                                <p className='text_75'>Description <span className='text-danger'>*</span></p>
                                <Input
                                  type='textarea'
                                  row={3}
                                  className='text_100 inputFocus border border-secondary-subtle mb-2'
                                />
                              </div>
                              <div className="about_tag">
                                <p className='text_75'>Tag <span className='text-danger'>*</span></p>
                                <Input
                                  type='text'
                                  className='text_100 inputFocus border border-secondary-subtle mb-2'
                                />
                              </div>
                              <div className="about_reference">
                                <p className='text_75'>Reference <span className='text-danger'>*</span></p>
                                <Input
                                  className='text_100 inputFocus border border-secondary-subtle mb-2'
                                />
                              </div>
                              <div className="mediabox_image_video">
                                <p className='text_75'>Select Image or Video  <span className='text-danger'>*</span></p>
                                <Input
                                  className='text_100 inputFocus border border-secondary-subtle mb-2'
                                />
                              </div>

                            </div>
                          </>
                        )}
                        {tabState.tab === e?.type && (
                          <>

                            <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                              <div className="about_header_name">
                                <span className='text_100'>{e?.type} Card</span>
                              </div>
                              <div className="about_header_delete_btn text_125">
                                <RiDeleteBinLine />
                              </div>
                            </div>
                            <div className="slider_form bg_white d-flex flex-column p-3">
                              <div className="slider_form_file_selection d-flex flex-column">
                                <p className='text_75'>Select First Image <span className='text-danger'>*</span></p>
                                <Input
                                  type="file"
                                  className='text_100 inputFocus border border-secondary-subtle  mb-2 text_85'
                                />
                                <InputGroup>
                                  <Input placeholder="" className='inputFocus' />
                                  <InputGroupText className='p-0'>
                                    <Button className='px-3 py-1 bg_white text-dark' >
                                      <IoCloseOutline />
                                    </Button>
                                  </InputGroupText>
                                </InputGroup>
                              </div>
                              <div className="slider_form_file_selection d-flex flex-column">
                                <p className='text_75'>Select Second Image <span className='text-danger'>*</span></p>
                                <Input
                                  type="file"
                                  className='text_100 inputFocus border border-secondary-subtle  mb-2 text_85'
                                />
                                <InputGroup>
                                  <Input placeholder="" className='inputFocus' />
                                  <InputGroupText className='p-0'>
                                    <Button className='px-3 py-1 bg_white text-dark' >
                                      <IoCloseOutline />
                                    </Button>
                                  </InputGroupText>
                                </InputGroup>
                              </div>
                              <div className="slider_form_file_selection d-flex flex-column">
                                <p className='text_75'>Select third Image <span className='text-danger'>*</span></p>
                                <Input
                                  type="file"
                                  className='text_100 inputFocus border border-secondary-subtle  mb-2 text_85'
                                />
                                <InputGroup>
                                  <Input placeholder="" className='inputFocus' />
                                  <InputGroupText className='p-0'>
                                    <Button className='px-3 py-1 bg_white text-dark' >
                                      <IoCloseOutline />
                                    </Button>
                                  </InputGroupText>
                                </InputGroup>
                              </div>
                            </div>
                          </>
                        )}
                        {tabState.tab === e?.type && (
                          <>
                            <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                              <div className="about_header_name">
                                <span className='text_100'>{e?.type} Card</span>
                              </div>
                              <div className="about_header_delete_btn text_125">
                                <RiDeleteBinLine />
                              </div>
                            </div>
                            <div className="quote_form bg_white p-3">
                              <div className="quote_card">
                                <p className='text_75'>Enter the Quote <span className='text-danger'>*</span></p>
                                <Input
                                  type='textarea'
                                  rows="5"
                                  className='text_100 inputFocus border border-secondary-subtle mb-2'
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )
                  })} */}


                  {cardState.type === "textbox" && (
                    <>
                      <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                        <div className="about_header_name">
                          <span className='text_100'>{cardState?.type} Card</span>
                        </div>
                        <div className="about_header_delete_btn text_125">
                          <RiDeleteBinLine />
                        </div>
                      </div>
                      <div className="about_form_field d-flex flex-column p-3 bg_white rounded-bottom">
                        <div className="about_card_title d-flex flex-column">
                          <p className='text_75'>Enter the card Title <span className='text-danger'>*</span></p>
                          <Input
                            type="text"
                            className='text_85 inputFocus border border-secondary-subtle  mb-2'
                            value={cardState?.title}
                          />
                        </div>
                        <div className="about_decription">
                          <p className='text_75'>Description <span className='text-danger'>*</span></p>
                          <Input
                            type='textarea'
                            row={3}
                            className='text_85 inputFocus border border-secondary-subtle mb-2'
                            value={cardState?.description}
                          />
                        </div>
                        <div className="about_tag">
                          <p className='text_75'>Tag <span className='text-danger'>*</span></p>
                          <Input
                            type='text'
                            className='text_85 inputFocus border border-secondary-subtle mb-2'
                            value={cardState?.tag}
                          />
                        </div>
                        <div className="about_reference">
                          <p className='text_75'>Reference <span className='text-danger'>*</span></p>
                          <Input
                            className='text_85 inputFocus border border-secondary-subtle mb-2'
                            value={cardState?.reference}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {cardState?.type === "mediabox" && (
                    <>
                      <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                        <div className="about_header_name">
                          <span className='text_100'>{cardState?.type} Card</span>
                        </div>
                        <div className="about_header_delete_btn text_125">
                          <RiDeleteBinLine />
                        </div>
                      </div>
                      <div className="about_form_field d-flex flex-column p-3 bg_white rounded-bottom">
                        <div className="about_card_title d-flex flex-column">
                          <p className='text_75'>Enter the card Title <span className='text-danger'>*</span></p>
                          <Input
                            type="text"
                            className='text_85 inputFocus border border-secondary-subtle  mb-2'
                            value={cardState?.title}
                          />
                        </div>
                        <div className="about_decription">
                          <p className='text_75'>Description <span className='text-danger'>*</span></p>
                          <Input
                            type='textarea'
                            row={3}
                            className='text_85 inputFocus border border-secondary-subtle mb-2'
                            value={cardState?.description}
                          />
                        </div>
                        <div className="about_tag">
                          <p className='text_75'>Tag <span className='text-danger'>*</span></p>
                          <Input
                            type='text'
                            className='text_85 inputFocus border border-secondary-subtle mb-2'
                            value={cardState?.tag}
                          />
                        </div>
                        <div className="about_reference">
                          <p className='text_75'>Reference <span className='text-danger'>*</span></p>
                          <Input
                            className='text_85 inputFocus border border-secondary-subtle mb-2'
                            value={cardState?.reference}
                          />
                        </div>
                        <div className="mediabox_image_video">
                          <p className='text_75'>Select Image or Video  <span className='text-danger'>*</span></p>
                          <Input
                            type='text'
                            className='text_85 inputFocus border border-secondary-subtle mb-2'
                            value={cardState?.media[0]?.path}
                          />
                        </div>

                      </div>
                    </>
                  )}
                  {cardState?.type === "slider" && (
                    <>
                      <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                        <div className="about_header_name">
                          <span className='text_100'>{cardState?.type} Card</span>
                        </div>
                        <div className="about_header_delete_btn text_125">
                          <RiDeleteBinLine />
                        </div>
                      </div>
                      <div className="slider_form bg_white d-flex flex-column p-3">
                        <div className="slider_form_file_selection d-flex flex-column">
                          <p className='text_75'>Select First Image <span className='text-danger'>*</span></p>
                          {
                            cardState?.media[0]?.path ?
                              <InputGroup>
                                <Input placeholder="" className='inputFocus' value={cardState?.media[0]?.path} />
                                <InputGroupText className='p-0'>
                                  <Button className='px-3 py-1 bg_white text-dark' onClick={() => handleDeleteFunction(cardState?.media[0], cardState?.id)}>
                                    <IoCloseOutline />
                                  </Button >
                                </InputGroupText>
                              </InputGroup>
                              :
                              <Input
                                type="file"
                                className='text_85 inputFocus border border-secondary-subtle  mb-2 text_85'
                                onChange={(e) => { handel_slider_upload(e, cardState?.id) }}
                                name='slider_upload_1'
                              />
                          }
                        </div>
                        <div className="slider_form_file_selection d-flex flex-column">
                          <p className='text_75'>Select Second Image <span className='text-danger'>*</span></p>
                          {cardState?.media[1]?.path ?
                            <InputGroup>
                              <Input placeholder="" className='inputFocus' value={cardState?.media[1]?.path} />
                              <InputGroupText className='p-0'>
                                <Button className='px-3 py-1 bg_white text-dark' onClick={() => handleDeleteFunction(cardState?.media[1], cardState?.id)} >
                                  <IoCloseOutline />
                                </Button>
                              </InputGroupText>
                            </InputGroup>
                            :
                            <Input
                              type="file"
                              className='text_85 inputFocus border border-secondary-subtle  mb-2 text_85'
                              onChange={(e) => { handel_slider_upload(e, cardState?.id) }}
                              name='slider_upload_2'
                            />
                          }


                        </div>
                        <div className="slider_form_file_selection d-flex flex-column">
                          <p className='text_75'>Select third Image <span className='text-danger'>*</span></p>
                          {cardState?.media[2]?.path ?
                            <InputGroup>
                              <Input placeholder="" className='inputFocus' value={cardState?.media[2]?.path} />
                              <InputGroupText className='p-0'>
                                <Button className='px-3 py-1 bg_white text-dark' onClick={() => handleDeleteFunction(cardState?.media[2], cardState?.id)}>
                                  <IoCloseOutline />
                                </Button>
                              </InputGroupText>
                            </InputGroup>
                            :
                            <Input
                              type="file"
                              className='text_85 inputFocus border border-secondary-subtle  mb-2 text_85'
                              onChange={(e) => { handel_slider_upload(e, cardState?.id) }}
                              name='slider_upload_3'
                            />
                          }
                        </div>
                      </div>
                    </>
                  )}
                  {cardState?.type === "quote" && (
                    <>
                      <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                        <div className="about_header_name">
                          <span className='text_100'>{cardState?.type} Card</span>
                        </div>
                        <div className="about_header_delete_btn text_125">
                          <RiDeleteBinLine />
                        </div>
                      </div>
                      <div className="quote_form bg_white p-3">
                        <div className="quote_card">
                          <p className='text_75'>Enter the Quote <span className='text-danger'>*</span></p>
                          <Input
                            type='textarea'
                            rows="5"
                            className='text_85 inputFocus border border-secondary-subtle mb-2'
                            value={cardState?.description}
                          />
                        </div>
                      </div>
                    </>
                  )}

                </div>


                <div className="add_new_topic d-flex flex-column align-items-center mt-3">
                  <span className='text_85'>Add New Topic</span>
                  <Row className='d-flex mt-3 align-items-stretch justify-content-center'>
                    <Col lg={2} md={4} sm={12} className='S3_add_topic_col d-flex flex-column justify-content-center align-items-center p-3 bg_white m-1 cursor_pointer' onClick={() => handleAddTopicCard("Quote Card", "quote")}>
                      <div className="step3_topic_cards d-flex flex-column justify-content-center align-items-center bg_white">
                        <img src={quote_card} alt="" width={40} height={40} className='d-flex justify-content-center align-items-center' />
                        <span className='text_75 text-center mt-2 '>Qoute card</span>
                        <p className='text_75 d-flex text-center mt-2'>Plain textual information upto 512 words</p>
                      </div>
                    </Col>
                    <Col lg={2} md={4} sm={12} className='S3_add_topic_col d-flex flex-column justify-content-center align-items-center p-3 bg_white m-1 cursor_pointer' onClick={() => handleAddTopicCard("TextBox", "textbox")}>
                      <img src={textbox_card} alt="" width={40} height={40} className='d-flex justify-content-center align-items-center' />
                      <span className='text_75 text-center mt-2'>Textbox Card</span>
                      <p className='text_75 d-flex text-center mt-2'>Expandable card with text Reference & Tag</p>
                    </Col>
                    <Col lg={2} md={4} sm={12} className='S3_add_topic_col d-flex flex-column justify-content-center align-items-center p-3 bg_white m-1 cursor_pointer' onClick={() => handleAddTopicCard("Slider Card", "slider")}>
                      <img src={slider_card} alt="" width={40} height={40} className='d-flex justify-content-center align-items-center' />
                      <span className='text_75 text-center mt-2'>Slider Card</span>
                      <p className='text_75 d-flex text-center mt-2'>Expandable containers Slider images</p>
                    </Col>
                    <Col lg={2} md={4} sm={12} className='S3_add_topic_col d-flex flex-column justify-content-center align-items-center p-3 bg_white m-1 cursor_pointer' onClick={() => handleAddTopicCard("Media Card", "mediabox")}>
                      <img src={mediabox_card} alt="" width={40} height={40} className='d-flex justify-content-center align-items-center' />
                      <span className='text_75 text-center mt-2'>Mediabox</span>
                      <p className='text_75 d-flex text-center mt-2'>Expandable card with text. Reference tag & multimedia</p>
                    </Col>
                  </Row>
                </div>

              </div>
            </Col>
            <Col lg={3} className="d-flex flex-fill  border border-dark ps-lg-3">
              <div className="CCStep3_card d-flex flex-fill flex-column border border-dark light_violet p-3">
                <span className='text_85'>Card Preview</span>
                <p className='text_85 mt-2 violet_text_color'>This is how the campaign preview will appear for HCPs</p>
                <PerfectScrollbar className='step3_side_scroll_y'>
                  <div className="step3_side_card_wrap">
                    <div className="step3_card_image rounded-bottom">
                      <img src={step3_card_image} alt="" className='img-fluid rounded-bottom' />
                    </div>
                    <div className="step3_card_logo_div d-flex mt-3 ">
                      <span className='violet_text_color fw-bold'>Refresh Tears Eye Drop</span>
                      <div className="logo_img_div_S3 d-flex justify-content-center align-items-center rounded border border-secondary-subtle">
                        <img src={step3_card_logo} alt="" className='img-fluid' />
                      </div>
                    </div>
                    <div className="step3_card_title my-2">
                      <span className='fw-bold text_85'>Eye Drops</span>
                    </div>
                    <div className="about_side_card my-3 rounded border border-black">
                      <div className="about_side_header d-flex p-2 justify-content-between border-bottom border-dark">
                        <span className='text_125 violet_text_color fw-bold'>ABOUT</span>
                        <span className='text_75 badge step3_card_badge'>Allergen</span>
                      </div>
                      <div className="about_side_body d-flex violet_text_color text_85 p-2">
                        Refresh Tears Eye Drop is an eye lubricant or artificial tears used to relieve dry eyes. This can happen because not enough tears are made to keep the eye lubricated. It helps to soothe the irritation and burning seen in dry eyes by maintaince.
                      </div>
                      <div className="about_side_footer dark_violet_bg d-flex justify-content-center align-items-center">
                        <span className='text_85 text-white pt-1 pb-1'>1mg</span>
                      </div>
                    </div>
                    <div className="benefits_side_card rounded border border-black">
                      <div className="about_side_header d-flex p-2 justify-content-between border-bottom border-dark">
                        <span className='text_125 violet_text_color fw-bold'>BENEFITS</span>
                        <span className='text_75 badge step3_card_badge'>Allergen</span>
                      </div>
                      <div className="benfits_side_image p-1 rounded">
                        <img src={benefits_img} alt="" className='img-fluid rounded border border-secondary-subtle' />
                      </div>
                      <div className="benefits_side_body d-flex violet_text_color text_85 p-2">
                        Normally your eyes produce enough natural tears to help them move easily and comfortably and to remove dust and other particles. If they do not produce enough tears, they can become dry, red, and painful. Dry eyes can be caused by wind, sun, heating, computer
                      </div>
                      <div className="benefits_side_footer dark_violet_bg d-flex justify-content-center align-items-center">
                        <span className='text_85 text-white pt-1 pb-1'>1mg</span>
                      </div>
                    </div>

                    <div className="side_card_image_slide_h">
                      <PerfectScrollbar>
                        <div className="step3_card_slides_div d-flex my-3">
                          <img src={img_slide_1} alt="" className='img-fluid border border-black rounded me-2' />
                          <img src={img_slide_1} alt="" className='img-fluid border border-black rounded me-2' />
                          <img src={img_slide_1} alt="" className='img-fluid border border-black rounded me-2' />
                        </div>
                      </PerfectScrollbar>
                    </div>

                    <div className="side_card_notes border border-danger p-2 rounded ">
                      <p className='text-danger'>"
                        If you miss a dose of Refresh Tears Eye Drop, skip it and continue with your normal schedule. Do not double the dose"
                      </p>
                    </div>
                  </div>

                </PerfectScrollbar>
              </div>
            </Col>
          </Row>
        </div>
        <div className="cc_step2_content_footer border-top border-secondary pt-3 pb-3 d-flex justify-content-between">
          <Button className="ms-5" onClick={handleCCStep3Back}>
            <BiArrowBack /> Previous
          </Button>
          <Button className="me-5" onClick={handleStep3}>
            Save and Continue <IoArrowForward />
          </Button>
        </div>
      </div>
    </div >
  )
}

export default CCContentBodyStep3
