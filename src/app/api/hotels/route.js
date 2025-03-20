// app/api/hotels/route.js
import { NextResponse } from "next/server";

/**
 * GET handler for hotel search
 * Based on simplified endpoint structure
 */
export async function GET(request) {
  try {
    // Get URL parameters from the request
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Extract query parameters
    const query = {
      city_id: searchParams.get("city_id"),
      date: searchParams.get("date"),
      rooms_count: searchParams.get("rooms_count") || 1,
      adult_guests: searchParams.get("adult_guests") || 2,
      page: searchParams.get("page") || 1,
    };

    // Validate required parameters
    if (!query.city_id) {
      return NextResponse.json(
        {
          error: "city_id is required",
        },
        { status: 400 }
      );
    }

    if (!query.date) {
      return NextResponse.json(
        {
          error: "date is required",
        },
        { status: 400 }
      );
    }

    // Forward the request to the OTA API
    const baseUrl = "https://ota-gin.onrender.com/api/v1/hotels/search";

    // Construct search query string from parameters
    const searchQueryParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchQueryParams.append(key, value);
      }
    });

    const response = await fetch(`${baseUrl}?${searchQueryParams.toString()}`, {
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    // Return the API response
    return NextResponse.json(data);
  } catch (error) {
    console.error("Hotel search error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while searching for hotels",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
