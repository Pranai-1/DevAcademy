// import { NextApiRequest, NextApiResponse } from 'next';

// import { Prisma, PrismaClient } from '@prisma/client';
// import initDb from './db';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const prisma = new PrismaClient();

//   if (req.method === 'GET') {
//     const db = await initDb();

//     try {
//       console.log('Before executing the SQL query');
//       const query = 'SELECT * FROM public."Courses"';
//       const data = await db.any(query);
//       console.log('After executing the SQL query');

//       if (data && data.length > 0) {
//         // Log the data
//         console.log('Data:', data);

//         // Create Prisma Course records from the data
//         for (const courseData of data) {
//             await prisma.courses.create({
//               data: {
//                 title: courseData.title,
//                 description: courseData.description,
//                 price: courseData.price,
//                 image: courseData.image,
//                 published: courseData.published,
//                 name: courseData.name,
//                 adminId: courseData.adminId,
//               },
//             });
//           }
          

//         res.status(200).json({ message: 'Success' });
//       } else {
//         res.status(404).json({ message: 'No data found' });
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ message: 'Internal server error', error: error });
//     } finally {
//       await db.$pool.end(); // Close the database connection
//       await prisma.$disconnect(); // Disconnect Prisma client
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// };
