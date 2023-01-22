<template>
  <div id="home ">
    <CustomerNavBar />
    <div class="outerDiv">
      <div class="add-ticket-form">
        <h2 class="text-center text-white fw-bold my-3">UPDATE TICKET</h2>
        <p class="text-center fw-bold">CUSTOMER</p>

        <!-- update tickets component  -->
        <form @submit.prevent="OnSubmit">

          <!-- Title of the Ticket -->
          <div class="form-group">
            <label for="title">Title :</label>
            <input
              v-model.trim="$v.title.$model"
              type="text"
              class="form-control fw-bold"
              :class="{
                'is-valid': !$v.title.$invalid,
                'is-invalid': $v.title.$error,
              }"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Title"
            />

            <!-- Validate the ticket using vuelidate -->
            <div class="invalid-feedback">
              <span v-if="!$v.title.required">Title is required !</span>
            </div>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description">Description : </label>
            <textarea
              name="description"
              v-model.trim="$v.description.$model"
              class="form-control fw-bold"
              :class="{
                'is-valid': !$v.description.$invalid,
                'is-invalid': $v.description.$error,
              }"
              id="description"
              cols="30"
              rows="4"
              placeholder="Describe Your Issue Here ..."
            ></textarea>
            <!-- Validate description using vuelidte -->
            <div class="invalid-feedback">
              <span v-if="!$v.description.required"
                >Description is required !</span
              >
            </div>
          </div>

          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerNavBar from "./CustomerNavBar.vue";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import { ticketsMethod } from "@/services/Tickets";
export default {
  name: "UpdateTicket",

  components: {
    CustomerNavBar,
  },

  data() {
    return {
      // Get the ticketID from the Routes 
      ticketId: this.$route.params.ticketId,
      title: "",
      description: "",
      submitStatus: null,
    };
  },
  
  // Validating the fields 
  validations: {
    title: {
      required,
    },

    description: {
      required,
    },
  },

  // Get the token using MapGetters
  computed: {
    ...mapGetters(["getToken"]),
  },

  methods: {
    async onUpdateTicket() {
      try {
        const data = {
          title: this.title,
          description: this.description,
        };

        console.log("data : ", data);

        //  pass  the data to the backend 
        const helper = async () => {
          this.ticketsCreated = await ticketsMethod.updateTicketByID(
            data,
            this.getToken,
            this.ticketId
          );
        };

        if (helper()) {
          this.$toast.success("Tickets updated Successfully !");
        } else {
          this.$toast.error("Something Error Happened , Please try again");
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    OnSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = "FAIL";
      } else {
        this.submitStatus = "SUCCESS";
        this.onUpdateTicket();
      }
    },
  },
};
</script >
// Added style 
<style scoped>

.add-ticket-form {
  border: 1px solid rgb(26, 255, 164);
  background: rgba(26, 164, 98, 0.712);
  box-shadow: 5px 5px 10px rgb(128, 126, 126);
  width: 50%;
  margin: 100px auto;
  padding: 20px;
}

label {
  font-size: 17px;
  font-weight: 900;
  margin-top: 20px;
}

.outerDiv{
  height: 100vh;

}

input::placeholder,
textarea::placeholder {
  font-weight: 900;
}

span {
  font-weight: 900;
}

p {
  font-size: 25px;
}

@media screen and (max-width: 768px) {
  .add-ticket-form {
    width: 70%;
    margin-top: 100px;
  }
}
</style>