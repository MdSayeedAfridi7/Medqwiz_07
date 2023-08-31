import React from 'react'
import { useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Input } from 'reactstrap'




const S3FormBodyWrap = () => {
    // useSelector.
    // useDispatch
    // useState
    const [tabState, setTabState] = useState({
        tab: "about"
    })
    
    // useEffect
    // useNavigate



    // handle function

    const handle_about = () => {
        setTabState((prevState) => ({
            ...prevState,
            tab: "about"
        }))

    }
    const handle_benefits = () => {
        setTabState((prevState) => ({
            ...prevState,
            tab: "benefits"
        }))
    }
    const handle_slider = () => {
        setTabState((prevState) => ({
            ...prevState,
            tab: "slider"
        }))
    }
    const handle_quote = () => {
        setTabState((prevState) => ({
            ...prevState,
            tab: "quote"
        }))
    }
    return (

        <div className="step3_form_wrap bg_white rounded d-flex flex-column mt-2">

            {tabState.tab === "about" && (
                <>
                    <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                        <div className="about_header_name">
                            <span className='text_100'>Textbox Card</span>
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
            {tabState.tab === "benefits" && (
                <>
                    <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                        <div className="about_header_name">
                            <span className='text_100'>Textbox Card</span>
                        </div>
                        <div className="about_header_delete_btn text_125">
                            <RiDeleteBinLine />
                        </div>
                    </div>
                    <div className="benefits_form bg_white">
                        <span>benefits</span>
                    </div>
                </>
            )}
            {tabState.tab === "slider" && (
                <>

                    <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                        <div className="about_header_name">
                            <span className='text_100'>Textbox Card</span>
                        </div>
                        <div className="about_header_delete_btn text_125">
                            <RiDeleteBinLine />
                        </div>
                    </div>
                    <div className="slider_form bg_white">
                        <span>Slider card</span>
                    </div>
                </>
            )}
            {tabState.tab === "quote" && (
                <>
                    <div className="build_campaign_header d-flex justify-content-between p-3 bg_white rounded-top pb-2">
                        <div className="about_header_name">
                            <span className='text_100'>Textbox Card</span>
                        </div>
                        <div className="about_header_delete_btn text_125">
                            <RiDeleteBinLine />
                        </div>
                    </div>
                    <div className="quote_form bg_white">
                        <span>Quote card</span>
                    </div>
                </>
            )}
        </div>

    )
}

export default S3FormBodyWrap
