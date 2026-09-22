import './extra/ui.js'
import { WS } from './extra/ws.js';
WS.init()

if ($("#solicitudes_pendientes").length) {
    const solicitudes = await import('./extra/solicitudes.js');
    solicitudes.init()
}

$(function(){

    var ahora = now();
    $("#gndesde").val(ahora)
    $("#gnhasta").val(ahora)

    $("#movil").click(function(){
        $("#cpu").click()
    });

    $("#help").click(function(){
        $("#modal-help").modal('open'); 
    }); 

    $("#rastreo").click(function(){
        $("#r_ptwo").addClass('hide')
        $("#modal-rastreo").modal('open')
        $("#r_cons").val('').focus()
        $("#rfct").click()
    })

    $('[name=rastreo]').change(function(){
        $("#r_cons").focus()
    })

    $("#ref_ing").click(function(){
        let idproducto = $(this).attr('idproducto')
        
        if(param == 3){
          $(".cargarReferencias[vid="+idproducto+"]").data('referencias',[])
          $.each($(".ref_ciclo:visible"),function(){
                $(".cargarReferencias[vid="+idproducto+"]").data('referencias').push([0,idproducto,$(this).attr('vidprov'),$(this).attr('costo'),$(".ref_ciclo td:nth(0)").html(),$(this).find('.ref_costo').val().replace(/,/g,''),$(".ref_ciclo td:nth(2)").html(),$(".ref_ciclo td:nth(3)").html()])
          })
        }else{

            $.each($(".ref_ciclo:visible"),function(){
                switch($(this).attr('accion')){
                case '1':
                    let id = insertar(104,'id,idproducto,idproveedor,codigo,preciocosto,costoadicional,ultimafecha,idmonedacosto,idmonedaadicional,cntvar,idusuario','null,'+idproducto+','+$(this).attr('vidprov')+',"",'+$(this).attr('costo')+',0,now(),1,0,0,@@usr')[0][0][0]
                    $(this).attr('accion',0)
                    $(this).attr('vid',id)
                    break;
                case '2':
                    actualizar(104,'preciocosto='+$(this).attr('costo')+',ultimafecha=now(),idusuario=@@usr','id='+$(this).attr('vid'))
                    break;
                default:
                    break;
                }
             })
        }

        Materialize.toast('Referencias Incluidas Correctamente',4000,'green')
    })

    $("#agRef").click(function(){
        let idprov = $("#ref_search").attr('vid')
        if(idprov == '0'){
            Materialize.toast('Proveedor Requerido',4000,'red')
            $("#ref_search").focus()
            return false
        }

        let precio = $("#ref_precio").val().replace(/,/g,'')
        if(precio < 0){
            Materialize.toast('Precio Referencia Requerido',4000,'red')
            $("#ref_precio").focus().select()
            return false
        }

        let fantasia = getDatos('upper(if(web<>"",web,nombre)),date_format(curdate(),"%d-%m-%Y")',2,'id='+idprov)[0][0]
        let nusr = getDatos('nombre',1,'id=@@usr')[0][0][0]
        $("#listaref").append('<tr class="ref_ciclo" vidprov="'+idprov+'" costo="'+precio+'" accion="1" vid="0"> <td>'+fantasia[0]+'</td> <td> <input type="text" class="ref_costo numeric browser-default eder" value="'+parseFloat(precio).formatMoney(2,'.','')+'" style="width: 60%"/>  </td> <td>'+fantasia[1]+'</td> <td>'+nusr+'</td> <td></td> <td> <i class="mdi mdi-close red-text del_referencia"></i> </td> </tr>')
        $("#ref_search").attr('vid',0)
        $("#ref_search").val('').focus()
        $("#ref_precio").val(0)
        
    });

    $("#r_cons").keyup(function(e){
        let code = e.wich || e.keyCode
        if(code==13){
            $(this).prop('disabled',true)
            let r_tipo = $('[name=rastreo]:checked').attr('vid');
            $("#r_pone").append('<div class="progress"><div class="indeterminate"></div></div>')
            let r_datos;
            switch(r_tipo){
            case '2':
                r_datos = getDatos('')
                break;
            }
        }

    })

    $('.button-collapses').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

    $(".otpmenu").click(function(){
        var opt = parseInt($(this).attr('value'));
        switch(opt){
            case 1:
                $("#modal-info").modal('open');
                break;
            case 2: 
                window.open("notificaciones","_self");
                break;
            case 3:
                window.open("cierres","_self");
                break;
            case 4:
                var datos = getDatos('',245,'@@impresa',0,0)[0];
                
                $("#psystem").html(datos[0][1]);
                $("#msystem").html(datos[0][2]);
                $("#tsystem").html(datos[0][3]);
                $("#fsystem").html(datos[0][4]);
                $("#dsystem").html(datos[0][5]);

                $("#psoport").html(datos[0][6]);
                $("#msoport").html(datos[0][7]);
                $("#tsoport").html(datos[0][8]);
                $("#fsoport").html(datos[0][9]);
                $("#dsoport").html(datos[0][10]);

                $("#modal-system").data('akey',datos[0][0]);
                $("#modal-system").modal('open');
                break;
            case 5:
                abrirFlujo()
                break; 
            default:
            console.log('opcion no valida');
                break
        }
    });

    $("#ecouser").keyup(function(e){
        var code = e.wich || e.keyCode;

        if (code == 13)
            $("#accecouser").click();
    });

    $("#exitcouser").click(function(){
        exitcouser();
        $("#modal-usuario").modal('close');
    });

    $(".glchange").change(function(){
       getListaFlujo()
    });

    $("#accecouser").click(function(){
        var cod =  $("#ecouser").val();
        var rs = getDatos('',137,'"'+cod+'"',0,0,0);
        if(parseInt(rs['succed'])){
            if (rs[0].length){
                acceuser(rs)
                $("#username").html(rs[0][0][1])
                $("#modal-usuario").modal('close');
            }
            else{
                Materialize.toast('Usuario no Valido',4000,'red');
                $("#ecouser").focus().select();

            }
        }else{
            Materialize.toast('Usuario no Valido',4000,'red');
             $("#ecouser").focus().select();
        }
    });

    

    $("#gproveedor").on("keydown",function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        var elm = $(this)

        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();
            elm.autocomplete({
                limit: 10,
                data: arr('login',4,'concat(nombre," ",apellido1," ",apellido2,", ",cedula),null',2,'id > 0 and bisproveedor=1 and concat(nombre," ",cedula) like \"%'+elm.val()+'%\" and idsucursal = @@impresa limit 10',0,0,0,1),
                onAutocomplete: function(val){
                    $("#gproveedor").blur();
                }
            });
            elm.siblings($(".autocomplete-content")).css('width','25%').css('margin-top','5px');
        }
    });

    $("#gproveedor").blur(function(){
        var id = arr('login',4,'id',2,'concat(nombre," ",apellido1," ",apellido2,", ",cedula) = "'+$(this).val()+'" and id > 0 and bisproveedor=1 and idsucursal = @@impresa',0,0,0);
        
        if (id[0].length){
            $("#gproveedor").data('id',id[0][0][0]);
            $("#gproveedor").css('border-bottom','1px solid green');
        }
        else{
            $("#gproveedor").data('id',0);
            $("#gproveedor").css('border-bottom','1px solid red');
        }
    });

    $("#doflujo").click(function(){
        var idfila = 0;
        var idtabla = 0;
        var comodin = '';

        if(!validarNumero($("#gvalor")))
            return false;
        if($(".gres:visible").length){
            switch (parseFloat($(".gres:visible").attr('tr'))) {
                case 1:
                    if(parseFloat($("#gproveedor").data('id')) == 0){
                        Materialize.toast('Proveedor Requerido',4000,'red');
                        $("#gproveedor").focus().select();
                        return false;
                    }
                    break;
                case 2:
                    if(!validarTexto($("#guser"))){
                        return false;
                    }
                    break;
                case 3:
                    if(!validarTexto($("#gvoucher"))){
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
        if(!validarTexto($("#gcomentario"),'Comentario',100))
            return false;

        var tp = $("#tiporubro").is(":checked") ? 1 : 0;
        var id = getDatos('',317,'1,0,@@usr,@@impresa,'+idfila+','+idtabla+',"'+comodin+'",'+tp+','+$("#listrubros option:selected").val()+','+$("#gvalor").val().replace(/,/g,'')+',"'+$("#gcomentario").val()+'",'+$('#monrubros option:selected').val()+','+$('#monrubros option:selected').attr('rv'));
        Materialize.toast('Registro Ingresado Correctamente',4000,'green');
        // PONER EN SINCRO
        // if(config[29] != '' && config[29] != '99'){
        //     insertar(338,'','null,'+vid[0][0]+',64,1,"idfactura=$1,65,291,336,327^factura=$1,279^idfila=$1 and idtabla=$2",0,@@impresa');
        // }
        $("#modal-flujo").modal('close')

    });

    $(document).on("click","#bsse1",function(){
        $(this).sideNav({
                menuWidth: 700,
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true,
                onOpen: function(el) { getListaNotificacion() }
            }
        );
        
        $(this).sideNav('show');
    });

        $(document).on("click",".not_stat",function(){
        $("#modal-display-not").css('z-index',3000)
        $("#info-not").attr('vid',0)
        $(".acc-not").addClass('hide')
        var datos_not = getDatos('',352,'1,@usr,0,@impresa,'+$(this).attr('vid'))[0][0]
   
        let body_info = '';
        switch(datos_not[0]){
        case '394':
            body_info = '<div class="row"> <div class="col s12 center"> <b>'+datos_not[4]+'</b></div> </div><div class="row"><span class="col s4"><b>Usuario: </b>'+datos_not[2]+' </span> <span class="col s4"> </span> <span class="col s4"><b>Hora: </b>'+datos_not[1]+' </span> </div> <div class="row"> <span class="col s6"><b>Cliente: </b>'+datos_not[3]+'</span> <span class="col s6"><b>Producto: </b> '+datos_not[5]+' </span> </div> <div class="row"> <span class="col s3 center"> <b>Precio Solicitado: </b> <br> '+parseFloat(datos_not[6]).formatMoney(2,'.',',')+' </span> <span class="col s3 center"><b>Cantidad Solicitada: </b> <br>'+datos_not[7]+' </span>  <span class="col s3 center"><b>Unidad Solicitada: </b> <br>'+datos_not[8]+' </span>  <span class="col s3 center"><b>Utilidad Solicitada: </b> <br> '+parseFloat(datos_not[9]).formatMoney(2,'.',',')+' </span></div> <hr style="border:1px solid red"><hr style="border:1px solid red"> <div class="row"> <span class="col s3 center"><b>Costo Producto:</b> <br>'+parseFloat(datos_not[10]).formatMoney(2,'.',',')+'</span>  <span class="col s3 center"> <b>Utilidad Mínima: </b> <br>'+parseFloat(datos_not[11]).formatMoney(2,'.',',')+' </span> <span class="col s3 center"> <b>Precio Mínimo: </b> <br>'+parseFloat(datos_not[12]).formatMoney(2,'.',',')+'<span> </div>';
            break;
        default:
            break;
        }
        $("#cuerpo-not").html(body_info)
        if($(this).attr('acciones') != undefined)
            $(".acc-not").removeClass('hide')

        $("#info-not").attr('vid',$(this).attr('vid'))
        $("#modal-display-not").modal('open')
    })

    $(document).on("click","#shflujo",function(){
        $(this).sideNav({
                menuWidth: 700,
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
        //$("#gextra").html(123)
        $(this).sideNav('show');

        if(!$("#glsuc option").length){
            var sucs = getDatos('idsucursal',1,'id=@@usr')[0][0][0];
            sucs = getDatos('id,pfisico,if(@@impresa=id,1,0)',39,'if('+sucs+' = -1,1,find_in_set('+sucs+',id))');
            var checked = '';
            var strsuc = '';
            $.each(sucs[0],function(){
                checked = this[3] == '1' ? 'checked' : '';
                strsuc += '<option '+checked+' value="'+this[0]+'">'+this[1]+'</option>';
            })

            $("#glsuc").append(strsuc)
            var ahora = now();
            $("#gldesde").val(ahora)
            $("#glhasta").val(ahora)
        }

        getListaFlujo();
    });

    $(document).on("click",".cargarReferencias",function(){
        let vid = $(this).attr('vid')
        let idfact = $(this).attr('vid') ?? ''

        let pname = $(this).parent().parent().find('.eqprod').val()
        pname = pname == undefined ? $("#desc"+$(this).parent().parent().attr('id').substr(2)).html() : pname

        $("#ref_prodname").html(pname)
        $("#ref_ing").attr('idproducto',vid)
        $("#ref_ing").attr('idfactura',idfact)
        cargarListaReferencias()
        $("#modal-referencias").modal('open')
    })

    $(document).on("click",".detextra",function(){
        var el = $(this);

        if(el.attr('tabla') == '0')
            return false;

        el.sideNav('destroy')

        el.sideNav({
                menuWidth: 1000,
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true,// Closes side-nav on <a> clicks, useful for Angular/Meteor
                onClose: function(){
                    $(".loader").removeClass('hide');
                    $("#extra-i").addClass('hide');
                    $("#extra-i").attr('src','');
                    el.unbind()
                }
            }
        );

        var direccion = '';

        switch(el.attr('tabla')){
            case '64':
                direccion = 'facturacion?accion=6&id='+$(this).attr('fila')+'&tp=false&fullmode=1';
                break;
            default:
                break;
        }
        $("#extra-i").attr('src',direccion);
        el.sideNav('show');

        console.log(setTimeout(function(){ 
            $(".loader").addClass('hide');
            $("#extra-i").removeClass('hide')
        }, 1500));
        
    })

    $("#tiporubro").change(function(){
        var opciones = '';
        $(".gres").addClass('hide');

        if(!$(this).is(':checked')){
            opciones = '<option value="1" selected="">Pago Proveedor</option> <option value="2">Depósito Banco</option> <option value="3">Vales</option> <option value="5">Otros</option>';
        }else{
            opciones = '<option value="4">Reintegro</option>';
        }   

        $("#listrubros").html(opciones).change();
        $("#gvalor").focus().select();
    })

    $("#listrubros").change(function(){
        $(".gres").addClass('hide');
        
        switch (parseInt($(this).val())) {
            case 1:
                $(".po").removeClass('hide');
                break;
            case 2:
                $(".vo").removeClass('hide');
                break;
            case 3:
                $(".us").removeClass('hide');
                break;
            default:
                break;
        }
    });

    $("#numtrans").keyup(function(e){ //accesos
        var code = e.which || e.keyCode;
        if (code == 13) {
            var numtrans = $(this).val();
            var ruta = arr('login',4,'direccion',196,'codigo = "'+numtrans+'" or codigointerno = '+numtrans,0,0,0)[0][0];
            window.open(ruta,'_self');
        }
    });

    $("#mntNotas").click(function(){
        if( !$("#_vnota").val().trim().length){
            Materialize.toast('Nota Requrida',4000,'red');
            $("#_vnota").focus()
            return false;
        }

        switch(parseInt($(this).attr('tp'))){
            case 1:
                insertar(333,'','null,'+$(this).attr('idtabla')+','+$(this).attr('idfila')+',"'+$("#_vnota").val()+'",now(),@@usr,@@impresa,'+$("#_vtiponota option:selected").val())
                $("#_vnota").val('')
                $("#_vtiponota").val(1).change()
                Materialize.toast('Nota Registrada Correctamente',4000,'green');
                break;
            case 2:
                actualizar(333,'nota="'+$("#_vnota").val()+'",idtipo='+$("#_vtiponota option:selected").val(),'id='+$(this).attr('vid'))
                Materialize.toast('Nota Editada Correctamente',4000,'green');
                $("#_vnota").val('')
                $("#_vtiponota").val(1).change()
                $(this).attr('tp',1)
                break;
            default:
                break;    
        }
        
        arr('login',6,'',334,'@@impresa,'+$(this).attr('idtabla')+','+$(this).attr('idfila'),0,1,$("#_listanotas"));
        $(".notasprod[tbl="+$(this).attr('idtabla')+"][row="+$(this).attr('idfila')+"]").html($("._enota").parent().parent().find('td').eq(1).html())
    });

    var moneda = getDatos('nombre,id,valor+suma',54,'id > 0',0,0);
    var ht = '';
    for (var i = 0; i < moneda[0].length; i++) {
        ht += '<option value="'+moneda[0][i][1]+'" rv="'+moneda[0][i][2]+'">'+moneda[0][i][0]+'</option>';
    }
    $("#monrubros").html(ht)

    permisos(1,199);
    SSE_SERVER('login',4,{sel:'',tbl:234,where:'@@usr,@@impresa'},1);

    /*setInterval(function(){
        SSE_SERVER('login',4,{sel:'',tbl:234,where:'@@usr,@@impresa'},1);
    },5000);*/
});

function SSE_SERVER(vmodulo,vaccion,varreglo,vid,vjson) {
    
    var p;

        if (vjson)
            varreglo['JSON'] = vjson

        $.ajax({
                url: '../dashboard/'+vmodulo,
                type: 'POST',
                data: {accion: vaccion,arreglo : varreglo}
                })
                .done(function(data) {
                    try {
                        p = JSON.parse(data);
                    }
                    catch(err){
                        p = data;
                    }

                    sse_response(vid,p);
                });
    return true;
}

function sse_response(vid,p) {
    
    switch(parseInt(vid)){
        case 1:
            
            if (p['succed'] == undefined || p['succed'] == '')
                location.reload();
            /*if (p[0][0][0] != 0) {
                $("#solicitudes_badge").removeClass('hide');
                $("#solicitudes_badge").html(p[0][0][0]);
            }else{
                $("#solicitudes_badge").addClass('hide');
            }*/

            //if (parseInt(p[0][0][1])) {
                //REFRESH TOKEN
                
                $.ajax({
                    url: "../wsdlClient.php",
                    type: 'POST',
                    data: {id: 0, accion : 13}
                })
                .done(function(data) { //REFRESH DATA
              });
            //}

            if ($("#cantFact:visible").length)
                $("#cantFact").html(p[0][0][2]);
            
            if(parseInt(p[0][0][3])){ //RECURSIVIDAD 20MIN
                $.post('../_config/autofacturas.php')
                    .done(function(data){ });
            }

            if(p[0][0][6] != '' && parseInt(p[0][0][7])){ //SINCRONIZADOR
                $.post('../sincro.php',{server:p[0][0][6]})
                    .done(function(data){ console.log(data)});   
            }

            break;
        case 2:
            $(".asig").addClass('hide');
            if (p[0].length) {
                for (var i = 0; i < p[0].length; i++) {
                    $("#"+p[0][i][0]).removeClass('hide');
                    $("#"+p[0][i][0]).html(p[0][i][1]);
                }
                
            }
            break;
        case 3: //RESTAURANTES
            if (p[0].length) {

                for (var i = 0; i < p[0].length; i++) {
                    switch(parseInt(p[0][i][1])){
                        case 5:
                            $("#m"+p[0][i][0]).css('background-color','#cfd8dc');
                            $("#sm"+p[0][i][0]).html('<i class="mdi mdi-dots-horizontal"></i><i class="mdi mdi-pencil"></i>');
                            break;
                        case 2:
                            $("#m"+p[0][i][0]).css('background-color','#b3e5fc ');
                            $("#sm"+p[0][i][0]).html('');
                            break;
                        default:
                            $("#m"+p[0][i][0]).css('background-color','white');
                            $("#sm"+p[0][i][0]).html('');
                            break;
                    }
                    $("#m"+p[0][i][0]).attr('estado',p[0][i][1]);
                }
                
            }
            break;
        default:
            console.log('ID NO ASIGNADO')
            break;
    }
}

function generarSSuc(){

    var p = getDatos('',155,'@@usr',0,0)[0];
    var sucursales = '';

    for (var i = 0; i < p.length; i++) {
        sucursales += '<option value="'+p[i][0]+'">'+p[i][1]+'</option>';
    }

    // if ($(".ssuc").attr('multiple')) {
    //     $(".ssuc").change(function(){
    //         alert($('option:selected',this).val())
    //     })
    // }
    
    $(".ssuc").material_select('destroy');
    var valor = $(".ssuc").attr("sel");
    $(".ssuc").append(sucursales);
    $(".ssuc").val(valor);
    $(".ssuc").material_select();
}

function cargarListaReferencias(){
    $("#listaref").html('')
    let referencias = []

    referencias = getDatos('',1001,$("#ref_ing").attr('idproducto')+','+param+',@@impresa')
    
    if(param == 3){
        if($(".cargarReferencias[vid="+$("#ref_ing").attr('idproducto')+"]").data('referencias') != undefined) 
            
            referencias[0] = $(".cargarReferencias[vid="+$("#ref_ing").attr('idproducto')+"]").data('referencias')
    }
        
    let str_ref = ''
    
    if(referencias[0].length){
        $.each(referencias[0],function(){

            str_ref += '<tr vid="'+$(this)[6]+'" class="ref_ciclo" vidprov="'+$(this)[12]+'" costo="'+$(this)[1]+'" accion="1"> <td> '+$(this)[0]+'"  </td> <td> <input type="text" class="ref_costo numeric browser-default eder" value="'+parseFloat($(this)[1]).formatMoney(2,'.','')+'" style="width: 60%"/> </td> <td>'+$(this)[2]+'</td> <td>'+$(this)[10]+'</td> <td>'+$(this)[5]+'</td> <td> <i class="mdi mdi-close red-text del_referencia"></i> </td> </tr>'
        })
    }
    $("#listaref").html(str_ref)
}

function abrirFlujo(){
    $("#modal-flujo").modal('open');
    $("#gvalor").val('0.00').focus().select();
    $("#gcomentario").val('');
    $("#gproveedor").val('');
    $("#gproveedor").data('id',0);
    $("#guser").val('');
    $("#gvoucher").val('')
    $("#tiporubro").prop('checked',false).change();
}

function getListaNotificacion(){

    var listanot = getDatos('',352,'0,@@usr,0,@@impresa,0');
    var strlista = '';
    for (var i = 0; i < listanot[0].length; i++) {
        strlista += '<tr>'+
            '<td>'+listanot[0][i][1]+'</td>'+
            '<td>'+listanot[0][i][4]+'</td>'+
            '<td>'+listanot[0][i][2]+'</td>'+
            '<td> <i class="not_stat mdi mdi-24px mdi-information blue-text pbtn" vid="'+listanot[0][i][0]+'" title="Ver Solicitud" acciones></i> </td>'+
        '</tr>';
    }

    $("#listanotificaciones").html(strlista)
}

function getListaFlujo(){
    var lista = getDatos('id,date_format(fecha,"%d/%m/%Y %H:%i:%s") as fecha,format(valor,2),comentario,idtipo,case idrubro when 1 then "Pago Proveedor" when 2 then "Depósito Banco" when 3 then "Vales" when 4 then "Reintegro" when 5 then "Otros" end as rubro',316,'date_format(fecha,"%Y-%m-%d") between "'+$("#gldesde").val()+'" and "'+$("#glhasta").val()+'" and idsucursal = '+$("#glsuc").val());

    var strlista = color = '';
    $("#listaflujo").html('');

    $.each(lista[0],function(){
        color = this[4] == '0' ? 'color:red;':'';
        strlista += '<tr vid="'+this[0]+'" class="trlistaflujo"> <td>'+this[1]+'</td> <td style="'+color+'">'+this[2]+'</td> <td>'+this[3]+'</td> <td>'+this[5]+'</td> <td> <i class="mdi mdi-dots-vertical hide _acc pbtn"></i> </td> </tr>';
    });

    $("#listaflujo").html(strlista)
}

function postFClient(idclie,idelem){
    switch(idelem){
        case '1': //referencia compra
            setTimeout(function(){
               $("#ref_precio").focus().select()
            },100);
            break;
        default:
            console.log(idelem)
            break;
    }
}