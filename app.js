require('dotenv').config();
const express = require('express');
const config = require('./config.js');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Importa a configuração
const isDev = process.env.NODE_ENV !== 'production';
app.use(
  cors({
    // Em desenvolvimento, permitimos/ecoamos qualquer origem (útil para Vite)
    // para evitar problemas com esquemas/ports diferentes (http/https/5173).
    // Em produção, usamos a lista restrita via callback (FRONTEND_ORIGIN).
    origin: isDev
        ? true
        : function (origin, callback) {
            const allowed = [process.env.FRONTEND_ORIGIN].filter(Boolean);
            // Se não houver FRONTEND_ORIGIN configurado no ambiente, permitimos temporariamente
            // quaisquer origens (útil para depuração no Render). Em produção, defina FRONTEND_ORIGIN.
            if (allowed.length === 0) {
              console.warn('CORS: no FRONTEND_ORIGIN configured — allowing any origin (debug mode)');
              return callback(null, true);
            }
            if (!origin) return callback(null, true);
            if (allowed.indexOf(origin) !== -1) return callback(null, true);
            console.warn('CORS origin denied:', origin);
            return callback(new Error('CORS origin denied: ' + origin));
          },
    credentials: true,
  })
);
// Parser de JSON/urlencoded: necessário para popular `request.body` em POSTs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Fim parsers
const medicoRotas = require('./app/routes/medico.routes.js');
const clienteRotas = require('./app/routes/cliente.routes.js');
app.use(medicoRotas);
app.use(clienteRotas);

// Health check e rota raiz simples para evitar 404 no host
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/', (req, res) => res.status(200).send('API medicos backend'));
//RODANDO SERVER
app.listen(config.port, () => {
  console.log('servidor on-line');
});
