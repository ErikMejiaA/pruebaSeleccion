import { getTeam, searchTeam, putTeam, deleteTeam } from "../../services/teams-service.js";
export { ListaTeams };
let idEditar = 0;
class ListaTeams extends HTMLElement {
    constructor() {
        super();
        this.lista();
        this.listarDatos();
        this.guardarDatosEditados();

    }
    lista() {
        this.innerHTML = /* html */ `
            <div>
                <h2 class="text-center">Lista de los TEAM</h2>
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Trainer Asociado</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="cuerpoTablaTeam">
                        
                    </tbody>
                </table>
            </div>
            <div>
                <!-- Modal -->
                <div class="modal fade" id="formularioTeam1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar datos del TEAM</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="text-center">EDITAR TEAM</h2>
                                    </div>
                                    <div class="card-body">
                                        <form id="fromDatosTeam1">
                                                <div class="container text-center">
                                                    <div class="row">
                                                        <div class="col-4">
                                                            <div class="mb-3">
                                                                <label for="nombre" class="form-label">Dijite su nombre:</label>
                                                                <input type="text" class="form-control" id="nombre" name="nombre"/>
                                                            </div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="mb-3">
                                                                <label for="trainerAsociado" class="form-label">Dijite el Trainer Asociado:</label>
                                                                <input type="text" class="form-control" id="trainerAsociado" name="trainerAsociado"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div class="container text-center">
                                                <button type="submit" class="btn btn-success botonn1">GUARDAR TEAM</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    //----listar datos del team-------------
    listarDatos = () => {
        getTeam()
            .then((data)=>{
                console.log(data)
                this.mostrarDatosTeam(data);
                this.eliminarDatosTeam(data);
            })
    }

    //-----mostrar lista del team----------
    mostrarDatosTeam = (datosTeam) => {
        const cuerpoTablaTeam = document.querySelector('#cuerpoTablaTeam');
        datosTeam.forEach(itemTeam => {
            const crearFilas = document.createElement('tr');
            crearFilas.innerHTML = /* html */ `
                <td>${itemTeam.id}</td>
                <td>${itemTeam.nombre}</td>
                <td>${itemTeam.trainerAsociado}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-warning editarTeam" data-bs-toggle="modal" data-bs-target="#formularioTeam1" id="${itemTeam.id}">Editar</button>
                </td>
                <td>
                    <button type="button" class="btn btn-info eliminarTeam" id="${itemTeam.id}">Eliminar</button>
                </td>
            `;
            cuerpoTablaTeam.appendChild(crearFilas);
        });

        this.buscarDatoParaEditar();
    }

    //----busco la informacion a editar------------
    buscarDatoParaEditar = () => {
        document.querySelectorAll(".editarTeam").forEach((datoEditar) => {
            datoEditar.addEventListener('click', (e) => {
                console.log(e.target.id);

                searchTeam(e.target.id) //Metodo para buscar
                    .then((datos)=>{
                        console.log(datos)
                        idEditar = datos.id
                        this.llenarNuevoFormulario(datos)
                    })
                e.preventDefault();
            });
        });
    } 

    //--------------------funcion para llenar el nuevo formulario------------------------------------
    llenarNuevoFormulario(dataeditarTeam) {
        const frmEditar = document.querySelector('#fromDatosTeam1'); //nuevo formulario modal
        //desestructuramos el formulario
        const { nombre, trainerAsociado } = dataeditarTeam;
        const frm = new FormData(frmEditar);
        frm.set("nombre", nombre);
        frm.set("trainerAsociado", trainerAsociado);

        //se itera a travès de los padres clave-valor de los datos
        for (let dato of frm.entries()) {
            //establece los valores correspondientes en el formulario
            frmEditar.elements[dato[0]].value = dato[1];
        }
    }

    //------------------funcion para guardar los datos editados---------------------------------------
    guardarDatosEditados = () => {
        document.querySelector(".botonn1").addEventListener('click', (e) => {
            const frmEditar = document.querySelector('#fromDatosTeam1'); //nuevo formulario modal
            const datos = Object.fromEntries(new FormData(frmEditar).entries()); //obtener los datos del frm en un objeto
            putTeam(datos, idEditar);
    
            e.preventDefault();
        });
    }

    //------------------funcion pàra eliminar un registro de la base de datos-------------------------
    eliminarDatosTeam(eliminarDato) {
        document.querySelectorAll(".eliminarTeam").forEach(botonEliminar => {
            botonEliminar.addEventListener('click', (e) => {
                console.log(e.target.id);
                let dataTeam = eliminarDato.find((datoTeam) => datoTeam.id == e.target.id)
                console.log(dataTeam.id);
                deleteTeam(dataTeam, dataTeam.id); //Metodo (DELETE)
    
                e.preventDefault();
            });
        });
    }

}
customElements.define('ver-lista-teams', ListaTeams);