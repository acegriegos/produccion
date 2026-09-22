// === INICIALIZACION CORE ===
window.asgard = window.asgard || {}
asgard.schema = asgard.schema || {}
asgard.state  = asgard.state  || {}
asgard.grids  = asgard.grids  || {}

asgard.getElementValue = function (el) {

    let $el = $(el)
    let tag = el.tagName.toLowerCase()
    let type = $el.attr('type')

    // SELECT
    if (tag === 'select') {
        return $el.find(':selected').val()
    }

    // TEXTAREA
    if (tag === 'textarea') {
        return $el.val().trim()
    }

    // INPUT
    if (tag === 'input') {

        switch (type) {
            case 'checkbox':
                return $el.prop('checked') ? 1 : 0

            case 'radio':
                return $(`input[name="${$el.attr('name')}"]:checked`).val() ?? null

            case 'number':
                let v = $el.val()
                return v === '' ? null : Number(v)

            default:
                return $el.val().trim()
        }
    }

    return $el.val()
}
asgard.setElementValue = function (el, value) {

    let $el  = $(el)
    let tag  = el.tagName.toLowerCase()
    let type = $el.attr('type')

    // SELECT
    if (tag === 'select') {
        $el.val(value).trigger('change')
        return
    }

    // TEXTAREA
    if (tag === 'textarea') {
        $el.val(value ?? '')
        return
    }

    // INPUT
    if (tag === 'input') {

        switch (type) {
            case 'checkbox':
                $el.prop('checked', value == 1 || value === true)
                return

            case 'radio':
                $(`input[name="${$el.attr('name')}"][value="${value}"]`)
                    .prop('checked', true)
                return

            case 'number':
                $el.val(value ?? '')
                return

            default:
                $el.val(value ?? '')
                return
        }
    }

    // FALLBACK
    $el.val(value ?? '')
}

asgard.core_init = function (){ 
    // === INICIALIZAR PROCESO DE CORE INSERT/UPDATE ===
    let fn;
    let modal;
    let field;
    let value;

    $.each($(".core"),function(i,e){
        //SACAMOS LA INFORMACION BASICA
        modal   = $(this)

        fn      = $(this).data('fn')

        if(!fn){
            console.warn('Core sin data-fn')
            return
        }

        if(asgard.schema[fn]?.init)
            return

        let struct = getDatos('',482,fn)

        if(!struct || !struct[0] || !struct[0].length){
            console.error('Error inicializando Core:', fn)
            return
        }

        //creamos el template
        asgard.schema[fn] = {
            init: true
        }
        asgard.state[fn] = {}
       
        if(struct[0].length){
            let _core = $(".core[data-fn="+fn+"]")

            $.each(struct[0],function(j,f){
                let field   = f[0]
                let value   = f[1] 

                asgard.state[fn][field]     = value
                asgard.schema[fn][field]    = {
                    default   : f[1] ?? null,
                    min       : f[2] ?? 0,
                    max       : f[3] ?? null,
                    visible   : _core.find('[data-field='+field+']').length, //f[4] ?? 1,
                    readonly  : f[5] ?? 0,
                    required  : f[6] ?? 0,
                    hide_vid  : '',  //PARA ELEMENTOS RAPIDOS FASTCLIENT, FASTPRODUCT ...
                }
            })

            // === HOOK OPCIONAL CUANDO TERMINE LA CARGA ===
            if (typeof window.post_core_init === 'function') {
                post_core_init(fn, modal)
            }

        }else{
            console.log('Problemas Incializando: '+fn)
        }
    })
}

asgard.core_reset = function (fn) {

    let $scope = $('.core[data-fn="' + fn + '"]')

    if (!asgard.schema[fn] || !asgard.state[fn]) return

    $.each(asgard.schema[fn], function (field, schema) {

        // === RESET STATE ===
        asgard.state[fn][field] = schema.default

        // === SOLO SI EXISTE EN DOM Y ES VISIBLE ===
        if (!schema.visible) return

        let $el = $scope.find('[data-field="' + field + '"]')
        if (!$el.length) return

        asgard.setElementValue($el[0], schema.default)
    })
}

asgard.core_validate = function (fn){
    let errors = {}
    let valid = true;

    if (!asgard.schema[fn] || !asgard.state[fn]) {
        console.warn('Validate: fn no inicializado ->', fn)
        return { ok: false, errors: { _global: 'Formulario no inicializado' } }
    }

    $(".core[data-fn="+fn+"]").find('[data-field]').each(function () {

        let field   = $(this).data('field')
        let schema  = asgard.schema[fn]?.[field]

        if (!schema){ console.warn('Schema no registrado: '+fn) ;return}

        // === SOLO CAMPOS VALIDABLES ===
        if (schema.visible == 0 || schema.readonly == 1){
            console.warn(field+' No Fue Validado visible: '+schema.visible+' readonly: '+schema.readonly)
        }else{
            let value = schema.hide_vid == '' 
                      ? asgard.getElementValue(this)
                      : $("#"+schema.hide_vid).attr('vid')

            // === VID REQUERIDO ===
            if (schema.hide_vid != '' && value == 0) {
                Materialize.toast(`Campo requerido`, 4000, 'red')
                $(this).focus().select()
                valid = false
                return false // break each
            }

            // === REQUIRED ===
            if (schema.required) {
                if (value === null || value === '' || value === undefined) {
                    Materialize.toast(`Campo requerido`, 4000, 'red')
                    $(this).focus().select()
                    valid = false
                    return false // break each
                }
            }

            // === MIN ===
            if (schema.min !== null && value !== null && value !== '') {
                if (!isNaN(value) && Number(value) < schema.min) {
                    Materialize.toast(`Valor mínimo permitido: ${schema.min}`, 4000, 'red')
                    $(this).focus().select()
                    valid = false
                    return false
                }
            }

            // === MAX ===
            if (schema.max !== null && value !== null && value !== '') {
                if (!isNaN(value) && Number(value) > schema.max) {
                    Materialize.toast(`Valor máximo permitido: ${schema.max}`, 4000, 'red')
                    $(this).focus().select()
                    valid = false
                    return false
                }
            }
        }
    })

    return valid
}

asgard.core_save = function (coreFn, accion, scope, trigger, saveFn = null) {

    // === RESOLVER DESTINO ===
    //PYTHON
    /*
    let fn  = saveFn
    let tfn = accion 

    if (fn === 'core' || fn.startsWith('core.')) { //core.ID
        fn = !fn.includes('.')
            ? fn+'.'+coreFn
            : fn
        tfn = 3
    }else{ //MODULE.insertar | MODULE.editar
        fn = !fn.includes('.')
            ? accion === 1
                ? fn+'.insertar'
                : fn+'.editar'
            : fn
    }*/
    //PHP

    // === VALIDATE ===
    if (!asgard.core_validate(coreFn)) return

    // === SETTER ===
    let payload = {}
//PHP
    let updater = ''
    let insstr  = ''

    //CAMBIAR POR CICLO EN asgard.schema[coreFn]
    //scope.find('[data-field]').each(function () {
    $.each(asgard.schema[coreFn],function(field,schema) {

        if (!schema || typeof(schema) !== 'object') return
        
        let value = schema.default;

        let $el   = scope.find('[data-field="'+field+'"]')

        // Solo tomamos valor del DOM si el campo es editable y existe
        if (schema.visible == 1 && schema.readonly == 0 && $el.length) {
            value = schema.hide_vid == '' 
                      ? asgard.getElementValue($el[0])
                      : $("#"+schema.hide_vid).attr('vid')
        }

        payload[field] = value
        //PHP
        if(accion === 1){
            insstr += field+','
            updater += '"'+value+'",'
        }
        else
            updater += payload[field]+'="'+value+'",'
        
    })

    payload._accion = accion

    // === ENVÍO ===
    //PYTHON
    // modulo.insetar | modulo.editar | core.ID
    //let result = getDatos(fn, payload)
    //PHP
    let result
    updater = updater.substr(0,updater.length-1)

    if(saveFn == '1'){
        if(accion === 1)
            result = insertar(coreFn,insstr.substr(0,insstr.length-1),updater)
        else{
            result = actualizar(coreFn,updater,'id='+asgard.state[coreFn]['id'])
        }
    }else
         result = getDatos('',coreFn,updater)

    //  eliminar
         return;
    if (result == 0 || !result[0].length) {
        Materialize.toast('Error al guardar', 4000, 'red')
        return
    }

    let retorno = result[0][0] || {}
    let newId   = retorno.id ?? null

    // === HOOK ===
    if (typeof window.post_core_save === 'function') {
        post_core_save(coreFn, accion, newId, payload, retorno, trigger)
    }else
        Materialize.toast('Guardado correctamente', 3000, 'green')

    if (typeof window.refresh_grid === 'function') {
        refresh_grid(coreFn)
    }

}


asgard.core_load = function (fn, id) {

    let $scope = $('.core[data-fn="' + fn + '"]')
    if (!$scope.length) return

    // === LLAMADA BACKEND ===
    let result = getDatos('', fn, { id: id })

    if (!result || !result[0] || !result[0].length) {
        Materialize.toast('No se pudo cargar la información', 4000, 'red')
        return
    }

    let row = result[0][0]

    // === HIDRATAR STATE + DOM ===
    $.each(row, function (field, value) {

        if (!asgard.schema[fn]?.[field]) return

        asgard.state[fn][field] = value

        let schema = asgard.schema[fn][field]
        if (!schema.visible) return

        let $el = $scope.find('[data-field="' + field + '"]')
        if (!$el.length) return

        asgard.setElementValue($el[0], value)
    })

    // === HOOK OPCIONAL POR MÓDULO ===
    if (typeof window.post_core_load === 'function') {
        post_core_load(fn, modal, $btn)
    }
}

async function core_grid_init(container_id) {

  const container = document.getElementById(container_id)
  if (!container) {
    console.error("Container no existe:", container_id)
    return
  }

  const fn = container.dataset.fn
  if(fn === undefined){
    console.error("Container sin Parámetro FN:", container_id)
    return
  }

  if(container.dataset.init == 1){
    core_grid_build(fn,2)
    return
  }

  /*PYTHON
  const res = await asgard.fetch("core.grid.init", {
    grid: grid_name
  })

  if (!res.ok) {
    Materialize.toast(res.error || "Error cargando grid",4000,'red')
    return
  }
  PHP*/
  const head_columns = getDatos('column_name,label,orden,idpermiso,align',486,'idtable='+container.dataset.fn)
  if(!head_columns[0].length){
    console.warn('Grid no Inicializado: '+container.dataset.fn)
    return false
  }
  
  let struct = getDatos('',482,fn)

  if(!struct || !struct[0] || !struct[0].length){
    console.error('Error inicializando Core:', fn)
    return
  }

  asgard.grids[fn]              = {}
  asgard.grids[fn]['container'] = container_id
  asgard.grids[fn]['th']        = head_columns[0]
  asgard.grids[fn]['filtros']   = {}

  // limpiar contenedor
  container.innerHTML = ""

    if(struct[0].length){

        $.each(struct[0],function(j,f){
            let field   = f[0]
            let value   = f[1] 

            asgard.grids[fn]['filtros'][field]    = {
                default   : value ?? null,
                value     : value ?? null,
            }
        })  

    }else{
        console.log('Problemas Incializando Grid: '+fn)
    }

  core_grid_build(fn)

  if (typeof post_initGrid === "function") {
    post_initGrid(container)
  }

  container.dataset.init = 1
  return container
}

function core_grid_build(fn_grid, tipo = 1) {

    const grid      = asgard.grids[fn_grid]
    const container = document.getElementById(grid.container)
    let table

    if (tipo === 1) {
        container.innerHTML = ""

        table = document.createElement("table")
        table.classList.add("core-grid")
        table.classList.add("tbl")
        table.classList.add("striped")
        table.classList.add("bordered")
        table.classList.add("highlight")

        table.dataset.fn = fn_grid

        container.appendChild(table)

        const thead = document.createElement("thead")
        const tr = document.createElement("tr")

        grid.th.forEach(col => {
            const th = document.createElement("th")
            th.textContent = col[1]
            th.dataset.col = col[0]
            tr.appendChild(th)
        })

        thead.appendChild(tr)
        table.appendChild(thead)

    } else {
        table = document.querySelector('.core-grid[data-fn="'+fn_grid+'"]')
        if (!table) return
    }

    if (tipo <= 2) {
        core_grid_loader_show(fn_grid)

        setTimeout(() => {
            core_grid_load_data(fn_grid, table)
            core_grid_loader_hide(fn_grid)
        }, 50)
    }
}

function core_grid_load_data(fn_grid, table) {

    const grid  = asgard.grids[fn_grid]
    const tbody = document.createElement("tbody")

    const info = getDatos('', fn_grid, get_grid_filters(fn_grid),0,0,0,'',1)

    if(info[0].length){
        info[0].forEach(row => {
            const tr = document.createElement("tr")

            grid.th.forEach(col => {
                const td = document.createElement("td")
                let val = row[col[0]] ?? ''

                if(val.includes('<')){
                    td.innerHTML = val
                }else{
                    td.textContent = val
                }

                /*FUTURO CAMBIO*/
                /*
                    if(col.tipo === 'html'){
                        td.innerHTML = val
                    }else{
                        td.textContent = val
                    }
                */
                td.dataset.align = col[4] ?? 'left'
                tr.appendChild(td)
            })

            tbody.appendChild(tr)
        })
    }else{
        const tr = document.createElement("tr")
        const td = document.createElement("td")
        td.setAttribute('colspan','100%')
        td.classList.add('center')
        td.textContent = "Use los filtros para consultar"

        tr.appendChild(td)
        tbody.appendChild(tr)
    }

    // reemplazo limpio
    const old = table.querySelector("tbody")
    if (old) old.remove()

    table.appendChild(tbody)
}

function get_grid_filters(fn) {
    //const filtros = {}
    let filtros = ''
    let valor
    let element

    $.each(asgard.grids[fn].filtros, function (k, f) {
        //python
        //filtros[k] = f.value
        element = '.core-grid[data-fn="'+fn+'"] [data-filtro='+k+']'
        valor = $(element).length ? asgard.getElementValue(element) : f.value 
        filtros += '"'+valor+'",'
    })

    return filtros.substr(0,filtros.length-1)
}

$(document).on('click', '.core_save', function () {

    let $btn     = $(this)
    let $core    = $btn.closest('.core')

    let coreFn  = $core.data('fn')        // contexto UI
    let accion  = $core.data('accion')    // 1 insert | 2 update
    let saveFn  = $btn.data('fn')         // PHP: 1 insertar/actualizar 2 call; python: modulo/sp que ejecuta para el mantenimiento

    if (!coreFn){
        console.warn('FN Necesario')
        return
    }

    if (!accion){
        console.warn('Acción Necesaria')
        return
    }

    if (!saveFn){
        console.warn('SaveFn Necesario')
        return
    }

    asgard.core_save(coreFn, accion, $core, $btn, saveFn)
})

$(document).on('click', '.core_load', function () {

    let $btn = $(this)

    let fn = $btn.data('fn')
    if (!fn) return

    // PARAMETRO puede ser solo el ID o alguna otra variable como @@impresa,@@usr
    let param = $btn.data('param')

    if (!param) {
        Materialize.toast('Registro no identificado', 4000, 'red')
        return
    }

    asgard.core_load(fn, param)
})


$(document).on('click', '.core_modal', function () {

    let $btn   = $(this)
    let modal  = $('#' + $btn.data('modal'))
    let accion = Number($btn.data('accion')) // 1 insert | 2 edit
    let fn     = modal.find('.core').data('fn')
    let close  = Number($btn.data('btn_close'))

    modal.data('accion', accion)

    let titulo = 'Editar'
    modal.find('.core_save').removeClass('modal-close')

    if( accion === 1){
        titulo = 'Agregar'
        if(close)
            modal.find('.core_save').addClass('modal-close')
    }   

    modal.find('.tit_modal').html(titulo)

    // === CORE FLOW ===

    if (accion === 1) {
        asgard.core_reset(fn)
    } else {
        let param = $btn.data('param')
        asgard.core_load(fn, param)
    }

    // === HOOK OPCIONAL POR MÓDULO ===
    if (typeof window.post_core_modal === 'function') {
        post_core_modal(fn, modal, accion, $btn)
    }

    modal.modal('open')
})

function core_grid_loader_show(fn) {
    const grid = asgard.grids[fn]
    const container = document.getElementById(grid.container)

    container.classList.add('core-grid-wrapper')

    let loader = container.querySelector('.core-grid-loader')
    if (!loader) {
        loader = document.createElement('div')
        loader.className = 'core-grid-loader'
        loader.innerHTML = `
            <div class="spinner"></div>
            <div class="text">Cargando información...</div>
        `
        container.appendChild(loader)
    }

    loader.style.display = 'flex'
}

function core_grid_loader_hide(fn) {
    const container = document.getElementById(asgard.grids[fn].container)
    const loader = container.querySelector('.core-grid-loader')

    if (!loader) return

    loader.style.opacity = 1
    loader.style.transition = 'opacity 0.25s ease'

    requestAnimationFrame(() => {
        loader.style.opacity = 0
    })

    setTimeout(() => {
        loader.style.display = 'none'
    }, 250)
}


/*por hacer: 
core_batch_save (guardar varios .init_core) 

core_save_silent (sin toast)

core_transaction (varios fn en un solo commit)

*/ 