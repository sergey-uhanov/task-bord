import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import * as path from 'path'
import { Event } from './events/event.model'
import { EventsModule } from './events/events.module'
import { VisitorsModule } from './eventvVsitors/eventVisitors.module'
import { Visitor } from './eventvVsitors/eventVisitors.model'

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: path.resolve(__dirname, '..', '.env'),
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.USER,
			password: process.env.PASSWORD,
			database: process.env.DB,
			models: [Event, Visitor],
			autoLoadModels: true,
		}),
		EventsModule,
		VisitorsModule,
	],
})
export class AppModule {}
