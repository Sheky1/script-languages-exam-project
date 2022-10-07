<template>
    <div>
        <b-container>
            <b-row>
                <b-col lg="12"
                    ><b-nav tabs align="center" style="margin-bottom: 20px">
                        <router-link to="/home"
                            ><b-button variant="outline-primary"
                                >Home</b-button
                            ></router-link
                        >
                        <router-link to="/new-entity"
                            ><b-button variant="outline-secondary"
                                >Add note/todo</b-button
                            ></router-link
                        >
                        <b-button
                            variant="outline-primary"
                            v-on:click="onLogout()"
                            >Logout</b-button
                        >
                    </b-nav>
                    <router-view
                /></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router";

export default {
    name: "Header",
    methods: {
        ...mapActions(["logout"]),
        onLogout() {
            this.logout();
            router.push({ path: `/` });
        },
    },
};
</script>

<style></style>
