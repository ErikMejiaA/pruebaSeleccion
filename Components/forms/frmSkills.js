export { FrmSkills };

class FrmSkills extends HTMLElement {
    constructor() {
        super();
        this.formulario();

    }
    formulario() {
        this.innerHTML = /* html */ `
            <!--Forumulario-->
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Registrar SKILL</h2>
                </div>
                <div class="card-body">
                    <form id="fromDatosSkill">
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
                            <button type="submit" class="btn btn-primary botonn" id="nuevoSkill" data-habilitardesabilitar='[["#guardarSkill"], ["#nuevoSkill"]]'>NUEVO SKILL</button>

                            <button disabled type="submit" class="btn btn-success botonn" id="guardarSkill" data-habilitardesabilitar='[["#nuevoSkill"], ["#guardarSkill"]]'>GUARDAR SKILL</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

}
customElements.define('frm-skills-registro', FrmSkills);