<template>
  <div class="home">
    <h2>Hello, this is top 10 features on vue <b-badge>new</b-badge></h2>
    <exampleForm defaultMsg="hello" />
    <div class="counter">{{ count }}</div>
    <b-button class="mb-2" @click="increment" variant="primary">increment + 1</b-button>
    <b-container>
      <b-row>
        <b-list-group class="col-md-10">
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            v-for="user in users"
            :key="user.id"
          >
            {{ user.name }}
            <div>
              <b-button
                class="mr-2"
                variant="success"
                @click="toogleUpdateForm(user.name)"
              >
                Update
              </b-button>
              <b-button variant="danger" @click="deleteRecord(user._id)">
                Delete
              </b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
        <transition name="slide-fade">
          <b-form
            id="updateForm"
            class="col-md-2 mt-2"
            v-if="updateFormShow"
            @submit.prevent="updateRecord"
          >
            <b-form-group label="Name" label-for="updateName">
              <b-form-input
                id="updateName"
                v-model="updateName"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </b-form>
        </transition>
      </b-row>
      <h2>Form</h2>
      <b-form @submit.prevent="sendData">
        <b-form-group label="Name:" label-for="name">
          <b-form-input
            v-model="name"
            id="name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email:" label-for="email">
          <b-form-input
            v-model="email"
            id="email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Adress:" label-for="address">
          <b-form-input
            v-model="address"
            id="address"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Gender:">
          <b-form-radio v-model="gender" value="male" required
            >Male</b-form-radio
          >
          <b-form-radio v-model="gender" value="female" required
            >Female</b-form-radio
          >
        </b-form-group>
        <b-button type="submit" class="send" value="Send" variant="primary"
          >Send</b-button
        >
      </b-form>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import exampleForm from "@/components/Form.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    exampleForm
  },
  data: function() {
    return {
      name: "",
      email: "",
      address: "",
      gender: "",
      users: [],
      updateFormShow: false,
      updateName: ""
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    increment() {
      return this.$store.commit("increment");
    },
    async sendData() {
      await axios({
        url: "http://localhost:3000/api/records",
        method: "post",
        data: {
          name: this.name,
          email: this.email,
          address: this.address,
          gender: this.gender
        }
      });
      this.getData();
    },
    async getData() {
      const userList = await axios({
        url: "http://localhost:3000/api/records",
        method: "get"
      });
      this.users = userList.data;
    },
    async deleteRecord(id) {
      await axios({
        url: "http://localhost:3000/api/records/" + id,
        method: "delete"
      });
      this.getData();
    },
    toogleUpdateForm: function(name) {
      console.log(name);
      this.updateName = name;
      this.updateFormShow = !this.updateFormShow;
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
