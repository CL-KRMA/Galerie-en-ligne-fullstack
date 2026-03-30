import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyPassword, generateToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username et password requis" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("myDatabase");
    const usersCollection = db.collection("users");

    // Chercher l'utilisateur dans la base de données
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur ou password invalide" },
        { status: 401 }
      );
    }

    // Vérifier le password
    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Utilisateur ou password invalide" },
        { status: 401 }
      );
    }

    // Générer un JWT token
    const token = generateToken(user._id.toString(), user.username);

    const response = NextResponse.json(
      { message: "Connecté avec succès", token, userId: user._id },
      { status: 200 }
    );

    // Stocker le token dans un cookie HTTP-only
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return response;
  } catch (error) {
    console.error("Erreur login:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
