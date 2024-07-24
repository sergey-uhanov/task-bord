import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { Event } from './event.model'

@Injectable()
export class EventsService {
	constructor(
		@InjectModel(Event)
		private eventRepository: typeof Event
	) {}

	async createEvent(dto: CreateEventDto) {
		const event = await this.eventRepository.create(dto)
		return event
	}

	async getAllEvents() {
		const events = await this.eventRepository.findAll({
			include: { all: true },
		})
		return events
	}
	async getEventId(id) {
		const event = await this.eventRepository.findByPk(id, {
			include: { all: true },
		})
		return event
	}
	async getPageEvents(page, search: string = '') {
		const limit = 9
		const offset = (page - 1) * limit

		const events = await this.eventRepository.findAll({
			where: search ? { title: { [Op.iLike]: `%${search}%` } } : {},
			limit,
			offset,
		})

		const totalEventsCount = await this.eventRepository.count()

		const pageQty = Math.ceil(totalEventsCount / limit)

		return {
			pageQty: pageQty,
			page: page,
			currentPageEvents: events,
		}
	}

	async getEventById(id: number) {
		const event = await this.eventRepository.findByPk(id, {
			include: { all: true },
		})
		return event
	}

	async updateEvent(id: number, dto: UpdateEventDto) {
		await this.eventRepository.update(dto, { where: { id } })
		const updatedEvent = await this.getEventById(id)
		return updatedEvent
	}

	async deleteEvent(id: number) {
		const deletedEvent = await this.getEventById(id)
		await this.eventRepository.destroy({ where: { id } })
		return deletedEvent
	}
}
