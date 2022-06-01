import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
// import css from 'rollup-plugin-css-only';
import scss from 'rollup-plugin-scss';
import { generateSW } from 'rollup-plugin-workbox';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	// input: 'src/main.ts',
	input: 'src/bundle.' + (production ? 'prod' : 'dev') + '.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),

		// we'll extract any component CSS out into
		// a separate file - better for performance
		// css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: true,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload({
			watch: 'public',
			// for gitpod
			clientUrl: process.env.CLIENT_URL
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// sass
		scss({
			outputStyle: production ? 'compressed' : 'expanded',
			sourceMap: true,
		}),

		// Workbox
		production && generateSW({
			navigateFallback: '/index.html',
			swDest: 'public/sw.js',
			globDirectory: 'public/',
			clientsClaim: true,
			runtimeCaching: [
				{
					urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
					handler: 'CacheFirst',
					options: { cacheName: 'images', expiration: { maxAgeSeconds: 30 * 24 * 60 * 60, maxEntries: 500 } }
				},
				{
					urlPattern: /^https:\/\/fonts\.gstatic\.com/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'google-fonts',
						cacheableResponse: { statuses: [0, 200] },
						expiration: { maxAgeSeconds: 60 * 60 * 24 * 365, maxEntries: 30 }
					}
				},
			]
		}),

	],
	watch: {
		clearScreen: false
	}
};
