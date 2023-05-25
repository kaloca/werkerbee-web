/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tuk-cdn.s3.amazonaws.com',
				port: '',
				pathname: '/assets/**',
			},
		],
	},
}

module.exports = nextConfig
