<template>
    <NavBar></NavBar>
    <div class="container-fluid main-panel mt-5">
        <div class="content-wrapper pt-4">
            <div class="row">
                <div class="col-md-4 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Crear Jugador</h4>
                            <div>
                                <div class="mb-3">
                                    <input type="text" name="nombre" class="form-control" placeholder="Nombre del Jugador" v-model="datosNuevoJugador.nombre"/>
                                </div>
                                <div class="mb-3">
                                    <input type="text" name="fechaNacimiento" class="form-control" placeholder="Fecha de nacimiento" v-model="datosNuevoJugador.fechaNacimiento"/>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-success" @click="addJugador">Guardar</button>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-sm-flex align-items-center mb-4">
                                <h4 class="card-title mb-sm-0">Lista de Jugadores</h4>
                            </div>
                            <div class="table-responsive p-1">
                                <table class="table table-striped" id="listaJugadores">
                                    <thead>
                                        <tr>
                                            <th class="font-weight-bold">Nombre</th>
                                            <th class="font-weight-bold">Fecha de Nacimiento</th>
                                            <th class="font-weight-bold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(jugador, keyJugador) in this.jugadores" :key="keyJugador">
                                            <td>{{jugador.nombre}}</td>
                                            <td>{{jugador.fechaNacimiento}}</td>
                                            <td>
                                                <button class="btn btn-warning btn-circle btn-circle-sm m-1" data-bs-toggle="modal" data-bs-target="#popupAddEquipos" @click="addEquipos(jugador.id)"><i class="fas fa-users"></i></button>
                                                <button class="btn btn-primary btn-circle btn-circle-sm m-1" data-bs-toggle="modal" data-bs-target="#editarJugador" @click="editarJugador(jugador.id, jugador.nombre, jugador.fechaNacimiento)"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-danger btn-circle btn-circle-sm m-1" @click="eliminarJugador(jugador.id)"><i class="fas fa-trash-alt"></i></button>
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
    <!-- Modal Editar Jugador-->
    <div class="modal fade" id="editarJugador" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar jugador</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="mb-3">
                            <input type="text" name="nombre" class="form-control" placeholder="Nombre del jugador" v-model="popupEditar.nombre"/>
                        </div>
                        <div class="mb-3">
                            <input type="text" name="email" class="form-control" placeholder="Fecha de nacimiento" v-model="popupEditar.fechaNacimiento"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="guardarEditarJugador(popupEditar.id)">Guardar</button>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal añadir jugadores a equipos -->
    <div class="modal fade" id="popupAddEquipos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Equipos de jugador</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Dorsal" v-model="popupAddEquipo.dorsal"/>
                        </div>
                        <div class="col">
                            <select id="selectEquipo" class="form-select" v-model="popupAddEquipo.equipoSeleccionadoId">
                                <option>Selecciona un equipo</option>
                                <option v-for="(equipo, keyEquipos) in this.listaTodosEquipos" :key="keyEquipos" :value="equipo.id">{{equipo.nombre}}</option>
                            </select>
                        </div>
                        <div class="col">
                            <button class="btn btn-primary" type="button" @click="addEquipoJugador">Añadir</button>
                        </div>
                        <div class="invalid-feedback errorEquipoYaAdd" style="text-align: center;">
                            El equipo ya está en la lista.
                        </div>
                    </div>
                    <table class="table table-striped" id="listaEquipos" data-idjugador="">
                        <thead>
                            <tr>
                                <th>Dorsal</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(equipo, keyEquipo) in this.popupAddEquipo.equiposDelJugador" :key="keyEquipo">
                                <td>{{equipo.dorsal}}</td>
                                <td>{{equipo.nombre}}</td>
                                <td><button class="btn btn-danger" type="button" @click="eliminarJugadorDeEquipo(equipo.id)">Eliminar</button></td>
                            </tr>
                        </tbody>
                    </table>
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
                jugadores: [],
                listaTodosEquipos: [],
                datosNuevoJugador: {
                    nombre: "",
                    fechaNacimiento:  ""
                },
                popupEditar: {
                    id: "",
                    nombre: "",
                    fechaNacimiento:  ""
                },
                popupAddEquipo: {
                    dorsal: "",
                    equipoSeleccionadoId: "",
                    jugadorId: "",
                    equiposDelJugador: []
                }
            }
        },
        mounted() {
            this.listarJugadores();
        },
        methods: {
            async listarJugadores() {
                this.jugadores = [];
                try {
                    const data = await fetch(`http://localhost:4000/jugador`, {
                        method: 'GET'
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));
                    const arrayJugadores = [];

                    resData.forEach(jugador => {
                        arrayJugadores.push({
                                            'id': jugador._id,
                                            'nombre': jugador.nombre,
                                            'fechaNacimiento' : jugador.fechaNacimiento,
                                        });
                    });
                    this.jugadores = [...this.jugadores, ...arrayJugadores];
                }
                catch (error){
                    console.log(error);
                }
            },
            async eliminarJugador(idJugador){
                try {
                    const data = await fetch(`http://localhost:4000/jugador/${idJugador}`, {
                        method: 'DELETE'
                    });
                    this.listarJugadores();
                    console.log(data)
                }
                catch(error) {
                    console.log(error);
                }
            },
            async addJugador() {
                const datosJugadorGuardar = {
                    'nombre': this.datosNuevoJugador.nombre,
                    'fechaNacimiento': this.datosNuevoJugador.fechaNacimiento,
                }
                try {
                    const data = await fetch(`http://localhost:4000/jugador`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosJugadorGuardar)
                    });
                    console.log(data)
                    this.listarJugadores();
                }
                catch(error) {
                    console.log(error);
                }
            },
            editarJugador(idJugador, nombre, fechaNacimiento) {
                this.popupEditar.id = idJugador
                this.popupEditar.nombre = nombre;
                this.popupEditar.fechaNacimiento = fechaNacimiento;
            },
            async guardarEditarJugador(idJugador) {
                const datosJugadorEditar = {
                    'nombre': this.popupEditar.nombre,
                    'fechaNacimiento': this.popupEditar.fechaNacimiento
                }
                try {
                    const data = await fetch(`http://localhost:4000/jugador/${idJugador}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosJugadorEditar)
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));

                    console.log(resData);
                    this.listarJugadores();
                }
                catch(error) {
                    console.log(error);
                }
            },
            async addEquipos(jugadorId) {
                try {
                    const data = await fetch(`http://localhost:4000/equipo`, {
                        method: 'GET'
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));
                    this.listaTodosEquipos = []

                    resData.forEach(equipo => {
                        this.listaTodosEquipos.push({
                                            'id': equipo._id,
                                            'nombre': equipo.nombre,
                                            'logoUrl': equipo.logoUrl,
                                            'emailContacto': equipo.emailContacto
                                        });
                    });

                    this.popupAddEquipo.jugadorId = jugadorId;
                }
                catch (error){
                    console.log(error);
                }

                this.buscarEquiposDelJugador(jugadorId);
            },
            async addEquipoJugador() {
                const datosAddEquipo = {
                    'dorsal': this.popupAddEquipo.dorsal,
                    'idEquipo': this.popupAddEquipo.equipoSeleccionadoId
                }
                try {
                    const data = await fetch(`http://localhost:4000/jugador/addEquipo/${this.popupAddEquipo.jugadorId}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosAddEquipo)
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));

                    console.log(resData);
                    this.listarJugadores();
                }
                catch(error) {
                    console.log(error);
                }

                this.buscarEquiposDelJugador(this.popupAddEquipo.jugadorId);
            },
            async buscarEquiposDelJugador(jugadorId) {
                try {
                    const data = await fetch(`http://localhost:4000/jugador/equiposJugador/${jugadorId}`, {
                        method: 'GET'
                    });
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));

                    this.popupAddEquipo.equiposDelJugador = [];
                    
                    resData.equipos.forEach(dato => {
                        this.popupAddEquipo.equiposDelJugador.push({
                            'id': dato.equipo._id,
                            'dorsal': dato.dorsal,
                            'nombre': dato.equipo.nombre
                        });
                    });
                }
                catch (error){
                    console.log(error);
                }
            },
            async eliminarJugadorDeEquipo(idEquipo) {
                /*IMPLEMENTAR*/
            }
        }
    }
</script>