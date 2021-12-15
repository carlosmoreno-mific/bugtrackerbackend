import { PriorityType } from "../common/enums/priorityType";
import { TicketStatus } from "../common/enums/ticketStatus";
import { TicketType } from "../common/enums/ticketType";

export interface Ticket {
  Id: number;
  ProjectId: number;
  Title: string;
  Description: string;
  Type: TicketType;
  Priority: PriorityType;
  Status: TicketStatus;
}
