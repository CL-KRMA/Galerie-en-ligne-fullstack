import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashPassword, generateToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, confirmPassword } = body;

    // Validation
    if (!username || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Username, password et confirmation requis" },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: "Username doit faire au moins 3 caractères" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password doit faire au moins 6 caractères" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Les passwords ne correspondent pas" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("myDatabase");
    const usersCollection = db.collection("users");

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet username est déjà pris" },
        { status: 409 }
      );
    }

    // Hacher le password
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur
    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Générer un JWT token
    const token = generateToken(result.insertedId.toString(), username);

    const response = NextResponse.json(
      { message: "Utilisateur créé avec succès", token, userId: result.insertedId },
      { status: 201 }
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
    console.error("Erreur register:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
