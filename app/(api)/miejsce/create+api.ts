import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      address,
      latitude,
      longitude,
      user_id,
      dodano,
      nazwa,
      kategoria,
      opis,
      ocena,
      image_url,
      telefon,
      email,
      strona_www,
    } = body;

    if (!address || !latitude || !longitude || !nazwa || !dodano || !user_id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
      INSERT INTO places (
        address,
        latitude,
        longitude,
        user_id,
        dodano,
        nazwa,
        kategoria,
        opis,
        ocena,
        image_url,
        telefon,
        email,
        strona_www
      ) VALUES (
        ${address},
        ${latitude},
        ${longitude},
        ${user_id},
        ${dodano},
        ${nazwa},
        ${kategoria || null},
        ${opis || null},
        ${ocena || null},
        ${image_url || null},
        ${telefon || null},
        ${email || null},
        ${strona_www || null}
      )
      RETURNING *;
    `;

    return Response.json({ data: response[0] }, { status: 201 });
  } catch (error) {
    console.error("Error inserting place:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
