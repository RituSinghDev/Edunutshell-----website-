import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Forward the form data to the backend API
    const response = await fetch("https://edunutshell-lms.onrender.com/api/forms/partner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(
      { message: "Form submitted successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing MoU form:", error);
    return NextResponse.json(
      { message: "Error submitting form" },
      { status: 500 }
    );
  }
}
