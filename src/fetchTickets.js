/* 
    fetchTickets.js -- fetch all tickets or a ticket by id 
*/

import { options } from './index.js';
import { displayTicket } from './displayTickets.js';
import { displayTickets } from './displayTickets.js';

// Node fetch is used to fetch the tickets
import fetch from "node-fetch";

// Prompt is used to get user input
import promptSync from 'prompt-sync';
const prompt = promptSync();

// chalk is used for text styling
import chalk from 'chalk';
const title = chalk.hex('#2c58f5');

// OAuth token
const token = 'cd575df87441323d01749333e7fa5955f351004ceed29bcc2fea7c732df86f8b'; 

// Function to fetch all tickets from Zendesk api
export async function fetchAllTickets() {

    const page_size = 25;

    let url = `https://zccbryanmccarthy.zendesk.com/api/v2/tickets.json?page[size]=${page_size}`;

    // While valid url
    while(url != null) {
        
        // Get response from the Zendesk API
        let response = await fetchRequest(url);

        if (response != null) {
            // Call displayTickets to view page of tickets
            displayTickets(response);
        } else {
        console.log(title("Sorry, API did not respond.\n"));
        }

        // If tickets on next page exist
        if (response.meta.has_more === true) {
            let viewNextPage = prompt(title("Would you like to view the next page? Type 'yes' or 'no' "));

            if(viewNextPage === 'yes') {
                // Set url to the next page of 25 tickets
                url = response.links.next
            } else {
                break;
            }
        } else {
            console.log(title("\nNo more pages exist.\n"));
            break;
        }
    }
    
    // Return to menu
    options();
}

// Function to fetch a single ticket by id
export async function fetchSingleTicket() {

    let ticketID = prompt(title("Please enter a ticket id: "));

    let url = `https://zccbryanmccarthy.zendesk.com/api/v2/tickets/${ticketID}.json`;

    // Get response from the Zendesk API
    let response = await fetchRequest(url)

    if (response != null) {
        // Call displayTicket to display the requested ticket
        displayTicket(response);
    } else {
        console.log(title("Sorry, API did not respond.\n"));
    }
}

// Function to validate a request to the Zendesk API
async function fetchRequest(url) {

    const bearer = 'Bearer ' + token;

    return fetch(url, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).catch(error => console.log(error));
}
