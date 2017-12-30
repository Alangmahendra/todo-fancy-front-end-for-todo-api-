<template>
  <el-container class="utama">
      <el-container>
        <el-header>
          <el-menu  class="el-menu-demo" mode="horizontal" router  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="{name:'HomeRoute'}">HOME</el-menu-item>
            <el-menu-item index="{name:'Login'}" v-on:click="logout">logout</el-menu-item>
          </el-menu>
          
        </el-header>
        <el-container class="input">
          <el-input  placeholder="title" v-model="title"></el-input>
          <el-button type="primary" v-on:click="add">add todo</el-button>
        </el-container>
          <el-card class="table">
            <table>
               <tr>
                 <td>is complete</td>
                 <td>title</td>
                 <td colspan="2">action</td>
               </tr>
               <todo-item v-for="todo in todoList" :key="todo._id" :todo="todo" @todoDeleted="removeTodo"/>
             </table>
          </el-card>
      </el-container>
  </el-container>
</template>


<script>
import router from '../router'
import axios from 'axios'
import TodoItem from './TodoItem'
export default {
  name: "Home",
  components:{TodoItem},
  data() {
    return {
      msg: `welcome to todo fancy`,
      title : '',
      todoList :[],
      completed:false
    };
  },
  created() {
    this.getTodos()
  },
  methods:{
    logout : function(){
      localStorage.removeItem('token')
      router.push({name:'Login'})
    },
    getTodos:function(){
      let local = this;
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/todos", {
        headers: { Authorization: token }
      })
      .then(response => {
        console.log(response.data.rows);
        local.todoList = response.data.rows;
      })
      .catch(err => {
        console.log(err);
      });
    },
    add : function(){
      let title = this.title
      let token = localStorage.getItem('token')
      axios.post('http://localhost:3000/api/todos',{title:title},{
        headers:{Authorization:token}
      })
      .then(response=>{
        let todo = response.data.rows
        console.log(todo)
      this.todoList.push(todo)
      this.title = ''

      })
      .catch(err=>{
        console.log(err)
      })
    },
    removeTodo : function(id){
      console.table(this.todoList)
     let i = this.todoList.findIndex(todo=> todo._id == id)
     console.log(i)
     return this.todoList.splice(i,1)

    }
  }
}
</script>

<style>
  .utama{
    margin:30px 40px 0 40px;
  }
  .table{
    margin-top:50px;
    align-self: center;
  }
  .input{
    padding-top: 30px;
    margin-left:100px;
    margin-right:100px
  }
</style>
