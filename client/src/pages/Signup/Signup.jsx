import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';

import { registerUser } from '../../redux/slices/userSlice';
import { validateForm } from '../../utils';

import './Signup.scss';

const registerDataInit = {
	email: '',
	password: '',
	name: '',
};

const validationInit = {
	isValidEmail: true,
	isValidPassword: true,
	isValidName: true,
};

const Signup = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [registerData, setregisterData] = useState(registerDataInit);
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
		const { email, password, name } = registerData;
		return validateForm.validateEmail(email) && password && name;
	};

	const handleOnSubmitForm = e => {
		e.preventDefault();
		const { email, password, name } = registerData;
		if (isValidForm()) {
			dispatch(registerUser(registerData));
			setregisterData(registerDataInit);
			setShowPassword(false);
			setIsSubmit(true);
		} else {
			const isValidData = {
				isValidEmail:
					email && validateForm.validateEmail(email) && true,
				isValidPassword: password && true,
				isValidName: name && true,
			};
			setIsValid(isValidData);
		}
	};

	const handleOnChangeForm = e => {
		setregisterData({
			...registerData,
			[e.target.name]: e.target.value,
		});
	};

	const handleReturn = () => {
		navigate(-1);
	};

	return (
		<div className="app__container">
			<div className="app__section app__signup">
				<form className="app__signup__form">
					<div className="app__signup__form__title">
						<IoIosArrowBack onClick={handleReturn} />
						<h2 className="subhead-text">Register Account</h2>
					</div>
					<div className="app__signup__form__input">
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							className="p-text-18"
							value={registerData.name}
							onChange={handleOnChangeForm}
						/>
					</div>
					{!isValid.isValidName && (
						<div className="app__signup__form__input">
							<div className="app__signup__form__input__invalid-message">
								<p className="p-text-18">Name is required</p>
							</div>
						</div>
					)}

					<div className="app__signup__form__input">
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							className="p-text-18"
							value={registerData.email}
							onChange={handleOnChangeForm}
						/>
					</div>
					{!isValid.isValidEmail && (
						<div className="app__signup__form__input">
							<div className="app__signup__form__input__invalid-message">
								<p className="p-text-18">
									Email is required and need to be correct
									format
								</p>
							</div>
						</div>
					)}
					<div className="app__signup__form__input">
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							placeholder="Password"
							className="p-text-18"
							value={registerData.password}
							onChange={handleOnChangeForm}
						/>

						<div className="app__signup__form__input__icon">
							{showPassword ? (
								<AiFillEyeInvisible
									onClick={handleShowPassword}
								/>
							) : (
								<AiFillEye onClick={handleShowPassword} />
							)}
						</div>
					</div>
					{!isValid.isValidPassword && (
						<div className="app__signup__form__input">
							<div className="app__signup__form__input__invalid-message">
								<p className="p-text-18">
									Password is required
								</p>
							</div>
						</div>
					)}
					{error && (
						<div className="app__signup__form__input">
							<div className="app__signup__form__input__invalid-message">
								<p className="p-text-18">{`Error: ${error.toString()}`}</p>
							</div>
						</div>
					)}
					<div className="app__signup__form__input">
						<p className="p-text-16">Forget passwoed?</p>

						<Link
							to="/signin"
							className="p-text-16"
							state={{ from: location.state?.from }}
						>
							<p>Sign In</p>
						</Link>
					</div>

					<div className="app__signup__form__button-box">
						<button
							type="submit"
							className="app__signup__form__button p-text-18"
							onClick={handleOnSubmitForm}
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
