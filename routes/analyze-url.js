import analyzeCss from '@projectwallace/css-analyzer'
import cors from 'micro-cors'
import pkg from '../package.json'
import getCss from '../src/get-css'

export default cors()(async (req, res) => {
	try {
		const { url, includeOrigins } = req.query
		const result = await getCss(url)
		const css = result.map(({css}) => css).join('\n')
		const stats = await analyzeCss(css)
		res.setHeader(
			'x-css-analyzer-version',
			pkg.dependencies['@projectwallace/css-analyzer']
		)

		if (includeOrigins && includeOrigins === 'include') {
			return res.json({
				stats,
				origins: result
			})
		}

		return res.json(stats)
	} catch (error) {
		if (error.name === 'SyntaxError') {
			return res.status(400).json({
				name: error.name,
				message: error.message
			})
		}

		return res.status(500).json({
			message: 'Unexpected error'
		})
	}
})
