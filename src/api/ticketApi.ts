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

export const getTicket = async (id: string): Promise<Ticket | null> => {
  await delay();

  const tickets = getTicketsFromStorage();
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    throw new Error(`Ticket with ID ${id} not found`);
  }

  return ticket;
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
