<template>
  <div id="userspage">
    <AdminNavBar />
    
    <div class="page">
      <h3 class="text-center text-light">Authenticated Users List </h3>

      <!-- <pre>{{ usersList.data.users[0] }} </pre> -->


      <div class="user-search d-flex justify-content-between">
        <!-- Total number of lists  -->
        <div class="totalusers btn bg-light fw-bold">
          Total Users :
          <span class="text-secondary">
            {{ usersList.data.users ? usersList.data.users.length : 0 }}</span
          >
        </div>
        <br />
        <!-- Apply filer on status and userType  -->
        <div class="searchFilter">
          <h5 class="text-center text-light fw-bold p-1">FILTER RESULT</h5>
          <form class="text-center" @submit.prevent="searchFilter">
            <!-- Added filter on status  -->
            <select name="" class="searchUserType fw-bold" v-model="status">
              <option value="" class="fw-bold bg-dark text-light">
                -- select status --
              </option>
              <option
                v-for="currStatus in userStatus"
                class="fw-bold"
                :key="currStatus.id"
                :value="currStatus.status"
              >
                {{ currStatus.status }}
              </option>
            </select>
            <!-- Added filter on user type -->
            <select name="" class="searchUserType fw-bold" v-model="usertype">
              <option value="" class="fw-bold bg-dark text-light">
                -- user type --
              </option>
              <option
                v-for="type in userType"
                class="fw-bold"
                :key="type.id"
                :value="type.status"
              >
                {{ type.status }}
              </option>
            </select>
            <button class="btn btn-sm btn-success">search</button>
          </form>
        </div>
      </div>

      <!-- show if the list  has no user  -->
      <div
        v-if="usersList.data.message == 'No user found !'"
        class="emptyTickets usernotFound"
      >
        <p class="text-center">
          No user found !  
        </p>
      </div>

      <div
        v-else
        class="users p-2"
        v-for="user in usersList.data.users"
        :key="user.userId"
      >
        <div class="userslist container">
          <div class="username divRow d-flex justify-content-between">

            <!-- User name -->
            <h1 class="name">{{ user.name ? user.name : "" }}</h1>
            <div class="buttons d-flex justify-content-between">
              <button class="delete btn btn-sm fw-bold">
                <!-- view user  -->
                <router-link
                  :to="`/admin/users/${user.userId}`"
                  class="text-decoration-none"
                  >View</router-link
                >
              </button>
              <button class="edit btn btn-sm fw-bold">
                <!-- Edit user  -->
                <router-link
                  :to="`/admin/users/${user.userId}/edit`"
                  class="text-decoration-none"
                  >Edit</router-link
                >
              </button>
            </div>
          </div>

          <!-- user Type  -->
          <div class="usersValue divRow d-flex justify-content-between">
            <p class="userId text-secondary">
              {{ user.userType ? user.userType : "" }}
            </p>
            <p class="email text-secondary">
              <span class="text-dark"> Email : </span
              >{{ user.email ? user.email : "" }}
            </p>
          </div>

          <!-- User ID -->
          <div class="usersTypes divRow d-flex">
            <p class="userType col-md-6">
              <span> USER-ID : </span>{{ user.userId ? user.userId : "" }}
            </p>
            <p
              class="userStatus col-md-6 fw-bolder text-success"
              v-if="user.userStatus == 'APPROVED'"
            >
              <span class="text-dark fw-bold">STATUS : </span
              >{{ user.userStatus ? user.userStatus : "" }}
            </p>

            <p
              class="userStatus col-md-6 fw-bolder text-danger"
              v-else-if="user.userStatus == 'PENDING'"
            >
              <span class="text-dark">STATUS : </span
              >{{ user.userStatus ? user.userStatus : "" }}
            </p>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdminNavBar from "./AdminNavBar.vue";
import { usersList } from "@/services/Users";

export default {
  name: "UsersList",
  components: {
    AdminNavBar,
  },

  data() {
    return {
      usersList: [],
      status: "",
      usertype: "",

      userStatus: [
        { id: 1, status: "APPROVED" },
        { id: 2, status: "PENDING" },
        { id: 3, status: "REJECTED" },
      ],

      userType: [
        { id: 1, status: "CUSTOMER" },
        { id: 2, status: "ENGINEER" },
        { id: 3, status: "ADMIN" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    async searchFilter() {
      // Added filters and search the results 
      if (this.status != "" || this.usertype != "") {
        var response = await usersList.listOfUsers(
          this.getToken,
          this.status,
          this.usertype
        );
      }
      this.usersList = response;
      this.$toast.success(this.usersList.data.message);
      console.log("search : ", response);
    },
  },
  created: async function () {
    // Fetching the list of the users
    var response = await usersList.listOfUsers(this.getToken);
    this.usersList = response;
    this.$toast.success(this.usersList.data.message);
    console.log("Res : ", response);
  },
};
</script>

<style>
.user-search {
  height: 50px;
  margin: 30px 60px;
  border-radius: 10px;
}
.searchFilter {
  width: 50%;
  height: 80px;
  background-color: rgb(35, 104, 154);
  border-radius: 3px;
  box-shadow: 2px 2px 3px black;
  /* border-bottom-right-radius: 3px; */
  /* margin-bottom: 20px; */
}
.searchUserType {
  margin: 5px 10px;
  width: 30%;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
}
.page {
  margin-top: 65px;
  background: rgb(63, 107, 231);
}

.usernotFound{
  background: rgb(118, 151, 240);

}

.totalusers {
  /* margin-left: 35px; */
  text-align: center;
  padding: 20px;
}

.nouser {
  width: 30%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
}

.userslist {
  height: 230px;
  background: rgb(255, 255, 255);
  box-shadow: 2px 2px 2px 2px rgb(203, 200, 200);
  border-radius: 4px;
}

.name {
  font-weight: bold;
  padding: 14px 0px 0px 14px;
}

.userId {
  font-weight: 900;
  padding-left: 14px;
  font-size: 25px;
  margin-top: 1px;
}

.email {
  font-size: 20px;
  font-weight: 900;
  padding-left: 14px;
}
.userType,
.userStatus {
  padding-left: 14px;
  font-weight: 900;
}

.notFound {
  text-align: center;
}
span {
  font-weight: 900;
}
.buttons {
  width: 130px;
  font-weight: 900;
}
.users {
  background: rgb(73, 112, 240);
}

@media screen and (max-width: 768px) {
  .usersValue {
    display: flex;
    flex-wrap: wrap;
  }

  .usersTypes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .divRow {
    margin-top: 50px;
  }
}
</style>