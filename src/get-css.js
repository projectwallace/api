import got from 'got'
import normalizeUrl from 'normalize-url'

export default async url => {
	const normalizedUrl = normalizeUrl(url, {
		stripProtocol: true,
		stripWWW: true
	})
	const { body } = await got(`https://extract-css.vercel.app/${normalizedUrl}`, {
		headers: {
			Accept: 'application/json'
		}
	})

	return Promise.resolve(JSON.parse(body))
}
