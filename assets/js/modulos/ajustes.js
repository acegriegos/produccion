Dropzone.autoDiscover = false;
var myDropzone;
var inv;

$(function(){

	$("script").each(function(){
		$(this).remove();
	});
	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 225,
		constrainWidth: false, // Does not change width of dropdown to that of the activator
		hover: false, // Activate on hover
		gutter: 0, // Spacing from edge
		belowOrigin: false, // Displays dropdown below the button
		alignment: 'left', // Displays dropdown with edge aligned to the left of button
		stopPropagation: false // Stops event propagation
	});
	$(".modal").modal();
	$("#m1").click();
});

$(document).ready(function(){
	$('ul.tabs').tabs();
});

$(document).on("click",".menu3",function(){
	$(".menu3").removeClass('active');
	$(this).addClass('active');
	$("#titulo").html($(this).html());
	var id = parseInt($(this).attr('id').substr(1));

	switch(id) {
		case 1:
			var p = mantenimiento('ajustes',1,'');
			$("#majustes").html(p);
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 50;
			arr['where'] = '@@impresa';
			var e = mantenimiento('login',4,arr)[0][0];
			$("#vid").val(e[9]);
			$("#vnombre").val(e[0]);
			$("#vcedula").val(e[1]);
			$("[name=ced]").val(e[1].replace(/-/g,''));
			$("#vpfisico").val(e[2]);
			if (e[3]){
				$("#vlogo").removeClass('hide');
				$("#vlogo").attr('src',e[3]);
				$(".vloge").addClass('hide');
			}

			$("#vcorreo").val(e[4]);
			$("#vtelefono").val(e[5]);
			$("#vdireccion").val(e[6]);
			$("#vfechainicio").val(e[7]);
			$("#vfechafinal").val(e[8]);

			if (e[20] == '')
				$(".fe").addClass('hide');
			$("#vuser_atv").val(e[20]);
			$("#vpass_atv").val(e[21]);
			$("#vpass_n").val(e[22]);

			//SAN AJUSTES

			$("#vmsj1").val(e[24]);
			$("#vmsj2").val(e[25]);
			$("#vcorreoconta").val(e[26]);
			$("#vdiaconta").val(e[27]);

			$("#vpv").prop('checked',parseInt(e[28]) ? true : false);
			$("#vprintsale").prop('checked',parseInt(e[18]) ? true : false);
			$("#vcba").prop('checked',parseInt(e[29]) ? true : false);
			$("#vivi").prop('checked',parseInt(e[30]) ? true : false);
			$("#viva").prop('checked',parseInt(e[31]) ? true : false);
			$("#vininvc").prop('checked',parseInt(e[32]) ? true : false);
			$("#vautoacept").prop('checked',parseInt(e[33]) ? true : false);
			$("#vlastmemory").prop('checked',parseInt(e[34]) ? true : false);
			$("#vrecibo").prop('checked',parseInt(e[35]) ? true : false);
			$("#vinvauto").prop('checked',parseInt(e[40]) ? true : false);

			$.get( "https://api.hacienda.go.cr/fe/ae", {identificacion:$("#vcedula").val().replace(/-/g,'')})
			.done(function( data ) {
				var list = ''
			  	for(var i = 0;i<data['actividades'].length;i++){
				  	if(data.actividades[i].estado == 'A'){
				  		list += '<li type="circle"> <i class="mdi mdi-subdirectory-arrow-right"></i><span class="actividades" cod="'+data.actividades[i].codigo+'">'+data.actividades[i].descripcion+'</span></li>'
				  	}

			  		$("#myactivities").html(list)
			  	}
			});

			  $('#more').sideNav({
			      menuWidth: 700, // Default is 300
			      edge: 'right', // Choose the horizontal origin
			      closeOnClick: true
			    }
			  );

			$("#actSuc").click(function(){

				if ($("#vnombre").val() == '') {
					$("#vnombre").focus();
					Materialize.toast("Razón Social Requerida",4000,'red');
					return false;
				}

				if ($("#vcedula").val() == '') {
					$("#vcedula").focus();
					return "Cédula Requerida";
				}

				if ($("#vtelefono").val() == '') {
					$("#vtelefono").focus();
					return "Teléfono Requerido";
				}

				if ($("#isfe").is(":checked") && $("#valid_p12").attr('isvalid') == 0) {
					return "Validación Factura Electrónica Requerida";
				}

				if($("#vcorreoconta").val().trim().length && !validarCorreo($("#vcorreoconta").val())){
					return 'Correo Contador no Valido';
				}

				if ($(".fe:visible").length){ 
					if(!$("#vuser_atv").val().trim().length){
						$("#vuser_atv").focus();
						return 'Usuario de Comprobante Electronico Requerido';
					}

					if(!$("#vpass_atv").val().trim().length){
						$("#vpass_atv").focus();
						return 'Contrasena de Comprobante Electronico Requerido';
					}

					if(!$("#vpass_n").val().trim().length){
						$("#vpass_n").focus();
						return 'Pin de Llave Criptográfica Requerido';
					}

					if($("#vpass_atv").val().trim().length != 20){
						$("#vpass_atv").focus().select();
						return 'Contrasena debe de ser de 20 Caracteres';
					}

					if($("#vpass_n").val().trim().length != 4){
						$("#vpass_n").focus().select();
						return 'Pin de Llave Criptográfica debe ser de 4 Numeros';
					}

					$("[name=pin]").val($("#vpass_n").val())
				}

				var myDropzone = Dropzone.forElement("#p12-upload");
				if(myDropzone.getQueuedFiles()[0] != undefined){
					myDropzone.processQueue();
					return false;
				}

				var ps = $("#vprintsale").is(':checked')?1:0;
				actualizar(39,'pass_atv="'+$("#vpass_atv").val()+'",user_atv="'+$("#vuser_atv").val()+'",pass_n="'+$("#vpass_n").val()+'",pfisico="'+$("#vpfisico").val()+'",printSale='+ps,'id=@@impresa');

				var num = 1;
				while ($("#slideTelefono").data()['fila'+num] != undefined) {
					if($("#slideTelefono").data()['fila'+num]['vidtelefono'] != "0"){
						actualizar(238,'telefono='+$("#slideTelefono").data()['fila'+num]['vtelefono']+',idtipotel='+$("#slideTelefono").data()['fila'+num]['vidtipotel']+',idpais='+$("#slideTelefono").data()['fila'+num]['vidpais'],'idtelefono='+$("#slideTelefono").data()['fila'+num]['vidtelefono']);
					}else{
						ingresar(238,'','null,'+$("#slideTelefono").data()['fila'+num]['vidtipotel']+','+$("#slideTelefono").data()['fila'+num]['vtelefono']+',39,@@impresa,'+$("#slideTelefono").data()['fila'+num]['vidpais'])
					}
					num += 1;
				}

				num = 1;
				while ($("#slideCorreo").data()['fila'+num] != undefined) {
					if($("#slideCorreo").data()['fila'+num]['vidcorreo'] != "0"){
						actualizar(17,'correo="'+$("#slideCorreo").data()['fila'+num]['vcorreo']+'"','idcorreo='+$("#slideCorreo").data()['fila'+num]['vidcorreo']);
					}else{
						ingresar(17,'','null,@@impresa,39,'+$("#slideCorreo").data()['fila'+num]['vcorreo'])
					}
					num += 1;
				}

				if($("#slideDireccion").data()['fila1'] != undefined){
					actualizar(239,'direccion="'+$("#slideDireccion").data()['fila1']['vdireccion']+'",idbarrio='+$("#slideDireccion").data()['fila1']['vidbarrio'],'idubicacion='+$("#slideDireccion").data()['fila1']['vidubicacion'])
				}

				eliminar(293,'idsucursal = @@impresa');
			  		
				$(".actividades").each(function(index){
					if(index == 0)
						actualizar(39,'codactividad='+$(this).attr('cod'),'id=@@impresa');
					else
						insertar(293,'','@@impresa,"'+$(this).attr('cod')+'"');
				});

				myDropzone = Dropzone.forElement("#registro-upload");
				if(myDropzone.getQueuedFiles()[0] != undefined){
					myDropzone.processQueue();
				}

				//SAN AJUSTES

				actualizar(40,'msj1="'+$("#vmsj1").val()+'",msj2="'+$("#vmsj2").val()+'",correoconta="'+$("#vcorreoconta").val()+'",dia_rep_cont='+$("#vdiaconta").val()+',pv='+$("#vpv").is(':checked')+',cbarras='+$("#vcba").is(':checked')+',isivi='+$("#vivi").is(':checked')+',ivafact='+$("#viva").is(':checked')+',ininvc='+$("#vininvc").is(':checked')+',autoacept='+$("#vautoacept").is(':checked')+',lastmemory='+$("#vlastmemory").is(':checked')+',recibo='+$("#vrecibo").is(':checked')+',invauto='+$("#vinvauto").is(":checked"),'idsucursal=@@impresa');

				Materialize.toast('Datos Actualizados Correctamente',4000,'green');

			});

			if (e[16] != '') {
				$.post('../wsdlClient.php',{
					accion: 9,
					id: 0
				}).done(function(data){
					var p = JSON.parse(data);
					if (p['succed']) {
						//$(".fe").addClass('hide');			
						$("#fecheck").removeClass('red-text').addClass('green-text')
					}else{
						Materialize.toast(p['ERROR'], 4000, 'red');
						$("#dempresa").click();
						// $("#isfe").prop({ 'disabled' : false,'checked' : false });
						// $("#p12-upload").removeClass('hide');
						// $("label[for=p12-upload]").removeClass('hide');
						// $("#vpass_n").parent().removeClass('offset-s6');
						$("#fecheck").removeClass('green-text').addClass('red-text')
					}
				});
				
			}else{
				$("#isfe").prop({ 'disabled' : false,'checked' : false });
				$("#p12-upload").removeClass('hide');
				$("label[for=p12-upload]").removeClass('hide');
				$("#vpass_n").parent().removeClass('offset-s6');
			}

			$("#data-table-monedas").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});

			$("#data-table-tipousuarios").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});

			$("#data-table-tipopagos").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});

			$("#data-table-bancos").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});

			$("#data-table-nivelesclientes").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});

			$(".wsdl-op").hide();

			InitDropzone(1,false,'../cargar.php?accion=1',"#registro-upload",false,'image/*','','',loadIMG);
			InitDropzone(1,false,'../cargar.php?accion=2',"#p12-upload",false,'.p12','','',removep12);
			break;
		case 2:
			var p = mantenimiento('ajustes',2,'');
			$("#majustes").html(p);
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 142;
			arr['where'] = '0,@@impresa';
			var desc = mantenimiento('login',4,arr);

			if (desc != null) {
				var vdesc = mantenimiento('login',6,arr);
				$("#listadescuentos").html(vdesc);
			}
			$("#data-table-descuentos").dataTable({
				bLengthChange : false,
				order : []
			});
			break;
		case 3:
			var p = mantenimiento('ajustes',3,'');
			var arr = {};
			arr['sel'] = '*';
			arr['tbl'] = 51;
			arr['where'] = 'id > 0 order by id';
			var imp = mantenimiento('login',6,arr);

			$("#dimpuestos").html(imp);
			$("#majustes").html(p);

			$("#data-table-impuestos").dataTable({
				bLengthChange : false,
				order : []
			});
			break;
		case 4:
			var p = mantenimiento('ajustes',4,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			$("#data-table-defecto").dataTable({
				bLengthChange : false,
				order : []
			});

			$("#bcuenta").keyup(function(){
				var code = $(this).val();
				$(".cuecon").hide();

				if(code.trim().length)
					$(".editc").filter(function(){ return $(this).attr('value').toLowerCase().indexOf(code) > -1; }).parent().parent().parent().show();
				else
					$(".cuecon[ndeep=1]").show();
			});

			$(document).on("click","[id^=ac]",function(){
				var id = $(this).attr('id').substr(2);
				var ml = parseInt($(this).parent().parent().parent().attr('ndeep'));

				$(this).parent().parent().parent().after('<a href="#!" class="collection-item cuecon" style="color:black;max-height:220px;padding:0;padding-top: 2px;" deep="0" ndeep="'+(ml+1)+'"> <div class="row"> <div class="col s4 left"> <input type="text" tp="0" class="editc" atp="'+id+'" value="" title="Editar Nombre" style="border: 0px; border-left:1px solid #e2e2e2;margin-bottom: 0px; margin-left: '+((ml+1)*2)+'%;" maxlength="40"> </div><div class="col s4 numcon center" style="cursor: pointer; min-height: 40px; margin: 0 auto;"> ----- </div><div class="col s4 right"><i class="mdi mdi-plus mdi-24px" id="ac0" title="Agregar Cuenta"></i><i class="mdi mdi-delete mdi-24px" id="ec0" title="Eliminar Cuenta"></i></div></div></a>');

				$(".editc[tp=0]").focus();
			});

			$(".mp").click(function(){
				$(".mp").css('opacity','0.5');
				$(this).css('opacity','1');	
				$(".atbl").addClass('hide');
				$("#tbl"+$(this).attr('mp')).removeClass('hide');
				//var datos = getDatos('',,'',0,0,0);
				switch (parseInt($(this).attr('mp'))) {
					case 1:
						break;
					default:
						break;
				}

				$("#vistat").removeClass('hide');
			});

			$("#pventas").click(function(){
				var cdef = getDatos('',89,'1,1',0,0,0);

				if(cdef[0].length){
					var ntr = ntd1 = ntd2 = vtd = vtd1 = vtd2 = btpl = btp = '';
					var sugrupo = 0;
					$("#cuerpoc").html('')
					for (var i = 0; i < cdef[0].length; i++) {
						if(parseInt(cdef[0][i][4]) != sugrupo){
							sugrupo = parseInt(cdef[0][i][4]);
							btp = 'border-top: 1px solid black;';
						}else {
							btp = '';
						}
						if(cdef[0][i][0] == "1"){
							btpl = 'border-right: 1px solid black;'+btp;
							vtd2 = '<td style="padding: 0px;"></td>';
							vtd1 = '<td style="padding: 0px;'+btp+'"></td>'; 
						}else {
							btpl = 'border-left: 1px solid black;'+btp;
							vtd1 = '<td style="padding: 0px;"></td>';
							vtd2 = '<td style="padding: 0px;'+btp+'"></td>'; 
						}
						vtd  = vtd1+vtd2;
						ntd1 = '<td style="padding: 0px;">'+cdef[0][i][1]+'</td> ';
						ntd2 = '<td style="padding: 0px;'+btpl+'"><select class="browser-default dc" id="dc'+cdef[0][i][5]+'">'+$("#vcuentas").attr('lp'+cdef[0][i][2])+'</select></td>';

						if(cdef[0][i][0] == "1")
							ntr = '<tr> '+ntd1+ntd2+vtd+' </tr>'; 
						else
							ntr = '<tr> '+vtd+ntd2+ntd1+' </tr>'; 

						$("#cuerpoc").append(ntr);
						$("#dc"+cdef[0][i][5]).val(cdef[0][i][3]);
					}
				}
				
			});

			$(document).on('change','.dc',function(){
				console.log(actualizar(88,'idcuenta='+$("option:selected",this).val(),'id='+$(this).attr('id').substr(2)));
			});

			var lista = '<option value="0">N/A</option>'
			var lpactivos = getDatos('id,nombre',36,'id > 0 and !ispadre and substring(numero,1,1) = 1 order by numero');
			for (var i = 0; i < lpactivos[0].length; i++) {
				lista += '<option value="'+lpactivos[0][i][0]+'">'+lpactivos[0][i][1]+'</option>';
			}
			$("#vcuentas").attr('lp1',lista);

			lista = '<option value="0">N/A</option>'
			lpactivos = getDatos('id,nombre',36,'id > 0 and !ispadre and substring(numero,1,1) = 2');
			for (var i = 0; i < lpactivos[0].length; i++) {
				lista += '<option value="'+lpactivos[0][i][0]+'">'+lpactivos[0][i][1]+'</option>';
			}
			$("#vcuentas").attr('lp2',lista);

			lista = '<option value="0">N/A</option>'
			lpactivos = getDatos('id,nombre',36,'id > 0 and !ispadre and substring(numero,1,1) = 3');
			for (var i = 0; i < lpactivos[0].length; i++) {
				lista += '<option value="'+lpactivos[0][i][0]+'">'+lpactivos[0][i][1]+'</option>';
			}
			$("#vcuentas").attr('lp3',lista);

			lista = '<option value="0">N/A</option>'
			lpactivos = getDatos('id,nombre',36,'id > 0 and !ispadre and substring(numero,1,1) = 4');
			for (var i = 0; i < lpactivos[0].length; i++) {
				lista += '<option value="'+lpactivos[0][i][0]+'">'+lpactivos[0][i][1]+'</option>';
			}
			$("#vcuentas").attr('lp4',lista);

			lista = '<option value="0">N/A</option>'
			lpactivos = getDatos('id,nombre',36,'id > 0 and !ispadre and substring(numero,1,1) = 5');
			for (var i = 0; i < lpactivos[0].length; i++) {
				lista += '<option value="'+lpactivos[0][i][0]+'">'+lpactivos[0][i][1]+'</option>';
			}
			$("#vcuentas").attr('lp5',lista);

			lista = '<option value="0">N/A</option>'
			lpactivos = getDatos('id,nombre',36,'id > 0 and !ispadre and substring(numero,1,1) = 6');
			for (var i = 0; i < lpactivos[0].length; i++) {
				lista += '<option value="'+lpactivos[0][i][0]+'">'+lpactivos[0][i][1]+'</option>';
			}
			$("#vcuentas").attr('lp6',lista);

			break;
		case 5:
			var p = mantenimiento('ajustes',5,'');
			$("#data-table-sucursales").dataTable({
				bFilter : false,
				bScrollInfinite : true,
				bSort : false,
				bLengthChange : false,
				bPaginate :  false,
				bInfo : false
			});
			$("#majustes").html('');
			$("#majustes").html(p);

			$("#isfe").change(function(){
				if ($(this).is(":checked"))
					$(".fe").show()
				else
					$(".fe").hide()
			});

			$("#valid_p12").click(function(){
				$("#valid_p12").attr('disabled',true);
				var myDropzone = Dropzone.forElement("#p12-upload");
				var data = new FormData();
				if(myDropzone.getQueuedFiles()[0] == undefined){
					Materialize.toast('Llave Criptográfica Inválida',4000,'red');
					$("#valid_p12").attr('disabled',false);
					return false;
				}

				data.append('accion',3);
				data.append('clave',$("#vpass_n").val());
				data.append('file',myDropzone.getQueuedFiles()[0]);
				data.append('user',$("#vuser_atv").val());
				data.append('pass',$("#vpass_atv").val());
				data.append('prueba',$("#visPrueba").is(':checked'));

				jQuery.ajax({
				    url: '../cargar.php',
				    data: data,
				    cache: false,
				    contentType: false,
				    processData: false,
				    method: 'POST',
				    type: 'POST',
				    success: function(data){
				        try {
			                p = JSON.parse(data);
			                $("#vnombre").val(p['CN']);
			                $("#vcedula").val(p['cedula']);
			                if (p['tipo'])
			                	$("#juridico").click()
			                else
			                	$("#fisico").click()
			                $("#valid_p12").attr('isvalid',1)
			                $("#valid_p12").attr('disabled',false);
			                Materialize.updateTextFields();
			            }
			            catch(err){
			                p = data;
			                $("#valid_p12").attr('isvalid',0)
			                $("#valid_p12").attr('disabled',false);
			                Materialize.toast(p,4000,'red');
			            }
				    },
				    error:function(x,y,z){
				    	alert(x)
				    }
				});
			});
			$("select").material_select('update');
			InitDropzone(1,false,'../cargar.php?accion=1',"#registro-upload",false,'image/*',null,null,loadIMG());
			InitDropzone(1,false,'../cargar.php?accion=2',"#p12-upload",false,'.p12',null,null,removep12());
			break;
		case 6:
			var p = mantenimiento('ajustes',6,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			$("#data-table-bodegas").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			$("#data-table-inventarios").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			var varr = {};
			varr['sel'] = 'idcuenta';
			varr['tbl'] = 88;
			varr['where'] = 'idfila = 0 and idtipo = 10';
			var def = mantenimiento('login',4,varr)[0][0];
			$("#vidcuenta").val(def);

			$(document).on("change","#vidbodega",function(){
				var id = $(this).val();
				var tabla = $("#data-table-inventarios").DataTable();
				tabla.destroy();
				$("#listainventarios").html(mantenimiento('login',6,{sel:'id,nombre',tbl:111,where:'idbodega = '+id+' and idsucursal in(@@impresa,-1)'}));
				$("#data-table-inventarios").DataTable({
					bFilter :  false,
					bLengthChange : false,
					order : []
				});
			});
			break;
		case 7:
			var p = mantenimiento('ajustes',7,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			$("#vnombre").focus();
			$("#data-table-vp").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});

			// $(document).on("change","#vidbodega",function(){
			// var id = $(this).val();
			// arr('login',6,'id,nombre',111,'id > 0 and idbodega = '+id+' order by nombre',15,1,$("#vidinvent"));
			// $("#vidinvent").material_select();
			// $("#dinvent").show(500);
			// });
			break;
		case 8:
			var p = mantenimiento('ajustes',8,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			$("#vnombre").focus();
			$("#data-table-accesos").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			break;
		case 9:
			var p = mantenimiento('ajustes',9,'');
			$("#majustes").html(p);

			var familias = getDatos('id,if(nombre = "","N/A",nombre) as nom',20,'id > 0 and idsucursal = @@impresa order by nom',0,0,0);
			var str = '';
			if(familias[0].length){
				for (var i = 0; i < familias[0].length; i++) {
					str += '<tr><td>'+familias[0][i][1]+'</td><td> <i class="mdi mdi-stackexchange mdi-16px pbtn" title="Cambiar Valores"></i>  <i class="mdi mdi-chili-mild mdi-16px pbtn" title="Tipos Asignados"></i> <i class="mdi mdi-chili-medium mdi-16px pbtn" title="Marcas Asignadas"></i> <i class="mdi mdi-chili-hot mdi-16px pbtn" title="Productos Asignados"></i> <i class="mdi mdi-close mdi-16px pbtn" title="Eliminar Familia"></i> </td>'
				}
			}
			$("#listafamilias").html(str);

			familias = getDatos('id,if(nombre = "","N/A",nombre) as nom,(select if(nombre = "","N/A",nombre) from familias where id = idfamilia) as fam',21,'id > 0 and idsucursal = @@impresa order by fam,nom',0,0,0);
			str = '';
			if(familias[0].length){
				for (var i = 0; i < familias[0].length; i++) {
					str += '<tr><td>'+familias[0][i][1]+'</td><td> <td>'+familias[0][i][2]+'</td><td> <i class="mdi mdi-stackexchange mdi-16px pbtn" title="Cambiar Valores"></i>  <i class="mdi mdi-chili-medium mdi-16px pbtn" title="Marcas Asignadas"></i> <i class="mdi mdi-chili-hot mdi-16px pbtn" title="Productos Asignados"></i> <i class="mdi mdi-close mdi-16px pbtn" title="Eliminar Familia"></i> </td>'
				}
			}
			$("#listatipos").html(str);

			familias = getDatos('id,if(nombre = "","N/A",nombre) as nom,(select if(nombre = "","N/A",nombre) from tipos where id = idtipo) as tip,(select if(nombre = "","N/A",nombre) from familias where id = (select idfamilia from tipos where id = idtipo)) as fam',22,'id > 0 and idsucursal = @@impresa order by fam,tip,nom',0,0,0);
			str = '';
			if(familias[0].length){
				for (var i = 0; i < familias[0].length; i++) {
					str += '<tr><td>'+familias[0][i][1]+'</td><td> <td>'+familias[0][i][2]+'</td><td> <td>'+familias[0][i][3]+'</td><td> <i class="mdi mdi-stackexchange mdi-16px pbtn" title="Cambiar Valores"></i> </i> <i class="mdi mdi-chili-hot mdi-16px pbtn" title="Productos Asignados"></i> <i class="mdi mdi-close mdi-16px pbtn" title="Eliminar Familia"></i> </td>'
				}
			}
			$("#listamarcas").html(str);

			break;
		case 10:
			var p = mantenimiento('ajustes',13,'');
			$("#majustes").html(p);
			$("#data-table-mesas").dataTable({
				bFilter: false,
	            bScrollInfinite: true,
	            bSort: false,
	            bLengthChange: false,
	            order: [],
	            bPaginate: false,
	            info: false
			});
			$("#data-table-secciones").dataTable({
				bFilter: false,
	            bScrollInfinite: true,
	            bSort: false,
	            bLengthChange: false,
	            order: [],
	            bPaginate: false,
	            info: false
			});
			$("#frestaurantes-mesas .zelda").data('triforce',{vid:0,vnombre:'',vunion:'',vbisbarra:0,vidusuario:'',vidsucursal:'',vidtipoocupado:0,vidseccion:0});
			$("#frestaurantes-secciones .zelda").data('triforce',{vid:0,vnombre:''});
			thorload('restaurantes-mesa');
			paginate($("ul.pagination").attr('vtbl'),undefined,',0,0');
			
			inv = getDatos('idinventario',171,'idtipo=4',0,0,0)[0][0];
			inv = inv == undefined ? 0 : inv[0]
			$("#vinventario").val(inv).material_select('update');

			$("#vinventario").change(function(){
				if (inv)
					actualizar(171,'idinventario = '+$(this).val(),'idtipo = 4 and idsucursal = @@impresa');
				else
					insertar(171,'','null,'+$(this).val()+',@@impresa,4');
			});
			break;
		case 11:
			var p = mantenimiento('ajustes',14,'');
			$("#majustes").html(p);
			$("#ingRub").click(function(){
				$("#modal-rubros").modal('open');
				$("#dosrubro").addClass('guardar').removeClass('editar')
			});
			break;
		default:
			break;
	}

	$(".modal").modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		in_duration: 300, // Transition in duration
		out_duration: 100, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '4%' // Ending top style attribute
	});
	$('.tooltipped').tooltip({delay: 50});
	$('.dropdown-button').dropdown();
	$('select').material_select();
	$(".collapsible").collapsible(); 
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year
		format: 'yyyy-mm-dd'
	});

	$("#modal-tipopagos").modal({
		complete: function(){
			$("#vnombre_pago").attr('id','tmp_pagos');
			$("#tmp").attr('id','vnombre_pago');
			$("#tmp_l_pagos").attr('for','tmp_pagos');
		}
	});

	$("#modal-bancos").modal({
		complete: function(){
			$("#vnombre_banco").attr('id','bname-mod');
			$("#tmp").attr('id','vnombre_banco');
		}
	});
});

$(document).on("change",".vbincierre",function(){
	var id = $(this).attr('id').substr(2);
	var valor = $(this).val();
	if ($(this).is(":checked"))
		arr('login',7,'2',27,'bincierre = 1','id = '+id,0,0);
	else
		arr('login',7,'2',27,'bincierre = 0','id = '+id,0,0);
});

$(document).on("click","#addtypeuser",function(){
	var p = '';
	var arreglo = {};
	arreglo['modulo'] = $(this).attr('modulo');
	arreglo['tip'] = '';
	arreglo['atributos'] = baseValidar(1,arreglo);
	if (arreglo['atributos'] == "[object Object]"){
		arreglo['atributos']['vaccion'] = 1;
		for (var i = 0; i < arreglo['atributos']['vidtipousuario'].split(',').length; i++) {
			arreglo['atributos']['vidtipousuario'] = arreglo['atributos']['vidtipousuario'].split(',')[i];
			p = mantenimiento('login',2,arreglo);
		}
		// if (p['succed'] == 0) {
		// Materialize.toast(p[0]['ERROR'], 4000, 'red');
		// //QUITAR EL SEGUNDO UNO PONER UN 4
		// endDetail(1,4,modulo+"s");
		// }else{
		// Materialize.toast('Registro Ingresado Correctamente', 4000, 'green');
		// var id = p[0][0];
		// endDetail(id,acc,modulo);
		// }
	}else{
		Materialize.toast(arreglo['atributos'], 4000, 'red');
	}
});

$(document).on("click",".catcli",function(){
	var id = $(this).attr('id').substr(1);
	var tabla = $("#data-table-clientes-Categoria").DataTable();
	tabla.destroy();
	arr('login',6,'',309,id,0,1,$("#listacategoriasclie"));
	var cat = arr('login',4,'',309,id,0,0,0)[0][0][0];
	$("#catego").text(cat);
	$("#data-table-clientes-Categoria").DataTable({
		bFilter :  false,
		bLengthChange : false,
		order : []
	});	
});

/*	var cat = arr('login',4,'',309,id,0,0,0)[0][0][0];*/	
$(document).on("change", ".ispadr",function(){
	var id = $(this).attr('id').substr(2);
	var ispadre = $(this).is(":checked") == true ? 1 : 0;
	var p = arr('login',7,2,36,'ispadre ='+ispadre,'id = '+id, 0,0,0)[0];
	if (p['ERROR'] != undefined) {
		Materialize.toast(p['ERROR'],4000,'red');
		$(this).prop('checked',true);
	}
});

$(document).on("change","#videtapa",function(){
	arr('login',6,'id,nombre',41,'id > 0',15,1,$("#xidbodega"));
	$("#xidbodega").material_select();
	$("#dbod").show(500);
});

$(document).on("click","[id^=ec]",function(){
	var id = $(this).attr('id').substr(2);
	var p = actualizar(36,'id=min(id)-1','id='+id);

	if (!p[0].length) {
		Materialize.toast(p['ERROR'],4000,'red');
	}else{
		$(this).parent().parent().parent().remove();
		Materialize.toast('Cuenta Eliminada Correctamente',4000,'green');
	}
});

$(document).on("change","#xidbodega",function(){
	var id = $(this).val();
	arr('login',6,'id,nombre',111,'idbodega = '+id,15,1,$("#xidinventario"));
	$("#xidinventario").material_select();
	$("#dinv").show(500);
	$("a[modulo=produccioninventarios]").show();
});

$(document).on("click",".addserv",function() {
	var id = $(this).attr('id').substr(1);
	var variable = arr('login',4,'nombre',169,'id = '+id,0,0,0)[0][0];
	$(".varprod").text(variable);
	arr('login',6,'id,nombre',41,'id > 0 order by nombre',15,1,$("#vidbodega"));
	$("#vidbodega").material_select();
	$("#addservprod").attr('idvariable',id);
});

$(document).on("click",".shserv",function(){
	var id = $(this).attr('id').substr(1);
	var tabla = $("#data-table-servsasoc").DataTable();
	var variable = arr('login',4,'nombre',169,'id = '+id,0,0,0)[0][0];
	tabla.destroy();
	arr('login',6,'id,servicio,inventario',175,'idvariable = '+id,0,1,$("#listaserviciosproducciones"))
	$(".varprod").text(variable);
	$("#data-table-servsasoc").DataTable({
		bFilter :  false,
		bLengthChange : false,
		order : []
	});
});

$(document).on("click","#addservprod",function(){
	var idvariable = $(this).attr('idvariable');
	var idinventario = $("#vidinvent").val();
	var idservicio = $("#vidserv").val().toString().split(',');
	$.each(idservicio,function(index,value){
		var servs = arr('login',4,'',173,'1,0,'+idvariable+','+idinventario+','+idservicio[index]+',@@usr,@@impresa',0,0,0);
		if (servs[0][0] != undefined)
			Materialize.toast('Servicio Asociado Correctamente', 4000, 'green');
		else
			Materialize.toast(servs[0]['ERROR'], 4000, 'red');
	});
});

$(document).on("change","#vidinvent",function(){
	var id = $(this).val();
	arr('login',6,'id,nombre',172,'idinventario = '+id+' order by nombre',0,1,$("#vidserv"))
	$("#vidserv").material_select();
	$("#dserv").show(500);
});

$(document).on("keyup","#vvalor",function(e){
	var code = e.which || e.keyCode;
	if (code == 13)
		$("#addvarprod").click();
});

$(document).on("keyup","#vnombre_cat",function(e){
	var code = e.which || e.keyCode;
	if (code == 13)
		$("#vvalor").focus();
});

$(document).on("keyup","#vcorreo",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		if ($(this).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)) {
			$(this).css('border-bottom','1px solid #4CAF50');
			$(this).css('box-shadow','0 1px 0 0 #4CAF50');
		}else{
			$(this).css('border-bottom','1px solid #9e9e9e');
			$(this).css('box-shadow','none');
			Materialize.toast('Correo Inválido', 6000, 'red');
		}
	}
});

$(document).on("click",".editdesc",function(){
	var id = $(this).attr('id').substr(1);
	$("#iddescuento").val(id);
	$("#tpdsc").val(0);
	$("#tpdsc").material_select('update');
	$("#descue").val(0);
	$("#descue").material_select('update');
	$(".options").addClass('hide');
});

$(document).on("change","#tpdsc",function(){
	$("#descue").html('');
	var iddescuento = $("#iddescuento").val();
	var idtabla = $("option:selected",this).attr('tabla');
	var desc = arr('login',4,'',145,iddescuento+','+idtabla,0,0,0)[0];
	$("#descue").append('<option value="0">Seleccione una Opción</option>');
	for (var i = 0, len = desc.length; i < len; i++) {
		$("#descue").append('<option value="'+desc[i][0]+'">'+desc[i][1]+'</option>');
	}
	$("#descue").material_select();
	$(".options").addClass('hide');
});
//aqui
$(document).on("change","#descue",function(){
var id = $(this).val();
//idtabla = '+$("#tpdsc option:selected").attr('tabla')+' and idfila = '+id
if (id != 0) {
$(".options").removeClass('hide');
var optns = arr('login',4,'idciclo,date_format(f1,"%Y-%m-%d"),date_format(f2,"%Y-%m-%d"),extra,valor',79,'id='+$("#tpdsc option:selected").val(),0,0,0)[0][0];
var days = optns[3];
$("#optdesc").val(optns[0]).change();
$("#optdesc").material_select();
if (optns[1] != null) {
$("#f1").val(optns[1]);
$("#f2").val(optns[2]);
}else{
$('#f1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$('#f2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
}
$("#valor").val(optns[4]);
Materialize.updateTextFields();
if (optns[0] == 2) {
$("#months").val(optns[3]);
$("#days").val(0);
$("select").material_select();
}else if (optns[0] == 3) {
days = days.split(',');
$.each(days,function(index,value){
$("#days").find("option[value='"+value+"']").prop('selected', true);
$("#days").find("option[value='"+value+"']").val(value);
});
$("#months").val(0);

$("select").material_select();
}
}else{
$(".options").addClass('hide');
}
});

$(document).on("change","#vidciclo",function(){
var id = $(this).val();
if (id == 0 || id == 4) {
$("[vfecha]").addClass('hide');		
$('#vf1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$('#vf2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$("#vmonths").val(0);
$("#vdays").val(0);
}else if (id == 1) {
$("[vfecha=1]").removeClass('hide');
$("[vfecha=2]").addClass('hide');
$("[vfecha=3]").addClass('hide');
fecha = new Date();
$('#vf1').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
$('#vf2').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()+1]);
$("#vmonths").val(0);
$("#vdays").val(0);
}else if (id == 2) {
$("[vfecha=2]").removeClass('hide');
$("[vfecha=1]").addClass('hide');
$("[vfecha=3]").addClass('hide');
$('#vf1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$('#vf2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
var months = arr('login',4,'id,nombre',143,'1',0,0,0)[0];
for (var i = 0, len = months.length; i < len; i++) {
$("#vmonths").append('<option value="'+months[i][0]+'">'+months[i][1]+'</option>');
}
$("#vmonths").material_select();
$("#vdays").val(0);
}else if (id == 3) {
$("[vfecha=1]").addClass('hide');
$("[vfecha=2]").addClass('hide');
$("[vfecha=3]").removeClass('hide');
$('#vf1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$('#vf2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
var days = arr('login',4,'id,nombre',144,'1',0,0,0)[0];
for (var i = 0, len = days.length; i < len; i++) {
$("#vdays").append('<option value="'+days[i][0]+'">'+days[i][1]+'</option>');
}
$("#vdays").material_select();
$("#vmonths").val(0);
}
});

$(document).on("change","#optdesc",function(){
var id = $(this).val();
if (id == 0 || id == 4) {
$("[vfecha]").addClass('hide');		
$('#f1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$('#f2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$("#months").val(0);
$("#days").val(0);
}else if (id == 1) {
$("[vfecha=1]").removeClass('hide');
$("[vfecha=2]").addClass('hide');
$("[vfecha=3]").addClass('hide');
fecha = new Date();
$('#f1').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
$('#f2').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()+1]);
$("#months").val(0);
$("#days").val(0);
}else if (id == 2) {
$("[vfecha=2]").removeClass('hide');
$("[vfecha=1]").addClass('hide');
$("[vfecha=3]").addClass('hide');
$('#f1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$('#f2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
var months = arr('login',4,'id,nombre',143,'1',0,0,0)[0];
for (var i = 0, len = months.length; i < len; i++) {
$("#months").append('<option value="'+months[i][0]+'">'+months[i][1]+'</option>');
}
$("#months").material_select();
$("#days").val(0);
}else if (id == 3) {
$("[vfecha=1]").addClass('hide');
$("[vfecha=2]").addClass('hide');
$("[vfecha=3]").removeClass('hide');
$('#f1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
$('#f2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
var days = arr('login',4,'id,nombre',144,'1',0,0,0)[0];
for (var i = 0, len = days.length; i < len; i++) {
$("#days").append('<option value="'+days[i][0]+'">'+days[i][1]+'</option>');
}
$("#days").material_select();
$("#months").val(0);
}
});

$(document).on("click",".assigndesc",function(){
var id = $(this).attr('id').substr(1);
var nombre = arr('login',4,'nombre',94,'id = '+id,0,0,0)[0][0];
$("#namedesc").text(nombre);
$("#adddesc").attr('iddescuento',id);
$('#vf1').pickadate().pickadate('picker').set('select', [1000,00,01]);
$('#vf2').pickadate().pickadate('picker').set('select', [1000,00,01]);
$("#td1").change();
});

$(document).on("click","#adddesc",function(){
	var iddescuento = $(this).attr('iddescuento');
	var idciclo = $("#vidciclo").val();
	var f1 = $("#vf1").val()+' 00:00:00';
	var f2 = $("#vf2").val()+' 00:00:00';
	var idfila = 0;
	var tabla = $("[name=tipodesc]:checked").attr('tbl');
	var valor = $("#vvalor").val() == '' ? 0 : $("#vvalor").val();
	var extra = 0;

	if ($("[name=tipodesc]:checked").attr('text') == 1)
		idfila = $("#vidfila").val() == '' ? 0 : $("#vidfila").val();
	else
		idfila = $("#voptns").val() == '' ? 0 : $("#voptns").val();

	if (idciclo == 2)
		extra = $("#vmonths").val();
	else if (idciclo == 3)
		extra = $("#vdays").val() == '' ? 0 : $("#vdays").val();
	// if (idfila == 0) {
	// Materialize.toast('Descuento sin Asignar', 6000, 'red');
	// }else 

	if (valor == 0) 
		Materialize.toast('Valor debe ser mayor a 0', 6000, 'red');
	else{
		var dsc = arr('login',4,'',95,'1,0,'+idciclo+','+iddescuento+',"'+f1+'","'+f2+'",'+idfila+','+tabla+','+valor+',\"'+extra+"\"",0,0,0);
		Materialize.toast('Descuento Agregado Correctamente', 4000, 'green');
		$("#vidciclo").val(0);
		$("#vidciclo").change();
		$("#td1").prop('checked',true)
		$("#vproducto").val('');
		$("#vcliente").val('');
		$("#vvalor").val('');
		$("select").material_select();
	}
});

$(document).on("click","#editdesc",function(){
var iddescuento = $("#iddescuento").val();
var idtabla = $("#tpdsc option:selected").attr('tabla');
var idfila = $("#descue").val();
var idciclo = $("#optdesc").val();
var f1 = $("#f1").val();
var f2 = $("#f2").val();
var valor = $("#valor").val();
var days = $("#days").val();
var months = $("#months").val();
var extra = '';
var id = $("#descue").val();//arr('login',4,'id',79,'idfila = '+idfila+' and idtabla = '+idtabla+' and iddescuento = '+iddescuento,0,0,0)[0][0][0];
if (idciclo == 2) {
extra = months;
}else if (idciclo == 3) {
extra = days;
}
if (f1 == '1000-01-01' && f2 == '1000-01-01') {
f1 = f2 = null;
}
var desc = arr('login',4,'',95,'2,'+id+','+idciclo+','+iddescuento+','+f1+','+f2+','+idfila+','+idtabla+','+valor+',\"'+extra+'\"',0,0,0);
Materialize.toast('Descuento Actualizado Correctamente', 4000, 'green');
$("#tpdsc").val(0);
$("#descue").val(0);
// $("#vidciclo").val(0);
// $("#vproducto").val('');
// $("#vcliente").val('');
// $("#vvalor").val('');
$("select").material_select();
});

$(document).on("click","#gendesc",function(){
var cuentas = arr('login',4,'id,nombre',36,'id > 0',0,0,0)[0];
var defecto = arr('login',4,'idcuenta',89,'idtipo = 3',0,0,0)[0][0];
var estados = arr('login',4,'id,nombre',141,'1',0,0,0)[0];
for (var i = 0, len = estados.length; i < len; i++) {
$("#videstado").append('<option value="'+estados[i][0]+'">'+estados[i][1]+'</option>');
$("#videstado").val(1);
}
for (var i = 0, len = cuentas.length; i < len; i++) {
$("#vidcuenta").append('<option value="'+cuentas[i][0]+'">'+cuentas[i][1]+'</option>');
$("#vidcuenta").val(defecto);
}
$("select").material_select();
});

$(document).on("change","[name=tipodesc]",function(){
var id = parseInt($(this).attr('id').substr(2));
var tbl = $(this).attr('tbl');
var tp = $(this).attr('text');
if (tbl != undefined) {
$(".optns").removeClass('hide');
if (tp == undefined) {
$("#vproducto").addClass('hide');
$("#vcliente").addClass('hide');
$("#voptns").removeClass('hide');
arr('login',6,'id,nombre',tbl,'id >= 0',15,1,$("#voptns"));
$("#voptns").material_select();
}else{
if (tbl == 11) {
$("#voptns").addClass('hide');
$("#vproducto").removeClass('hide');
$("#vcliente").addClass('hide')
$("#voptns").material_select();
}else if (tbl == 2){
$("#voptns").addClass('hide');
$("#vproducto").addClass('hide');
$("#vcliente").removeClass('hide')
$("#voptns").material_select();
}
}
}else{
$(".optns").addClass('hide');
$("#voptns").val(0);
$("#voptns").material_select();
}
});

$(document).on("keydown","#vproducto",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e);
    if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
        $(".autocomplete-content").remove();
        $(this).autocomplete({
            limit: 10,
            data: arr('login',4,'nombre,null',11,'id > 0 and nombre like "%'+busqueda+'%" limit 10',0,0,0,1)
        })
        $(this).siblings($(".autocomplete-content")).css('width','50%');
    }
});

$(document).on("blur","#vproducto",function(){
	var idproducto = arr('login',4,'id',11,'nombre = "'+$(this).val()+'"',0,0,0)[0][0];
	if (idproducto != undefined) {
		$("#vidfila").val(idproducto);
		$(this).css('border-bottom','1px solid #4CAF50');
		$(this).css('box-shadow','0 1px 0 0 #4CAF50');
	}else{
		$("#vidfila").val(0);
		$(this).css('border-bottom','1px solid #F44336');
		$(this).css('box-shadow','0 1px 0 0 #F44336');
	}
});

$(document).on("blur","#vcliente",function(){
var idcliente = arr('login',4,'id',2,'trim(concat(nombre," ",apellido1," ",apellido2)) = "'+$(this).val()+'"',0,0,0)[0][0];
if (idcliente != undefined) {
$("#vidfila").val(idcliente);
$(this).css('border-bottom','1px solid #4CAF50');
$(this).css('box-shadow','0 1px 0 0 #4CAF50');
}else{
$("#vidfila").val(0);
$(this).css('border-bottom','1px solid #F44336');
$(this).css('box-shadow','0 1px 0 0 #F44336');
}
});

$(document).on("","",function(){

});

$(document).on("keydown","#vcliente",function(e){
var charCode = e.which || e.keyCode;
var charStr = String.fromCharCode(charCode);
if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
$(".autocomplete-content").remove();
$("#vcliente").autocomplete({
limit: 10,
data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2)),null',2,'idtipocliente = 1 and nombre like \"%'+$("#vcliente").val()+'%\" limit 10',0,0,0,1)
});
$("#vcliente").siblings($(".autocomplete-content")).css('width','25%');
}
});

$(document).on("click",".load[modulo=bodega]",function(){
$("#addbod").attr('id','actbod');
$("#actbod").removeClass('add');
$("#actbod").addClass('edit');
$("#actbod").text('save');
$("#vbodega").select();
});

$(document).on("click",".load[modulo=inventario]",function(){
$("#addinv").attr('id','actinv');
$("#actinv").removeClass('add');
$("#actinv").addClass('edit');
$("#actinv").text('save');
$("#vinventario").select();
});

$(document).on("click",".load[modulo=variablesproduccione]",function(){
$("#addvarprod").attr('id','actvarprod');
$("#actvarprod").removeClass('add');
$("#actvarprod").addClass('edit');
$("#actvarprod").html('<i class="mdi mdi-content-save"></i>');
$("#vnombre").focus();
});

$(document).on("click","#actbod",function(){
$("#actbod").attr('id','addbod');
$("#addbod").removeClass('edit');
$("#addbod").addClass('add');
$("#addbod").text('add');
});

$(document).on("click","#actvarprod",function(){
$("#actvarprod").attr('id','addbod');
$("#addvarprod").removeClass('edit');
$("#addvarprod").addClass('add');
$("#addvarprod").html('<i class="mdi mdi-plus"></i>');
});


$(document).on("click",".load[id^=i]",function(){
$("#vnombre_banco").attr('id','tmp');
$("#bname-mod").attr('id','vnombre_banco');
})

$(document).on("click","#add_x",function(){
var msj = '';

if($("#vdet_cta").val() == ''){
$("#vdet_cta").focus()
msj = "Número de Cuenta Requerido";
}

if (arr('login',4,'count(id)',203,'cuenta = "'+$("#vdet_cta").val()+'"',0,0,0)[0][0][0] > 0) {
$("#vdet_cta").focus()
msj = "Número de Cuenta Ya Existente";
}

if($("#vdet_nom").val() == ''){
$("#vdet_nom").focus()
msj = "Nombre de Cuenta Requerido";
}

if (isNaN($("#vcomision_txt").val()) || $("#vcomision_txt").val() < 0 || $("#vcomision_txt").val() > 100 ) {
$("#vcomision_txt").focus()
return "Valores de Comisión Incorrectos";
}

var ctacom = 0;
if ($("#vctacom option:selected").val() != $("#vctacom").attr('defecto') && $("#vcomision_txt").val() > 0)
ctacom = $("#vctacom option:selected").val();

var comi = 0;
if ($("#vcomision_txt").val() > 0){
if ($("#vdat_moneda option:selected").val() == '')
comi = $("#vcomision_txt").val();
else
comi = $("#vdat_moneda option:selected").attr('simb')+$("#vcomision_txt").val()
} 


$("#fdetallebancos .collapsible-header").each(function(){
if ($(this).attr('vdet_cta').trim() == $("#vdet_cta").val().trim()){
$("#vdet_cta").focus()
msj = "Número de Cuenta Ya Existente";
}

if ($(this).attr('vdet_nom').trim() == $("#vdet_nom").val().trim()){
$("#vdet_nom").focus()
msj = "Nombre de Cuenta Ya Existente";
}

})

if (msj != '') {
Materialize.toast(msj,4000,'red')
}else{
var mmon = '-';
var mmonid = 0;
if($("#vdet_moneda option:selected").val() != ''){
mmon = $("#vdet_moneda option:selected").attr('simb');
mmonid = $("#vdet_moneda option:selected").val();
}
$("#fdetallebancos").append('<li id="0"> <div class="collapsible-header ciclos" vid="0" vaccion="1" vdet_moneda="'+mmonid+'" vctabnk="'+$("#vctabnk option:selected").val()+'" vidbanco="?" vdet_nom="'+$("#vdet_nom").val()+'" vdet_cta="'+$("#vdet_cta").val()+'" vcomision="'+comi+'" vctacom="'+ctacom+'">'+mmon+'<span class="badge">'+$("#vdet_nom").val()+': '+$("#vdet_cta").val()+' ['+$("#vctabnk option:selected").html()+']</span></div> </li>')

}
});

$(document).on("click",".load[modulo=impuesto]",function(){
$("#addimp").attr('id','actimp');
$("#actimp").text('Actualizar');
$("#actimp").removeClass('add');
$("#actimp").addClass('edit');
});

$(document).on("click","#actimp",function(){
$("#actimp").attr('id','addimp');
$("#addimp").text('Agregar');
$("#addimp").removeClass('edit');
$("#addimp").addClass('add');
});

$(document).on("click",".delimp",function(){
var id = $(this).attr('id');

var arr = {};
arr['sel'] = '';
arr['tbl'] = 48;
arr['where'] = '3,'+id+',"",0.00,0,0';
mantenimiento('login',4,arr);

var arr2 = {};
arr2['sel'] = '*';
arr2['tbl'] = 51;
arr2['where'] = 'id > 0 order by id';
var p = mantenimiento('login',6,arr2);
$("#dimpuestos").html('');
$("#dimpuestos").html(p);

});

$(document).on("click","#actimp",function(){
$("input[name=impuesto]").each(function(){
var valor = $(this).val();
var id = $(this).attr('id');

var arr = {};
arr['sel'] = '';
arr['tbl'] = 48;
arr['where'] = '2,'+id+',"",'+valor+',0,0';
mantenimiento('login',4,arr);
});

});
$(document).on("click",".catimpuesto",function(){
var id = $(this).attr('id').substr(1);
var tabla = $("#data-table-impuestos").DataTable();
tabla.destroy();
arr('login',6,'',310,'2,3',0,1,$("#listaimpuesto"));
$("#data-table-impuestos").DataTable({
bFilter :  false,
bLengthChange : false,
order : []
});	
});

$(document).on("click","#sfechafiscal",function(){
var arr = {};
arr['sel'] = '';
arr['tbl'] = 52;
arr['where'] = '\"'+$("#vfechainicio").val()+'\",\"'+$("#vfechafinal").val()+'\"';
mantenimiento('login',4,arr);
});

$(document).on("click",".load",function(){
$("#accsuc").removeClass("add");
$("#accsuc").addClass("edit");
$("#accsuc").html("Guardar");
});

$(document).on("click","#ftipopagos #vprincipal",function(){

if($(this).is(":checked"))
$(this).attr('value',1)
else
$(this).attr('value',0)

});

$(document).on("click","#fmonedas #principal",function(){
if($(this).is(":checked"))
$("#fmonedas #vprincipal").attr('value',1)
else
$("#fmonedas #vprincipal").attr('value',0)

});

$(document).on("change","#vidprovincia",function(){
var id = $(this).val();
arr('login',6,'id,nombre',9,'idprovincia = '+id+' and id > 0 order by nombre',0,1,$("#vidcanton"));
$("#vidcanton").material_select();
});

$(document).on("change","#vidcanton",function(){
var id = $(this).val();
var factura = arr('login',4,'',156,id,0,0,0)[0][0];
if ($("#vfatura").val() == '') {
	$("#vfactura").val(factura);
}
});

$(document).on("click",".numcon",function(){
	var vdeep = parseInt($(this).parent().parent().attr('deep'));
	var vndeep = parseInt($(this).parent().parent().attr('ndeep'))+1;

	if($(".cuecon[deep^='"+vdeep+"']:visible").filter(function(){ return $(this).attr('ndeep') == vndeep}).length == 0)
	$(".cuecon[deep^='"+vdeep+"']").filter(function(){ return $(this).attr('ndeep') == vndeep}).show()
	else
	$(".cuecon[deep^='"+vdeep+"']").filter(function(){ return $(this).attr('ndeep') >= vndeep}).hide()
});


$(document).on("keyup",'.editc',function(e){
	var code = e.which || e.keyCode
	if (code == 13) {
		var valorc = $(this).val();
		if(valorc == '')
			Materialize.toast('Cuenta Requiere Nombre',4000,'red')
		else{
			if(parseInt($(this).attr('tp')) == 0){
				rs = arr('login',4,'',37,'1,0,'+$(this).attr('atp')+',"'+valorc+'",@@usr,@@impresa');
				
				if (rs['succed'] == 0){
					$(this).focus().select();
					Materialize.toast(rs[0]['ERROR'],4000,'red')
				} 
				else{
					var padre = $(this).parent().parent().parent();
					padre.find('#ac0').attr('id','ac'+rs[0][0][0]);
					padre.find('#ec0').attr('id','ec'+rs[0][0][0]);
					padre.find('.numcon').html(rs[0][0][2]);
					padre.attr('ndeep',rs[0][0][1])
					padre.attr('deep',rs[0][0][3])
					Materialize.toast('Cuenta Creada Exitosamente',4000,'green')
				}
			}else{
				rs = arr('login',4,'',37,'2,'+$(this).attr('tp')+',0,"'+valorc+'",@@usr,@@impresa');
				if (rs['succed'] == 0) 
					Materialize.toast(rs[0]['ERROR'],4000,'red')
				else
					Materialize.toast('Cambio de Nombre Exitoso',4000,'green')
			}
			
	}
};

});

$(document).on("click",'.dsc',function(){

if ($('option',this).length == 1) {


cuentas_arr = arr('login',4,'id,nombre',33,'','',0,'');
cuentas = '';

for (var i = 0; i < cuentas_arr[0].length; i++) {
cuentas += '<option value="'+cuentas_arr[0][i][0]+'">'+cuentas_arr[0][i][1]+'</option>';
}

$(this).html('')
$(this).html(cuentas)

}
});

$(document).on('click',".valorescc",function(){
var vid = $(this).prop('id').substr(1);
var p = arr('login',4,'',201,vid,0,0,0)[0][0];
$("#fdetallenivelesclientes #vidnivel").val(p[0]);
$("#cname-mod").html(p[1]);
$("#fdetallenivelesclientes #viddetalle").val(p[2]);
$("#fdetallenivelesclientes #vclie_descuento_max").val(p[3]);
$("#fdetallenivelesclientes #vclie_descuento").val(p[4]);
$("#fdetallenivelesclientes #vclie_plazo").val(p[5]);
$("#fdetallenivelesclientes #vclie_credito").val(p[6]);
$("#fdetallenivelesclientes #vprod_descuento_max").val(p[7]);
$("#fdetallenivelesclientes #vprod_descuento").val(p[8]);
$("#fdetallenivelesclientes #vdcontado").val(p[9]);
$("#fdetallenivelesclientes #vhcontado").val(p[10]);
$("#fdetallenivelesclientes #vdcredito").val(p[11]);
$("#fdetallenivelesclientes #vhcredito").val(p[12]);
$("#fdetallenivelesclientes #vprod_cuenta").val(p[13]);

$("#fdetallenivelesclientes #vdcontado").attr('defecto',p[9]);
$("#fdetallenivelesclientes #vhcontado").attr('defecto',p[10]);
$("#fdetallenivelesclientes #vdcredito").attr('defecto',p[11]);
$("#fdetallenivelesclientes #vhcredito").attr('defecto',p[12]);
$("#fdetallenivelesclientes #vprod_cuenta").attr('defecto',p[13]);

$("#fdetallenivelesclientes select").material_select('update');
Materialize.updateTextFields();
});

/*DESCUENTOS*/

// $(document).on("click","#modalDescuento",function(){

// });

$(document).on("click",".descfactc",function(){
var valor = $(this).attr('tp');
arr('login',7,2,15,'valor='+valor,'descr="descuentoVenta"',0,0);
});

function validar (varreglo,vmodulo) {
	//console.log('validar: '+vmodulo['modulo'])
	var salida = {}
	switch(vmodulo['modulo']) {
		case 'ajustes':
			if (vmodulo['tip'] == '') {
				err = validarajustes();
				if (err)
					return err
			}
			break;
		case 'tipousuario':
			if (vmodulo['tip'] == '') {
				err = validartipousuario(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'sucursale':
			if (vmodulo['tip'] == '') {
				err = validarsucursales();
				if (err)
					return err
			}else{
				$("#vtelefono").val(1);
			}
			break;
		case 'moneda':
			if (vmodulo['tip'] == '') {
				err = validarMonedas(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'wsdl':
			if (vmodulo['tip'] == '') {
				err = validarWSDL(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'detallenivelescliente':
			if (vmodulo['tip'] == '') {
				err = validarCategoria(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'nivelescliente':
			if (vmodulo['tip'] == '') {
				err = validarNiveles(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'tipopago':
			if (vmodulo['tip'] == '') {
				err = validarTP(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'banco':
			if (vmodulo['tip'] == '') {
				err = validarBancos(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'detallebanco':
			break;
		case 'bodega':
			if (vmodulo['tip'] == '') {
				err = validarBodega();
				if (err)
					return err
			}
			break;
		case 'inventario':
			if (vmodulo['tip'] == '') {
				err = validarInventario();
				if (err)
					return err
			}
			break;
		case 'descuento':
			if (vmodulo['tip'] == '') {
				err = validarDescuento();
				if (err)
					return err
			}
			break;
		case 'impuesto':
			if (vmodulo['tip'] == '') {
				err = validarImpuesto();
				if (err)
					return err
			}else{
				$("#vvalor").val()
			}
			break;
		case 'variablesproduccione':
			if (vmodulo['tip'] == '') {
				err = validarVariables(vmodulo['modulo']);
				if (err)
					return err
			}else{
				$("#vvalor").val('0.00')
			}
			break;
		case 'produccioninventario':
			if (vmodulo['tip'] == '') {
				err = validarprodinv(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'acceso':
			if (vmodulo['tip'] == '') {
				err = validaracceso(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'ajustecierre':
			if (vmodulo['tip'] == '') {
				err = validarajustecierre(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'telefono':
		case 'correo':
			break;
		case 'restaurantes-mesa':
			if (vmodulo['tip'] == '') {
				err = validarMesas(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
			break;
		default:
			return 'Módulo "'+vmodulo['modulo']+'" no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarMesas(vmodulo) {
	if (!$("#f"+vmodulo+"s #nombre-mesa").val().trim().length) {
		$("#nombre-mesa").focus();
		return "Nombre de Mesa Requerido";
	}else
		$("#f"+vmodulo+"s .zelda").data('triforce')['vnombre'] = $("#f"+vmodulo+"s #nombre-mesa").val();

	if ($("#vbarra").is(":checked"))
		$("#f"+vmodulo+"s .zelda").data('triforce')['vbisbarra'] = 1;
	else
		$("#f"+vmodulo+"s .zelda").data('triforce')['vbisbarra'] = 0;
}

function validarajustecierre(vmod) {
	if($("#f"+vmod+"s #vidtipousuario").val() == 0)
		return "Seleccione un Tipo de usuario";
	
}

function validaracceso(vmod) {

if($("#f"+vmod+"s #vid").val() == 0){
return "Seleccione una Transacción";
}

if($("#f"+vmod+"s #vcodigo").val() == ''){
$("#f"+vmod+"s #vcodigo").focus();
return "Código Requerido";
}


return false;
}

function validarprodinv(vmod) {
if($("#f"+vmod+"s #videtapa").val() == 0){
$("#f"+vmod+"s #videtapa").focus();
return "Etapa Requerida";
}

if($("#f"+vmod+"s #xidinventario").val() == 0){
$("#f"+vmod+"s #xidinventario").focus();
return "Etapa Requerida";
}
}

function validarServprod() {
return false;
}

function validarVariables(vmod) {

if($("#f"+vmod+"s #vnombre").val() == ''){
$("#f"+vmod+"s #vnombre").focus();
return "Campo Nombre Requerido";
}

if($("#f"+vmod+"s #vvalor").val() == ''){
$("#f"+vmod+"s #vvalor").focus();
return "Campo Valor Requerido";
}

}

function validarBancos(vmod){

if($("#f"+vmod+"s #vnombre_banco").val() == '' && !$("#f"+vmod+"s #vcomision_txt").is(":visible")){
$("#f"+vmod+"s #vnombre_banco").focus();
return "Campo Nombre Requerido";
}

return false;
}

function validarTP(vmod){

if($("#f"+vmod+"s #vnombre_pago").val() == '' ){
$("#f"+vmod+"s #vnombre_pago").focus()
return 'Nombre de Pago es Requerido';
}

if ($("#f"+vmod+" #vbancos").is(":visible")) {
return "Imposible";
}

return 0;
}

function validartipousuario(vmod) {
if ($("#f"+vmod+"s vnombre_tusuario").val() == '') {
$("#f"+vmod+"s vnombre_tusuario").focus();
return 'Nombre tipo usuario requerido';
}
}

function validarCategoria(vmod){

$("#f"+vmod+"s .set0").each(function(){
if(isNaN($(this).val()) || $(this).val() == '')
$(this).val(0)
});

$("#f"+vmod+"s select").each(function(){
if ($('option:selected',this).val() == $(this).attr('defecto'))
$(this).attr('hid',0);
else
$(this).removeAttr('hid');
});

return 0;
}

function validarNiveles(vmod){

if ($("#f"+vmod+"s #vnombre_nivel").val() == ''){
$("#f"+vmod+"s #vnombre_nivel").focus()
return 'Nombre de Nivel Requerido';
}

return false;
}

function validarsucursales() {
	
	
}

function validarAjuste() {
if ($("#vnombre").val() == '') {
$("#vnombre").focus();
return "Nombre de la Empresa Requerido";
}

if ($("#vcedula").val() == '') {
$("#vcedula").focus();
return "Cédula Jurídica Requerida";
}

if ($("#vtelefono").val() == '') {
$("#vtelefono").focus();
return "Teléfono de la Empresa Requerido";
}

if ($("#vcorreo").val() == '') {
$("#vcorreo").focus();
return "Correo de la Empresa Requerido";
}

if ($("#vdireccion").val() == '') {
$("#vdireccion").focus();
return "Dirección de la Empresa Requerida";
}
return false;
}

function validarMonedas(vmod){
if ($("#f"+vmod+"s #vnombremon").val() == '') {
$("#f"+vmod+"s #vnombremon").focus();
return "Nombre de la Moneda Requerido";
}

if ($("#f"+vmod+"s #vsimbolo").val() == '') {
$("#f"+vmod+"s #vsimbolo").focus();
return "Símbolo de la Moneda Requerido";
}

if ($("#f"+vmod+"s #vsuma").val() == '' || isNaN($("#f"+vmod+"s #vsuma").val()) ) {
$("#f"+vmod+"s #vsuma").val(0.00);
}

return false;
}

function validarWSDL(vmod){
if ($("#vwsdl").is(":checked")) {
if($("#f"+vmod+"s #vwsdlsnom").val() == ''){
$("#f"+vmod+"s #vwsdlsnom").focus()
return 'Dirección HTML Requerida'
}
if($("#f"+vmod+"s #vxmlsen").val() == ''){
$("#f"+vmod+"s #vxmlsen").focus()
return 'Petición XML Requerida'
}
if($("#f"+vmod+"s #vxmlreq").val() == ''){
$("#f"+vmod+"s #vxmlreq").focus()
return 'Respuesta XML Requerida'
}
if($("#f"+vmod+"s #vobtener").val() == ''){
$("#f"+vmod+"s #vobtener").focus()
return 'Nombre de Arreglo Requerido'
}
}

return false;
}

function validarBodega() {
if ($("#vbodega").val() == ''){
$("#vbodega").focus();
return 'Nombre Bodega Requerido';
}
}

function validarInventario() {
if ($("#vinventario").val() == ''){
$("#vinventario").focus();
return 'Nombre Bodega Requerido';
}
}

function validarDescuento() {
if ($("#vnombre").val() == ''){
$("#vnombre").focus();
return 'Nombre Descuento Requerido';
}
}

function validarImpuesto() {
if ($("#vnombre").val() == ''){
$("#vnombre").focus();
return 'Nombre Impuesto Requerido';
}
if ($("#vresumen").val() == ''){
$("#vresumen").focus();
return 'Abreviatura Impuesto Requerida';
}
if ($("#vvalor").val() == ''){
$("#vvalor").focus();
return 'Valor Impuesto Requerido';
}
}

function cargar(vmodulo,vid) {
switch(vmodulo['modulo']) {
case 'sucursale':
vmodulo['sel'] = 'vid,vconsecutivo,vfactura,vidusuario,vnombre,vidprovincia,vidcanton';
vmodulo['tbl'] = 57;
vmodulo['where'] ='vid = '+vid;
break;
case 'banco':
vmodulo['sel'] = '';
vmodulo['tbl'] = 204;
vmodulo['where'] = vid;
break;
case 'bodega':
vmodulo['sel'] = 'id as vidbodega,nombre as vbodega';
vmodulo['tbl'] = 41;
vmodulo['where'] = 'id = '+vid;
break;
case 'inventario':
vmodulo['sel'] = 'id as vidinventario,nombre as vinventario,idbodega as vidbode,idcuenta as vidcuenta';
vmodulo['tbl'] = 126;
vmodulo['where'] = 'id = '+vid;
break;
case 'impuesto':
vmodulo['sel'] = 'id as vid,nombre as vnombre,resumen as vresumen,valor as vvalor';
vmodulo['tbl'] = 51;
vmodulo['where'] = 'id = '+vid;
break;
case 'moneda':
vmodulo['sel'] = 'id as vid,nombre as vnombremon,simbolo as vsimbolo,valor as vvalor,suma as vsuma,principal as vprincipal,wsdl as vwsdl,codigo as vcodigo';
vmodulo['tbl'] = 54;
vmodulo['where'] = 'id = '+vid;
break;
case 'variablesproduccione':
vmodulo['sel'] = 'id as vid,nombre as vnombre,valor as vvalor';
vmodulo['tbl'] = 169;
vmodulo['where'] = 'id = '+vid+' order by nombre';
break;
case 'acceso':
vmodulo['sel'] = 'id as vid,nombre as vnombre,codigo as vcodigo';
vmodulo['tbl'] = 196;
vmodulo['where'] = 'id = '+vid;
break;
case 'restaurantes-mesa':
vmodulo['sel'] = 'id as vid,nombre as vnombre';
vmodulo['tbl'] = 800;
vmodulo['where'] = vid;
break;
case 'frestaurantes-seccione':
vmodulo['sel'] = 'id as vid,nombre as vnombre';
vmodulo['tbl'] = 801;
vmodulo['where'] = vid;
break;
default:
console.log('Cargar Módulo no Existente '+vmodulo['modulo']);
break;
}

return vmodulo;
}

function cargarSintax(vtabla){
	var arr = {}
	switch(vtabla){
		case 'monedas':
			arr['sel'] = 'id,nombre,valor,if(principal,"Moneda por Defecto",""),simbolo';
			arr['tbl'] = 54;
			arr['where'] = 'id > 0 order by principal desc,nombre';
			break;
		case 'nivelesclientes':
			arr['sel'] = '*';
			arr['tbl'] = 69;
			arr['where'] = 'id > 0 and idsucursal = @@impresa';
			break;
		case 'tipopagos':
			arr['sel'] = 'id,nombre,principal';
			arr['tbl'] = 26;
			arr['where'] = 'id >= 0 order by id';
			break;
		case 'bancos':
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 202;
			arr['where'] = 'id >= 0 order by nombre';
			break;
		case 'bodegas':
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 41;
			arr['where'] = 'id > 0 order by nombre';
			break;
		case 'inventarios':
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 111;
			arr['where'] = 'id > 0 and idbodega = '+$("#finventarios #vidbodega").val()+' order by nombre';
			break;
		case 'descuentos':
			arr['sel'] = '';
			arr['tbl'] = 142;
			arr['where'] = '0,@@impresa';
			break;
		case 'impuestos':
			arr['sel'] = 'id,nombre,resumen,valor';
			arr['tbl'] = 51;
			arr['where'] = 'id > 0 order by nombre limit 100';
			break;
		case 'monedas':
			arr['sel'] = 'id,nombre,valor,if(principal,"Moneda por Defecto",""),simbolo';
			arr['tbl'] = 54;
			arr['where'] = 'id > 0 order by principal desc,nombre';
			break;
		case 'tipousuarios':
			arr['sel'] = '';
			arr['tbl'] = 402;
			arr['where'] = '0';
			break;
		case 'variablesproducciones':
			arr['sel'] = 'vid,vnombre,vvalor';
			arr['tbl'] = 171;
			arr['where'] = '1 order by vnombre';
			break;
		case 'serviciosproducciones':
			arr['sel'] = 'idvariable,servicio,inventario';
			arr['tbl'] = 175;
			arr['where'] = '1 order by servicio';
			break;
		case 'sucursales':
			arr['sel'] = '';
			arr['tbl'] = 50;
			arr['where'] = '-1';
			break;
		case 'restaurantes-mesas':
			arr['sel'] = '';
			arr['tbl'] = 801;
			arr['where'] = '0,0,",0,0","0,10"';
			break;
		case 'restaurantes-secciones':
			arr['sel'] = '';
			arr['tbl'] = 50;
			arr['where'] = '-1';
			break;
		default:
			console.error('ERROR: autodestrucción: '+vtabla);
			break;
	}
	return arr;
}

$(document).on("click",".moveL",function(){
$("#vgenero").data('sum',parseInt($("#vgenero").data('sum'))-1)
if($("#vgenero").data('sum') == 0) 
$(".moveL").hide();
var arr = {}

arr['sel'] = 'id,nombre,numero';
arr['tbl'] = 36;
arr['where'] = 'ispadre and idsubcuenta = (select idsubcuenta from cuentas where id = '+$("#vgenero").data('lvl')+')';
var rs = mantenimiento('login',6,arr);
var str = $("#myub").html();

$("#myub").html(str.substr(0,str.lastIndexOf('&gt')));
$("#vgenero").html(rs);
$("#vgenero").material_select('update')
});

$(document).on("click",".cta-def",function(){
var id_def = $(this).attr('id').substr(1);
var id_cta = $("#cta"+id_def).attr('pr');
var nom = $("#def"+id_def+" td").first().html();

$("#vdefecto").data('elemento',{def:id_def, default:id_cta, cta:0})
$("#vdefecto").val(id_cta);
$("#ldef-cta").html(nom);
$("#vdefecto").material_select('update');
$("#vdefecto").focus();

$(this).change();

$('#modal-defcta').modal('open');
});

$(document).on("change","#vgenero",function(){
var ant = $("option:selected",this).html();
var arr = {};
arr['sel'] = 'id,nombre,numero';
arr['tbl'] = 36;
arr['where'] = 'ispadre and idsubcuenta = '+$("option:selected",this).val();
$(this).data('lvl',$("option:selected",this).val());
$(this).data('sum') == undefined ? $(this).data('sum',1) : $(this).data('sum',parseInt($(this).data('sum'))+1);
$(".moveL").show();

var rs = mantenimiento('login',6,arr);

if (rs.length == undefined) {
Materialize.toast('No hay Cuentas Asociadas',4000,'red')
$("#vnombre").val('');
$("#vnombre").focus();
}
else{
$("#myub").append(">"+ant)
$(this).html(rs);
$(this).material_select('update')
}
});

$(document).on("click","#listamonedas .load",function(){
$("#monbtn").html('Guardar');
$("#monbtn").removeClass('add');
$("#monbtn").addClass('edit');
});

$(document).on("click","#addMoneda",function(){
$("#monbtn").html('Aceptar');
$("#monbtn").removeClass('edit');
$("#monbtn").addClass('add');
});

$(document).on("keyup",".fast-edit-r",function(e){
var code = e.which || e.keyCode
if(code == 13)
if($(this).val() == ''){
Materialize.toast('Nombre Necesario',4000,'red');
$(this).focus()
}else{
var vid = $(this).parent().parent().prop('id').substr(2);
var p = arr('login',7,2,69,'nombre="'+$(this).val()+'"','id = '+vid,0,0);
if(p['succed']){
Materialize.toast('Cambio Realizado Correctamente',4000,'green')
thorload('nivelescliente');
}else{
$(this).select()
Materialize.toast('Valor Incorrecto',4000,'red')
}
}
})

$(document).on("click",".load_x",function(){
$("#vnombre_pago").attr('id','tmp');
$("#tmp_pagos").attr('id','vnombre_pago');
$("#tmp_l_pagos").attr('for','vnombre_pago');

var vid = $(this).prop('id').substr(1);
var p = arr('login',4,'*',26,'id = '+vid)[0][0];
$("#pname-mod").html(p[1])
$("#ftipopagos #vid").val(p[0]);
$("#ftipopagos #vnombre_pago").val(p[1]);
if (p[0] > 0) {
$(".mix").show();

switch(parseInt(p[2])){
case 0:
$("#ftipopagos #vbancos").click();
break;
case 1:
$("#ftipopagos #acr").click();
break;
case 2:
$("#ftipopagos #dat").click();
break;
case 3:
$("#ftipopagos #cons").click();
break;
case 4:
$("#ftipopagos #efec").click();
break;
case 5:
$("#ftipopagos #mxt").click();
break;
default:
// $('input:radio[name=vbancos]:checked').prop('checked', false);
break;
}

if (p[5] == 1) 
$("#ftipopagos #vprincipal").attr('checked',true);
else
$("#ftipopagos #vprincipal").attr('checked',false);

if(p[3]){
$("#ftipopagos #extra").prop('checked',true);
$("#ftipopagos #vextra").val(p[3]);
$("#ftipopagos #vregex").val(p[4]);
}else{
$("#ftipopagos #extra").prop('checked',false);
$("#ftipopagos #vextra").val('');
$("#ftipopagos #vregex").val('');
}

$("#ftipopagos #extra").change();
$("#ftipopagos #vprincipal").change();
}else
$(".mix").hide();

Materialize.updateTextFields();
})

$(document).on("change","#extra",function(){
if ($(this).is(':checked'))
$(".extra").removeClass('hide')
else
$(".extra").addClass('hide')
})

$(document).on("keyup","#vnombre",function(e){
var code = e.which || e.keyCode
if(code == 13)
$(".addglobal").click();
})

$(document).on("click",".addglobal",function(){

if($("#vnombre").val() == ''){
$("#vnombre").focus()
Materialize.toast('Nombre Requerido',4000,'red')
return false;
}

var vispadre= 0;

if ($("#continuo").is(':checked')) {

vispadre = 1 ;


}else{

vispadre = 0;

}

var arr = {}
arr['sel'] = '';
arr['tbl'] = 37;
arr['where'] = '1,0,'+$("#vgenero").data('lvl')+',"'+$('#vnombre').val()+'",@@usr,'+ vispadre;

var p = mantenimiento('login',4,arr);//INGRESAR CUENTA
if(p['succed']){
// arr = {};
// arr['sel'] = 'id,nombre,numero';
// arr['tbl'] = 36;
// arr['where'] = 'ispadre and idsubcuenta = '+$("#vgenero").attr('lvl');

// var q = mantenimiento('login',6,arr);
// $("#vgenero").html(q);
// $("#vgenero").material_select('update');
$("#m4").click()

}else{
Materialize.toast(p[0]['ERROR'],4000,'red')
$("#vnombre").focus();
}

});

/*MONEDAS*/

$(document).on('change','#iswsdl',function(){

	if ($(this).is(':checked'))
		$(".wsdl-op").show()
	else{
		$(".wsdl-op").hide()
	}

	// $("#vwsdl").val(0);
	// $("#vwsdl").material_select();
});


/*-------*/

function endDetail(vid,vacc,modulo){
	switch(modulo){
		case 'detallenivelescliente':
			$("#f"+modulo+"s #viddetalle").val(vid);
			break;
		case 'banco':
			setTimeout(function(){ deadclear(modulo); $("#vnombre_banco").focus()}, 100);
			thorload(modulo);
			break;
		case 'bodega':
			setTimeout(function(){ deadclear(modulo); $("#vbodega").focus()}, 100);
			thorload(modulo);
			break;
		case 'inventario':
			//setTimeout(function(){ deadclear(modulo)}, 100);
			thorload(modulo);
			break;
		case 'variablesproduccione':
			setTimeout(function(){ deadclear(modulo)}, 100);
			thorload(modulo);
			$("#f"+modulo+"s #vnombre").focus();
			Materialize.updateTextFields();
			break;
		case 'sucursale':
			setTimeout(function(){ deadclear(modulo); }, 100);
			thorload(modulo);
			$("input[name='idsucursal']").val(vid);
			myDropzone.processQueue();
			break;
		case 'descuento':
			console.log(vid);
			break;
		default:
			setTimeout(function(){ deadclear(modulo); }, 100);
			thorload(modulo);
			break;
	}
	$(".validate").css('border-bottom', '1px solid #9e9e9e');
	$(".validate").css('box-shadow', 'none');
}

function postload(vmodulo){
	switch(vmodulo){
		case 'moneda':

		if( $("#vwsdl option:selected").val() != 0)
			$("#iswsdl").prop('checked',1);
		else{
			$("#iswsdl").prop('checked',0);
			$("#iswsdl").change();
		}

		$("#f"+vmodulo+"s #vprincipal").attr('value') == 1 ? $("#principal").prop('checked',1) : $("#principal").prop('checked',0);
		$("#principal").change();

		break;
}
}


function removep12(a,b){
	try{
		b = JSON.parse(b);
	}catch(e){
		console.log(b)
	}

	if(b['succed'] == '0'){
		Materialize.toast(b['ERROR'],4000,'red')
		$("#fecheck").removeClass('green-text').addClass('red-text')
		actualizar(39,'fastshow=1','id=@@impresa');
		var myDropzone = Dropzone.forElement("#p12-upload");
		myDropzone.removeFile(a)
	}else{
		$("#fecheck").removeClass('red-text').addClass('green-text')
		actualizar(39,'fastshow=0','id=@@impresa');
		var myDropzone = Dropzone.forElement("#p12-upload");
		myDropzone.removeFile(a)

		$("#actSuc").click();
	}
}


function loadIMG(a,b){
	var myDropzone = Dropzone.forElement("#registro-upload");
	myDropzone.removeFile(a)
	console.log(b)
	try{
		b = JSON.parse(b);
		$("#vlogo").attr('src','')
		$("#vlogo").attr('src',b['url'])	
	}
	catch(e){
		console.log('error: '+e);
	}

}