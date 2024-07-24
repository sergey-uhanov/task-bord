import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common'

import { CreateVisitorDto } from './dto/visitor-create.dto'
import { VisitorsService } from './eventVisitors.service'
import { UniqueConstraintFilter } from 'src/unique-constraint.filter'

@Controller('visitors')
@UseFilters(UniqueConstraintFilter)
export class VisitorsController {
	constructor(private visitorService: VisitorsService) {}

	@Get()
	getVisitorsAllEvents() {
		return this.visitorService.getVisitors()
	}
	@Get(':id')
	getVisitorsEventId(@Param('id') id: number) {
		return this.visitorService.getVivitortsEventId(id)
	}

	@Post()
	createEvent(@Body() visitorsDto: CreateVisitorDto) {
		return this.visitorService.createVisitor(visitorsDto)
	}
}
