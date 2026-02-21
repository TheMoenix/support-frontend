const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const listTickets = async (): Promise<Ticket[]> => {
  const response = await fetch(`${API_URL}/ticket`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tickets: ${response.statusText}`);
  }

  return (await response.json()).tickets;
};

export const getTicket = async (id: string): Promise<Ticket> => {
  const response = await fetch(`${API_URL}/ticket/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ticket: ${response.statusText}`);
  }

  return response.json();
};

export const createTicket = async (data: CreateTicketDto): Promise<Ticket> => {
  const response = await fetch(`${API_URL}/ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create ticket: ${response.statusText}`);
  }

  return response.json();
};
