<template>
    <h1>EQUIPO GESTOR</h1>
</template>

<script>

    // import { listarEquipos } from '@/axios/services'

    export default {
        name: 'EquipoGestor',
        data (){
            return {
            }
        },
        mounted() {
            this.listarEquipos();
        },
        methods: {
            async listarEquipos() {

                // const res = await listarEquipos();
                // console.log(res);



                try {
                    const data = await fetch(`http://localhost:4000/equipo`, {
                        method: 'GET',
                        headers: new Headers({ 'Content-type': 'application/json'}),
                        mode: 'cors'
                    });
                    console.log(data);
                    const decoder = new TextDecoder('UTF-8');
                    const buffer = await data.arrayBuffer();
                    const resData = await JSON.parse(decoder.decode(buffer));
                    console.log(resData);
                }
                catch (error){
                    console.log(error);
                }
            }
        }
    }
</script>
