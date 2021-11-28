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

    while(url != null) {
        
        let response = await fetchRequest(url);

        if (response != null) {
            displayTickets(response);
        } else {
        console.log(title("Sorry, API did not respond.\n"));
        }

        if (response.meta.has_more === true) {
            let viewNextPage = prompt(title("Would you like to view the next page? Type 'yes' or 'no' "));

            if(viewNextPage === 'yes') {
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

export async function fetchSingleTicket() {

    let ticketID = prompt(title("Please enter a ticket id: "));

    let url = `https://zccbryanmccarthy.zendesk.com/api/v2/tickets/${ticketID}.json`;

    let response = await fetchRequest(url)

    if (response != null) {
        displayTicket(response);
    } else {
        console.log(title("Sorry, API did not respond.\n"));
    }
}

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