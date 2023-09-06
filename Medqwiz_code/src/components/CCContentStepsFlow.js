import React from 'react'
import { ChevronRight } from "react-feather";
import { BsFileEarmarkText } from "react-icons/bs";
import { LiaCreditCard } from "react-icons/lia";
import { IoBasketballOutline } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { FiAtSign } from "react-icons/fi";
import { FiArchive } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { CCStepsTrueFalseAPI } from '../API/IndexAPIs';


const campaign_flow_title = [
    {
        id: 1,
        icon: "BsFileEarmarkText",
        titleBold: "Campaign Details",
        chevron: ChevronRight,
        titleLight: "Enter Campaign Details",
    },
    {
        id: 2,
        icon: "LiaCreditCard",
        titleBold: "Card Details",
        chevron: ChevronRight,
        titleLight: "Enter Your Campaign Details",
    },
    {
        id: 3,
        icon: "IoBasketballOutline",
        titleBold: "Game Details",
        chevron: ChevronRight,
        titleLight: "Enter Game Details.",
    },
    {
        id: 4,
        icon: "LuFilter",
        titleBold: "Doctor's Filter",
        chevron: ChevronRight,
        titleLight: "Target Doctor's.",
    },
    {
        id: 5,
        icon: "FiAtSign",
        titleBold: "Doctor's Reach",
        chevron: ChevronRight,
        titleLight: "Target Doctor's count.",
    },
    {
        id: 6,
        icon: "FiArchive",
        titleBold: "Campaign Estimation",
        chevron: ChevronRight,
        titleLight: "Target your campaign",
    },
];


const icon = {
    BsFileEarmarkText,
    LiaCreditCard,
    IoBasketballOutline,
    LuFilter,
    FiAtSign,
    FiArchive,
};

const CCContentStepsFlow = () => {

    // useSelector.
    const CCStepsTFData_Flow = useSelector((state) => state?.reducer?.CCStepT_F_Slice)
    console.log(CCStepsTFData_Flow)


    // useDispatch
    // const dispatch = useDispatch()
    // useState

    // useEffect
    // useNavigate

    // dispatch(CCStepsTrueFalseAPI())

    return (
        <>
            {campaign_flow_title?.map((e, index) => {
                const Chevron = e.chevron;
                const Icon = icon[e.icon];

                return (
                    <>
                        <div className="campaign_title_wrap d-flex ms-2 me-2 col">
                            <div className="campaign_flow_title d-flex pt-2 pb-2">
                                <div className="cfFlow_title_icon d-flex justify-content-center align-items-center text-white pe-2 ps-2 rounded me-3">
                                    <span>
                                        <Icon />
                                    </span>
                                </div>
                                <div className="cfFlow_title_desc d-flex flex-column">
                                    <span>{e.titleBold}</span>
                                    <span>{e.titleLight}</span>
                                </div>

                            </div>
                            {index !== campaign_flow_title.length - 1 && (
                                <div className="cf_next_chevron justify-content-center align-items-center ps-3 pe-3">
                                    <Chevron />
                                </div>
                            )}
                        </div>
                    </>
                );
            })}
        </>
    )
}

export default CCContentStepsFlow
