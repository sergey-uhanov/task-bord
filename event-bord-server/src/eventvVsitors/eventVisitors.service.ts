import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateVisitorDto } from './dto/visitor-create.dto'
import { Visitor } from './eventVisitors.model'

@Injectable()
export class VisitorsService {
	constructor(
		@InjectModel(Visitor)
		private VisitorRepository: typeof Visitor
	) {}

	async createVisitor(dto: CreateVisitorDto) {
		const visitor = await this.VisitorRepository.create(dto)
		return visitor
	}

	async getVisitors() {
		const visitors = await this.VisitorRepository.findAll()
		return visitors
	}
	async getVivitortsEventId(id) {
		const visitors = await this.VisitorRepository.findAll({
			where: {
				idEvent: id,
			},
		})
		return visitors
	}
}
