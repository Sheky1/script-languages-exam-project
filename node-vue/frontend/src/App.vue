<template>
    <div id="app">
        <b-container class="main-container">
            <b-row>
                <b-col lg="12"> <router-view /></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.main-container {
    background-color: whitesmoke;
    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
    -moz-box-shadow: 3px 3px 5px 6px #ccc;
    box-shadow: 3px 3px 5px 6px #ccc;
    padding-top: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 30px;
}
.buttons {
    margin-bottom: 30px;
}
</style>
