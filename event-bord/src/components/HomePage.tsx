import { Pagination, Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EventCard from '../UI/EventCard.tsx'
import BASE_URL from '../api/apiURL.ts'
import { Ievents } from '../interfaces/interface.ts'

interface HomePageProps {}

// const BASE_URL = 'http://localhost:6060/'
const HomePage: React.FunctionComponent<HomePageProps> = () => {
	const [events, setEvents] = useState<Ievents[]>([])
	const [query, setQuery] = useState('react')
	const [page, setPage] = useState(1)
	const [pageQty, setPageQty] = useState(1)

	useEffect(() => {
		axios.get(BASE_URL + `events?page=${page}`).then(({ data }) => {
			setEvents(data.currentPageEvents)
			setPageQty(data.pageQty)

			if (data.nbPages < page) {
				setPage(1)
			}
		})
	}, [query, page])

	return (
		<div>
			<h1>Event list</h1>
			<Stack
				direction='row'
				flexWrap='wrap'
				justifyContent='center'
				useFlexGap
				spacing={{ xs: 1, sm: 1 }}
			>
				{events &&
					events.map(event => <EventCard key={event.id} event={event} />)}
			</Stack>
			<Pagination
				count={pageQty}
				page={page}
				color='primary'
				onChange={(_, num) => setPage(num)}
			/>
		</div>
	)
}

export default HomePage
