import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query("SELECT NOW() AS now");
    return Response.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}