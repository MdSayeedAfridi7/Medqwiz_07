import React from 'react'
import side_logo from "../assets/sidebar_medqwiz.png"
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Button } from 'reactstrap'
import { useEffect } from 'react'
import sideMenuListAPI from '../API/SideMenuAPI'
import { useDispatch, useSelector } from 'react-redux'
import { Home, User, FilePlus, BookOpen, Book, Archive, DollarSign, Compass, Database } from 'react-feather'
import LogoutAPI from '../API/LogoutAPI'
import { Link, useNavigate } from 'react-router-dom'
import { resetState } from '../store/LoginSlice'
import { resetSideMenuAPI } from '../store/userPageSlice'
import { resetLogout } from '../store/LogoutSlice'
import { useState } from 'react'
import ActiveCampaignData from './ActiveCompaignData'



const iconComponents = {
    Home,
    User,
    FilePlus,
    BookOpen,
    Book,
    Archive,
    DollarSign,
    Compass,
    Database,
};


const Sidebar = () => {
    //dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate()

    //useSelector
    const sideMenuList = useSelector((state) => state?.reducer?.userPageSlice)
    const logoutUser = useSelector((state) => state?.reducer?.LogoutSlice)
    // console.log(logoutUser);

    // console.log(sideMenuList)
    // useEffect
    useEffect(() => {

        if (logoutUser?.status === 200) {
            localStorage.clear()
            navigate("/")
            dispatch(resetState())
            dispatch(resetSideMenuAPI())
            dispatch(resetLogout())

        }
    }, [logoutUser])

    useEffect(() => {
        dispatch(sideMenuListAPI())
    }, [])


    // useState

    //handleLogout
    const handleLogout = () => {
        dispatch(LogoutAPI())

    }

    return (

        <>
            {/* <div> */}
                <PerfectScrollbar>
                    {/* <div className="dashboard_main vh-100 vw-100"> */}
                        <div className="sidebar_main h-100">
                            <div className="sidebar_inner rounded-4">
                                <div className="side_top_div d-flex justify-content-around align-items-center pt-4 pb-5" >
                                    <div className="side_logo ps-4">
                                        <img src={side_logo} className='h-50 w-75' />
                                    </div>
                                    <div className="side_close d-flex pe-2">
                                        <span className="side_close material-symbols-outlined">
                                            close
                                        </span>
                                    </div>
                                </div>
                                <div className="side_welcome_div d-flex flex-column ps-4 mt-3">
                                    <span>Welcome</span>
                                    <span>MR.Pharma</span>
                                    <span className='admin'>Admin</span>
                                </div>
                                <div className="side_listed_item d-flex flex-column">
                                    <PerfectScrollbar>
                                        {sideMenuList?.map((e, index) => {
                                            const Icon = iconComponents[e.icon]
                                            return (
                                                <ul key={index} >
                                                    {e.header && (
                                                        <li className='navigation-header'>
                                                            <span>{e.header}</span>
                                                        </li>
                                                    )}{e.title && e.icon && (
                                                        <li className='nav-item'>
                                                            <Link to={e.navLink} className='text-decoration-none text-white'>
                                                                <div>
                                                                    <span className='dashboard_icon'>
                                                                        <Icon />
                                                                    </span>
                                                                    <span>{e.title}</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    )}

                                                </ul>
                                            )
                                        })}

                                    </PerfectScrollbar>


                                </div>
                                <div className="logout_button d-flex flex-fill justify-content-center align-items-end">
                                    <Button className='d-flex w-75 justify-content-center mb-2' onClick={handleLogout}>
                                        logout
                                    </Button >
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                </PerfectScrollbar>
            {/* </div> */}
        </>
    )
}

export default Sidebar;
