import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { loginUser } from '../../redux/slices/userSlice';
import { IoIosArrowBack } from 'react-icons/io';

import { validateForm } from '../../utils';

import './Signin.scss';

const loginDataInit = {
	email: '',
	password: '',
};

const validationInit = {
	isValidEmail: true,
	isValidPassword: true,
};

const Signin = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [loginData, setLoginData] = useState(loginDataInit);
	const [isValid, setIsValid] = useState(validationInit);
	const { error, success } = useSelector(state => state.user);
	const [isSubmit, setIsSubmit] = useState(false);

	useEffect(() => {
		if (isSubmit && success) {
			if (location.state?.from) {
				navigate(location.state.from, { replace: true });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmit, success, location.state?.from]);

	const handleShowPassword = () => {
		setShowPassword(preState => !preState);
	};

	const isValidForm = () => {
		const { email, password } = loginData;
		return validateForm.validateEmail(email) && password;
	};

	const handleOnSubmitForm = e => {
		e.preventDefault();
		const { email, password } = loginData;
		if (isValidForm()) {
			dispatch(loginUser(loginData));
			setLoginData(loginDataInit);
			setShowPassword(false);
			setIsSubmit(true);
		} else {
			const isValidData = {
				isValidEmail:
					email && validateForm.validateEmail(email) && true,
				isValidPassword: password && true,
			};
			setIsValid(isValidData);
		}

		// console.log(location.pathname);
	};

	const handleOnChangeForm = e => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	const handleReturn = () => {
		navigate(-1);
	};

	return (
		<div className="app__container">
			<div className="app__section app__signin">
				<form className="app__signin__form">
					<div className="app__signin__form__title">
						<IoIosArrowBack onClick={handleReturn} />
						<h2 className="subhead-text">Log In</h2>
					</div>

					<div className="app__signin__form__input">
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							className="p-text-18"
							value={loginData.email}
							onChange={handleOnChangeForm}
						/>
					</div>

					{!isValid.isValidEmail && (
						<div className="app__signin__form__input">
							<div className="app__signin__form__input__invalid-message">
								<p className="p-text-18">
									Email is required and need to be correct
									format
								</p>
							</div>
						</div>
					)}

					<div className="app__signin__form__input">
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							placeholder="Password"
							className="p-text-18"
							value={loginData.password}
							onChange={handleOnChangeForm}
						/>

						<div className="app__signin__form__input__icon">
							{showPassword ? (
								<AiFillEyeInvisible
									onClick={handleShowPassword}
								/>
							) : (
								<AiFillEye onClick={handleShowPassword} />
							)}
						</div>
					</div>

					{!isValid.isValidEmail && (
						<div className="app__signin__form__input">
							<div className="app__signin__form__input__invalid-message">
								<p className="p-text-18">
									Password is required
								</p>
							</div>
						</div>
					)}

					{error && (
						<div className="app__signin__form__input">
							<div className="app__signin__form__input__invalid-message">
								<p className="p-text-18">{`Error: ${error.toString()}`}</p>
							</div>
						</div>
					)}

					<div className="app__signin__form__input">
						<p className="p-text-16">Forget passwoed?</p>

						<Link
							to="/signup"
							className="p-text-16"
							state={{ from: location.state?.from }}
						>
							<p>Register</p>
						</Link>
					</div>

					<div className="app__signin__form__button-box">
						<button
							type="submit"
							className="app__signin__form__button p-text-18"
							onClick={handleOnSubmitForm}
						>
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signin;
