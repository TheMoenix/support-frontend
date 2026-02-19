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

export interface UpdateTicketDto {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  status?: "open" | "in-progress" | "resolved" | "closed";
}

const STORAGE_KEY = "support_tickets";

const getTicketsFromStorage = (): Ticket[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading tickets from localStorage:", error);
    return [];
  }
};

const saveTicketsToStorage = (tickets: Ticket[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error("Error saving tickets to localStorage:", error);
    throw new Error("Failed to save tickets");
  }
};

const generateId = (): string => {
  return `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const delay = (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createTicket = async (data: CreateTicketDto): Promise<Ticket> => {
  await delay();

  const tickets = getTicketsFromStorage();

  const newTicket: Ticket = {
    id: generateId(),
    ...data,
    status: "open",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tickets.push(newTicket);
  saveTicketsToStorage(tickets);

  return newTicket;
};

export const listTickets = async (): Promise<Ticket[]> => {
  await delay();

  const tickets = getTicketsFromStorage();
  return tickets.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

export const getTicket = async (id: string): Promise<Ticket> => {
  await delay();

  const tickets = getTicketsFromStorage();
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    throw new Error(`Ticket with ID ${id} not found`);
  }

  return ticket;
};

export const updateTicket = async (
  id: string,
  data: UpdateTicketDto,
): Promise<Ticket> => {
  await delay();

  const tickets = getTicketsFromStorage();
  const ticketIndex = tickets.findIndex((t) => t.id === id);

  if (ticketIndex === -1) {
    throw new Error(`Ticket with ID ${id} not found`);
  }

  const updatedTicket: Ticket = {
    ...tickets[ticketIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  tickets[ticketIndex] = updatedTicket;
  saveTicketsToStorage(tickets);

  return updatedTicket;
};

export const deleteTicket = async (id: string): Promise<void> => {
  await delay();

  const tickets = getTicketsFromStorage();
  const filteredTickets = tickets.filter((t) => t.id !== id);

  if (tickets.length === filteredTickets.length) {
    throw new Error(`Ticket with ID ${id} not found`);
  }

  saveTicketsToStorage(filteredTickets);
};

export const clearAllTickets = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
