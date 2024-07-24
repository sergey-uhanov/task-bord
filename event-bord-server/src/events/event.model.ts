import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Visitor } from '../eventvVsitors/eventVisitors.model'

@Table({ tableName: 'event' })
export class Event extends Model<Event> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
	})
	id: number

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	title: string

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	description: string

	@HasMany(() => Visitor)
	visitors: Visitor[]
}
