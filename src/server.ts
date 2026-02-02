import { startServer } from "./app";
import { connectToDatabase, prisma } from "./config/db"
import bcrypt from "bcrypt"
(async()=>{
    await connectToDatabase();
    await startServer();
    // prisma/seed.ts



const SALT_ROUNDS = 10;

// -----------------------------
// Helper functions
// -----------------------------
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function randomFutureDate() {
  const date = new Date();
  date.setDate(date.getDate() + randomInt(1, 30));
  return date;
}

async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

// -----------------------------
// Main seed function
// -----------------------------
async function main() {
  console.log("Cleaning database...");

  // Clear all existing data
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.tutorProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  console.log("Seeding database...");

  // -----------------------------
  // 1️⃣ Seed Categories
  // -----------------------------
  const categories = [
    await prisma.category.create({
      data: { name: "Mathematics", subjects: ["Algebra", "Calculus", "Geometry"] },
    }),
    await prisma.category.create({
      data: { name: "Science", subjects: ["Physics", "Chemistry", "Biology"] },
    }),
    await prisma.category.create({
      data: { name: "Programming", subjects: ["JavaScript", "Python", "C++"] },
    }),
    await prisma.category.create({
      data: { name: "Languages", subjects: ["English", "Bangla", "French"] },
    }),
  ];

  // -----------------------------
  // 2️⃣ Seed Admin
  // -----------------------------
  const adminPassword = await hashPassword("admin1234");
  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: true,
    },
  });

  // -----------------------------
  // 3️⃣ Seed Tutors
  // -----------------------------
  const tutors: { userId: string; profileId: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const category = randomFromArray(categories);
    const password = await hashPassword(`tutor${i}pass`);

    const tutorUser = await prisma.user.create({
      data: {
        name: `Tutor ${i}`,
        email: `tutor${i}@example.com`,
        password,
        role: "TUTOR",
        emailVerified: true,
      },
    });

    const tutorProfile = await prisma.tutorProfile.create({
      data: {
        userId: tutorUser.id,
        bio: `Expert in ${category.name}`,
        hourlyRate: randomInt(20, 50),
        categoryId: category.id,
        category: category.name,
        subjects: category.subjects.slice(0, randomInt(1, category.subjects.length)),
      },
    });

    tutors.push({ userId: tutorUser.id, profileId: tutorProfile.id });
  }

  // -----------------------------
  // 4️⃣ Seed Students
  // -----------------------------
  const students: { id: string; name: string }[] = [];
  for (let i = 1; i <= 30; i++) {
    const password = await hashPassword(`student${i}pass`);
    const student = await prisma.user.create({
      data: {
        name: `Student ${i}`,
        email: `student${i}@example.com`,
        password,
        role: "STUDENT",
        emailVerified: true,
      },
    });
    students.push({ id: student.id, name: student.name });
  }

  // -----------------------------
  // 5️⃣ Seed Tutor Availability
  // -----------------------------
  const availabilities: { id: string; tutorId: string; date: Date }[] = [];
  for (const tutor of tutors) {
    for (let j = 0; j < 5; j++) {
      const date = randomFutureDate();
      const availability = await prisma.availability.create({
        data: {
          tutorId: tutor.profileId,
          date,
          startTime: `${9 + j}:00`,
          endTime: `${10 + j}:00`,
        },
      });
      availabilities.push({ id: availability.id, tutorId: tutor.profileId, date });
    }
  }

  // -----------------------------
  // 6️⃣ Seed Bookings
  // -----------------------------
  const bookings: { id: string; studentId: string; tutorId: string; availabilityId: string }[] = [];
  for (let i = 0; i < 50; i++) {
    const student = randomFromArray(students);
    const availability = randomFromArray(availabilities);
    const tutor = tutors.find((t) => t.profileId === availability.tutorId)!;

    const booking = await prisma.booking.create({
      data: {
        studentId: student.id,
        tutorId: tutor.profileId,
        dateTime: availability.date,
        availabilityId: availability.id,
        status: "CONFIRMED",
      },
    });
    bookings.push({ id: booking.id, studentId: student.id, tutorId: tutor.profileId, availabilityId: availability.id });
  }

  // -----------------------------
  // 7️⃣ Seed Reviews
  // -----------------------------
  for (const booking of bookings) {
    if (Math.random() > 0.3) {
      await prisma.review.create({
        data: {
          bookingId: booking.id,
          studentId: booking.studentId,
          tutorId: booking.tutorId,
          rating: randomInt(3, 5),
          comment: "Great session, very helpful!",
        },
      });
    }
  }

  console.log("✅ Seeding finished!");
}

// -----------------------------
// Run main
// -----------------------------
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

})()


