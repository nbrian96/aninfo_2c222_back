import app from './app.js';
import { PORT } from './config.js';

/**
 * Para levantar el proyecto
 *
npm run dev

 * Para levantar mysql local
mysql -u root -p
*/

app.listen(PORT);
console.log("Server running on port", PORT);
