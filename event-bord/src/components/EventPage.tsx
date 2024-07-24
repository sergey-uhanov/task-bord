import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import VisitorCard from '../UI/VisitorCard.tsx'
import BASE_URL from '../api/apiURL.ts'
import { IVisitor, Ievents } from '../interfaces/interface.ts'

interface EventPageProps {}

const EventPage: FunctionComponent<EventPageProps> = () => {
	const { id } = useParams()
	const [event, setEvent] = useState<Ievents>()
	const [visitors, setVisitors] = useState<IVisitor[]>()

	useEffect(() => {
		const fetchEventData = async () => {
			try {
				const response = await axios.get<Ievents>(`${BASE_URL}events/${id}`)
				setEvent(response.data)
			} catch (error) {
				console.error('Error fetching event data:', error)
			}
			try {
				const response = await axios.get<IVisitor[]>(
					`${BASE_URL}visitors/${id}`
				)
				setVisitors(response.data)
			} catch (error) {
				console.error('Error fetching event data:', error)
			}
		}
		fetchEventData()
	}, [id])

	return (
		event && (
			<section>
				<Box>
					<Link to={'/'}>Home page</Link>
					<Typography variant='h3'>{event.title}</Typography>
					<Typography variant='body2'>{event.description}</Typography>
				</Box>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
					{visitors &&
						visitors.map(visitor => (
							<VisitorCard key={visitor.id} visitor={visitor} />
						))}
				</Box>
			</section>
		)
	)
}

export default EventPage
