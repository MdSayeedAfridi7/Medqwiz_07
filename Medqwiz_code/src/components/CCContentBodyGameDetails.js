import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IoArrowForward } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row, Spinner } from 'reactstrap'
import { CCStepsTrueFalseAPI, game_create_api, game_details_types_api } from '../API/IndexAPIs'
import { useNavigate } from 'react-router-dom'


const CCContentBodyGameDetails = ({ params }) => {

    //useSelector
    const CCStep2Data = useSelector((state) => state?.reducer?.CCStep2Slice);
    console.log(CCStep2Data)

    const CCStepsTFData = useSelector((state) => state?.reducer?.CCStepT_F_Slice)
    console.log(CCStepsTFData)

    const game_types = useSelector((state) => state?.reducer?.Types_slice)
    console.log(game_types);

    const create_game_data = useSelector((state) => state?.reducer?.Types_slice)

    //useSelector 
    const dispatch = useDispatch()

    //useDispatch
    const navigate = useNavigate()
    //useState
    const [gameType, setGameType] = useState("")
    const [loader, setLoader] = useState(false)

    //useEffect
    useEffect(() => {
        if (CCStepsTFData && CCStepsTFData.Step2 === false) {
            navigate(`/campaignCreateFlow/${'step3'}/${CCStep2Data.id}`);
        }
    }, [CCStepsTFData?.Step2])

    useEffect(() => {
        dispatch(game_details_types_api())
    }, [])



    //handles
    const handle_game_type = (game) => {
        setGameType(game)
        dispatch(game_create_api({
            campId: Number(params?.id),
            typeID: game?.id
        }))
    }
    const GameDetailsBack = () => {
        console.log("back");
        dispatch(CCStepsTrueFalseAPI({ ...CCStepsTFData, Step1: true, Step2: false }, CCStep2Data))
    }

    const save_continue_game_details = () => {
        console.log("save and continue");
    }

    return (
        <div className='d-flex flex-fill  flex-column spinner_relative'>
            <Spinner className={`spinner_absolute ${loader ? "d-flex" : "d-none"}`}>
            </Spinner>
            <div className="game_details_outline p-3 bg_white rounded border border-dark pb-5">
                <span className='text_85 text-secondary fw-bold'>Select the Game</span>
                <Row className="four_games_outline p-3 mb-5">
                    {game_types?.map((game) => {
                        console.log(game?.id);
                        console.log("gametypeidclick", gameType);
                        return (
                            <Col lg={6} md={12} sm={12} className="create_trivia_outline px-2 ">
                                <p className={`border border-secondary-subtle p-5 m-2 d-flex justify-content-center align-items-center rounded cursor_pointer text_85 fw-bold text-secondary ${game?.active === true ? "" : "cursor_not_allowed"}`} onClick={() => { game?.active === true && handle_game_type(game) }}>Create {game?.name} Game</p>
                            </Col>
                        )
                    })}
                </Row>
            </div>


            <div className="game_details_footer border-top border-secondary pt-3 pb-3 d-flex justify-content-between">
                <Button className="ms-5 text_85" onClick={GameDetailsBack}>
                    <BiArrowBack className='text_85'/> Previous
                </Button>
                <Button className="me-5 text_85" onClick={save_continue_game_details}>
                    Save and Continue <IoArrowForward />
                </Button>
            </div>
        </div>
    )
}

export default CCContentBodyGameDetails
