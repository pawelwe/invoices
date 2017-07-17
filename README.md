INVOICES
==============

React/Redux/Node/MongoDB Application for generating invoices and saving them to a local DB.

Front-end
--------------

- Run 'yarn install' in main dir
- Check config/index.js in client folder for the API url, for example: (export const API_URL = 'http://localhost:3090';)
- Run 'npm run dev' for developing
- Run 'npm run build' for production

Server
--------------

- Make sure you have Mongo DB installed and running
- Update config.js file in server folder and give it a secret key for generating tokens, for example: (module.exports = { secret: '123' };)
- Run 'npm i' in src/server
- Run 'npm run dev' for developing
- Run 'npm run start' to start the server
