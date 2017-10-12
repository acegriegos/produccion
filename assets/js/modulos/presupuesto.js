$(function(){
	$(".menu3").click(function(){
        var id = $(this).attr('id').substr(1);
        $(".menu3").removeClass('active');
        $(this).addClass('active');

        var p = mantenimiento('presupuesto',id,'');
        $("#bdymantPresupuesto").html(p);

        switch(parseInt(id)) {
            case 1:
                var tabla = $("#data-table-presupuestos").DataTable();
                tabla.destroy();
                arr('login',6,'',225,'"","",0,"","",0,0,0',0,1,$("#listapresupuestos"));
               
                $("#data-table-presupuestos").DataTable({
                    bFilter: false,
                    bLengthChange : false,
                    Order:[]
                });

                $("#fpresupuestos .zelda").data("triforce",{vid:0,vmonto : 0});

                $("#fodts .zelda").data("triforce",{vid:0,videstado : 0,vidproyecto:0});

                 $('.datepicker').pickadate({
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15, // Creates a dropdown of 15 years to control year,
                    today: 'Hoy',
                    clear: 'Limpiar',
                    close: 'Ok',
                    closeOnSelect: false // Close upon selecting a date,
                  });

                break;
            case 2:
                
                break;
            default:
            alert(id)
            	break;
        }
        $('select').material_select();
        $('.dropdown-button').dropdown();
        $('.modal').modal({
            dismissible: true, 
            opacity: .5, 
            in_duration: 300, 
            out_duration: 100,
            startingTop: '4%', 
            endingTop: '4%'
        });
        // $('ul.tabs').tabs();
        $('.collapsible').collapsible();
    });
    $("#m1").click();

});

$(document).on("click",".shpre",function(){
    var cuerpo = $(this).parent().find(".collapsible-body");
    var id = $(this).prop('id').substr(1);
    console.log(cuerpo)
    if (!$(".lista"+id).is(":visible")) {
        $(".collapsible-body").html('');
        
        cuerpo.html('<div class="preloader-wrapper big active" style="margin-left:45%;">    <div class="spinner-layer spinner-blue-only">      <div class="circle-clipper left">        <div class="circle"></div>      </div><div class="gap-patch">        <div class="circle"></div>      </div><div class="circle-clipper right">        <div class="circle"></div>      </div>    </div>  </div>');

        var p = getDatos('',228,id,0,0,'@@impresa')[0];
        var str = '<div class="row lista'+id+'">';
        for (var i = 0; i < p.length; i++) {
            str += '<div class="col s2 m3 cuadro" style="margin-left:2%; margin-top:1%;">'+p[i][2]+'<br>'+p[i][3]+'<div class="row"><a href="#modal-view" class="pbtn der view black-text"><i class="fa fa-money" title="Vista de la ODT"></i></a><a href="#modal-cotiza" class="pbtn der cotiza black-text" title="Adjuntar Cotización Proveedor"><i class="fa fa-file-o"></i></a><a href="#modal-compras" class="pbtn der compra black-text" title="Adjuntar Compra"><i class="fa fa-hdd-o"></i></a><a href="#modal-ocompras" class="pbtn der ocompra black-text" title="Adjuntar Orden Compra"><i class="fa fa-clone"></i></a></div></div>';
        }

        cuerpo.html(str+"</div>")

    }

})
$(document).on("click",".",function(){
    var nom = $(this).parent().parent().find('td').first().html();
    var id = $(this).parent().attr('tid');
    $("#gid").html(nom);
    $("#gid").attr('tr',id);
 
    var p = getDatos('',228,id,0,0);
    console.log(p);
    if(p['succed'] == 1){
        p = p[0];
        var str = '';
        $(".listaodt").html('');
        
        for (var i = 0; i < p.length; i++) {
            str += '<p><input type="checkbox" id="ck'+p[i][1]+'" title="'+p[i][3]+'"/> <label for="ck'+p[i][1]+'">'+p[i][2]+'</label></p>';
        }
        $(".listaodt").append(str);
    }
});
$(document).on("click",".proyect",function(){
    console.log("hola " + p);
    var nom = $(this).parent().parent().find('td').first().html();
    var id = $(this).parent().attr('tid');
    $("#gid").html(nom);
    $("#gid").attr('tr',id);
 
    var p = getDatos('',228,id,0,0);
    
    if(p['succed'] == 1){
        p = p[0];
        var str = '';
        $(".listaodt").html('');
        
        for (var i = 0; i < p.length; i++) {
            str += '<p><input type="checkbox" id="ck'+p[i][1]+'" title="'+p[i][3]+'"/> <label for="ck'+p[i][1]+'">'+p[i][2]+'</label></p>';
        }
        $(".listaodt").append(str);
    }
});

$(document).on("click","#ingPre",function(){
    deadclear("presupuesto");
    $("#titpre").html("Ingresar Presupuesto");
    $("#fpresupuestos #vcodigo").focus();
    $("#monto").val('0.00');
    $("#tp1").click();

    $("#btnpre").removeClass('edit').addClass('add').prop('title',"Ingresar Presupuesto");

    var fecha = new Date();
    $('#vfecha_inicio').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

    $('#vfecha_fin').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

    $("#ano").val(fecha.getFullYear());
});

$(document).on("click","[name='tfecha']",function(){
    var id = parseInt($(this).prop('id').substr(2));
    $(".general").addClass('hide');
    $(".rest").removeClass('hide');
    $(".rest0").removeClass('hide');

    switch(id){
        case 1:
            $(".general").removeClass('hide');
            $(".rest").addClass('hide');
            $(".rest0").addClass('hide');
            break;
        case 2:
            $("#periodo").html('');
            $("#periodo").html('<option value="1">I</option><option value="2">II</option><option value="3">III</option><option value="4">IV</option>');
            break;
        case 3:
            $("#periodo").html('');
            $("#periodo").html('<option value="1">I</option><option value="2">II</option>');
            break;
        case 4:
            $(".rest0").addClass('hide');
            break;
        case 5:
            $("#periodo").html('');
            $("#periodo").html('<option value="1">Enero</option><option value="2">Febrero</option><option value="3">Marzo</option><option value="4">Abril</option><option value="5">Mayo</option><option value="6">Junio</option><option value="7">Julio</option><option value="8">Agosto</option><option value="9">Septiembre</option><option value="10">Octubre</option><option value="11">Noviembre</option><option value="12">Diciembre</option>');
            break;
        case 6:
            $("#periodo").html('');
            $("#periodo").html('<option value="1">I</option><option value="2">II</option><option value="3">III</option>');
            break;
        default:
            break;
    }
    $("#periodo").material_select('update');
    Materialize.updateTextFields();
})

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'presupuesto':
			if (vmodulo['tip'] == '') {
				err = validarpresupuesto();
				if ( err ) {
					return err;
				}
			}
			
			break;
        case 'odt':
            if (vmodulo['tip'] == '') {
                err = validarodt();
                if ( err ) {
                    return err;
                }
            }
            
            break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");

	return salida;

}

function validarodt(){
    if ($("#fodts #vcodigo").val() == '') {
        $("#fodts #vcodigo").focus();
        return 'Código Requerido';
    }

    if ($("#fodts #vdescripcion").val() == '') {
        $("#fodts #vdescripcion").focus();
        return 'Descripción Requerida';
    }

    return false;
}


function validarpresupuesto() {

    if ($("#fpresupuestos #vcodigo").val() == '') {
        $("#fpresupuestos #vcodigo").focus();
        return 'Código Requerido';
    }

    if ($("#monto").val() == '') {
        $("#monto").focus();
        return 'Valor de Monto Requerido';
    }

    if (isNaN($("#monto").val().replace(/,/g,''))) {
        $("#monto").select().focus();
        return 'Monto Debe ser Numérico';
    }

    if (parseFloat($("#monto").val().replace(/,/g,'')) <= 0) {
        $("#monto").select().focus();
        return 'Monto Debe ser Superior a 0';
    }

   var f1 = new Date($("#vfecha_inicio").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd')+' 00:00:00');
    var f2 = new Date($("#vfecha_fin").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd')+' 00:00:00');
    
    if($("#videstado option:selected").val() == 1 && f1 < new Date()){
        return 'Fecha de Solicitud Incorrecta';
    }

    if (f1 > f2) {
        return 'Fechas Incorrectas';
    }

    $("#fpresupuestos .zelda").data("triforce")['vmonto'] = $("#monto").val().replace(/,/g,'');

	return false;
}

function endDetail(vid,vacc,modulo){

    switch(modulo){
        case 'presupuesto':
            if (vacc == 1) {
                deadclear(modulo);
                var fecha = new Date();
                $("#tp1").click();
                $('#vfecha_inicio').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

                $('#vfecha_fin').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
            }
            break;
        case 'odt':
            str += '<p><input type="checkbox" id="ck'+vid[0][0]+'" title="'+$("#f"+modulo+"s #vdescripcion").val()+'"/> <label for="ck'+vsid[0][0]+'">'+$("#f"+modulo+"s #vcodigo").val()+'</label></p>';
        
            $(".listaodt").append(str);
            deadclear(modulo);
            arr('login',7,1,227,'','null,'+vid[0][0]+','+$("#gid").attr('tr'),0,0);
            break;
    }
    thorload(modulo);
    
    

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'presupuesto':
			vmodulo['sel'] = 'codigo as vcodigo,descripcion as vdescripcion,date_format(fecha_inicio,"%Y-%m-%d") as vfecha_inicio,date_format(fecha_fin,"%Y-%m-%d") as vfecha_fin, idtoempresa as vidtoempresa,monto/divisa as monto,id as vid,idmoneda as vidmoneda';
			vmodulo['tbl'] = 224;
			vmodulo['where'] ='id='+vid;
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = '';
	arr['tbl'] = 225;
	arr['where'] = '"","",0,"","",0,0,0';

	return arr;
}

function postload(vmodulo){
    $("#monto").blur();
    $("#titpre").html('Editar Presupuesto');
    $("#btnpre").removeClass('add').addClass('edit').prop('title',"Actualizar Presupuesto");

    var f1 = new Date($("#vfecha_inicio").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd')+' 00:00:00');
    var f2 = new Date($("#vfecha_fin").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd')+' 00:00:00');

    var diferencia = parseInt(f2.getMonth() - f1.getMonth());
    
    switch(diferencia){
        case 0:
            if (f1.getDate() == 1 && (f2.getDate() >= 28)){
                $("#tp5").click();
                $("#periodo").val(f1.getMonth());
            }else
                $("#tp1").click();
            break;
        case 3:
            $("#tp6").click();
            break;
        default:
            $("#tp1").click();
            break;
    }
}