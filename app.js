import { FrmCampers } from "./Components/forms/frmCampers.js";
import { FrmTeams } from "./Components/forms/frmTeams.js";
import { FrmSkills } from "./Components/forms/frmSkills.js";
import { FrmModulosSkill } from "./Components/forms/frmModulosSkill.js";
import { FrmEvaluacion } from "./Components/forms/frmEvaluacion.js";
import { ListaTeams } from "./Components/listas/listaTeams.js";
import { ListaCampres } from "./Components/listas/listaCampers.js";
import { ListaSkills } from "./Components/listas/listaSkills.js";
import { activarDesactivarBoton } from "../Controllers/activarDesactivarBoton.js";
import { initMenu } from "./Controllers/menu-controller.js";
import { listarIdTeamSelect } from "./Controllers/activarDesactivarBoton.js";

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    activarDesactivarBoton();
    listarIdTeamSelect();
});
