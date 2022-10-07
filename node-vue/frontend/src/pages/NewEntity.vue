<template>
    <div>
        <h1 style="margin-bottom: 10px">Dodavanje obaveza i beleski</h1>
        <Header />
        <NewTodo />
        <hr />
        <NewNote />
    </div>
</template>

<script>
import NewTodo from "../components/NewTodo";
import NewNote from "../components/NewNote";
import Header from "../components/Header";

export default {
    name: "NewEntity",
    components: {
        Header,
        NewTodo,
        NewNote,
    },
};
</script>

<style lang="scss" scoped></style>
