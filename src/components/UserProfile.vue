<template>
    <div class='user-profile'>
        <div class='user-profile__user-panel'>
            <h1 class='user-profile__user-name'>@{{user.username}}</h1>
            <div class='user-profile__admin-badge' v-if='user.isAdmin'>
                Admin
            </div>
            <div class='user-profile__follower-count'>
                <strong>Followers: </strong> {{followers}}
            </div>
            <form class='user-profile__create-twoot' @submit.prevent='createNewTwoot'>
              <label for='newTwoot'><strong>New Twoot</strong></label>
              <textarea id='newTwoot' rows='4' v-model='newTwootContent'/>

              <div class='user-profile__create-twoot-type'>
                <label for='newTwootType'><strong>Type:</strong></label>
                <select id='newTwootType' v-model="selectedTwootType">
                  <option :value='option.value' v-for='(option,index) in twootTypes' :key='index' >
                    {{option.name}}
                  </option>
                </select>
              </div>

              <button>
                Twoot!!
              </button>
            </form>
        </div>
        <div class='user-profile__twoots-wrapper'>
        <TwootItem v-for='twoot in user.twoots' 
        :key="twoot.id" 
        :username="user.username" 
        :twoot='twoot' 
        @favourite='toogleFavourite' />
        </div>
    </div>
</template>

<script>
import TwootItem from "./TwootItem"

export default {
    name: 'UserProfile',
    components: {
        TwootItem
    },
    data() { // function to return data/variables that is used in state in our app
    return {
      newTwootContent:'', //with v-model we are changing the value of this data
      selectedTwootType: 'instant', //with v-model we are changing the value of this data
      twootTypes: [
        {
          value: 'draft',
          name: 'Draft'
        },
        {
          value: 'instant',
          name: 'Instant Twoot'
        },
      ],
      followers: 0,
      user: {
        id: 1,
        username: 'AlbertoMedellin',
        firstname: 'Alberto',
        lastname: 'Medellin',
        email: 'albertmega@yahoox.com',
        isAdmin: true,
        twoots: [
          {
              id:1,
              content: 'Twooter is badass'
          },
          {
              id:2,
              content: 'I love videogames'
          },
                    {
              id:3,
              content: 'Eating some Tacos'
          },
      ]
      },
    }
  },
  watch: { //when data changes you can run functions, the function must be called the same as the variable
    followers(newFollowerCount, oldFollowerCount) {
        if(oldFollowerCount<newFollowerCount){
          console.log(`${this.user.username} has gained a follower`)
        }
    }
  },
  computed: { // functions that catch information and can be called in the component
    fullName(){
      return `${this.user.firstname} ${this.user.lastname}` // to fetch the user object username
    }
  },
  methods: { // functions to use in component
    followUser () {
      this.followers++
    },
    toogleFavourite(id){
      console.log(`Favourited Twoot #${id}`)
    },
    createNewTwoot(){
      if(this.newTwootContent && this.selectedTwootType !== 'draft'){
        this.user.twoots.unshift({ // adding another twoot
          id: this.user.twoots.length + 1,
          content: this.newTwootContent,
        })
      }
      this.newTwootContent = '';
    },
  },
  mounted() { // this runs whenever the component is loaded for the first time, much like useEffect in React
  this.followUser();
  }
}
</script>

<style>
.user-profile {
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 50px;
    padding: 50px 5%;
}

.user-profile__user-panel {
display: flex;
flex-direction: column;
margin-right: 50px;
padding: 20px;
background-color: white;
border-radius: 5px;
border: 1px solid #0FE3E8;
}

.user-profile__admin-badge{
    background: rebeccapurple;
    color: white;
    border-radius: 5px;
    margin-right: auto;
    padding: 0 10px;
    font-weight: bold;
}

h1{
    margin: 0;
}

.user-profile__twoots-wrapper {
    display: grid;
    grid-gap: 10px
}

.user-profile__create-twoot {
  display:flex;
  flex-direction: column;
  padding-top: 20px;
}

</style>