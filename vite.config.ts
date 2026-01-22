import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
	plugins: [cloudflare(), react()],
	server: {
		proxy: {
			'/api': {
				target: 'https://skin-lesion-api-267598825904.europe-west1.run.app',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})
