<template>
  <div>
    <EngineerNavBar />
    <div class="engineer">
      <h1 class="text-center text-light">Assigned Tickets</h1>

      <div class="filters d-flex justify-content-between">
        <!-- Total Tickets -->
        <div class="totalTIckets btn bg-light fw-bold">
          Total Tickets :
          <span class="text-secondary">
            {{
              ticketsList.data.tickets ? ticketsList.data.tickets.length : 0
            }}</span
          >
        </div>
        <br />

        <!-- Filter on Status -->
        <div class="searchFilter">
          <h5 class="text-center text-light fw-bold p-1">FILTER RESULT</h5>
          <form class="text-center" @submit.prevent="searchTickets">
            <select
              name=""
              class="searchUserType fw-bold"
              v-model="currTicketStatus"
            >
              <option value="" class="fw-bold bg-dark text-light">
                SELECT STATUS
              </option>
              <option
                v-for="currStatus in ticketStatus"
                class="fw-bold"
                :key="currStatus.id"
                :value="currStatus.status"
              >
                {{ currStatus.status }}
              </option>
            </select>
            <button class="btn btn-sm btn-success">search</button>
          </form>
        </div>
      </div>

        <!-- Show if the Engineer has no tickets -->
      <div
        v-if="ticketsList.data.message == 'No Tickets Found !'"
        class="emptyTickets"
      >
        <p class="text-center">No Tickets Found</p>
      </div>

      <div
        v-else
        class="listOfTickets p-2"
        v-for="ticket in ticketsList.data.tickets"
        :key="ticket.id"
      >
        <div class="userslist container">
          <!-- Title  -->
          <div class="username d-flex justify-content-between">
            <h1 class="name">
              {{ ticket.title ? ticket.title : "" }}
            </h1>

            <!-- Edit button -->
            <div class="fw-bold p-2">
              <button class="edit btn btn-sm fw-bold">
                <router-link
                  :to="`/engineer/tickets/${ticket.id}`"
                  class="text-decoration-none"
                  >Edit</router-link
                >
              </button>
            </div>
          </div>

          <!-- Description -->
          <div class="usersValue d-flex justify-content-between">
            <p class="userId text-secondary">
              {{ ticket.description ? ticket.description : "" }}
            </p>
            <p class="email text-secondary">
              <span class="text-dark"> AssignedTo : </span>
              {{ ticket.assignee ? ticket.assignee : "" }}
            </p>
          </div>

          <!-- issued by ticket and  status-->
          <div class="usersTypes d-flex justify-content-between">
            <p class="userType text-secondary" v-if="ticket.reporter">
              <span class="text-dark fw-bold"> IssuedBy : </span>
              {{ ticket.reporter ? ticket.reporter : "" }}
            </p>
            <p class="userType" v-else>
              <span> Ticket-ID : </span>
              {{ ticket.id ? ticket.id : "" }}
            </p>
            <p
              class="userStatus fw-bolder text-success"
              v-if="ticket.status == 'OPEN'"
            >
              <span class="text-dark fw-bold">STATUS : </span>
              {{ ticket.status ? ticket.status : "" }}
            
            </p>
            <p
              class="userStatus fw-bolder text-success"
              v-else-if="ticket.status == 'CLOSED'"
            >
              <span class="text-dark fw-bold">STATUS : </span>
              {{ ticket.status ? ticket.status : "" }}
            </p>
            <p
              class="userStatus fw-bolder text-danger"
              v-else-if="ticket.status == 'REJECTED'"
            >
              <span class="text-dark fw-bold">STATUS : </span>

              {{ ticket.status ? ticket.status : "" }}
            </p>
            <p
              class="userStatus fw-bolder text-success"
              v-else-if="ticket.status == 'IN_PROGRESS'"
            >
              <span class="text-dark fw-bold">STATUS : </span>

              {{ ticket.status ? ticket.status : "" }}
            </p>

            <p
              class="userStatus fw-bolder text-danger"
              v-else-if="user.userStatus == 'PENDING'"
            >
              <span class="text-dark">STATUS : </span>
              {{ ticket.status ? ticket.status : "" }}
            </p>
          </div>

          <!-- Tickets created at -->
          <div class="time d-flex justify-content-end p-2">
            <span> CreatedAt : {{ ticket.updatedAt | formatDate }}</span>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { ticketsMethod } from "@/services/Tickets";
import { mapGetters } from "vuex";
import EngineerNavBar from "./EngineerNavBar.vue";

export default {
  name: "EngineerHome",
  components: {
    EngineerNavBar,
  },
  data() {
    return {
      ticketsList: [],
      currTicketStatus: "",
      ticketStatus: [
        { id: 1, status: "OPEN" },
        { id: 2, status: "CLOSED" },
        { id: 3, status: "IN_PROGRESS" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
  },

  created: async function () {
    // get the list of the tickets
    let response = await ticketsMethod.getAllTickets(this.getToken);
    this.ticketsList = response;
    this.$toast.success(this.ticketsList.data.message);
    console.log(response);
  },

  methods: {
    // Search based on the ticket status
    async searchTickets() {
      if (this.currTicketStatus != "") {
        let response = await ticketsMethod.getAllTickets(
          this.getToken,
          this.currTicketStatus
        );
        this.ticketsList = response;
        this.$toast.success(this.ticketsList.data.message);
        console.log(response);
      }
    },
  },
};
</script>

<style>
/* CSS Styles  */
.filters {
  margin: 20px 50px;
}
.engineer {
  margin-top: 55px;
  background: #1c30e7;
}

.userslist {
  background: #7bbcf3;
}

/* CSS for Mobile view  */

@media screen and (max-width: 768px) {
  .usersValue {
    display: flex;
    flex-wrap: wrap;
  }

  .userTypes {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  #home {
    height: 800px;
  }

  .container {
    height: 250px;
    width: 80%;
  }

  .userId {
    font-size: 20px;
  }

  .name {
    font-size: 25px;
  }
}
</style>