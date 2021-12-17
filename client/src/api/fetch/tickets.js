import { privateApi } from "./api";

export const getUserTickets = () => privateApi.get("tickets").json();

export const postTicket = ({ sessionId }) => privateApi.post("tickets", { json: { sessionId } }).json();
