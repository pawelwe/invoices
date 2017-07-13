INVOICES
==============

React/Redux/Node/MongoDB Application for generating invoices and saving them to a local DB.

Front-end
--------------

- Create config/index.js in client folder and give it a api url, for example: (export const API_URL = 'http://localhost:3090';)
- Run 'yarn install' in main dir
- Run 'npm run dev' for developing
- Run 'npm run build' for production

Server
--------------

- Make sure you have Mongo DB installed and running
- Create config.js file in server folder and give it a secret key for generating tokens, for example: (module.exports = { secret: '123' };)
- Run 'npm i' in src/server
- Run 'npm run dev' for developing
- Run 'npm run start' to start the server