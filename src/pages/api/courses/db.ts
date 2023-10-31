// // db.js (Your database initialization module)

// const pgp = require('pg-promise')();

// // Define your database URL here
// const databaseURL = 'postgres://reddypranai2017:wr40cqHbetxu@ep-withered-union-82912806.us-east-2.aws.neon.tech/DevAcademy';

// const db = pgp({
//   connectionString: databaseURL,
//   ssl: { rejectUnauthorized: false }, // Necessary for connecting to some cloud-based PostgreSQL databases
// });

// export default async function initDb() {
//   try {
//     await db.connect(); // Establish a connection to the database
//     return db;
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw error;
//   }
// }

