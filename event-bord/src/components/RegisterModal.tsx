import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Modal,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

import axios from 'axios'
import React, { FunctionComponent, useState } from 'react'
import BASE_URL from '../api/apiURL.ts'
import { Ievents } from '../interfaces/interface.ts'

interface RegistrModalProps {
	open: boolean
	handleClose: () => void
	event: Ievents
}
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

const RegistrModal: FunctionComponent<RegistrModalProps> = ({
	open,
	handleClose,
	event,
}) => {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		whereHearEvent: '',
		idEvent: event.id,
	})
	const [errorMessage, setErrorMassage] = useState('')
	const handleChange = e => {
		if (e?.target) {
			const { name, value } = e.target
			setFormData(prevFormData => ({
				...prevFormData,
				[name]: value,
			}))
		} else {
			setFormData(prevFormData => ({
				...prevFormData,
				dateBirth: `${e.$y}-${e.$m}-${e.$D}`,
			}))
		}
	}
	const handleSubmit = () => {
		axios
			.post(`${BASE_URL}visitors`, formData)
			.then(response => {
				console.log('Response data:', response.data)
			})
			.then(() => handleClose())
			.catch(error => {
				if (error.response) {
					setErrorMassage(error.response.data.message)
				}
			})
	}
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					Event registration
				</Typography>
				<Box display='flex' flexDirection='column' gap={2}>
					<TextField
						label='FullName'
						variant='outlined'
						name='fullName'
						onChange={handleChange}
					/>
					<TextField
						label='email'
						variant='outlined'
						name='email'
						onChange={handleChange}
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={['DatePicker']}>
							<DatePicker
								label='Date of birth'
								name='DateBirth'
								onChange={handleChange}
							/>
						</DemoContainer>
					</LocalizationProvider>

					<FormControl>
						<FormLabel id='demo-row-radio-buttons-group-label'>
							Wher did you hear about this event?
						</FormLabel>
						<RadioGroup
							row
							aria-labelledby='demo-row-radio-buttons-group-label'
							name='whereHearEvent'
							onChange={handleChange}
						>
							<FormControlLabel
								value='Friends'
								control={<Radio />}
								label='Friends'
							/>
							<FormControlLabel
								value='Social media'
								control={<Radio />}
								label='Social media'
							/>
							<FormControlLabel
								value='Found myself'
								control={<Radio />}
								label='Found myself'
							/>
						</RadioGroup>
					</FormControl>
					<Button onClick={handleSubmit} variant='contained'>
						Registration
					</Button>
					<Button onClick={handleClose} variant='contained'>
						Cencel
					</Button>
					<div className='text-red-100'>{errorMessage}</div>
				</Box>
			</Box>
		</Modal>
	)
}

export default RegistrModal
