import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { EventsService } from './events.service'

@Controller('events')
export class EventsController {
	constructor(private eventsService: EventsService) {}

	@Get()
	getPageEvents(
		@Query('page') page?: number,
		@Query('search') search?: string
	) {
		return this.eventsService.getPageEvents(page, search)
	}
	@Get(':id')
	getEvenrtId(@Param('id') id: number) {
		return this.eventsService.getEventById(id)
	}

	@Post()
	createEvent(@Body() eventDto: CreateEventDto) {
		return this.eventsService.createEvent(eventDto)
	}

	@Put(':id')
	updateEvent(@Param('id') id: number, @Body() eventDto: UpdateEventDto) {
		return this.eventsService.updateEvent(id, eventDto)
	}

	@Delete(':id')
	deleteEvent(@Param('id') id: number) {
		return this.eventsService.deleteEvent(id)
	}
}
