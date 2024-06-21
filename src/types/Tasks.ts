import { mails, contacts, accounts } from '@/pages/Mail/mock';

export type Mail = (typeof mails)[number];

export type Contact = (typeof contacts)[number];

export type Account = (typeof accounts)[number];
