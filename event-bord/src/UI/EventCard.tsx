import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'
import RegistrModal from '../components/RegisterModal.tsx'
import { Ievents } from '../interfaces/interface.ts'

interface EventCardProps {
	event: Ievents
}
const EventCard: React.FC<EventCardProps> = ({ event }) => {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const card = (
		<>
			<React.Fragment>
				<CardContent>
					<Typography
						sx={{ fontSize: 14 }}
						color='text.secondary'
						gutterBottom
					></Typography>
					<Typography variant='h5' component='div'></Typography>
					<Typography sx={{ mb: 1.5 }} color='text.secondary'>
						{event.title}
					</Typography>
					<Typography variant='body2'>
						{event.description.length > 40
							? event.description.slice(0, 40) + '...'
							: event.description}
					</Typography>
				</CardContent>
				<CardActions>
					<Button onClick={handleOpen} size='small'>
						Registr
					</Button>
					<Button size='small'>
						<Link to={`/event/${event.id}`}>View</Link>
					</Button>
				</CardActions>
			</React.Fragment>
			<RegistrModal event={event} open={open} handleClose={handleClose} />
		</>
	)

	return (
		<Box sx={{ width: 275 }}>
			<Card variant='outlined' sx={{ backgroundColor: '#90b0cf' }}>
				{card}
			</Card>
		</Box>
	)
}
export default EventCard
