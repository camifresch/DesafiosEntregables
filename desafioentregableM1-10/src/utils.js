import * as url from 'url';

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export { __filename, __dirname, randomNumber};