import Config from '@/config';
import axios from 'axios';

// This method will take all registeration details as data  and register the user to the server
export const signup = async (data) => {
    const req = {
        method: 'post',
        url: `${Config.baseUrl}/auth/signup`,
        data,
    };

    try { 
        await axios(req);
        return true;
    } catch (error) {
        console.log( error );
        const err = error.request.response;
       return err;
    }
};


// Login Request 
export const userLogin = async (data ) => {
    const req = {
        method: 'post',
        url: `${Config.baseUrl}/auth/signin`,
        data,
    };


    try { 
       const response = await axios(req);
        return response;

    } catch (error) {
        console.log( error );
       return error;
    }

};
