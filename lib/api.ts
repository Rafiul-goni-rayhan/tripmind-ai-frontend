const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Trip {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  date: string;
  location: string;
  category: string;
  rating: number;
  images: string[];
  duration: string;
  groupSize: string;
  included: string[];
  excluded: string[];
  createdBy: string;
  createdAt: string;
}

export interface TripsResponse {
  success: boolean;
  data: Trip[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface TripFilters {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function fetchTrips(filters: TripFilters = {}): Promise<TripsResponse> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/trips?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch trips");
  }

  return res.json();
}

export async function fetchTripById(id: string) {
  const res = await fetch(`${API_URL}/trips/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch trip");
  }

  return res.json();
}

export async function createTrip(tripData: Partial<Trip>) {
  const res = await fetch(`${API_URL}/trips`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(tripData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create trip");
  }

  return data;
}

export async function deleteTrip(id: string) {
  const res = await fetch(`${API_URL}/trips/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete trip");
  }

  return data;
}

export async function fetchTripsByUser(userId: string) {
  const res = await fetch(`${API_URL}/trips/user/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user trips");
  }

  return res.json();
}










export interface ChatMessage {
  _id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export async function fetchChatHistory() {
  const res = await fetch(`${API_URL}/chat/history`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch chat history");
  }

  return res.json();
}

export async function sendChatMessage(message: string) {
  const res = await fetch(`${API_URL}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to send message");
  }

  return data;
}

export async function clearChatHistory() {
  const res = await fetch(`${API_URL}/chat/history`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to clear chat history");
  }

  return res.json();
}



export interface RecommendationPreferences {
  budget?: number;
  interests?: string;
  preferredCategory?: string;
}

export async function getRecommendations(preferences: RecommendationPreferences) {
  const res = await fetch(`${API_URL}/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(preferences),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to get recommendations");
  }

  return data;
}



export interface Booking {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  tripId: Trip;
  travelDate: string;
  travelers: number;
  contactPhone: string;
  totalPrice: number;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export async function createBooking(data: {
  tripId: string;
  travelDate: string;
  travelers: number;
  contactPhone: string;
}) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Booking failed");
  }

  return result;
}

export async function fetchMyBookings() {
  const res = await fetch(`${API_URL}/bookings/my`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}

export async function fetchAllBookings() {
  const res = await fetch(`${API_URL}/bookings`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}

export async function cancelBooking(id: string) {
  const res = await fetch(`${API_URL}/bookings/${id}/cancel`, {
    method: "PUT",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to cancel booking");
  }

  return result;
}