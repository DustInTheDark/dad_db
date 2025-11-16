import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - handles authentication and role assignment
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("worker"), // 'admin' | 'worker'
  workerId: integer("worker_id"), // nullable foreign key to workers table
});

// Workers table - stores worker profile information
export const workers = pgTable("workers", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }).notNull(),
  active: boolean("active").notNull().default(true),
  userId: integer("user_id"), // nullable foreign key to users table
});

// Projects table - stores construction projects with GPS coordinates
export const projects = pgTable("projects", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  siteRadiusM: integer("site_radius_m").notNull().default(1000), // radius in meters
});

// Attendance table - tracks clock in/out with GPS validation
export const attendance = pgTable("attendance", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  workerId: integer("worker_id").notNull(),
  projectId: integer("project_id").notNull(),
  clockIn: timestamp("clock_in").notNull().defaultNow(),
  clockOut: timestamp("clock_out"),
  clockInLat: doublePrecision("clock_in_lat").notNull(),
  clockInLon: doublePrecision("clock_in_lon").notNull(),
  clockOutLat: doublePrecision("clock_out_lat"),
  clockOutLon: doublePrecision("clock_out_lon"),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  worker: one(workers, {
    fields: [users.workerId],
    references: [workers.id],
  }),
}));

export const workersRelations = relations(workers, ({ one, many }) => ({
  user: one(users, {
    fields: [workers.userId],
    references: [users.id],
  }),
  attendances: many(attendance),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  attendances: many(attendance),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  worker: one(workers, {
    fields: [attendance.workerId],
    references: [workers.id],
  }),
  project: one(projects, {
    fields: [attendance.projectId],
    references: [projects.id],
  }),
}));

// Insert schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  workerId: true,
}).extend({
  role: z.enum(["admin", "worker"]).default("worker"),
});

export const insertWorkerSchema = createInsertSchema(workers).omit({
  id: true,
  userId: true,
}).extend({
  hourlyRate: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid hourly rate format"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
}).extend({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  siteRadiusM: z.number().min(1).max(10000),
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
  clockIn: true,
  clockOut: true,
});

// Update schemas
export const updateWorkerSchema = insertWorkerSchema.partial();
export const updateProjectSchema = insertProjectSchema.partial();

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWorker = z.infer<typeof insertWorkerSchema>;
export type Worker = typeof workers.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
export type Attendance = typeof attendance.$inferSelect;

// Extended types for API responses with relations
export type WorkerWithUser = Worker & { user?: User | null };
export type AttendanceWithRelations = Attendance & {
  worker?: Worker | null;
  project?: Project | null;
};
