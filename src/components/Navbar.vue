<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">CanoeTournament</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Inicio</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/torneos" class="nav-link">Torneos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/equipos" class="nav-link">Equipos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/jugadores" class="nav-link">Jugadores</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        name: "NavBar",
        components: {

        },
        data() {
            return {}
        },
        methods: {

        }
    }
</script>