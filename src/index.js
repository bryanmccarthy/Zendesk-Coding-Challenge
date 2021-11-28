/* 

    index.js -- starting point of the application
    
                includes menu flow
*/

import { fetchAllTickets } from './fetchTickets.js';
import { fetchSingleTicket } from './fetchTickets.js';

// Prompt is used to get user input
import promptSync from 'prompt-sync';
const prompt = promptSync();

// chalk is used for text styling
import chalk from 'chalk';
const title = chalk.hex('#2c58f5');
const option = chalk.bold.red;


// Function to display a welcome message
function welcome() {
    console.log(title("\nWelcome to the Zendesk Ticket Viewer!\n"));
}

// Function for first menu user will see
function menu() {
    let choice = prompt(title("Type 'menu' to view options or 'quit' to exit:"));

    switch(choice) {
        case 'menu': 
            options();
            break;

        case 'quit':
            console.log(title("\nThank you for using the ticket viewer! Goodbye..."));
    
            return;

        default:
            console.log(title("Please enter a valid option.\n"));
            menu();
    }
}

// Function for Options menu
export function options() {

    // Display the options 
    console.log("\n");
    const optionsinterface = (title("Ticket View Options:\n * Press " + option("1 ") + "to view all tickets\n * Press " + option("2 ") + "to view a ticket by ID\n * Type 'quit' to exit\n"));
    console.log(optionsinterface);

    let choice = prompt(title("Option: "));

    switch(choice) {
        case '1':
            // Call fetchAllTickets from viewAllTickets.js
            fetchAllTickets();

            break;
        
        case '2':
            // Call fetchSingleTicket from viewAllTickets.js
            fetchSingleTicket();

            break;

        case 'quit':
            console.log(title("\nThank you for using the ticket viewer! Goodbye."));
    
            return;

        default:
            // If user input is invalid, ask them to try again
            console.log(title("Please enter a valid option.\n"));
            options();
    }
}

// Begin
// Welcome message is displayed once
welcome();
menu();
