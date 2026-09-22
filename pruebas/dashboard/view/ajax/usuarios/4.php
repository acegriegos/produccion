<div class="panel-body pequeño">

    <!-- ========================= -->
    <!-- MODAL WORKFLOW -->
    <!-- ========================= -->
    <div class="modal modal-fixed-footer grandemodal"
         id="modal-workflow"
         style="height: 100%; width: 85%">

        <div class="modal-header">

            <ul class="tabs tabs-fixed-width head3 center">
                <h5 class="center tit_modal">
                    Workflow Empresarial
                </h5>
            </ul>

        </div>

        <div class="modal-content" style="padding: 0px;">

            <div class="core"
                 data-fn="apsy.workflow"
                 data-accion="1">

                <form id="fworkflow">

                    <div class="row" style="margin:0px; padding:15px;">

                        <!-- ========================= -->
                        <!-- INFORMACION GENERAL -->
                        <!-- ========================= -->

                        <div class="col s12">
                            <h6 class="head4 padding1">
                                Información General
                            </h6>
                        </div>

                        <div class="input-field col s12 m6 l3">
                            <input type="hidden"
                                   data-field="idworkflow">

                            <input type="text"
                                   data-field="codigo"
                                   autocomplete="off">

                            <label>
                                Código
                            </label>
                        </div>

                        <div class="input-field col s12 m6 l5">

                            <input type="text"
                                   data-field="nombre"
                                   autocomplete="off">

                            <label>
                                Nombre Workflow
                            </label>

                        </div>

                        <div class="input-field col s12 m6 l4">

                            <select data-field="tipo">

                                <option value=""
                                        disabled
                                        selected>
                                    Seleccione
                                </option>

                                <option value="APROBACION">
                                    Aprobación
                                </option>

                                <option value="INFORMATIVO">
                                    Informativo
                                </option>

                                <option value="CAMBIO_ESTADO">
                                    Cambio Estado
                                </option>

                            </select>

                            <label>
                                Tipo Workflow
                            </label>

                        </div>

                        <div class="input-field col s12">

                            <textarea class="materialize-textarea"
                                      data-field="descripcion"></textarea>

                            <label>
                                Descripción
                            </label>

                        </div>

                        <!-- ========================= -->
                        <!-- REGLAS -->
                        <!-- ========================= -->

                        <div class="col s12">
                            <h6 class="head4 padding1">
                                Reglas del Workflow
                            </h6>
                        </div>

                        <div class="col s12">

                            <table class="table bordered striped centered">

                                <thead class="tab1">

                                    <tr>

                                        <th>
                                            Campo
                                        </th>

                                        <th>
                                            Condición
                                        </th>

                                        <th>
                                            Valor
                                        </th>

                                        <th>
                                            Usuario
                                        </th>

                                        <th>
                                            Nivel
                                        </th>

                                        <th>
                                            Acción
                                        </th>

                                    </tr>

                                </thead>

                                <tbody id="workflow_reglas">

                                    <tr>

                                        <td>

                                            <select class="browser-default">

                                                <option>
                                                    utilidad
                                                </option>

                                                <option>
                                                    monto
                                                </option>

                                            </select>

                                        </td>

                                        <td>

                                            <select class="browser-default">

                                                <option><</option>
                                                <option>></option>
                                                <option>=</option>

                                            </select>

                                        </td>

                                        <td>
                                            <input type="number"
                                                   value="12">
                                        </td>

                                        <td>

                                            <select class="browser-default">

                                                <option>
                                                    Supervisor
                                                </option>

                                                <option>
                                                    Gerencia
                                                </option>

                                            </select>

                                        </td>

                                        <td>
                                            <input type="number"
                                                   value="1">
                                        </td>

                                        <td>

                                            <a class="btn-floating red btn-small">

                                                <i class="mdi mdi-close"></i>

                                            </a>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        <div class="col s12 right-align">

                            <a class="btn waves-effect waves-light blue">

                                <i class="mdi mdi-plus left"></i>
                                Agregar Regla

                            </a>

                        </div>

                        <!-- ========================= -->
                        <!-- FLUJO -->
                        <!-- ========================= -->

                        <div class="col s12">
                            <h6 class="head4 padding1">
                                Flujo de Aprobación
                            </h6>
                        </div>

                        <div class="col s12">

                            <table class="table bordered striped centered">

                                <thead class="tab1">

                                    <tr>

                                        <th>
                                            Orden
                                        </th>

                                        <th>
                                            Usuario
                                        </th>

                                        <th>
                                            Tipo
                                        </th>

                                        <th>
                                            Estados Disponibles
                                        </th>

                                        <th>
                                            Acción
                                        </th>

                                    </tr>

                                </thead>

                                <tbody id="workflow_flujo">

                                    <tr>

                                        <td>
                                            <input type="number"
                                                   value="1">
                                        </td>

                                        <td>

                                            <select class="browser-default">

                                                <option>
                                                    Supervisor
                                                </option>

                                            </select>

                                        </td>

                                        <td>

                                            <select class="browser-default">

                                                <option>
                                                    APROBADOR
                                                </option>

                                                <option>
                                                    INFORMATIVO
                                                </option>

                                            </select>

                                        </td>

                                        <td>

                                            <select multiple
                                                    class="browser-default">

                                                <option>
                                                    Aprobar
                                                </option>

                                                <option>
                                                    Rechazar
                                                </option>

                                                <option>
                                                    Escalar
                                                </option>

                                            </select>

                                        </td>

                                        <td>

                                            <a class="btn-floating red btn-small">

                                                <i class="mdi mdi-close"></i>

                                            </a>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        <div class="col s12 right-align">

                            <a class="btn waves-effect waves-light green">

                                <i class="mdi mdi-plus left"></i>
                                Agregar Paso

                            </a>

                        </div>

                    </div>

                </form>

            </div>

        </div>

        <div class="modal-footer">

            <button type="button"
                    class="modal-action modal-close waves-effect waves-red btn-flat">

                Salir

            </button>

            <button type="button"
                    class="waves-effect waves-green btn-flat core_save"
                    data-fn="apsy.workflow.save">

                Guardar

            </button>

        </div>

    </div>

    <!-- ========================= -->
    <!-- MAIN -->
    <!-- ========================= -->

    <div class="row pequeño">

        <!-- ========================= -->
        <!-- GRID WORKFLOW -->
        <!-- ========================= -->

        <div class="col s12 m12 l8">

            <div class="card">

                <div class="card-content">

                    <div class="row">

                        <div class="col s12">

                            <h5>
                                Procesos Workflow
                            </h5>

                        </div>

                        <!-- ========================= -->
                        <!-- FILTROS -->
                        <!-- ========================= -->

                        <div class="input-field col s12 m6 l3">

                            <input type="date"
                                   id="wf_fecha_ini">

                            <label class="active">
                                Fecha Inicial
                            </label>

                        </div>

                        <div class="input-field col s12 m6 l3">

                            <input type="date"
                                   id="wf_fecha_fin">

                            <label class="active">
                                Fecha Final
                            </label>

                        </div>

                        <div class="input-field col s12 m6 l3">

                            <select id="wf_usuario">

                                <option value=""
                                        selected>
                                    Todos
                                </option>

                            </select>

                            <label>
                                Usuario Solicita
                            </label>

                        </div>

                        <div class="input-field col s12 m6 l2">

                            <select id="wf_estado">

                                <option value=""
                                        selected>
                                    Todos
                                </option>

                                <option value="PENDIENTE">
                                    Pendiente
                                </option>

                                <option value="APROBADO">
                                    Aprobado
                                </option>

                                <option value="RECHAZADO">
                                    Rechazado
                                </option>

                            </select>

                            <label>
                                Estado
                            </label>

                        </div>

                        <!-- ========================= -->
                        <!-- BOTONES -->
                        <!-- ========================= -->

                        <div class="col s12 l1">

                            <a class="btn-floating waves-effect waves-green btn2 right z-depth-3 core_modal"
                               data-modal="modal-workflow"
                               data-accion="1">

                                <i class="mdi mdi-plus mdi-24px"></i>

                            </a>

                        </div>

                        <!-- ========================= -->
                        <!-- GRID -->
                        <!-- ========================= -->

                        <div class="col s12">

                            <div class="table-responsive">

                                <div id="grid-workflow"
                                     class="core-grid"
                                     data-fn="apsy.workflow.grid">
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <!-- ========================= -->
        <!-- SOLICITUDES ACTIVAS -->
        <!-- ========================= -->

        <div class="col s12 m12 l4">

            <div class="card">

                <div class="card-content">

                    <div class="row">

                        <div class="col s12">

                            <h5>
                                Solicitudes Activas
                            </h5>

                        </div>

                        <div class="col s12">

                            <ul class="collection">

                                <li class="collection-item">

                                    <span class="title">
                                        Factura #1520
                                    </span>

                                    <p>

                                        Utilidad menor al 9%<br>
                                        Pendiente Gerencia

                                    </p>

                                    <span class="new badge red">
                                        Pendiente
                                    </span>

                                </li>

                                <li class="collection-item">

                                    <span class="title">
                                        Orden Compra #810
                                    </span>

                                    <p>

                                        Cambio Estado<br>
                                        Supervisor

                                    </p>

                                    <span class="new badge orange">
                                        En Proceso
                                    </span>

                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

<script>

$(function(){

    $('select').material_select()

    core_grid_init('grid-workflow')

})

</script>