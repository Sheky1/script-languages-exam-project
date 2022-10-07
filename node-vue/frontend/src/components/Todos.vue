<template>
    <div style="margin-bottom: 30px;">
        <h3 style="text-align: left">Obaveze</h3>
        <b-list-group>
            <b-list-group-item active class="list-item"
                >Lista obaveza</b-list-group-item
            >
            <b-list-group-item
                class="list-item"
                v-for="todo in todos"
                :key="todo.id"
            >
                <div class="list-item-left">
                    {{ todo.category }} ==> {{ todo.content }}
                </div>
                <b-button-group>
                    <b-button
                        variant="outline-primary"
                        v-on:click="editTodo(todo.id)"
                        >Izmeni</b-button
                    >
                    <b-button
                        variant="outline-danger"
                        v-on:click="onDelete(todo.id)"
                        >Obrisi</b-button
                    >
                </b-button-group></b-list-group-item
            >
        </b-list-group>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "../router";

export default {
    name: "Todos",
    computed: {
        ...mapState(["todos", "user"]),
    },
    methods: {
        ...mapActions(["getTodos"]),
        ...mapActions(["deleteTodo"]),
        makeToast(append = false) {
            this.toastCount++;
            this.$bvToast.toast(`Uspesno ste obrisali obavezu!`, {
                title: "Uspesno!",
                autoHideDelay: 3000,
                variant: "success",
                appendToast: append,
            });
        },
        onDelete(id) {
            this.deleteTodo(id);
            this.makeToast();
        },
        editTodo(id) {
            router.push({ path: `/todo/${id}` });
        },
    },
    mounted: function() {
        this.getTodos(this.user.id);
    },
};
</script>

<style>
.list-item {
    display: flex !important;
    justify-content: space-between !important;
}
</style>
