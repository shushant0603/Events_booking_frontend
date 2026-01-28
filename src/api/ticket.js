import api from '../api/api.js';

const ticketApi = {
    createTicket: (data) => api.post("/tickets", data),
    getTickets: () => api.get("/tickets"),
    getTicketById: (id) => api.get(`/tickets/${id}`),
    getUserTickets: () => api.get("/tickets/user"),
    updateTicketStatus: (ticketId, status) => api.patch(`/tickets/${ticketId}/status`, { status }),
    getTicketbyEventId:(EventId)=>api.post(`/tickets/${EventId}`)
}

export default ticketApi;