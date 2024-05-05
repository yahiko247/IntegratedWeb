import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth'



const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
            // doSendEmailVerification()
        }
    }

    return (
        <div>
            {userLoggedIn && <Navigate to="/home" replace={true} />}
            <main className="d-flex justify-content-center align-items-center vh-100">
                <div className="w-50 text-gray-600 space-y-5 p-4 shadow-lg border rounded-lg">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold">Welcome Back</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-5">
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
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="form-control"
                                id="inputPassword"
                            />
                        </div>

                        {errorMessage && <span className="text-danger font-weight-bold">{errorMessage}</span>}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`btn btn-primary btn-block ${isSigningIn ? 'disabled' : ''}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="text-center text-sm">
                        Don't have an account? <a href="/register" className="text-decoration-none font-weight-bold">Sign up</a>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Login




