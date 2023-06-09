export interface Notification {
	_id: string
	recipient: {
		id: string
		type: 'Worker' | 'Company'
	}
	type: 'SYSTEM' | 'USER' | 'TRANSACTION' | 'OTHER'
	message: string
	readStatus: boolean
	action?: string
	actionData?: any
	dateRead?: Date
	createdAt: Date
	updatedAt: Date
}
