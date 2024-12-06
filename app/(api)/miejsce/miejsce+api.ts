import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    console.log("Executing SQL query...");
    const response = await sql`SELECT * FROM miejsca`;
    console.log("Query Result:", response);

    const formattedResponse = response.map((row) => ({
      miejsce_id: row.miejsce_id,
      address: row.address,
      latitude: row.latitude,
      longitude: row.longitude,
      user_id: row.user_id,
      dodano: row.dodano,
      nazwa: row.nazwa,
      kategoria: row.kategoria,
      opis: row.opis,
      ocena: row.ocena,
      image_url: row.image_url,
      kontakt: {
        telefon: row.telefon,
        email: row.email,
        strona_www: row.strona_www,
      },
    }));

    return Response.json({ data: formattedResponse });
  } catch (error) {
    console.error("Error fetching places:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
