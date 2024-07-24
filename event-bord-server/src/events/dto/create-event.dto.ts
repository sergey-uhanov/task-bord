import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateEventDto {
	@IsInt()
	@IsString()
	@IsNotEmpty()
	readonly title: string

	@IsString()
	@IsNotEmpty()
	readonly description: string
}
