import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import img1 from "../../../image/salimbalan.png";

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <div className='row w-100'>
            <div className='col-md-8' style={{background:'rgba(26, 43, 88, 1)'}}>
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}
            <main className="d-flex justify-content-center align-items-center vh-100">
                <div className="w-50 text-gray-600 space-y-5 p-4 shadow-lg rounded" style={{background:'white'}}>
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold">Create a New Account</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label text-gray-600 font-weight-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="form-control"
                                id="inputEmail"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label text-gray-600 font-weight-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="form-control"
                                id="inputPassword"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label text-gray-600 font-weight-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) => {
                                    setconfirmPassword(e.target.value);
                                }}
                                className="form-control"
                                id="confirmPassword"
                            />
                        </div>

                        {errorMessage && <span className="text-danger font-weight-bold">{errorMessage}</span>}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`btn btn-primary btn-block ${isRegistering ? 'disabled' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-center">
                            Already have an account?{' '}
                            <a href="/login" className="text-center hover:underline font-weight-bold" style={{textDecoration:'none'}}>Continue</a>
                        </div>
                    </form>
                </div>
            </main>
            </div>
            <div className='col-md-3 d-flex justify-content-center align-items-center'>
                <div style={{justifyContent:'center', alignContent:'center'}}>
                    <div className='d-flex justify-content-end'> <img src={img1} alt="" style={{height:'auto', width:'100px', }}/></div>
                    <h3 >Welcome to </h3>
                    <p>Brangay Information Management System.
                    BIMS can track residents record such as personal to family information,
                    complaints to amicable settlement information (Barangay Justice System) and can create daily reports for the Barangay.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register