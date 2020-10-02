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
        <CreateTwootPanel @add-twoot='addTwoot'/>
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

<script scoped>
import TwootItem from "./TwootItem"
import CreateTwootPanel from "./CreateTwootPanel"

export default {
    name: 'UserProfile',
    components: {
        TwootItem,
        CreateTwootPanel
    },
    data() { // function to return data/variables that is used in state in our app
    return {
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
  methods: { // functions to use in component
    addTwoot(twoot){
      this.user.twoots.unshift( { id: this.user.twoots.length + 1, content: twoot })
}
  },
}
</script>

<style lang="scss" scoped>

.user-profile {
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 50px;
    padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #0FE3E8;

    h1{
      margin: 0;
    }

    .user-profile__admin-badge{
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }

    .user-profile__twoots-wrapper {
    display: grid;
    grid-gap: 10px
    }
  }

  .user-profile__create-twoot {
    display:flex;
    flex-direction: column;
    padding-top: 20px;

    &.exceeded {
      color: red;
      border-color: red;

      button {
        background-color: red;
        border : none;
        color: white;
      }
    }
  }
}



</style>