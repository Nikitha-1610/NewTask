const BASE_URL = "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/calender";

// Function to create an event
export const postEvent = async (eventData) => {
  try {
    const response = await fetch(`${BASE_URL}/postEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error posting event:", error);
    return null;
  }
};

// Function to get events by date
export const getEventByDate = async (eventDate) => {
  try {
    const response = await fetch(`${BASE_URL}/getEvent/${eventDate}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.message || [];  // 🔥 Ensure we return the `message` array
  } catch (error) {
    console.error("Error fetching event:", error);
    return [];
  }
};



// Function to update an event
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await fetch(`${BASE_URL}/updateEvent/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    return null;
  }
};

// Function to delete an event
export const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteEvent/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting event:", error);
    return null;
  }
};

// Function to get events by year
export const getEventsByYear = async (year) => {
  try {
    const response = await fetch(`${BASE_URL}/getEventYear/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching events by year:", error);
    return null;
  }
};
