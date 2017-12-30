<template>
    <tr>
                 <td ><input type="checkbox" v-model="checkChanged" > </td>
                 <td><input type="text" v-model="title"></td>
                 <td><el-button type="primary"  v-on:click="updateTitle(todo._id)">update Title</el-button>
                 <el-button type="danger"  v-on:click="remove">delete</el-button>
                 </td>
    </tr>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  props: ["todo"],
  data() {
    return {
        title:this.todo.title
    };
  },
  computed:{
      checkChanged : {
          get (){
              return this.todo.completed
          },
          set(checked){
              console.log(checked)
                this.completed = true;
      let token = localStorage.getItem("token");
      axios
        .put(
          `http://localhost:3000/api/todos/${this.todo._id}/markcompleted`,
          { completed:checked ?'1':'0'},
          {
            //ntar msukin id dipath
            headers: { Authorization: token }
          }
        )
        .then(response => {
          console.log(response.data);
          console.log("data has been update in completed");
        })
        .catch(err => {
          console.log(err);
        });
          }
      }
  },
  methods: {
    remove: function() {
      let token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:3000/api/todos/${this.todo._id}`, {
          headers: { Authorization: token }
        })
        .then(response => {
          console.log("data has been deleted");
          this.$emit("todoDeleted", this.todo._id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateTitle: function(id) {
      let title = this.title;
      let token = localStorage.getItem("token");
      axios
        .put(
          "http://localhost:3000/api/todos/" + id,
          { title: title },
          {
            headers: { Authorization: token }
          }
        )
        .then(response => {
          console.log(response.data);
          console.log("data has been added");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

