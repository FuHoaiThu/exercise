<template>
    <div id="app">
        <div class="multi-form">
            <MultiForm></MultiForm>
        </div>
    </div>
</template>

<script>
    import MultiForm from './components/multiForm.vue'

    export default {
        name: 'App',
        components: {
            MultiForm
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
    *,
    body {
        padding: 0;
        margin: 0;
    }
    html {
        font-size: 16px;
    }
    body {
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        color: #000;
    }
    p {
        margin: 0;
    }
    .row {
        margin-left: 0;
        margin-right: 0;
    }
</style>
