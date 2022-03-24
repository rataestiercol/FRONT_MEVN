<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">CanoeTournament</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/torneos">Torneos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/equipos">Equipos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/jugadores">Jugadores</a>
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
            
        },
        methods: {

        }
    }
</script>