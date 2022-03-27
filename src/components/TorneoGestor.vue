<template>
    <NavBar></NavBar>
    <div class="container-fluid main-panel mt-5">
        <div class="content-wrapper pt-4">
            <div class="row">
                <div class="col-md-6 grid-margin stretch-card">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h4 class="card-title">Crear Torneo</h4>
                            <div>
                                <div class="mb-3">
                                    <input type="text" name="nombre" class="form-control" v-model="datosNuevoTorneo.nombre" placeholder="Nombre del Torneo"/>
                                </div>
                                <div class="mb-3">
                                    <input type="text" name="fechaNacimiento" class="form-control" v-model="datosNuevoTorneo.lugar" placeholder="Lugar de celebración"/>
                                </div>
                                <div class="mb-3">
                                    <input type="text" name="fechaNacimiento" class="form-control" v-model="datosNuevoTorneo.fecha" placeholder="Fecha"/>
                                </div>
                                <div class="mb-3">
                                    <input type="number" name="fechaNacimiento" class="form-control" v-model="datosNuevoTorneo.numCampos" placeholder="Nª campos"/>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="button" class="btn btn-success" @click="addTorneo">Guardar</button>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div class="list-group">
                        <a v-for="(torneo, keyTorneo) in torneos" :key="keyTorneo" href="#" class="list-group-item list-group-item-action" aria-current="true" @click="gestionarTorneo(torneo.id)">
                            <div class="d-flex w-100 justify-content-between mb-2">
                                <h5 class="mb-1">{{torneo.nombre}}</h5>
                                <small>{{torneo.fecha}}</small>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1">{{torneo.lugar}}</h6>
                                <div>
                                    <button class="btn btn-primary btn-circle btn-circle-sm m-1" data-bs-toggle="modal" data-bs-target="#editarTorneo" @click="editarTorneo(torneo.id, torneo.nombre, torneo.lugar, torneo.fecha, torneo.numCampos)"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger btn-circle btn-circle-sm m-1" @click="eliminarTorneo(torneo.id)"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </div>    
                        </a>
                    </div>


                </div>
                <div class="col-md-6 grid-margin stretch-card">

                </div>
            </div>            
        </div>
    </div>

    <!-- Modal Editar Torneo-->
    <div class="modal fade" id="editarTorneo" tabindex="-1" aria-labelledby="editarTorneoLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editarTorneoLabel">Editar Equipo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="mb-3">
                        <input type="text" name="nombre" class="form-control" v-model="popupEditar.nombre" placeholder="Nombre del Torneo"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" name="fechaNacimiento" class="form-control" v-model="popupEditar.lugar" placeholder="Lugar de celebración"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" name="fechaNacimiento" class="form-control" v-model="popupEditar.fecha" placeholder="Fecha"/>
                    </div>
                    <div class="mb-3">
                        <input type="number" name="fechaNacimiento" class="form-control" v-model="popupEditar.numCampos" placeholder="Nª campos"/>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="guardarEditarTorneo(popupEditar.id)">Guardar</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
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
                torneos: [],
                datosNuevoTorneo: {
                    nombre: "",
                    lugar:  "",
                    fecha: "",
                    numCampos: ""
                },
                popupEditar: {
                    id: "",
                    nombre: "",
                    lugar:  "",
                    fecha: "",
                    numCampos: ""
                }
            }
        },
        mounted() {
            this.listarTorneos();
        },
        methods: {
            async listarTorneos() {
                this.torneos = [];
                try {
                    const data = await fetch(`http://localhost:4000/torneos`, {
                        method: 'GET'
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));
                    const arrayTorneos = [];

                    resData.forEach(torneo => {
                        arrayTorneos.push({
                                        'id': torneo._id,
                                        'nombre': torneo.nombre,
                                        'lugar': torneo.lugar,
                                        'fecha': torneo.fecha,
                                        'numCampos': torneo.numCampos
                                        });
                    });
                    this.torneos = [...this.torneos, ...arrayTorneos];
                }
                catch (error){
                    console.log(error);
                }
            },
            async addTorneo() {
                console.log("GUARDANDO TORNEO")
                const datosTorneoGuardar = {
                    'nombre': this.datosNuevoTorneo.nombre,
                    'lugar':  this.datosNuevoTorneo.lugar,
                    'fecha': this.datosNuevoTorneo.fecha,
                    'numCampos': this.datosNuevoTorneo.numCampos
                }

                try {
                    const data = await fetch(`http://localhost:4000/torneos`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosTorneoGuardar)
                    });
                    console.log(data)
                    this.listarTorneos();
                }
                catch(error) {
                    console.log(error);
                }
            },
            async eliminarTorneo(idEquipo){
                console.log(idEquipo)
                try {
                    const data = await fetch(`http://localhost:4000/torneos/${idEquipo}`, {
                        method: 'DELETE'
                    });
                    this.listarTorneos();
                    console.log(data)
                }
                catch(error) {
                    console.log(error);
                }
            },
            editarTorneo(idTorneo, nombre, lugar, fecha, numCampos) {
                this.popupEditar.id = idTorneo
                this.popupEditar.nombre = nombre;
                this.popupEditar.lugar = lugar;
                this.popupEditar.fecha = fecha;
                this.popupEditar.numCampos = numCampos;
            },
            async guardarEditarTorneo(idTorneo) {
                const datosTorneoEditar = {
                    'nombre': this.popupEditar.nombre,
                    'lugar': this.popupEditar.lugar,
                    'fecha': this.popupEditar.fecha,
                    'numCampos': this.popupEditar.numCampos
                }
                try {
                    const data = await fetch(`http://localhost:4000/torneos/${idTorneo}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosTorneoEditar)
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));

                    console.log(resData);
                    this.listarTorneos();
                }
                catch(error) {
                    console.log(error);
                }
            },
            gestionarTorneo(idTorneo) {
                console.log(idTorneo)
            }
        }
    }
</script>