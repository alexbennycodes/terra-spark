import COUNTRY_LIST_OBJECT from "@/data/countryDataObject.json";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const countryCode = params.slug.toUpperCase();

  try {
    const countryDetails = COUNTRY_LIST_OBJECT[countryCode];
    if (!countryDetails) throw new Error(`${countryCode} not found`);

    return NextResponse.json(
      {
        ...countryDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
