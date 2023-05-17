export { FrmEvaluacion };

class FrmEvaluacion extends HTMLElement {
    constructor() {
        super();
        this.formulario();
    }
    formulario() {
        this.innerHTML = /* html */ `
            <!--Forumulario-->
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Registrar EVALUACIÓN CAMPER</h2>
                </div>
                <div class="card-body">
                    <form id="fromDatosEvaluacion">
                        <div class="container text-center">
                            <div class="row">
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="id_recluta" class="form-label">Seleccione el Id de su Recluta:</label>
                                        <select class="form-select" id="id_recluta" name="id_recluta">
                                            <option selected>Id Recluta</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="id_modulo" class="form-label">Seleccione el Id de su Modulo:</label>
                                        <select class="form-select" id="id_modulo" name="id_modulo">
                                            <option selected>Id Modulo</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mb-3">
                                        <label for="nota" class="form-label">Dijite la nota:</label>
                                        <input type="number" class="form-control" id="nota" name="nota" min="0"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container text-center">

                            <button type="submit" class="btn btn-primary botonn" id="nuevoEvaluacion"
                            data-habilitardesabilitar='[["#guardarEvaluacion"], ["#nuevoEvaluacion"]]'>NUEVA EVALUACIÓN</button>

                            <button disabled type="submit" class="btn btn-success botonn" id="guardarEvaluacion"
                            data-habilitardesabilitar='[["#nuevoEvaluacion"], ["#guardarEvaluacion"]]'>GUARDAR EVALUACIÓN</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}
customElements.define('frm-evaluacion-registro', FrmEvaluacion);