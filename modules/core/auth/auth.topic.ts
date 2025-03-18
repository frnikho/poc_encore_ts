import {Topic} from "encore.dev/pubsub";

export interface LoginEvent {
  userId: string;
  status: 'success' | 'failed';
  message: string;
}

export interface RegisterEvent {
  userId: string;
}

export const logins = new Topic<LoginEvent>("login", {
  deliveryGuarantee: 'exactly-once'
});

export const registers = new Topic<RegisterEvent>("register", {
  deliveryGuarantee: 'exactly-once'
});