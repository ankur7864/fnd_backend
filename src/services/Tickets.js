/* 
    This file contains the services which we used to add New Tickets and add a Team .
*/
import axios from 'axios';
import Config from '@/config';


export const ticketsMethod = {
    /*

    CreateTickets methods contains the data and token as a parameter
    which contains all the required data and needed to create Tickets 

    */

    createTicket: async (addData, accessToken) => {

        const req = {
            method: 'POST',
            url: `${Config.baseUrl}/tickets`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            data: addData,
        }

        try {
            await axios(req);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    } , 

    // update the ticekets 
    updateTicketByID : async ( updateData , accessToken , ticketID )=>{
        const req = {
            method: 'PUT',
            url: `${Config.baseUrl}/tickets/${ ticketID }`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            data: updateData,
        }

        
        try {
          const updateResponse =  await axios(req);
            return updateResponse;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },

    // Get alll the tickets 
    getAllTickets : async( accessToken , ticketstatus ) => {

        const req = {
            method: 'GET',
            url: `${Config.baseUrl}/tickets`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            params:{
                status : ticketstatus
            }
        }

        try {
            const response =  await axios(req);
            return response;
            
         } catch (error) {
             console.log(error.message);
             return error;
         }
    },
    
    // Get the tickets by ID
    getTicketByID : async( accessToken , ticketId) => {
        
        const req = {
            method: 'GET',
            url: `${Config.baseUrl}/tickets/${ ticketId }`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
        }

        try {
            const response =  await axios(req);
            return response;
            
         } catch (error) {
             console.log(error.message);
             return error;
         }
    },

}