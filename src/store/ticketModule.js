import { userLogin } from "@/services/auth.services";

const TOKEN_KEY = 'accessToken';
const EMAIL_KEY = 'email';
const MESSAGE_KEY = 'message';
const NAME_KEY = 'name';
const USERID = 'userId';
const USERTYPE = 'userType';
const USERSTATUS = 'userStatus';



/** States of the Store */
const state = {
    accessToken: localStorage.getItem(TOKEN_KEY) || '',
    email: localStorage.getItem(EMAIL_KEY) || '',
    message: localStorage.getItem(MESSAGE_KEY) || '',
    name: localStorage.getItem(NAME_KEY) || '',
    userId: localStorage.getItem(USERID) || '',
    userType: localStorage.getItem(USERTYPE) || '',
    userStatus: localStorage.getItem(USERSTATUS) || '',
}

/** Getters of the Store */
const getters = {
    getToken: state => state.accessToken,
    userEmail: (state) => state.email,
    userMessage: (state) => state.message,
    userName: (state) => state.name,
    getUserID: (state) => state.userId,
    getUserType: (state) => state.userType,
    getUserStatus: (state) => state.userStatus,
}

/** Actions of the Store */
const actions = {


    async login({ commit }, data) {

        try {
            const response = await userLogin(data);
            if (response.data.status == 200) {
                const {
                    message,
                    user: {
                        name,
                        userId,
                        email,
                        userType,
                        userStatus,
                        accessToken,
                    },
                } = response.data;

                localStorage.setItem(MESSAGE_KEY, message);
                localStorage.setItem(NAME_KEY, name);
                localStorage.setItem(USERID, userId);
                localStorage.setItem(EMAIL_KEY, email);
                localStorage.setItem(USERTYPE, userType);
                localStorage.setItem(USERSTATUS, userStatus);
                localStorage.setItem(TOKEN_KEY, accessToken);

                commit('setToken', accessToken);
                commit('setMessage', message);
                commit('setName', name);
                commit('setUserId', userId);
                commit('setEmail', email);
                commit('setUserType', userType);
                commit('setUserStatus', userStatus);
                
                return response;

            } else {
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    }

}

/** Mutations of the Store */
const mutations = {

    setToken(state, accessToken) {
        state.accessToken = accessToken;
    },

    setMessage(state, message) {
        state.message = message;
    },

    setName(state, name) {
        state.name = name;
    },

    setUserId(state, userId) {
        state.userId = userId;
    },

    setEmail(state, email) {
        state.email = email;
    },

    setUserType(state, userType) {
        state.userType = userType;
    },

    setUserStatus(state, userStatus) {
        state.userStatus = userStatus;
    },
}


export default {
    state,
    getters,
    actions,
    mutations,
};