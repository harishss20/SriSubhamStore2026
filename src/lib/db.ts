import mongoose from "mongoose";

// Use a global to avoid recompilation issues in Next.js dev mode
const cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = {
  conn: null,
  promise: null,
};

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }
    if (uri.includes("<") || uri.includes("password")) {
      console.warn("MONGODB_URI appears to contain placeholder values. Double check your .env.local.");
    }
    try {
      cached.promise = mongoose.connect(uri, {});
    } catch (connErr) {
      console.error("Error connecting to MongoDB:", connErr);
      throw connErr;
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
