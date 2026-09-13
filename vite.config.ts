import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

function gameImagesApiPlugin() {
  return {
    name: 'game-images-api',
    configureServer(server: any) {
      server.middlewares.use('/api/upload-game-image', (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const { filename, base64 } = data;
            if (!filename || !base64) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'filename and base64 required' }));
              return;
            }

            const gamesDir = path.resolve(__dirname, 'public/games');
            if (!fs.existsSync(gamesDir)) {
              fs.mkdirSync(gamesDir, { recursive: true });
            }

            const safeFilename = path.basename(filename);
            const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(path.join(gamesDir, safeFilename), buffer);

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, path: `/games/${safeFilename}` }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });

      server.middlewares.use('/api/list-game-images', (req: any, res: any) => {
        const gamesDir = path.resolve(__dirname, 'public/games');
        let files: string[] = [];
        if (fs.existsSync(gamesDir)) {
          files = fs.readdirSync(gamesDir).filter(f => !f.startsWith('.'));
        }
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({ files }));
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), gameImagesApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
