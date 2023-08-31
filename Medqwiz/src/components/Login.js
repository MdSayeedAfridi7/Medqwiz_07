import React, { useEffect } from 'react'
import classes from "./Login.module.css"
import MedquizLogo from "../assets/Medquiz_login.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FormGroup } from "reactstrap"
import { Label } from "reactstrap"
import { Input } from "reactstrap"
import { Button } from "reactstrap"
import { Container } from "reactstrap"
import { Col } from "reactstrap"
import LoginAPI from '../API/api'
import digestMessage from '../Global_functions/HashFunction'



const Login = () => {

    const [loader, setloader] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state?.reducer?.loginSlice)
    const navigate = useNavigate()

    console.log(loginData)
    const handleLogin = async () => {
        const hashedPassword = await digestMessage(password);
        setloader(true)
        const deviceInfo = {
            "platform": "web",
            "os": "osName" + " " + "osVersion",
            "browser": "browserName",
            "device": "fullBrowserVersion",
            "ipAddr": "ipaddress",
            "latitude": "lati",
            "longitude": "longi"
        }
        dispatch(LoginAPI(email, hashedPassword, deviceInfo, { setloader }));
    }
    useEffect(() => {
        if (loginData?.status === 200) {
            navigate("/dashboard")
        }
    }, [loginData])
    
    return (
        <div className={classes.login_body}>
            <div className={classes.login_main}>
                <header className={classes.header}>
                    <div className={classes.logo}>
                        <img src={MedquizLogo} alt="Login" />
                    </div>
                    <div className={classes.headerDescription}>
                        <h3>Welcome to Medqwiz Pharma!</h3>
                        <p style={{ color: 'gray' }}>Please sign-in to your account</p>
                    </div>
                </header>
                <main>
                    <Col sm={8} className='d-flex'>
                        <Container>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        Email
                                    </Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="admin@MedQwiz.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e?.target?.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <FormGroup>
                                <Label for="examplePassword">
                                    Password
                                </Label>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="..........."
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e?.target?.value)}
                                />
                            </FormGroup>
                            <Button
                                onClick={handleLogin}
                                style={{ background: "#77529f" }}
                            >
                                {loader ? "Loading..." : "Sign in"}
                            </Button>
                            <p className='d-flex justify-content-center mt-3' style={{ color: 'grey' }}>
                                New?<span style={{ color: '#77529f' }}>
                                    Create an account
                                </span>
                            </p>
                        </Container>
                    </Col>

                </main>
                <footer>
                    <p><span>Current version: 1.0.1</span></p>
                    <p><span>Build date: July 19th 2023, 3:44 pm</span></p>
                </footer>
            </div>
        </div>
    )
}

export default Login

