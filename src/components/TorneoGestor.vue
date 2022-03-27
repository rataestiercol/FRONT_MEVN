<template>
    <NavBar></NavBar>
    <div class="container-fluid main-panel mt-5">
        <div class="content-wrapper pt-4">
            <div class="row">
                <div class="col-md-4 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Crear Torneo</h4>
                            <div>
                                <div class="mb-3">
                                    <input type="text" name="nombre" class="form-control" placeholder="Nombre del Jugador"/>
                                </div>
                                <div class="mb-3">
                                    <input type="text" name="fechaNacimiento" class="form-control" placeholder="Fecha de nacimiento"/>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="button" class="btn btn-success">Guardar</button>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-sm-flex align-items-center mb-4">
                                <h4 class="card-title mb-sm-0">Lista de Torneos</h4>
                            </div>
                            <div class="table-responsive p-1">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th class="font-weight-bold">Nombre</th>
                                            <th class="font-weight-bold">Fecha de Nacimiento</th>
                                            <th class="font-weight-bold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>    
</template>

<script>

    import NavBar from '@/components/Navbar'

    export default {
        name: 'JugadorGestor',
        components: {
            NavBar
        },
        data() {
            return {
            
            }
        },
        mounted() {
        
        },
        methods: {

        }
    }
</script>