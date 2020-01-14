import got from 'got'
import normalizeUrl from 'normalize-url'

export default async url => {
	const normalizedUrl = normalizeUrl(url, {
		stripProtocol: true,
		stripWWW: true
	})
	const { body: css } = await got(`https://extract-css.now.sh/${normalizedUrl}`)

	return Promise.resolve(css)
}
