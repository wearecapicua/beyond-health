/** @type {import('next').NextConfig} */
module.exports = {
	// images: {
	// 	domains: [
	// 		'images.prismic.io',
	// 		'files.stripe.com',
	// 		'lh3.googleusercontent.com',
	// 		'platform-lookaside.fbsbx.com'
	// 	]
	// },
	images: {
		remotePatterns: [
		{
		   protocol: "https",
		   hostname: "**",
		 },
		],
	 },
	webpack5: true,
	webpack: (config) => {
		config.resolve.fallback = { fs: false }

		return config
	}
}
