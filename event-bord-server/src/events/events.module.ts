import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Visitor } from 'src/eventvVsitors/eventVisitors.model'
import { Event } from './event.model'
import { EventsController } from './events.controller'
import { EventsService } from './events.service'

@Module({
	imports: [SequelizeModule.forFeature([Event, Visitor])],
	controllers: [EventsController],
	providers: [EventsService],
	exports: [EventsService],
})
export class EventsModule {}
