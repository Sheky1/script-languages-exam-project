<template>
    <div>
        <h3 style="text-align: left">Beleske</h3>
        <b-container>
            <b-row>
                <b-col lg="6" v-for="note in notes" :key="note.id">
                    <b-card
                        :header="note.category"
                        header-tag="header"
                        :title="note.title"
                        style="margin-bottom: 15px"
                    >
                        <b-card-text>{{ note.content }}</b-card-text>
                        <b-button-group>
                            <b-button
                                variant="outline-primary"
                                v-on:click="editTodo(note.id)"
                                >Izmeni</b-button
                            >
                            <b-button
                                variant="outline-danger"
                                v-on:click="onDelete(note.id)"
                                >Obrisi</b-button
                            >
                        </b-button-group>
                    </b-card></b-col
                >
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "../router";

export default {
    name: "Notes",
    computed: {
        ...mapState(["notes", "user"]),
    },
    methods: {
        ...mapActions(["getNotes"]),
        ...mapActions(["deleteNote"]),
        makeToast(append = false) {
            this.toastCount++;
            this.$bvToast.toast(`Uspesno ste obrisali belesku!`, {
                title: "Uspesno!",
                autoHideDelay: 3000,
                variant: "success",
                appendToast: append,
            });
        },
        onDelete(id) {
            this.deleteNote(id);
            this.makeToast();
        },
        editTodo(id) {
            router.push({ path: `/note/${id}` });
        },
    },
    mounted: function() {
        this.getNotes(this.user.id);
    },
};
</script>

<style></style>
