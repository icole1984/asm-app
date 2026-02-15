import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  // 1) Create a user (required for relations)
  const user = await prisma.user.create({
    data: {
      email: "admin@asm.local",
      password: "change-me",
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  });

  // 2) Create sites
  const s1 = await prisma.site.create({
    data: {
      name: "6 Yexley Road",
      location: "Mid Suffolk",
      address: "6 Yexley Road",
      postcode: "IP14",
      startDate: new Date("2026-02-10T08:00:00Z"),
      status: "ACTIVE",
      managerId: user.id,
    },
  });

  const s2 = await prisma.site.create({
    data: {
      name: "Flat 15 St Peter's Court",
      location: "Claydon",
      address: "Station Road, Claydon",
      postcode: "IP6 0HZ",
      startDate: new Date("2026-02-12T08:00:00Z"),
      status: "ACTIVE",
      managerId: user.id,
    },
  });

  const s3 = await prisma.site.create({
    data: {
      name: "Basildon Voids",
      location: "Essex",
      address: "Basildon",
      postcode: "SS15",
      startDate: new Date("2026-02-18T08:00:00Z"),
      status: "PLANNING",
      managerId: user.id,
    },
  });

  // 3) Operations
  await prisma.siteOperation.createMany({
    data: [
      {
        siteId: s1.id,
        operationType: "Enclosure Setup",
        description: "Enclosure build + smoke test",
        startTime: new Date(),
        workersCount: 6,
        status: "IN_PROGRESS",
        recordedBy: user.id,
      },
      {
        siteId: s1.id,
        operationType: "Removal",
        description: "AIB strip-out",
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 6),
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
        duration: 240,
        workersCount: 4,
        status: "COMPLETED",
        recordedBy: user.id,
      },
      {
        siteId: s2.id,
        operationType: "Air Monitoring",
        description: "4-stage clearance monitoring",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
        workersCount: 2,
        status: "PLANNED",
        recordedBy: user.id,
      },
      {
        siteId: s3.id,
        operationType: "Survey Review",
        description: "Review survey and plan works",
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
        workersCount: 1,
        status: "COMPLETED",
        recordedBy: user.id,
      },
    ],
  });

  // 4) Documents
  await prisma.document.createMany({
    data: [
      {
        siteId: s1.id,
        uploadedBy: user.id,
        fileName: "ASB5.pdf",
        fileUrl: "/uploads/ASB5.pdf",
        fileSize: 210000,
        fileType: "application/pdf",
        docType: "FORM",
      },
      {
        siteId: s1.id,
        uploadedBy: user.id,
        fileName: "SitePhotos.zip",
        fileUrl: "/uploads/SitePhotos.zip",
        fileSize: 8200000,
        fileType: "application/zip",
        docType: "PHOTO",
      },
      {
        siteId: s2.id,
        uploadedBy: user.id,
        fileName: "PlanOfWork.pdf",
        fileUrl: "/uploads/PlanOfWork.pdf",
        fileSize: 540000,
        fileType: "application/pdf",
        docType: "SAFETY_PLAN",
      },
    ],
  });

  // 5) Checklists + items
  await prisma.checklist.create({
    data: {
      siteId: s1.id,
      name: "Enclosure Build Checklist",
      status: "IN_PROGRESS",
      items: {
        create: [
          { description: "DCU positioned and connected", completed: true, completedAt: new Date() },
          { description: "Airlock built and sealed", completed: true, completedAt: new Date() },
          { description: "Smoke test completed", completed: false },
          { description: "Transit route set up", completed: false },
        ],
      },
    },
  });

  await prisma.checklist.create({
    data: {
      siteId: s2.id,
      name: "Pre-start Safety Checklist",
      status: "PENDING",
      items: { create: [{ description: "RAMS reviewed with team", completed: false }] },
    },
  });

  console.log("Seed complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
