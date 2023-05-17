import { postTeam } from "../../services/teams-service.js";

export { FrmTeams };
class FrmTeams extends HTMLElement {
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
                    <h2 class="text-center">Registrar TEAM</h2>
                </div>
                <div class="card-body">
                    <form id="fromDatosTeam">
                        <div class="container text-center">
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="nombre" class="form-label">Dijite el nombre Team:</label>
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
                            <button type="submit" class="btn btn-primary botonn" id="nuevoTeam" data-habilitardesabilitar='[["#guardarTeam"], ["#nuevoTeam"]]'>NUEVO TEAM</button>

                            <button disabled type="submit" class="btn btn-success botonn" id="guardarTeam"
                            data-habilitardesabilitar='[["#nuevoTeam"], ["#guardarTeam"]]'>GUARDAR TEAM</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    //------------------------limpiar el formulario---------------------------
    limpiarFormulario = () => {
        const frmDatosTeam = document.querySelector('#fromDatosTeam');//formulario principal
        document.querySelector('#nuevoTeam').addEventListener('click', (e) => {
            for (let itemFrm of frmDatosTeam) {
                itemFrm.value = '';
            }

            e.preventDefault();
        });
    }

    //-----------------guardar la informacion del TEAM en la base de datos------------------
    guardarDatosRegistro = () => {
        const frmDatosTeam = document.querySelector('#fromDatosTeam');//formulario principal
        document.querySelector('#guardarTeam').addEventListener('click', (e) => {
            const datos = Object.fromEntries(new FormData(frmDatosTeam).entries()); //datos para guardada en la API
            console.log(datos);
            postTeam(datos); //Metodo (POST)

            e.preventDefault();
        });
    }

}
customElements.define('frm-teams-registro', FrmTeams);