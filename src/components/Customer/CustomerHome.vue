<template>
  <div class="customerhome" >
    <CustomerNavBar />

 
      <div>
        <div class="CustomerDiv">
          <div class="Home">
            <p class="small-desc text-light">
              {{ userName.toUpperCase() }} , Tickets created by you will show
              Here
            </p>
          </div>
          <!-- <pre>{{ ticketsList }}</pre> -->
          <div class="topFilters d-flex justify-content-between">

            <!--  Counts the Number of tickets created  -->
            <div class="ticketsCount text-center">
              <p>
                <span>Tickets :</span>
                {{
                  ticketsList.data.tickets ? ticketsList.data.tickets.length : 0
                }}
              </p>

              <br />
            </div>
            
            <!-- Added Filters on the Status of the Tickets created by CUstomer -->
            <div class="searchFilter">

              <h5 class="filterTitle text-center text-light fw-bold p-1">FILTER RESULT</h5>
              <form class="text-center" @submit.prevent="searchFilter">
                <select name="" class="searchUserType fw-bold" v-model="status">
                  <option value="" class="fw-bold bg-dark text-light">
                    SELECT STATUS
                  </option>
                  <!-- get  the status of the tickets -->
                  <option
                    v-for="currStatus in ticketStatusArr"
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

          <!-- raise a complains if the tickets Counts  is zero -->
          <div v-if='ticketsList.data.message == "No Tickets Found !"' class="emptyTickets">
                <p class="text-center">Raise a complain of your Issue !
                  <router-link class="nav-link active text-primary" aria-current="page" to="/customers/tickets/add" >Raise-an-Issue</router-link>
                </p>
          </div>

          <!-- iterate over the list of the tickets  -->
          <div
            class="ticketsList"
            v-for="ticket in ticketsList.data.tickets"
            :key="ticket.id"
          >
            <div class="jumbotron jumbotron-fluid OneTicket">
              <div class="container">

                <!-- Title  -->
                <div class="title d-flex justify-content-start">
                  <span> Title :</span>
                  <p class="mx-2 ticketTitle">
                    {{ ticket.title ? ticket.title : "" }}
                  </p>
                </div>

                <!-- Description -->
                <div class="description d-flex">
                  <span>Description : </span>
                  <p class="mx-3 title-description fw-bold">
                    {{ ticket.description ? ticket.description : "" }}
                  </p>
                </div>

                <!-- Row  for status and Engineer -->
                <div class="statusAndEnginner d-flex justify-content-between">
                  <div class="status d-flex">
                    <span>Status : </span>
                    <p class="mx-2 text-success fw-bold">
                      {{ ticket.status ? ticket.status : "" }}
                    </p>
                  </div>

                  <h5 class="text-secondary fw-bold">
                    <span class="text-dark">Engineer : </span>
                    {{ ticket.assignee ? ticket.assignee : "" }}
                  </h5>
                </div>
                
                <!-- Update button  -->
                <div class="icons">
                  <button class="btn btn-outline-primary mt-3">
                    <router-link
                      :to="`/customers/tickets/${ticket.id}`"
                      class="text-decoration-none updateTicket"
                      >update</router-link
                    >
                  </button>
                </div>

                <!-- shows the time at which the ticket is created -->
                <div class="dateAndTime d-flex justify-content-end">
                  <p class="fw-bold">
                    CreatedAt :

                    <span class="date mx-2 text-secondary">
                      {{ ticket.createdAt | formatDate }}</span
                    >
                    
                  </p>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
   
  </div>


    
    

</template>

<script>
import { mapGetters } from "vuex";
import CustomerNavBar from "./CustomerNavBar.vue";
import { ticketsMethod } from "@/services/Tickets";

export default {
  name: "CustomerHome",
  // Get the data from v-model
  data() {
    return {
      ticketsList: [],
      status: "",
      ticketStatusArr: [
        { id: 1, status: "OPEN" },
        { id: 2, status: "CLOSED" },
        { id: 3, status: "IN_PROGRESS" },
      ],
    };
  },

  // Vuex store 
  computed: {
    ...mapGetters(["getToken", "userMessage", "userName"]),
  },
  components: {
    CustomerNavBar,

  },


  created: async function () {
    let response = await ticketsMethod.getAllTickets(this.getToken);
    // Store the response in the ticketlist array
    this.ticketsList = response;
    this.$toast.success(this.ticketsList.data.message);
    console.log(response);
  },
  methods: {
    async searchFilter() {
      if (this.status != "") {
        let response = await ticketsMethod.getAllTickets(
          this.getToken,
          this.status
        );
       
        this.ticketsList = response;
        this.$toast.success(this.ticketsList.data.message);
      }
    },
  },
};
</script>

<style>
.customerhome {
  background: rgba(19, 168, 116, 0.954);
}
.pageHeight{
  height: 100vh;
}
.CustomerDiv {
  margin-top: 60px;
}
.small-desc {
  font-size: 20px;
  font-weight: 700;
  margin: 20px 60px;
}
.OneTicket {
  padding: 10px;
}

.topFilters {
  margin: 0px 50px;
}

.container {
  background: rgba(170, 250, 222, 0.954);

  border-radius: 1px;
  box-shadow: 3px 5px 10px black;
}

.ticketsCount {
  width: 150px;
  height: 50px;
  padding: 20px;
  margin: 20px;
  background: rgb(221, 221, 221);
  border-radius: 3px;
  box-shadow: 2px 2px 5px black;
}
.ticketsCount p span {
  font-weight: 900;
  font-size: 19px;
  color: black;
}

.emptyTickets{
  position: relative;
  border-radius: 5px;
  box-shadow: 3px 3px 10px black;
  font-weight: 900;
  left: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 150px;
  background: #66F3B5  ;
  margin: 20px;
}

.ticketsCount p {
  color: white;
  font-weight: 900;
}

.title span {
  font-weight: 900;
  font-size: 35px;
}

.ticketTitle {
  font-weight: 800;
  font-size: 25px;
  margin-top: 10px;
}

.updateTicket {
  font-weight: 900;
  font-size: 15px;
}

.title-description {
  color: rgb(134, 123, 123);

  justify-content: space-between;
}

/* CSS for the Mobile View  */
@media screen and (max-width: 768px) {
  .title span {
    font-size: 25px;
  }

  .ticketTitle {
    font-size: 20px;
    margin-top: 5px;
  }

  .title-description {
    font-size: 15px;
    justify-content: space-between;
  }

  .emptyTickets{
    width: 200px;
    left: 25%;
    margin-bottom: 20px ;
  }

  .filterTitle{
    font-size: 15px;
  }

  .searchUserType{
    width: 100px;
  }
}
</style>