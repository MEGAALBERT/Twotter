<template>
    <div class='twoot-item' @click='favouriteTwoot(twoot.id)'>
        <div class='user-profile__twoot'>
            <div class="twoot-item__user">
                @{{username}}
            </div>
            <div class='twoot-item__content'>
                @{{twoot.content}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"TwootItem",
    props: { // props must have this information always
        username: {
            type: String,
            required: true,
        },
        twoot: {
            type: Object,
            require: true,
        }
    },
    methods: {
        favouriteTwoot(id){ // with emit we are calling a prop from father to child and running a function
            this.$emit('favourite', id)
        }
    }
}
</script>

<style>
.twoot-item {
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #0FE3E8;
    box-sizing:  border-box;
    cursor: pointer;
    transition: all 0.25s ease;
    
}

.twoot-item:hover {
    transform: scale(1.1, 1.1)
}

.twoot-item__user {
    font-weight: bold;
}

</style>