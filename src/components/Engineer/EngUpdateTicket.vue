<template>
  <div>
    <EngineerNavBar />
    <!-- <pre>{{ ticketsDetails }}</pre> -->
    <div class="mainDiv">
      <div class="editUser">
        <h3 class="text-center fw-bold">EDIT TICKET | ENGINEER</h3>

        <!-- Form to update the tickets  -->
        <form @submit.prevent="updateTicket">
          <div class="row">
            <div class="title col-md-6">
              <label class="label" for="title">TITLE</label>
              <input
                type="text"
                v-model="ticketsDetails.Ticket.title"
                id="title"
                class="inputValue form-control fw-bold"
                placeholder="Enter Full title"
              />
            </div>
            <div class="col-md-6"></div>
          </div>

          <!-- Enggineer -->
          <div class="row">
            <div class="col-md-6">
              <label class="label" for="engineer">ENGINEER</label>
              <input
                type="text"
                id="engineer"
                v-model="ticketsDetails.Ticket.assignee"
                class="inputValue form-control fw-bold"
                placeholder="Enter engineer"
                disabled
              />
            </div>
            <div class="status col-md-6">
              <label class="label" for="status">STATUS</label>

                <select name="" class="form-control selected fw-bold" v-model="ticketsDetails.Ticket.status">
              <option value="select" class="fw-bold">-- Select Status --</option>
               <option v-for="currStatus in ticketStatus" class="fw-bold" :key="currStatus.id" :value="currStatus.status">{{ currStatus.status }}</option>
            </select>
             
            </div>
          </div>

          <div class="row">
            <div class="description">
              <label class="label" for="description">DESCRIPTION</label>
              <textarea
                name=""
                id=""
                 v-model="ticketsDetails.Ticket.description"
                class="form-control textarea fw-bold"
                placeholder="update Described issue by user"
                cols="30"
                rows="4"
              ></textarea>
            </div>
            <div class="userStatus col-md-6"></div>
          </div>

          <div class="submit d-flex justify-content-around">
            <button class="submit btn btn-success fw-bold mt-2">SUBMIT</button>
            <button class="btn text-primary">
              <router-link
                class="text-decoration-none fw-bold"
                :to="`/engineer`"
                >BACK</router-link
              >
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EngineerNavBar from "./EngineerNavBar.vue";
import { ticketsMethod } from "@/services/Tickets";
export default {
  name: "EngUpdateTicket",
  data() {
    return {
      ticketId: this.$route.params.ticketId,
       ticketStatus : [
         { id : 1, status : 'OPEN' },
         { id : 2, status : 'IN_PROGRESS' },
         { id : 3, status : 'REJECTED' },
         { id : 4, status : 'CLOSED' },
         ],
      ticketsDetails: [],
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  components: {
    EngineerNavBar,
  },
  created: async function () {
    // get the tickets by ID
    try {
      let response = await ticketsMethod.getTicketByID(
        this.getToken,
        this.ticketId
      );
      this.ticketsDetails = response.data;

      if (response) {
        this.$toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error(error);
    }
  },

  methods: {
    // update the tickets 
    updateTicket: async function () {
      let response = await ticketsMethod.updateTicketByID(
        this.ticketsDetails.Ticket,
        this.getToken,
        this.ticketId,
      );
      console.log(response);
      if (response.status == 200) {
        this.$toast.success(response.data.message);
      } else {
        this.$toast.error(response);
      }
    },
  },
};
</script>

<style>
.editUser {
  width: 80%;
  margin: 20px auto;
  padding: 25px;
  box-shadow: 10px 5px 20px rgb(0, 0, 0);
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  background: rgb(237, 235, 235);
}

.label {
  font-size: 20px;
  margin-bottom: 5px;

}

.inputValue,
.selected {
  height: 50px;
  font-weight: 900;
  border: 1px solid black;
  box-shadow: 3px 3px 10px rgb(18, 9, 9);
}

.inputValue:hover {
  border: 1px solid black;
}

.textarea {
  font-weight: 900;
  border: 1px solid black;
  box-shadow: 3px 3px 10px rgb(18, 9, 9);
}

.row {
  margin: 40px;
}
</style>