import Router from 'vue-router';
import SignupPage from '@/components/SignupPage';
import LoginPage from '@/components/LoginPage';
import HomePage from '@/components/HomePage';
import CustomerHome from '@/components/Customer/CustomerHome';
import AddNewTicket from '@/components/Customer/AddNewTicket';
import UpdateTicket from '@/components/Customer/UpdateTicket';
import EngineerSignup from '@/components/Engineer/EngineerSignup';
import UsersList from '@/components/Admin/UsersList';
import ViewUser from '@/components/Admin/ViewUser';
import EditUser from '@/components/Admin/EditUser';
import EngineerHome from '@/components/Engineer/EngineerHome';
import EngUpdateTicket from '@/components/Engineer/EngUpdateTicket';


const router = new Router({
    mode: 'history',
    routes: [
      {
        name: 'Home',
        path: '/',
        component: HomePage,
      },

      {
        name: 'Signup',
        path: '/signup',
        component: SignupPage,
      },

      {
        name: 'login',
        path: '/login',
        component: LoginPage,
      },

      /** Customer Routes */

      {
        name : 'CustomerHome',
        path : '/customers/tickets',
        component : CustomerHome,
      },
      {
        name : 'AddNewTicket',
        path : '/customers/tickets/add',
        component : AddNewTicket,
      },
      {
        name : 'UpdateTicket',
        path : '/customers/tickets/:ticketId',
        component : UpdateTicket,
      },

      /** Engineer Routes  */

      {
        name : 'EngineerSignup',
        path : '/engineer/signup',
        component : EngineerSignup,
      },

      /** ADMIN Routes */

      {
        name : "UsersList" , 
        path : '/admin/users',
        component : UsersList
      },


      {
        name : "viewUser" , 
        path : '/admin/users/:userId',
        component : ViewUser
      },

      {
        name : "EditUser" , 
        path : '/admin/users/:userId/edit',
        component : EditUser
      },

      {
        name : "EngineerHome",
        path : "/engineer",
        component : EngineerHome
      },

      {
        name : "EngUpdateTicket",
        path : "/engineer/tickets/:ticketId",
        component : EngUpdateTicket
      }, 
      
    ],
  });
  
  export default router;