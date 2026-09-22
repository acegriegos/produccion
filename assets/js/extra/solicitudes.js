/* ==========================================
   MÓDULO: Solicitudes
   ========================================== */

export function init() {
    const $process = $('#open_process');
    const $dropdown = $('#solicitudes_dropdown');

    window.workflowUpdate = (data) => {
        let solicitudes = data.solicitudes

        const _solicitudes = document.getElementById(
            'solicitudes_badge'
        )

        if(solicitudes){
            _solicitudes.textContent = data.solicitudes;
            _solicitudes.classList.remove('hide')
        }else{
            _solicitudes.classList.add('hide')
        }   

    };

    window.WS.send({
        type: 'workflow_init'
    })

    /*
     * Abrir / cerrar solicitudes
     */
    $process.on('click', function (e) {
        e.stopPropagation();
        $dropdown.toggleClass('open');
        
        // Asegúrate de que cargar_solicitudes() esté definida o importada aquí si se usa
        if (typeof cargar_solicitudes === 'function') {
            cargar_solicitudes();
        }
    });

    /*
     * Evitar que un click dentro del dropdown lo cierre automáticamente.
     */
    $dropdown.on('click', function (e) {
        e.stopPropagation();
    });

    /*
     * Click fuera del dropdown
     */
    $(document).on('click', function () {
        $dropdown.removeClass('open');
    });

    $("#toggle_sidebar").click(function(){
        $("#sidebar").toggleClass("open");
        $(".apsy-content").toggleClass("sidebar-open");
    });

    $('#crear_solicitud').click(function () {
        $('#modal_nueva_solicitud').modal('open');
    });

    // Carga inicial de tipos de solicitud
    getDatos_async('id,nombre', 600, 'idsucursal = @@impresa', 1).then((rs) => {
        let str = '';
        rs[0].forEach((i) => {
            str += `<option value="${i['id']}"> ${i['nombre']} </option>`;
        });

        const select = document.getElementById('solicitud_idtipo');
        if (select) {
            select.innerHTML = `<option value="0" disabled selected>
                Seleccione el tipo de solicitud
            </option> ${str}`;
            $(select).material_select('update');
        }
    });

    // Evento de guardar solicitud
    $("#guardar_solicitud").click(function (e) {
        e.preventDefault();
        $(this).prop('disabled', true);

        let idtiposolicitud = $("#solicitud_idtipo option:selected").val();
        let comentario = $("#solicitud_comentario").val().trim();

        if (idtiposolicitud == '0') {
            Materialize.toast('Tipo de Solicitud Requerida', 4000, 'red');
            $(this).prop('disabled', false);
            return false;
        }

        if (comentario == '') {
            Materialize.toast('Comentario Requerido', 4000, 'red');
            $(this).prop('disabled', false);
            return false;
        }

        let main_usuario = getDatos('idusuario', 604, `idtipo=${idtiposolicitud} and linea_proceso = 1 order by orden limit 1`)[0];
        main_usuario = main_usuario.length ? main_usuario[0][0] : null;

        let idsolicitud = insertar(601, 'idtipo,idusuario,idsucursal,comentario,fecha,estado,idencargado', `${idtiposolicitud},@@usr,@@impresa,"${comentario}",now(),"PENDIENTE",${main_usuario}`);
		console.log(idsolicitud)
        if(idsolicitud[0].length){
            idsolicitud = idsolicitud[0][0][0]  

            apsyAlert.success('Solicitud Creada');

            // Funciona de forma global gracias a window.WS
            WS.send({
                type: "refresh_solicitud",
                solicitud: idsolicitud,
                auditar: 0,
            });

            $("#solicitud_comentario").val('');
            $("#solicitud_idtipo").val(0).material_select('update');
        }else{
            apsyAlert.error(idsolicitud)
        }
        

        $(this).prop('disabled', false);
    });
}

export function cargar_solicitudes(){
    const myrequest = document.getElementById('mis_solicitudes')
    const mypending = document.getElementById('solicitudes_pendientes')

    const loader    = '<div class="center"> <i class="mdi mdi-refresh mdi-spin mdi-48px"></i> </div>'

    myrequest.innerHTML = loader
    mypending.innerHTML = loader

    getDatos_async('',602,`@@usr,@@impresa,2,0,0,0`,1).then((rs)=>{
        let str = ''

        if(rs[0].length){
            rs[0].forEach((e) => {

                str += `<div class="apsy-process-item" data-id="${e['id']}">

    <div class="apsy-process-item-icon">
        <i class="mdi mdi-play-circle-outline"></i>
    </div>

    <div class="apsy-process-item-content" data-base="${e['base']}">

        <div class="apsy-process-item-title">
            ${e['tipo']}
        </div>

        <div class="apsy-process-item-info">
            ${e['estado']}
        </div>

        <div class="apsy-process-item-date">
            ${e['tiempo']}
        </div>

        <div class="apsy-process-user-lead">
            ${e['usuario']}
        </div>

    </div>

    <div class="apsy-process-item-actions">

        ${
            e['estado'] === 'PENDIENTE'
            ? `
                <button
                    class="apsy-process-btn aprobar"
                    data-id="${e['id']}"
                    data-comment="requiered"
                    data-action="APROBADO"
                    title="Aprobar">
                    <i class="mdi mdi-check"></i>
                </button>

                <button
                    class="apsy-process-btn rechazar"
                    data-id="${e['id']}"
                    data-comment="requiered"
                    data-action="RECHAZADO"
                    title="Rechazar">
                    <i class="mdi mdi-close"></i>
                </button>
            `
            : ''
        }

    </div>

    <div class="apsy-process-item-action">
        <i class="mdi mdi-chevron-right"></i>
    </div>

</div>`    
            })

    document.getElementById('solicitudes_pendientes_badge').innerHTML = rs[0].length
        }else{
            str = 'Sin Solicitudes que Realizar'
            document.getElementById('solicitudes_pendientes_badge').innerHTML = 0
        }

        mypending.innerHTML = str
        
    })

    getDatos_async('',602,`@@usr,@@impresa,1,0,0,0`,1).then((rs)=>{
        let str = ''
        let sol_name = '';

        if(rs[0].length){
            rs[0].forEach((e) => {

                switch(e['estado']){
                case 'PENDIENTE':
                    sol_name = 'Pendiente de aprobación'
                    break;
                default:
                    sol_name = e['estado'];
                    break;
                }

                str += `<div class="apsy-process-item">

                  <div class="apsy-process-item-icon">
                      <i class="mdi mdi-clock-outline"></i>
                  </div>

                  <div class="apsy-process-item-content">

                      <div class="apsy-process-item-title">
                          ${e['tiposolicitud']}
                      </div>

                      <div class="apsy-process-item-info">
                          ${sol_name}
                      </div>

                      <div class="apsy-process-item-date">
                          ${e['tiempo']}
                      </div>

                      <div class="apsy-process-user-lead">
                          ${e['user_name']}
                      </div>

                  </div>

              </div>`    
            })

        }else{
            str = 'Sin Solicitudes'
        }

        myrequest.innerHTML = str

    })
}

export function ejecutarAccionSolicitud(
    id,
    action,
    comentario = ''
) {

    const idauditar = getDatos('',603,`${id},@@usr,"${comentario}","${action}"`)

    if(idauditar[0].length){
        WS.send({
            type: "refresh_solicitud",
            solicitud: idsolicitud,
            auditar: idauditar,
        });

        cargar_solicitudes()
    }
    else
        console.warn(`Problemas registrando auditar solicitud ${idauditar}`)
}

export function mostrarFormularioAccion(item, id, action) {

    const existente =
        item.querySelector('.apsy-process-item-comment-form');

    if (existente) {
        existente.remove();
        return;
    }

    const form = document.createElement('div');

    form.className =
        'apsy-process-item-comment-form';

    form.innerHTML = `

        <div class="apsy-process-comment-label">
            Motivo
        </div>

        <textarea
            class="apsy-process-comment-input"
            placeholder="Indique el motivo..."
            maxlength="200"></textarea>

        <div class="apsy-process-comment-actions">

            <button
                type="button"
                class="apsy-process-comment-cancel">
                Cancelar
            </button>

            <button
                type="button"
                class="apsy-process-comment-submit"
                data-id="${id}"
                data-action="${action}">
                Realizar
            </button>

        </div>
    `;

    item.appendChild(form);

    form
        .querySelector('.apsy-process-comment-input')
        .focus();
}

export function abrirFlujoSolicitud() {
    document
        .getElementById('apsy-process-detail')
        .classList.add('active');

}

export function cerrarFlujoSolicitud() {

    document
        .getElementById('apsy-process-detail')
        .classList.remove('active');

}

export function mostrarFlujoSolicitud(id) {

    abrirFlujoSolicitud();

    getDatos_async(
        '',
        602,
        `@@usr,@@impresa,3,${id},0,0`,
        1
    ).then(rs => {

        let html = '';

        rs[0].forEach(e => {

            html += `
                <div class="apsy-process-flow-item">

                    <div class="apsy-process-flow-user">
                        ${e['usuario']}
                    </div>

                    <div class="apsy-process-flow-action">
                        ${e['accion']}
                    </div>

                    <div class="apsy-process-flow-comment">
                        ${e['comentario']
                            ? `
                                <div class="apsy-process-flow-comment">
                                    ${e['comentario']}
                                </div>
                              `
                            : ''
                        }
                    </div>

                    <div class="apsy-process-flow-date">
                        ${e['fecha']}
                    </div>

                </div>
            `;

        });

        document
            .getElementById('apsy-process-detail-body')
            .innerHTML = `
                <div class="apsy-process-flow">
                    ${html}
                </div>
            `;

    });

}

document
    .getElementById('apsy-process-detail-close')
    .addEventListener('click', cerrarFlujoSolicitud);

document.getElementById('solicitudes_pendientes').addEventListener('click', function(e) {

    const submit = e.target.closest('.apsy-process-comment-submit');

    if (submit) {

        e.stopPropagation();

        const form =
            submit.closest(
                '.apsy-process-item-comment-form'
            );

        const textarea =
            form.querySelector(
                '.apsy-process-comment-input'
            );

        const comentario =
            textarea.value.trim();

        if (!comentario) {

            textarea.focus();
            Materialize.toast('Comentario Requerido',4000,'red')
            return;
        }

        ejecutarAccionSolicitud(
            submit.dataset.id,
            submit.dataset.action,
            comentario
        );

        return;
    }

    const cancel = e.target.closest('.apsy-process-comment-cancel');

    if (cancel) {

        e.stopPropagation();

        cancel
            .closest(
                '.apsy-process-item-comment-form'
            )
            .remove();

    }

    const btn = e.target.closest('.apsy-process-btn');

    if (btn) {

        e.stopPropagation();

        const id = btn.dataset.id;
        const comment = btn.dataset.comment;
        const action = btn.dataset.action;


        if (comment === 'requiered') {

            mostrarFormularioAccion(
                btn.closest('.apsy-process-item'),
                id,
                action
            );

            return;
        }

        ejecutarAccionSolicitud(
            id,
            action
        );

        return;
    }

    const content = e.target.closest('.apsy-process-item-content');
    
    if (content) {

        mostrarFlujoSolicitud(content.dataset.base);

    }

});