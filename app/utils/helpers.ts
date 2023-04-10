function validateEmail(email: string): boolean {
	// Email regex pattern
	const pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
	return pattern.test(email)
}

function validatePhoneNumber(phoneNumber: string): boolean {
	// Phone number regex pattern
	const pattern = /^\(\d{3}\) \d{3}-\d{4}$/
	return pattern.test(phoneNumber)
}

function autoFormatPhoneNumber(input: string): string {
	let phoneNumber = input.replace(/\D/g, '') // Remove non-digits
	const maxLength = 10

	// Truncate to the maximum length if necessary
	if (phoneNumber.length > maxLength) {
		phoneNumber = phoneNumber.slice(0, maxLength)
	}

	// Apply formatting
	if (phoneNumber.length > 6) {
		phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d+)/, '($1) $2-$3')
	} else if (phoneNumber.length > 3) {
		phoneNumber = phoneNumber.replace(/(\d{3})(\d+)/, '($1) $2')
	} else {
		phoneNumber = phoneNumber.replace(/(\d+)/, '($1')
	}

	return phoneNumber
}

function formatArrayToString(baseArray: string[], maxLength: number): string {
	const array = baseArray.filter((word) => word !== '')

	// Capitalize the first letter of each word and join them into a single string
	const stringWithCapitalizedWords = array
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(', ')

	// Check if the length of the string is greater than the maximum length, and truncate if necessary
	const finalString =
		stringWithCapitalizedWords.length > maxLength
			? stringWithCapitalizedWords.slice(0, maxLength - 3) + '...'
			: stringWithCapitalizedWords

	return finalString
}

const helpers = {
	validateEmail,
	validatePhoneNumber,
	autoFormatPhoneNumber,
	formatArrayToString,
}

export default helpers
