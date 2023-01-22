<template>
  <div>
    <AdminNavBar />
    <h1 class="text-center text-primary ">View USER</h1>
   
    <div class="updateForm bg-success text-center ">
      <div class="card text-center">
        <div class="card-header fw-bold"><h2> Profile</h2></div>
        <div class="card-body">
            <!-- Show details of the users -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item" > <span >Name :</span> <b>{{ userDetails.data.user[0].name }}</b></li>
            <li class="list-group-item fw-100"><span>UserID :</span>{{ userDetails.data.user[0].userId }}</li>
            <li class="list-group-item"><span>EmailID : </span>{{ userDetails.data.user[0].email }}</li>
            <li class="list-group-item"><span>UserType : </span>{{ userDetails.data.user[0].userType }}</li>
            <li class="list-group-item text-success fw-bold" v-if="userDetails.data.user[0].userStatus === 'APPROVED'"><span class="text-dark">UserStatus : </span>{{ userDetails.data.user[0].userStatus }}</li>
            <li class="list-group-item text-danger fw-bold" v-else><span class="text-dark">UserStatus : </span>{{ userDetails.data.user[0].userStatus }}</li>
          </ul>
        </div>
        <div class="card-footer">
          <button class="btn text-primary"><router-link class="text-decoration-none fw-bold" :to="`/admin/users`">BACK</router-link></button>

        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { usersList } from "@/services/Users";
import AdminNavBar from "./AdminNavBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "ViewUser",
  data() {
    return {
      userId: this.$route.params.userId,
      userDetails: [],
    };
  },
  components: {
    AdminNavBar,
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  created: async function () {
    let response = await usersList.getUserByID(this.getToken, this.userId);
    this.userDetails = response;
    this.$toast.success(this.userDetails.data.message);
    console.log(response);
  },
};
</script>

<style>
.updateForm {
  margin-top: 50px;
  width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card {
  box-shadow: 3px 3px 10px 3px black;
}
.card-header {
  background: rgb(161, 159, 159);
}

</style>