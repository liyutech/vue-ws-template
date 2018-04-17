<template>
  <div>
    <navTpl></navTpl>
    <div class="chat chat-box center">
    <div v-for="m in messages" class="message" v-bind:class="textAlign(m)">{{ display(m.content)}}</div>
    </div>
    <div class="chat center">
      <button class="enter btn btn-md btn-success float-right" @click="submit(content)"><i class="fa fa-comments"/></button>
      <input type="text" class="chattextbox form-control margin-bottom" placeholder="Type message here..." v-model ='content' required="true" autofocus="true" id="chatbox" @keyup.enter="submit(content)">
    </div>
  </div>
</template>

<script>
  import navTpl from "@/components/NavTpl"
  export default {
    name: "chat",
    components: {
      navTpl
    },
    created() {
      if(this.$root.user.name == '') {
        this.$router.push({path: '/'});
      }
    },
    data() {
      return {
        messages: [],
        message: {
          user: this.$root.user.name,
          content: '',
          time: ''
        },
        user: this.$root.user.name,
        content: ''
      }
    },
    methods: {
      textAlign(m) {
        if (m.user === this.user) {
          return 'messageRight';
        }
        else if(m.user === 'admin') {
          return 'messageCenter';
        }
        return 'messageLeft';
      },
      submit(content) {
        console.log('About to email message: ', this.message)
        this.message.content = content;
        this.$socket.emit('chat', this.message);
        this.content = '';
      },
      display(m) {
        return m;
      }
    },
    sockets: {
        connect() {
          const currentUser = this.user;
          this.messages.push({user: 'admin', content: currentUser + ' has connected.', date: ''});
          console.log(currentUser + ' has connected.');
        },
        chat(msg) {
          console.log('Received message from server:', msg);
          this.messages.push(msg);
        }
    }
  }

</script>
