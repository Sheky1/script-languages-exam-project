<template>
    <div>
        <h1 style="margin-bottom: 10px">Pregled obaveza i beleski</h1>
        <Header />
        <Todos />
        <Notes />
    </div>
</template>

<script>
import Todos from "../components/Todos";
import Notes from "../components/Notes";
import Header from "../components/Header";

export default {
    name: "Home",
    components: {
        Header,
        Todos,
        Notes,
    },
};
</script>

<style lang="scss" scoped></style>
