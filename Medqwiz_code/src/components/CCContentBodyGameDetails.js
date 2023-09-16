import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IoArrowForward } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, Spinner, UncontrolledDropdown } from 'reactstrap'
import { CCStepsTrueFalseAPI, add_game_questions_api, delete_game_api, delete_game_question_api, game_create_api, game_details_types_api, game_questions_api } from '../API/IndexAPIs'
import { useNavigate } from 'react-router-dom'
import CCStep2API from '../API/CCStep2API'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import Select_Add_Q_Card from './Select_Add_Q_Card'
import { add_game_questions, set_game_context_details, set_game_questions } from '../store/GameDetailSlice.js/game_questions_slice'
import { FaRegCircle } from 'react-icons/fa'


const CCContentBodyGameDetails = ({ params }) => {

    //useSelector
    const CCStep2Data = useSelector((state) => state?.reducer?.CCStep2Slice);
    console.log(CCStep2Data)

    const CCStepsTFData = useSelector((state) => state?.reducer?.CCStepT_F_Slice)
    console.log(CCStepsTFData)

    const game_types = useSelector((state) => state?.reducer?.Types_slice)
    console.log(game_types);

    const create_game_data = useSelector((state) => state?.reducer?.Create_game_post_slice)
    console.log("gameCreatelog", create_game_data);

    const game_questions_data = useSelector((state) => state?.reducer?.game_questions_slice)
    console.log("game_questions_data", game_questions_data);

    console.log("step2api_name", CCStep2Data?.game?.name);




    //useSelector 
    const dispatch = useDispatch()

    //useDispatch
    const navigate = useNavigate()
    //useState

    const [loader, setLoader] = useState(false)

    const [questionCard, setQuestionCard] = useState([])


    // console.log(questionCard);

    // useEffect
    useEffect(() => {
        if (CCStepsTFData && CCStepsTFData.Step2 === false) {
            navigate(`/campaignCreateFlow/${'step3'}/${CCStep2Data.id}`);
        }
    }, [CCStepsTFData?.Step2])

    useEffect(() => {
        dispatch(game_details_types_api())
    }, [])

    useEffect(() => {
        if (create_game_data?.status === 200 || CCStep2Data?.game?.name !== "") {
            dispatch(game_questions_api(params?.id))
        }
    }, [create_game_data])

    useEffect(() => {
        dispatch(set_game_context_details(questionCard))
    }, [questionCard])



    //handles
    const handle_game_type = (game, id) => {
        dispatch(game_create_api({
            campId: parseInt(id),
            typeID: game?.id
        }))
    }

    const GameDetailsBack = () => {
        dispatch(CCStepsTrueFalseAPI({ ...CCStepsTFData, Step1: true, Step2: false, Step3: false, Step4: false, Step5: false, Step6: false }, params))
    }

    const save_continue_game_details = () => {
        console.log("save and continue");
    }

    const handle_add_question = () => {
        setLoader(true)
        dispatch(add_game_questions_api({
            campId: parseInt(params?.id),
            game: game_questions_data?.game,
            id: game_questions_data?.id,
            question: [{}],
            typeID: game_questions_data?.typeID
        }, 4, { setQuestionCard }, {setLoader}))
    }


    // 
    const handle_delete_question = (e, questionId) => {
        setLoader(true)
        dispatch(delete_game_question_api({
            campId: game_questions_data?.campId,
            game: game_questions_data?.game,
            id: game_questions_data?.id,
            question: [e],
            typeId: game_questions_data?.typeID
        }, questionId, { setLoader }))
    }

    const handle_delete_game = () => {
        setLoader(true)
        dispatch(delete_game_api(game_questions_data, {setLoader}))
    }

    console.log("all_questions", game_questions_data?.question);
    console.log("quersetionCardID", questionCard?.id);
    console.log("questionCard", questionCard);

    return (
        <div className='d-flex flex-fill  flex-column spinner_relative'>
            <Spinner className={`spinner_absolute ${loader ? "d-flex" : "d-none"}`}>
            </Spinner>
            <div className="game_details_outline p-3 bg_white rounded border border-dark pb-5">
                {(CCStep2Data?.game?.name !== "" || create_game_data || create_game_data !== null) ? (
                    <>
                        {(create_game_data?.data?.game || CCStep2Data?.game?.name) === "Trivia" && (
                            <>
                                <div className="trivia_game_outline d-flex flex-fill">
                                    <Row className='flex-fill d-flex bg-white'>
                                        <Col sm={4} md={4} lg={3} className='mt-2 d-flex flex-fill'>
                                            <div className="add_question_div mx-2 light_violet d-flex flex-fill text_85 fw-bold rounded p-3 flex-column">
                                                <span className='text_mid_violet cursor_pointer mb-2' onClick={handle_add_question}><AiOutlinePlus /> Add Questions</span>
                                                <div className="question_cards_div d-flex flex-column">
                                                    {game_questions_data && (game_questions_data?.question?.map((e, index) => {
                                                        return (
                                                            <>
                                                                <div className={`d-flex justify-content-between align-items-center bg-white my-1 py-2 px-1 rounded cursor_pointer ${e?.id === questionCard?.id ? "activate_div" : ""}`} onClick={() => setQuestionCard(e)}>
                                                                    <span className='text_mid_violet'>Question {[index + 1]}</span>
                                                                    <span className='violet_text_color text_100 cursor_pointer' > <RiDeleteBin5Line onClick={() => { handle_delete_question(e, e?.id) }} /></span>
                                                                </div>
                                                            </>
                                                        )
                                                    }))}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={8} md={8} lg={6} className='mt-2 d-flex flex-fill'>
                                            <div className="trivia_game_main light_violet mx-2 d-flex flex-fill rounded p-3 pb-5 flex-column">
                                                <div className="trivia_main_header d-flex justify-content-between align-items-center text_85 fw-bold">
                                                    <span className='text_mid_violet'>Trivia Game</span>
                                                    <span className='violet_text_color text_125 cursor_pointer'> <RiDeleteBin5Line onClick={() => handle_delete_game()} /></span>
                                                </div>
                                                {(game_questions_data?.question?.length === 0 || questionCard?.length === 0) ?
                                                    <Select_Add_Q_Card />
                                                    : (<>
                                                        <div className="div">
                                                            {game_questions_data?.question?.map((e) => {
                                                                return (
                                                                    <>
                                                                        {questionCard?.id === e?.id && (
                                                                            <div className="question_card_details bg-white rounded p-3">
                                                                                <div className="question_input_div d-flex flex-column mb-2">
                                                                                    <span className='text_75 mb-1'>Questions</span>
                                                                                    <Input className='text_75 inputFocus'
                                                                                        value={questionCard?.question}
                                                                                        onChange={(e) => { setQuestionCard({ ...questionCard, question: e?.target?.value }) }} />
                                                                                </div>
                                                                                <div className="question_option_div d-flex flex-column">
                                                                                    <span className='text_75'>Enter the options</span>
                                                                                    <div>
                                                                                        {questionCard?.options?.map((o) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <Row>
                                                                                                        <Col lg={5} className='d-flex flex-column justify-content-center'>
                                                                                                            <div className="mx-2 my-1">
                                                                                                                <span className='text_75  fw-bold px-1 rounded light_violet violet_text_color'>Option {o?.option}</span>
                                                                                                                <Input className='text_75 inputFocus'
                                                                                                                    value={questionCard?.options?.text}
                                                                                                                    onChange={(e) => {
                                                                                                                        setQuestionCard({
                                                                                                                            ...questionCard, options: questionCard?.options?.map((a) => {
                                                                                                                                if (a?.id === o?.id) {
                                                                                                                                    return {
                                                                                                                                        ...a,
                                                                                                                                        text: e?.target?.value
                                                                                                                                    }
                                                                                                                                } else {
                                                                                                                                    return (
                                                                                                                                        a
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        })
                                                                                                                    }}
                                                                                                                />
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                        <Col lg={5} className='d-flex flex-column justify-content-center'>
                                                                                                            <div className="mx-2 my-1">
                                                                                                                <span className='text_75'>Description for {o?.option}</span>
                                                                                                                <Input className='text_75 inputFocus'
                                                                                                                    value={questionCard?.options?.description}
                                                                                                                    onChange={(e) => {
                                                                                                                        setQuestionCard({
                                                                                                                            ...questionCard, options: questionCard?.options?.map((a) => {
                                                                                                                                if (a?.id === o?.id) {
                                                                                                                                    return {
                                                                                                                                        ...a,
                                                                                                                                        description: e?.target?.value
                                                                                                                                    }
                                                                                                                                } else {
                                                                                                                                    return (
                                                                                                                                        a
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            })
                                                                                                                        })
                                                                                                                    }}
                                                                                                                />
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                        <Col lg={2} className='d-flex flex-column justify-content-end'>
                                                                                                            <div className="mx-2 d-flex flex-fill my-2">
                                                                                                                <UncontrolledDropdown
                                                                                                                    className="trivia_dropdown_boolean d-flex align-items-end flex-fill"
                                                                                                                    direction='down'
                                                                                                                >
                                                                                                                    <DropdownToggle
                                                                                                                        className='p-0 bg-white text-dark border border-0 d-flex flex-fill'
                                                                                                                    >
                                                                                                                        {o?.isCorrect ?
                                                                                                                            <Button className='fade_green text_85 d-flex flex-fill justify-content-center align-items-center'>
                                                                                                                                <span>True</span>
                                                                                                                            </Button>
                                                                                                                            :
                                                                                                                            <Button className='fade_red text_85 d-flex flex-fill justify-content-center align-items-center border border-danger text-danger'>
                                                                                                                                <span>False</span>
                                                                                                                            </Button>}

                                                                                                                    </DropdownToggle>
                                                                                                                    <DropdownMenu className='mt-2'>
                                                                                                                        <DropdownItem className='d-flex align-items-center'
                                                                                                                            onClick={() => {
                                                                                                                                setQuestionCard({
                                                                                                                                    ...questionCard, options: questionCard?.options?.map((i) => {
                                                                                                                                        if (i?.id === o?.id) {
                                                                                                                                            return { ...i, isCorrect: true }
                                                                                                                                        } else {
                                                                                                                                            return { ...i, isCorrect: false }
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                })
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <FaRegCircle className='me-2' /> <span className='text_85'> True</span>
                                                                                                                        </DropdownItem>
                                                                                                                        <DropdownItem className='d-flex align-items-center'
                                                                                                                        >
                                                                                                                            <FaRegCircle className='me-2' /> <span className='text_85'> False</span>
                                                                                                                        </DropdownItem>
                                                                                                                    </DropdownMenu>
                                                                                                                </UncontrolledDropdown>
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </>
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="question_hint_div d-flex flex-column mx-2 my-2">
                                                                                    <span className='text_75'>Hint</span>
                                                                                    <Input
                                                                                        type='textarea'
                                                                                        className='inputFocus text_75'
                                                                                        rows={2}
                                                                                        value={questionCard?.hint}
                                                                                        onChange={(e) => { setQuestionCard({ ...questionCard, hint: e?.target?.value }) }}
                                                                                    />

                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    </>

                                                    )}
                                            </div>
                                        </Col>
                                        <Col lg={3} className='mt-2 d-flex flex-fill'>
                                            <div className="trivia_side_main mx-2 light_violet d-flex flex-fill flex-column ounded p-3">
                                                <div className="trivia_side_header text_85">
                                                    <span className='text_mid_violet'>Question Preview</span>
                                                    <p className='violet_text_color'>A peek of the question list that was posted</p>
                                                </div>
                                                <div className="trivia_side_body p-3">
                                                    {game_questions_data?.question?.map((q, index) => {
                                                        return (
                                                            <Row className='border border-black d-flex flex-column rounded mb-3'>
                                                                <Col className='text_mid_violet text_100 border-dark border-bottom px-3 py-2 fw-bold'>
                                                                    <span className='fw-bold'>Question {[index + 1]}</span>
                                                                </Col>
                                                                <span className='text_85 text_mid_violet fw-bold px-2 py-2'>{q?.question}</span>
                                                                {q?.options?.map((op) => {
                                                                    return (
                                                                        <>
                                                                            <Col>
                                                                                <Row className='my-1'>
                                                                                    <Col lg={2} md={1} className='d-flex justify-content-center'><span className='violet_text_color light_violet p-1 rounded text_75'>{op?.option}</span></Col>
                                                                                    <Col lg={10} md={11} className='d-flex '>
                                                                                        {op?.text !== "" ? <span className={`text_75 p-1 rounded fw-bold ${op?.isCorrect === true ? "fade_green" : "fade_red"}`}>{op?.text}</span> : <span></span>}
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </>
                                                                    )
                                                                })}
                                                                <Col className='d-flex flex-fill'>
                                                                    <div className="d-flex align-items-center flex-fill justify-content-center mt-2">
                                                                        <p className='violet_text_color fw-bold p-1 activate_div text_75 rounded d-flex flex-fill m-1 mx-2'>Hint: {q?.hint}</p>
                                                                    </div>
                                                                </Col>

                                                            </Row>
                                                        )
                                                    })}

                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        )}
                        {(create_game_data?.data?.game || CCStep2Data?.game?.name) === "Recall" && (
                            <>
                                <span>Recall game</span>
                            </>
                        )}
                        {(create_game_data?.data?.game || CCStep2Data?.game?.name) === "Hangman" && (
                            <>
                                <span>Hangman game</span>
                            </>
                        )}
                    </>
                ) :
                    (<div className="all_games_selection_div">
                        <span className='text_85 text-secondary fw-bold'>Select the Game</span>
                        <Row className="four_games_outline p-3 mb-5">
                            {game_types?.map((game) => {
                                return (
                                    <Col lg={6} md={12} sm={12} className="create_trivia_outline px-2 ">
                                        <p className={`border border-secondary-subtle p-5 m-2 d-flex justify-content-center align-items-center rounded cursor_pointer text_85 fw-bold text-secondary ${game?.active === true ? "" : "cursor_not_allowed"}`} onClick={() => { game?.active === true && handle_game_type(game, params?.id) }}>Create {game?.name} Game</p>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>)
                }


            </div >


            <div className="game_details_footer border-top border-secondary pt-3 pb-3 d-flex justify-content-between">
                <Button className="ms-5 text_85" onClick={GameDetailsBack}>
                    <BiArrowBack className='text_85' /> Previous
                </Button>
                <Button className="me-5 text_85" onClick={save_continue_game_details}>
                    Save and Continue <IoArrowForward />
                </Button>
            </div>
        </div >
    )
}

export default CCContentBodyGameDetails
