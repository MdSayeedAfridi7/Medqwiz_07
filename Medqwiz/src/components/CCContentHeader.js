import React from 'react'
import { X } from 'react-feather'
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap'

const CCContentHeader = () => {

    const CCStep2Data = useSelector((state) => state?.reducer?.CCStep2Slice);
    
    return (
        <>
            <div className="user_name ">
                <Button className="rounded ps-3 pe-3 fw-bold">
                    {CCStep2Data?.internalName}
                </Button>
            </div>
            <div className="close_campaign_btn ">
                <Button className="fw-bold">
                    <X className="" /> close campaign
                </Button>
            </div>
        </>
    )
}

export default CCContentHeader
