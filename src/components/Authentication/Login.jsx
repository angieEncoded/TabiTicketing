import React, { useState } from 'react'
import { requiredNameCheck, requiredPasswordCheck, requiredTwoEfAyCheck } from '../../util/regExCheckers';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationActions } from '../../store/AuthenticationSlice';
import { ToastContainer } from 'react-toastify'
import { Flip } from 'react-toastify'
import classes from './login.module.css';
import logo from "../../assets/tabiLogo.png"
import Loading from '../LoadingScreens/Loading';
import { toast } from 'react-toastify';
import { endpointActions } from "../../store/EndpointsSlice"
import localURLS from "../../util/apiPaths.json"


const Login = () => {

  const [isPending, setIsPending] = useState(false);
  const isAuthenticated = useSelector(store => store.auth.isAuthenticated);
  const dispatch = useDispatch();

  // Will probably need to handle all the app setup at this point
  const loginHandler = async (event) => {
    setIsPending(true)
    event.preventDefault();
    const isValid = true;

    if (isValid) {

      dispatch(endpointActions.loadEndpoints(localURLS))
      dispatch(authenticationActions.loginValid());


      setIsPending(false)
    } else {
      dispatch(authenticationActions.loginInvalid());
      toast.error("Unable to login");
      setIsPending(false)
    }
  }




  // USERNAME CHECK
  // ================================================
  const {
    value: username,
    valueIsValid: usernameIsValid,
    hasError: usernameHasError,
    resetInput: resetUsernameInput,
    valueChangeHandler: usernameChangeHandler,
    initialValueHandler: setUsername,
    valueBlurHandler: usernameBlur
  } = useInput(requiredNameCheck); // send in a regex validator

  // PASSWORD CHECK
  // ================================================
  const {
    value: password,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    resetInput: resetPasswordInput,
    valueChangeHandler: passwordChangeHandler,
    initialValueHandler: setPassword,
    valueBlurHandler: passwordBlur
  }
    = useInput(requiredPasswordCheck);


  // 2FA CHECK
  //=================================================
  const {
    value: twoefay,
    valueIsValid: twoefayIsValid,
    hasError: twoefayHasError,
    resetInput: resetTwoEfAyInput,
    valueChangeHandler: twoEfAyChangeHandler,
    initialValueHandler: setTwoEfAy,
    valueBlurHandler: twoEfAyBlur
  }
    = useInput(requiredTwoEfAyCheck);






  return (
    <>
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={20000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!isAuthenticated &&
        <div className="container">
          <div className="text-center">
            <img src={logo} alt="TabiCRM logo" />
          </div>

          <main className={classes.auth}>
            <section>
              <form>
                <div className={classes.control}>
                  <label htmlFor='email'>Email</label>
                  <input type='email' id='email' />
                </div>
                <div className={classes.control}>
                  <label htmlFor='password'>Password</label>
                  <input type='password' id='password' />
                </div>
                <button onClick={loginHandler} className='btn btn-tabi-logo'>Log in!</button>
              </form>
            </section>
          </main>
        </div>
      }
      {isPending && <Loading />}
    </>

  )
}

export default Login