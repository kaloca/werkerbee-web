import axios from 'axios'

const fetcher = (url: string, token: string) =>
	axios
		.get(url, { headers: { Authorization: 'Bearer ' + token } })
		.then((res) => res.data)

export default fetcher
