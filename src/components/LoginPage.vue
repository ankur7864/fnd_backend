<template>
  <div id="home">
    <NavBar class="nav-bar" />
    <div class="container logindiv">
      <h1 class="text-center text-primary">LOGIN</h1>

      <!-- Login form  -->
      <form @submit.prevent="onLogin">

        <!-- User ID -->
        <div class="form-group m-3">
          <label for="userId">UserID :</label>
          <input
            v-model.trim="$v.userId.$model"
            type="text"
            class="form-control inputField"
            :class="{
              'is-valid': !$v.userId.$invalid,
              'is-invalid': $v.userId.$error,
            }"
            id="userId"
            aria-describedby="emailHelp"
            placeholder="Enter UserID"
          />
          <div class="invalid-feedback">
            <span v-if="!$v.userId.required">UserID is required !</span>
          </div>
        </div>

        <!-- Password -->
        <div class="form-group m-3">
          <label for="password">Password :</label>
          <input
            v-model.trim="$v.password.$model"
            type="password"
            class="form-control inputField"
            :class="{
              'is-valid': !$v.password.$invalid,
              'is-invalid': $v.password.$error,
            }"
            id="password"
            placeholder="Password"
          />

          <div class="invalid-feedback">
            <span v-if="!$v.password.required">Password is required !</span>
            <span v-else-if="!$v.password.minLength">
              Password should contain
              {{ $v.password.$params.minLength.min }} Minimum character.</span
            >
          </div>
        </div>

        <button type="submit" class="btn btn-primary m-3">Submit</button>
        <p class="float-end">
          Already have an Account ?
          <router-link to="/signup" class="text-decoration-none"> Signup </router-link>
        </p>
      </form>

      <hr />
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginPage",
  components: {
    NavBar,
  },
  data() {
    return {
      userId: "",
      password: "",
    };
  },

  // Validations for the fields 
  validations: {
    userId: {
      required,
    },

    password: {
      required,
      minLength: minLength(8),
    },
  },

  // Receiving data from the Vuex Store 
  computed: {
    ...mapGetters(["userMessage"]),
  },

  methods: {
    ...mapActions(["login"]),

    async onLogin() {
      const data = {
        userId: this.userId,
        password: this.password,
      };
      console.log(data);

        // Toast Validations for Field's not provided
      if (!this.userId) {
        this.$toast.error("UserID Not Provided !");
      } else if (!this.password) {
        this.$toast.error("password not provided !");
      }

      const response = await this.login(data);

      console.log("msg : ", response);

    
      if (response.data.status == 200) {
        
        /** if the user is CUSTOMER */
        if (response.data.user.userType === "CUSTOMER") {
          this.$toast.success(this.userMessage);
          setTimeout(() => {
            this.$router.push("/customers/tickets");
          }, 1000);
        } /** ADMIN */
        else if (response.data.user.userType === "ADMIN") {
          this.$toast.success(this.userMessage);
          setTimeout(() => {
            this.$router.push("/admin/users");
          }, 1000);
        } /** ENGINEER */
        else if( response.data.user.userType === "ENGINEER"){
           this.$toast.success(this.userMessage);
          setTimeout(() => {
            this.$router.push("/engineer");
          }, 1000);
        }
      } else {
        this.$toast.error( response.data );
      }
    },
  },
};
</script>

<style scoped>
span {
  font-weight: 900;
  font-size: 18px;
  position: relative;
  cursor: pointer;
}

.logindiv{
  box-shadow: 10px 10px 10px black;
}

.dialogbox {
  display: flex;
  justify-content: space-between;
  height: 60px;
}

.none {
  display: none;
}

.error {
  border: 1.5px solid rgb(255, 9, 9);
  color: rgb(247, 10, 10);
}
.success {
  border: 1.5px solid rgb(55, 161, 14);
  color: rgb(26, 82, 4);
}

#home {
  height: 100vh;
  background:  rgb(60, 108, 228);

}

h1 {
    text-shadow: 3px 3px 3px black;
}
.container {
  /* box-shadow: 3px 2px 10px black; */
  background: rgb(223, 223, 223);
  width: 50%;
  border: 1px solid rgb(21, 42, 87);
  border-radius: 10px;
  margin-top: 50px;
  box-shadow: 3px 2px 10px rgb(154, 158, 163);
}

.login-heading {
  width: 100%;
  background: rgb(176, 36, 36);
  font-weight: 900;
}

h1 {
  margin-top: 20px;
  font-weight: bolder;
}

label {
  font-size: 20px;
  font-weight: 900;
}
.inputField {
  margin-top: 10px;
  height: 50px;
  border: 1px solid black;
  box-shadow: 2px 1px 7px black;
  font-weight: 900;
}

input::placeholder,
p {
  font-weight: 600;
}

.nav-bar {
  height: 150px;
}

@media screen and (max-width: 768px) {
  #home {
    height: 800px;
  }

  .container {
    height: 400px;
    width: 90%;
    margin-top: 50px;
    box-shadow: 3px 3px 10px black;
  }
}
</style>