import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

import type { ResvgRenderOptions } from '@resvg/resvg-js';
import type { JSX } from 'astro/jsx-runtime';
import type { SatoriOptions } from 'satori';

const DEFAULT_FONT_DOWNLOAD_URL =
	'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff';

interface ImageResponseOptions {
	debug?: boolean;
	fonts?: SatoriOptions['fonts'];
	height?: number;
	width?: number;
}

export async function ImageResponse(
	element: JSX.Element,
	options: ImageResponseOptions = {},
) {
	const {
		fonts = [
			{
				name: 'Inter',
				data: await fetch(DEFAULT_FONT_DOWNLOAD_URL).then((res) =>
					res.arrayBuffer(),
				),
				style: 'normal',
			},
		],
		height = 630,
		width = 1200,
		...rest
	} = options;

	const svg = await satori(element, {
		fonts,
		height,
		width,
		...rest,
	});

	const resvgOptions = {
		fitTo: {
			mode: 'width',
			value: width,
		},
	} satisfies ResvgRenderOptions;
	const image = new Resvg(svg, resvgOptions).render().asPng();

	return new Response(image, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': import.meta.env.DEV
				? 'no-cache, no-store'
				: 'public, immutable, no-transform, max-age=31536000',
		},
	});
}
