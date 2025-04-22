export const SelecttravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo traveles in exploration',
        icon:'🚀',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adventure',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'💥',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about costs',
        icon:'💸',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with a Flight details , Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, Hotel image Url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format.'

export const STRICT_AI_PROMPT = `
You must respond only with valid JSON matching exactly this schema:

{
  "id": string,
  "tripData": {
    "best_time_to_visit": string,
    "budget": string,
    "budget_tips": [ string ],
    "daily_plan": [
      {
        "day": number,
        "plan": [
          {
            "activity": string,
            "details": string,
            "estimated_duration": string,
            "time_of_day": string,
            "transport_tip": string
          }
        ],
        "theme": string
      }
    ],
    "destination": string,
    "duration": string,
    "flight_details": {
      "booking_url": string,
      "estimated_price_one_way": string,
      "notes": string
    },
    "hotel_options_cheap_budget": [
      {
        "address": string,
        "description": string,
        "geo_coordinates": { "latitude": number, "longitude": number },
        "hotel_name": string,
        "image_url": string,
        "price_per_night_approx": string,
        "rating_approx": number
      }
    ],
    "places_to_visit": [
      {
        "geo_coordinates": { "latitude": number, "longitude": number },
        "image_url": string,
        "place_details": string,
        "place_name": string,
        "ticket_pricing_approx": string,
        "time_to_travel": string
      }
    ],
    "traveler_type": string
  },
  "userEmail": string,
  "userSelection": {
    "budget": string,
    "days": string,
    "destination": string,
    "traveler": string
  }
}

Generate a travel plan for:
- location: {location}
- days: {totalDays}
- nights: {totalNights}
- traveler: {travelerType}
- budget: {budget}

Fill in all fields exactly as above—do not add, rename, or omit any keys.
`;
