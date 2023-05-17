import { getSkill, searchSkill, putSkill, deleteSkill } from "../../services/skills-service.js";

export { ListaSkills };
let idEditar = 0;
class ListaSkills extends HTMLElement {
    constructor() {
        super();
        this.lista();
        this.listarDatos();
        this.guardarDatosEditados();
    }
    lista() {
        this.innerHTML = /* html */ `
        <div>
            <h2 class="text-center">Lista de los SKILL</h2>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaSkills">
                        

                </tbody>
            </table>
        </div>

        <!--Formulario Modal para ver los datos del team a editar-->
        <div>
            <!-- Modal -->
            <div class="modal fade" id="formularioSkill1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar datos de los SKILL</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <div class="card-header">
                                    <h2>Registrar SKILL</h2>
                                </div>
                                <div class="card-body">
                                    <form id="fromDatosSkill1">
                                        <div class="container text-center">
                                            <div class="row">
                                                <div class="col-4">
                                                    <div class="mb-3">
                                                        <label for="nombre" class="form-label">Dijite su nombre:</label>
                                                        <input type="text" class="form-control" id="nombre" name="nombre"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container text-center">
                                            <button type="submit" class="btn btn-success botonn3" >GUARDAR SKILL</button>
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

    //----listar datos de los Skill-------------
    listarDatos = () => {
        getSkill()
            .then((data) => {
                console.log(data)
                this.mostrarDatosTeam(data);
                this.eliminarDatosTeam(data);
            })
    }

    //-----mostrar lista de los Skill----------
    mostrarDatosTeam = (datosSkill) => {
        const cuerpoTablaSkills = document.querySelector('#cuerpoTablaSkills');
        datosSkill.forEach((itemSkill => {
            const crearFilas = document.createElement('tr');
            crearFilas.innerHTML = /* html */ `
                <td>${itemSkill.id}</td>
                <td>${itemSkill.nombre}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-warning editarSkills" data-bs-toggle="modal" data-bs-target="#formularioSkill1" id="${itemSkill.id}">Editar</button>
                </td>
                <td>
                    <button type="button" class="btn btn-info eliminarSkills" id="${itemSkill.id}">Eliminar</button>
                </td>
            `;
            cuerpoTablaSkills.appendChild(crearFilas);
        }));

        this.buscarDatoParaEditar();
    }

    //----busco la informacion a editar------------
    buscarDatoParaEditar = () => {
        document.querySelectorAll(".editarSkills").forEach((datoEditar) => {
            datoEditar.addEventListener('click', (e) => {
                console.log(e.target.id);

                searchSkill(e.target.id) //Metodo para buscar
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
    llenarNuevoFormulario(dataeditarSkill) {
        const frmDatosEditarSkill = document.querySelector('#fromDatosSkill1'); //nuevo formulario modal
        //desestructuramos los datos a ingresar al formulario 
        const { nombre } = dataeditarSkill;
        const frm = new FormData(frmDatosEditarSkill);
        frm.set("nombre", nombre);

        //un ciclo for para rrecorre el frm, se itera a travès de los padres clave-valor de los datos
        for (let dato of frm.entries()) {
            //establece los valores correspondientes en el formulario para su llenado
            frmDatosEditarSkill.elements[dato[0]].value = dato[1];
        }
    }

    //------------------funcion para guardar los datos editados---------------------------------------
    guardarDatosEditados = () => {
        document.querySelector(".botonn3").addEventListener('click', (e) => {
            const frmDatosEditarSkill = document.querySelector('#fromDatosSkill1'); //nuevo formulario modal
            const datos = Object.fromEntries(new FormData(frmDatosEditarSkill).entries()); //obtener los datos del frm en un objeto
            putSkill(datos, idEditar);
    
            e.preventDefault();
        });
    }

    //------------------funcion pàra eliminar un registro de la base de datos-------------------------
    eliminarDatosTeam(eliminarDato) {
        document.querySelectorAll(".eliminarSkills").forEach(botonEliminar => {
            botonEliminar.addEventListener('click', (e) => {
                console.log(e.target.id);
                let dataTeam = eliminarDato.find((datoTeam) => datoTeam.id == e.target.id)
                console.log(dataTeam.id);
                deleteSkill(dataTeam, dataTeam.id); //Metodo (DELETE)
    
                e.preventDefault();
            });
        });
    }

}
customElements.define('ver-lista-skills', ListaSkills);