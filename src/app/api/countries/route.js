import { NextResponse } from "next/server";
import COUNTRY_LIST from "@/data/countryData.json";

function searchByName(array, name) {
  if (!name) return array;

  name = name.toLowerCase();

  return array.filter((obj) => {
    return (
      obj.name.common.toLowerCase().includes(name) ||
      obj.name.official.toLowerCase().includes(name)
    );
  });
}

function searchByRegion(array, region) {
  if (region === "All") return array;

  region = region.toLowerCase();

  return array.filter((obj) => {
    return obj.region.toLowerCase() === region;
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || 15, 10);
  const page = parseInt(searchParams.get("page") || 1, 10);
  const region = searchParams.get("region") || "All";
  const query = searchParams.get("query") || "";

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    let filteredCountries = COUNTRY_LIST;

    filteredCountries = searchByName(filteredCountries, query);
    if (region !== "All")
      filteredCountries = searchByRegion(filteredCountries, region);

    const slicedCountries = filteredCountries.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        results: slicedCountries,
        totalCountries: filteredCountries.length,
        totalPages: Math.ceil(filteredCountries.length / limit),
        currentPage: page,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Fetch Countries" },
      { status: 500 }
    );
  }
}
