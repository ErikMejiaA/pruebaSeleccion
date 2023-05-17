export { FrmModulosSkill };

class FrmModulosSkill extends HTMLElement {
    constructor() {
        super();
        this.formulario();

    }
    formulario() {
        this.innerHTML = /* html */ `
            <!--Forumulario-->
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Registrar MODULO SKILL</h2>
                </div>
                <div class="card-body">
                    <form id="fromDatosModuloSkill">
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
                                        <label for="id_skill" class="form-label">Seleccione el Id de su SKILL:</label>
                                        <select class="form-select" id="id_skill" name="id_skill">
                                            <option selected>Id SKILL</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container text-center">

                            <button type="submit" class="btn btn-primary botonn" id="nuevoModuloSkill"
                                data-habilitardesabilitar='[["#guardarModuloSkill"], ["#nuevoModuloSkill"]]'>NUEVO MODULO SKILL</button>

                            <button disabled type="submit" class="btn btn-success botonn" id="guardarModuloSkill"
                                data-habilitardesabilitar='[["#nuevoModuloSkill"], ["#guardarModuloSkill"]]'>GUARDAR MODULO SKILL</button>

                        </div>
                    </form>
                </div>
            </div>
        `;
    }

}
customElements.define('frm-modulos-regsitro', FrmModulosSkill);