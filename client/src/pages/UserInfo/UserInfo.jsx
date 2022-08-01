import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar-edit';
import { useSelector, useDispatch } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { patchUserProfile } from '../../redux/slices/userSlice';
import { Loader } from '../../components';
import { AiOutlineCamera } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { Tooltip, IconButton } from '@mui/material';

import { Dialog, DialogActions, DialogContent } from '@mui/material';

import './UserInfo.scss';

export const CustomiseDialog = ({
	children,
	open,
	onClose,
	onResetClick,
	onSaveClick,
	onCloseClick,
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogContent>{children}</DialogContent>

			<DialogActions>
				<div onClick={onResetClick} className="dialog-action-button">
					<p className="p-text-18">Reset</p>
				</div>
				<div onClick={onSaveClick} className="dialog-action-button">
					<p className="p-text-18">Save</p>
				</div>
				<div onClick={onCloseClick} className="dialog-action-button">
					<p className="p-text-18">Close</p>
				</div>
			</DialogActions>
		</Dialog>
	);
};

const UserInfo = () => {
	const dispatch = useDispatch();
	const { userProfile, loading, error } = useSelector(state => state.user);
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [image, setImage] = useState({
		preview: '',
		src: null,
		data: null,
	});
	const [editAvatarOpen, setEditAvatarOpen] = useState(false);
	const [editNameOpen, setEditNameOpen] = useState(false);
	const [editEmailOpen, setEditEmailOpen] = useState(false);

	useEffect(() => {
		if (!userProfile) return;

		setUserName(userProfile.name);
		setUserEmail(userProfile.email);
		setImage(preState => ({
			...preState,
			preview: userProfile.avatar?.base64 || '',
		}));
	}, [userProfile]);

	useEffect(() => {
		if (!error) return;

		alert(error);
	}, [error]);

	const handleOnAvatarEditReset = () => {
		setImage({
			preview: userProfile.avatar?.base64 || '',
			src: null,
			data: null,
		});
	};

	const handleOnAvatarEditSave = () => {
		if (!image.data || !image.preview) {
			alert('Please select an image');
			return;
		}

		if (image.preview === userProfile.avatar.base64) {
			setEditAvatarOpen(false);
			return;
		}

		const data = {
			field: 'avatar',
			avatar: {
				name: image.data.name,
				type: image.data.type,
				base64: image.preview,
			},
		};
		dispatch(patchUserProfile(data));
		handleOnAvatarEditReset();
		setEditAvatarOpen(false);
	};

	const handleOnAvatarEditClose = () => {
		setEditAvatarOpen(false);
		handleOnAvatarEditReset();
	};

	const handleOnFileLoad = file => {
		const data = {
			name: file.name,
			type: file.type,
		};
		setImage(preState => ({
			...preState,
			data,
		}));
	};

	const handleOnAvatarClose = () => {
		setImage({
			preview: userProfile.avatar.base64,
			src: null,
			data: null,
		});
	};

	const handleOnAvatarCrop = preview => {
		setImage(preState => ({
			...preState,
			preview,
		}));
	};

	const handleOnBeforeFileLoad = elem => {
		const file = elem.target.files[0];
		if (file.size > 500000) {
			alert('File is too big! Not more than 500kb');
			elem.target.value = '';
		}
	};

	const handleOnNameEditReset = () => {
		setUserName(userProfile.name);
	};

	const handleOnNameEditClose = () => {
		setEditNameOpen(false);
		handleOnNameEditReset();
	};

	const handleOnNameEditSave = () => {
		if (!userName) {
			alert('Please enter your name');
			return;
		}
		if (userName === userProfile.name) {
			setEditNameOpen(false);
			return;
		}

		const data = {
			field: 'name',
			name: userName,
		};
		dispatch(patchUserProfile(data));
		handleOnNameEditReset();
		setEditNameOpen(false);
	};

	const handleOnEmailEditReset = () => {
		setUserEmail(userProfile.email);
	};

	const handleOnEmailEditClose = () => {
		setEditEmailOpen(false);
		handleOnEmailEditReset();
	};

	const handleOnEmailEditSave = () => {
		if (!userEmail) {
			alert('Please enter your email');
			return;
		}
		if (userEmail === userProfile.email) {
			setEditEmailOpen(false);
			return;
		}

		const data = {
			field: 'email',
			email: userEmail,
		};
		dispatch(patchUserProfile(data));
		handleOnEmailEditReset();
		setEditEmailOpen(false);
	};

	return (
		<div className="app__container">
			<div className="app__section app__user-info">
				{loading ? (
					<Loader />
				) : userProfile ? (
					<div className="app__user-info__container">
						<div className="app__user-info__detail-container">
							<div className="avatar-container">
								{userProfile.avatar ? (
									<img
										src={userProfile.avatar.base64}
										alt="avatar"
										className="avatar-image"
									/>
								) : (
									<BiUserCircle id="avatar-image-placeholder__icon" />
								)}
								<Tooltip title="Edit Avatar" id="icon-tooltip">
									<IconButton
										onClick={() => setEditAvatarOpen(true)}
									>
										<AiOutlineCamera id="icon-tooltip__camera" />
									</IconButton>
								</Tooltip>
							</div>
						</div>
						<div className="app__user-info__detail-container">
							<div className="title">
								<h2 className="subHead-text">User Name: </h2>
								<IconButton
									onClick={() => setEditNameOpen(true)}
								>
									<FiEdit />
								</IconButton>
							</div>

							<p className="p-text-18">{userProfile.name}</p>
						</div>
						<div className="app__user-info__detail-container">
							<div className="title">
								<h2 className="subHead-text">Email: </h2>
								<IconButton
									onClick={() => setEditEmailOpen(true)}
								>
									<FiEdit />
								</IconButton>
							</div>
							<p className="p-text-18">{userProfile.email}</p>
						</div>
						<div className="app__user-info__detail-container">
							<div className="title">
								<h2 className="subHead-text">
									Love Exercise Number:
								</h2>
							</div>

							<p className="p-text-18">
								{userProfile.loveExercises.length}
							</p>
						</div>

						<CustomiseDialog
							open={editAvatarOpen}
							onClose={() => setEditAvatarOpen(false)}
							onResetClick={handleOnAvatarEditReset}
							onSaveClick={handleOnAvatarEditSave}
							onCloseClick={handleOnAvatarEditClose}
						>
							<div className="app__user-info__image-container">
								<Avatar
									width={300}
									height={250}
									onCrop={handleOnAvatarCrop}
									onClose={handleOnAvatarClose}
									onBeforeFileLoad={handleOnBeforeFileLoad}
									src={image.src}
									onFileLoad={handleOnFileLoad}
								/>
								{image.preview ? (
									<img src={image.preview} alt="Preview" />
								) : (
									<p className="p-text-18">
										No Image Preview
									</p>
								)}
							</div>
						</CustomiseDialog>
						<CustomiseDialog
							open={editNameOpen}
							onClose={() => setEditAvatarOpen(false)}
							onResetClick={handleOnNameEditReset}
							onSaveClick={handleOnNameEditSave}
							onCloseClick={handleOnNameEditClose}
						>
							<div className="app__user-info__input-container">
								<h2 className="subHead-text">Name</h2>
								<input
									type="text"
									value={userName}
									onChange={e => setUserName(e.target.value)}
								/>
							</div>
						</CustomiseDialog>
						<CustomiseDialog
							open={editEmailOpen}
							onClose={() => setEditAvatarOpen(false)}
							onResetClick={handleOnEmailEditReset}
							onSaveClick={handleOnEmailEditSave}
							onCloseClick={handleOnEmailEditClose}
						>
							<div className="app__user-info__input-container">
								<h2 className="subHead-text">Email</h2>
								<input
									type="text"
									value={userEmail}
									onChange={e => setUserEmail(e.target.value)}
								/>
							</div>
						</CustomiseDialog>
					</div>
				) : (
					<div className="app__user-info__container">
						<div className="app__user-info__detail-container">
							<h2 className="subhead-text">Nothing Found</h2>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserInfo;
