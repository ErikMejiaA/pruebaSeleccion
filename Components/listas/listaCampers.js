import { getCampers, searchCampers, putCampers, deleteCampers } from "../../services/campers-service.js";
export { ListaCampres };

let idEditar = 0;
class ListaCampres extends HTMLElement {
    constructor() {
        super();
        this.formulario();
        this.listarDatos();
        this.guardarDatosEditados();
    }
    formulario() {
        this.innerHTML = /* html */ `
        <div>
            <h2 class="text-center">Lista de los Campers</h2>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Id Team</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Email</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Fecha Nacimiento</th>
                        <th scope="col">Identificacion</th>
                        <th scope="col">Fecha Ingreso</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaCampers">


                </tbody>
            </table>
        </div>
        <div>
            <!-- Modal -->
            <div class="modal fade" id="formularioReclutas1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar datos del CAMPER</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="text-center">Editar CAMPER</h2>
                                </div>
                                <div class="card-body text-center">
                                    <form id="fromDatosRecluta1">
                                        <div class="container text-center">
                                            <div class="row">
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="nombre" class="form-label">Dijite su nombre:</label>
                                                        <input type="text" class="form-control" id="nombre" name="nombre" />
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="edad" class="form-label">Dijite su edad:</label>
                                                        <input type="number" class="form-control" id="edad" name="edad" min="0" />
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="telefono" class="form-label">Dijite su numero
                                                            telefononico:</label>
                                                        <input type="number" class="form-control" id="telefono" name="telefono"
                                                            min="0" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="email" class="form-label">Dijite su Email:</label>
                                                        <input type="email" class="form-control" id="email" name="email" />
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="direccion" class="form-label">Dijite su Dirección:</label>
                                                        <input type="text" class="form-control" id="direccion" name="direccion" />
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="fechaNacimiento" class="form-label">Dijite su Fecha de
                                                            Nacimiento:</label>
                                                        <input type="date" class="form-control" id="fechaNacimiento"
                                                            name="fechaNacimiento" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="numIdentificacion" class="form-label">Dijite su Numero de
                                                            Identificación:</label>
                                                        <input type="number" class="form-control" id="numIdentificacion"
                                                            name="numIdentificacion" min="0" />
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="fechaIngresoPrograma" class="form-label">Fecha de Ingreso al
                                                            Programa:</label>
                                                        <input type="date" class="form-control" id="fechaIngresoPrograma"
                                                            name="fechaIngresoPrograma"/>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="id_team" class="form-label">Seleccione el Id de su TEAM:</label>
                                                        <select class="form-select" id="id_team" name="id_team">
                                                            <option selected>Id TEAM</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container text-center">
                                            <button type="submit" class="btn btn-success botonn2">GUARDAR RECLUTA</button>
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

    //----listar datos del Camper-------------
    listarDatos = () => {
        getCampers()
            .then((data)=>{
                console.log(data)
                this.mostrarDatosCamper(data);
                console.log(data)
                this.eliminarDatosTeam(data);
            })
    }

    mostrarDatosCamper = (datosCampers) => {
        const cuerpoTablaCampers = document.querySelector('#cuerpoTablaCampers');
        datosCampers.forEach((itemRecluta => {
            const crearFilas = document.createElement('tr');
            crearFilas.innerHTML = /* html */ `
                <td>${itemRecluta.id}</td>
                <td>${itemRecluta.id_team}</td>
                <td>${itemRecluta.nombre}</td>
                <td>${itemRecluta.edad}</td>
                <td>${itemRecluta.telefono}</td>
                <td>${itemRecluta.email}</td>
                <td>${itemRecluta.direccion}</td>
                <td>${itemRecluta.fechaNacimiento}</td>
                <td>${itemRecluta.numIdentificacion}</td>
                <td>${itemRecluta.fechaIngresoPrograma}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-warning editarCamper" data-bs-toggle="modal" data-bs-target="#formularioReclutas1" id="${itemRecluta.id}">Editar</button>
                </td>
                <td>
                    <button type="button" class="btn btn-info eliminarCamper" id="${itemRecluta.id}">Eliminar</button>
                </td>
            `;
            cuerpoTablaCampers.appendChild(crearFilas);
        }));

        this.buscarDatoParaEditar();
    }

    //----busco la informacion a editar------------
    buscarDatoParaEditar = () => {
        document.querySelectorAll(".editarCamper").forEach((datoEditar) => {
            datoEditar.addEventListener('click', (e) => {
                console.log(e.target.id);

                searchCampers(e.target.id) //Metodo para buscar
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
    llenarNuevoFormulario(dataeditarCamper) {
        const frmDatosReclutasEditar = document.querySelector('#fromDatosRecluta1');
        //desestructuramos los datos a ingresar al formulario 
        const {nombre, edad, telefono, email, direccion, fechaNacimiento, numIdentificacion, fechaIngresoPrograma, id_team} = dataeditarCamper;
        const frm = new FormData(frmDatosReclutasEditar);
        frm.set("nombre", nombre);
        frm.set("edad", edad);
        frm.set("telefono", telefono);
        frm.set("email", email);
        frm.set("direccion", direccion);
        frm.set("fechaNacimiento", fechaNacimiento);
        frm.set("numIdentificacion", numIdentificacion);
        frm.set("fechaIngresoPrograma", fechaIngresoPrograma);
        frm.set("id_team", id_team);

        //un ciclo for para rrecorre el frm, se itera a travès de los padres clave-valor de los datos
        for (let dato of frm.entries()) {
            //establece los valores correspondientes en el formulario para su llenado
            frmDatosReclutasEditar.elements[dato[0]].value = dato[1];
        }
    }

    //------------------funcion para guardar los datos editados---------------------------------------
    guardarDatosEditados = () => {
        document.querySelector(".botonn2").addEventListener('click', (e) => {
            const frmEditar = document.querySelector('#fromDatosRecluta1'); //nuevo formulario modal
            const datos = Object.fromEntries(new FormData(frmEditar).entries()); //obtener los datos del frm en un objeto
            putCampers(datos, idEditar);
    
            e.preventDefault();
        });
    }

    //------------------funcion pàra eliminar un registro de la base de datos-------------------------
    eliminarDatosTeam(eliminarDato) {
        document.querySelectorAll(".eliminarCamper").forEach(botonEliminar => {
            botonEliminar.addEventListener('click', (e) => {
                console.log(e.target.id);
                let dataCamper = eliminarDato.find((datoTeam) => datoTeam.id == e.target.id)
                console.log(dataCamper.id);
                deleteCampers(dataCamper, dataCamper.id); //Metodo (DELETE)
    
                e.preventDefault();
            });
        });
    }
}
customElements.define('ver-lista-campers', ListaCampres);