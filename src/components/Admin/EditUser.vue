<template>
  <div>
    <AdminNavBar />
    <!-- <pre>{{ userDetails }}</pre> -->
    <div class="mainDiv">
    <div class="editUser">
    <h3 class="text-center fw-bold">Edit user</h3>

    <!-- Form for updating the user Details  -->
      <form @submit.prevent="updateUser">
        <div class="row">

          <!-- Title -->
          <div class="name col-md-6">
            <label class="label" for="name">NAME</label>
            <input
              type="text"
              v-model="userDetails.user[0].name"
              id="name"
              class="inputValue form-control fw-bold"
              placeholder="Enter Full Name"
            />
          </div>
          <div class="col-md-6">
           
          </div>
        </div>

        <!-- UserID and Email -->
        <div class="row">
          <div class="userId col-md-6">
           
            <label class="label" for="userId">USER ID</label>
            <input
              type="text"
              v-model="userDetails.user[0].userId"
              id="userId"
              class="inputValue form-control fw-bold"
              placeholder="Enter userID"
              disabled
            />
          </div>
          <div class="email col-md-6">
            <label class="label" for="email">EMAIL</label>
            <input
              type="text"
              v-model="userDetails.user[0].email"
              id="email"
              class="inputValue form-control fw-bold"
              placeholder="Enter Email"
              disabled
            />
          </div>
        </div>
        <!-- usertype and user status  -->
        <div class="row">
          <div class="userType col-md-6">
            <label class="label" for="userType">USER TYPE</label>
            <input
              type="text"
              v-model="userDetails.user[0].userType"
              id="userType"
              class="inputValue form-control fw-bold"
              placeholder="Enter userType"
              
            />
          </div>
          <div class="userStatus col-md-6">

            <label class="label" for="userStatus">USER STATUS</label>
            <select name="" class="selected fw-bold" v-model="userDetails.user[0].userStatus">
              <option value="select" class="fw-bold bg-dark text-light">-- select status --</option>
              <option v-for="currStatus in userStatus" class="fw-bold" :key="currStatus.id" :value="currStatus.status">{{ currStatus.status }}</option>
            </select>
          </div>
        </div>

        <div class="submit d-flex justify-content-around">
          <button class="submit btn btn-success fw-bold mt-2">SUBMIT</button>
          <button class="btn text-primary"><router-link class="text-decoration-none fw-bold" :to="`/admin/users`">BACK</router-link></button>
        </div>
      </form>

    </div>
    </div>
  </div>
</template>

<script>
import AdminNavBar from "./AdminNavBar.vue";
import { mapGetters } from "vuex";
import { usersList } from "@/services/Users";

export default {
  name: "EditUser",
  components: {
    AdminNavBar,
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  data() {
    return {
      
      userId: this.$route.params.userId,
      
     
      userStatus : [
         { id : 1, status : 'APPROVED' },
         { id : 2, status : 'PENDING' },
         { id : 3, status : 'REJECTED' },
         ],
     
      userDetails: [],
    };
  },
  created: async function () {
    try {
    //  paass the user ID to the backend
      let response = await usersList.getUserByID(this.getToken, this.userId);
      this.userDetails = response.data;

      if (response) {
        // Success message for the Correct Request 
        this.$toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      this.$toast.error(error);
    }
  },
  methods: {
    updateUser: async function () {
      //  update the  user Details 
      let response = await usersList.updateUserByID(
        this.getToken,
        this.userId,
        this.userDetails.user[0]
      );
      console.log(response.data.message)
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
/* CSS Styles  */
 .editUser {
  width: 80%;
  margin: 20px auto;
  padding: 25px;
  box-shadow: 10px 5px 20px  rgb(0, 0, 0);
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  background: rgb(237, 235, 235);
}

.mainDiv {
  margin-top: 100px;
}

.label {
  font-size: 20px;
  margin-bottom: 5px;
  /* margin-top: 10px; */
}

.inputValue , .selected {
  height: 50px;
  font-weight: 900;
  /* border: 1px solid black; */
  box-shadow: 3px 3px 10px black ;
  width: 100%;
  border-radius: 5px;
}

.inputValue:hover {
     border: 1px solid black;
}



.row{
  margin: 40px;
} 


</style>