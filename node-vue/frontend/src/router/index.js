import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Home from "../pages/Home.vue";
import Todo from "../pages/Todo.vue";
import Note from "../pages/Note.vue";
import NewEntity from "../pages/NewEntity.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/note/:id",
        name: "note",
        component: Note,
    },
    {
        path: "/todo/:id",
        name: "todo",
        component: Todo,
    },
    {
        path: "/new-entity",
        name: "new-entity",
        component: NewEntity,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
