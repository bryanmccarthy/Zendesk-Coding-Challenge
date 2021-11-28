/* 
    displayTicket.js -- displays specific information from a ticket
*/

import { options } from './index.js';

// Prompt is used to get user input
import promptSync from 'prompt-sync';
const prompt = promptSync();

// chalk is used for text styling
import chalk from 'chalk';
const title = chalk.hex('#2c58f5');
const keyColor = chalk.hex('#148532');
const valueColor = chalk.hex('#d1dbc3');
const label = chalk.red;

// Line to separate tickets displayed
const line = '_'.repeat(process.stdout.columns)

// Display all tickets 
export function displayTickets(response) {

    // Loop through tickets
    for(let data in response.tickets){

        // Ticket: id, subject, description, status
        console.log(label("\nTicket: \n") +
                    keyColor("ID: ") + valueColor(response.tickets[data].id) + "\n" + 
                    keyColor("Subject: ") + valueColor(response.tickets[data].subject) + "\n" +
                    keyColor("Description: ") + valueColor(response.tickets[data].description) + "\n" +
                    keyColor("Status: ") + valueColor(response.tickets[data].status) + "\n" +
                    label(line));
    }
}

// Display single ticket
export function displayTicket(response) {

    try{
    // Ticket: id, subject, description, status
        console.log(label("\nTicket: \n") +
                    keyColor("ID: ") + valueColor(response.ticket.id) + "\n" + 
                    keyColor("Subject: ") + valueColor(response.ticket.subject) + "\n" +
                    keyColor("Description: ") + valueColor(response.ticket.description) + "\n" +
                    keyColor("Status: ") + valueColor(response.ticket.status) + "\n");
    } catch(error) {
        console.log(chalk.red("Error: " + error));
    }
    
    // Return to options menu
    options();
}
