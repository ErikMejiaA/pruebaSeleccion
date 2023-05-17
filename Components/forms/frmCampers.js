import { postCampers } from "../../services/campers-service.js";
export { FrmCampers };

class FrmCampers extends HTMLElement {
    constructor() {
        super();
        this.formulario();
        this.limpiarFormulario();
        this.guardarDatosRegistro();
                
    }
    formulario() {
        this.innerHTML = /* html */ `
            <!--Forumulario-->
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Registrar camper</h2>
                </div>
                <div class="card-body text-center">
                    <form id="fromDatosRecluta">
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
                                        <label for="edad" class="form-label">Dijite su edad:</label>
                                        <input type="number" class="form-control" id="edad" name="edad" min="0">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="telefono" class="form-label">Dijite su numero telefononico:</label>
                                        <input type="number" class="form-control" id="telefono" name="telefono" min="0" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Dijite su Email:</label>
                                        <input type="email" class="form-control" id="email" name="email"/>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="direccion" class="form-label">Dijite su Dirección:</label>
                                        <input type="text" class="form-control" id="direccion" name="direccion"/>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="fechaNacimiento" class="form-label">Dijite su Fecha de Nacimiento:</label>
                                        <input type="date" class="form-control" id="fechaNacimiento"
                                        name="fechaNacimiento"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="numIdentificacion" class="form-label">Dijite su Numero de Identificación:</label>
                                        <input type="number" class="form-control" id="numIdentificacion" name="numIdentificacion" min="0"/>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="fechaIngresoPrograma" class="form-label">Fecha de Ingreso al Programa:</label>
                                        <input type="date" class="form-control" id="fechaIngresoPrograma" name="fechaIngresoPrograma" />
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
                            <button type="submit" class="btn btn-primary botonn" id="nuevoRecluta" data-habilitardesabilitar='[["#guardarRecluta"], ["#nuevoRecluta"]]'>NUEVO CAMPER</button>
                            <button disabled type="submit" class="btn btn-success botonn" id="guardarRecluta"
                            data-habilitardesabilitar='[["#nuevoRecluta"], ["#guardarRecluta"]]'>GUARDAR CAMPER</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
    
    //------------------------limpiar el formulario---------------------------
    limpiarFormulario = () => {
        const frmDatosCampers = document.querySelector('#fromDatosRecluta');//formulario principal
        document.querySelector('#nuevoRecluta').addEventListener('click', (e) => {
            for (let itemFrm of frmDatosCampers) {
                
                if (itemFrm.id == 'id_team') {
                    itemFrm.value = "Id TEAM";
        
                } else {
                    itemFrm.value = '';
                }
            }
            e.preventDefault();
        });
    }

    //-----------------guardar la informacion del Campers en la base de datos------------------
    guardarDatosRegistro = () => {
        const frmDatosCampers = document.querySelector('#fromDatosRecluta');//formulario principal
        document.querySelector('#guardarRecluta').addEventListener('click', (e) => {
            const datos = Object.fromEntries(new FormData(frmDatosCampers).entries()); //datos para guardada en la API
            console.log(datos);
            postCampers(datos); //Metodo (POST)

            e.preventDefault();
        });
    }

}
customElements.define('frm-campers-registro', FrmCampers);