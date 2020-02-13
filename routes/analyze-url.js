import analyzeCss from '@projectwallace/css-analyzer'
import cors from 'micro-cors'
import pkg from '../package.json'
import getCss from '../src/get-css'

export default cors()(async (req, res) => {
	try {
		const { url } = req.query
		const css = await getCss(url)
		const stats = await analyzeCss(css)
		res.setHeader(
			'x-css-analyzer-version',
			pkg.dependencies['@projectwallace/css-analyzer']
		)
		res.json(stats)
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
