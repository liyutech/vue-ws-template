<template>
  <div>
    <navTpl></navTpl>
    <div class="margin-left30">
      <div class="inner-addon left-addon col-lg-6 marginTop10" v-model="DisplayModel">
        <i class="fa fa-user"></i>
        <input type="text" class="form-control margin-bottom" placeholder="Please enter your name" required="true" autofocus="true"
               name="User" v-model=DisplayModel.name @keyup.enter="login()">
        <button id="loginButton" class="btn btn-md btn-success float-center margin-top" @click="login()">
          Enter Chat Room
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import navTpl from "@/components/NavTpl"

  export default {
    name: 'home',
    components: {navTpl},
    data() {
      return {
        DisplayModel: {
          name: ''
        }
      }
    },
    methods: {
      login() {
        if(this.DisplayModel.name !== '') {
          this.$socket.emit('connection', this.DisplayModel.name);
        }
      },
      toggleVisibility(n) {
        if(n === '') {
          return 'display';
        }
        return 'hidden';
      }
    },
    sockets: {
      connection(msg) {
        if(msg == 'Successfully logged on!') {
          this.$root.user.name = this.DisplayModel.name;
          console.log(this.DisplayModel.name + ' logged on');
          this.$router.push({path: '/chat'});
        }
        else {
          alert("Username taken.");
        }
      }
    }
  }
</script>

