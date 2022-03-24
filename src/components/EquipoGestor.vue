<template>
    <NavBar></NavBar>
    <div class="container-fluid main-panel mt-5">
        <div class="content-wrapper pt-4">
            <div class="row">
                <div class="col-md-4 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Crear Equipo</h4>
                            <div>
                                <div class="mb-3">
                                    <input type="text" name="nombre" class="form-control" placeholder="Nombre del equipo" v-model="datosNuevoEquipo.nombre"/>
                                </div>
                                <div class="mb-3">
                                    <input type="text" name="email" class="form-control" placeholder="Email de contacto" v-model="datosNuevoEquipo.email"/>
                                </div>
                                <div class="mb-3">
                                    <input type="text" name="logo" class="form-control" placeholder="Logo" v-model="datosNuevoEquipo.logo"/>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-success" @click="addEquipo">Guardar</button>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-sm-flex align-items-center mb-4">
                                <h4 class="card-title mb-sm-0">Lista de Equipos</h4>
                            </div>
                            <div class="table-responsive p-1">
                                <table class="table table-striped" id="listaJugadores">
                                    <thead>
                                        <tr>
                                            <th class="font-weight-bold">Nombre</th>
                                            <th class="font-weight-bold">Email contacto</th>
                                            <th class="font-weight-bold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(equipo, keyEquipo) in this.equipos" :key="keyEquipo">
                                            <td>{{equipo.nombre}}</td>
                                            <td>{{equipo.emailContacto}}</td>
                                            <td>
                                                <button class="btn btn-warning btn-circle btn-circle-sm m-1"><i class="fas fa-users"></i></button>
                                                <button class="btn btn-primary btn-circle btn-circle-sm m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="editarEquipo(equipo.id, equipo.nombre, equipo.emailContacto, equipo.logoUrl)"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-danger btn-circle btn-circle-sm m-1" @click="eliminarEquipo(equipo.id)"><i class="fas fa-trash-alt"></i></button>
                                            </td>
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
    <!-- Modal Editar Equipo-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Equipo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="mb-3">
                        <input type="text" name="nombre" class="form-control" placeholder="Nombre del equipo" v-model="popupEditar.nombre"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" name="email" class="form-control" placeholder="Email de contacto" v-model="popupEditar.email"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" name="logo" class="form-control" placeholder="Logo" v-model="popupEditar.logo"/>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="guardarEditarEquipo(popupEditar.id)">Guardar</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

    import NavBar from '@/components/Navbar'

    export default {
        name: 'EquipoGestor',
        components: {
            NavBar
        },
        data() {
            return {
                equipos: [],
                datosNuevoEquipo: {
                    nombre: "",
                    logo:  "",
                    email: ""
                },
                popupEditar: {
                    id: "",
                    nombre: "",
                    logo:  "",
                    email: ""
                }
            }
        },
        mounted() {
            this.listarEquipos();
        },
        methods: {
            async listarEquipos() {
                this.equipos = [];
                try {
                    const data = await fetch(`http://localhost:4000/equipo`, {
                        method: 'GET'
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));
                    const arrayEquipos = [];

                    resData.forEach(equipo => {
                        arrayEquipos.push({
                                            'id': equipo._id,
                                            'nombre': equipo.nombre,
                                            'logoUrl': equipo.logoUrl,
                                            'emailContacto': equipo.emailContacto
                                        });
                    });
                    this.equipos = [...this.equipos, ...arrayEquipos];
                }
                catch (error){
                    console.log(error);
                }
            },
            async eliminarEquipo(idEquipo){
                try {
                    const data = await fetch(`http://localhost:4000/equipo/${idEquipo}`, {
                        method: 'DELETE'
                    });
                    this.listarEquipos();
                    console.log(data)
                }
                catch(error) {
                    console.log(error);
                }
            },
            async addEquipo() {
                const datosEquipoGuardar = {
                    'nombre': this.datosNuevoEquipo.nombre,
                    'logoUrl': this.datosNuevoEquipo.logo,
                    'emailContacto': this.datosNuevoEquipo.email
                }
                try {
                    const data = await fetch(`http://localhost:4000/equipo`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosEquipoGuardar)
                    });
                    console.log(data)
                    this.listarEquipos();
                }
                catch(error) {
                    console.log(error);
                }
            },
            editarEquipo(idEquipo, nombre, emailContacto, logoUrl) {
                this.popupEditar.id = idEquipo
                this.popupEditar.nombre = nombre;
                this.popupEditar.logo = logoUrl;
                this.popupEditar.email = emailContacto;
            },
            async guardarEditarEquipo(idEquipo) {
                const datosEquipoEditar = {
                    'nombre': this.popupEditar.nombre,
                    'logoUrl': this.popupEditar.logo,
                    'emailContacto': this.popupEditar.email
                }

                try {
                    const data = await fetch(`http://localhost:4000/equipo/${idEquipo}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosEquipoEditar)
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));

                    console.log(resData);
                    this.listarEquipos();
                }
                catch(error) {
                    console.log(error);
                }


            }
        }
    }
</script>
