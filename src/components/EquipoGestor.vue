<template>
    <div class="container-fluid main-panel mt-5">
        <div class="content-wrapper pt-4">
            <div class="row">
                <div class="col-md-4 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Crear Equipo</h4>
                            <div>
                                <div class="form-group">
                                    <input type="text" name="nombre" class="form-control" placeholder="Nombre del equipo" v-model="datosNuevoEquipo.nombre"/>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="email" class="form-control" placeholder="Email de contacto" v-model="datosNuevoEquipo.email"/>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="logo" class="form-control" placeholder="Logo" v-model="datosNuevoEquipo.logo"/>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success btn-block" @click="addEquipo">Guardar</button>
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
                                                <button class="btn btn-primary btn-circle btn-circle-sm m-1"><i class="fas fa-edit"></i></button>
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
</template>

<script>

    export default {
        name: 'EquipoGestor',
        data (){
            return {
                equipos: [],
                datosNuevoEquipo: {
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
                    this.listarEquipos();
                }
                catch(error) {
                    console.log(error);
                }
            }
        }
    }
</script>
