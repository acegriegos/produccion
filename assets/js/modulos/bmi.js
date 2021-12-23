var delaysTimer;

$(function(){

	$(".mtit").each(function(){
		$(this).append('<i class="opts mdi mdi-dots-vertical der pbtn dropdown-trigger s-bmi" data-activates="slide-bmi" num="'+$(this).attr('sid')+'"></i>');
	});

	var fecha = now();
	$(".fch").val(fecha);
	$("[fch]").attr('dsd',fecha)
	$("[fch]").attr('hst',fecha)

	$('.chips-initial').material_chip();

	$("#list").click(function(){
		$("#listc").removeClass('hide');
		$("#cpl .input").focus();
		$(".mtit[sid=4] span").html('Lista de Productos')
		makeChart('','',344,'5,0,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'","'+$("#_extra").val()+'"','productos','','','');	
	});

	$("#3most").click(function(){
		$("#listc").addClass('hide');
		makeChart('','',344,'4,0,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'",""','productos','','','');
		$(".mtit[sid=4] span").html('5 Productos más Vendidos')
	});

	$("#r_all").click(function(){
		actualizar();
	});

	makeChart('San Ramón','',344,'1,1,"","",""','c0','#ff6384','line')
	makeChart('Grecia 1','',344,'1,2,"","",""','c1','#36a2eb','line')
	makeChart('Grecia 2','',344,'1,3,"","",""','c2','#cc60fe','line')
	makeChart('Alajuela','',344,'1,5,"","",""','c3','#ffce56','line')

	makeChart('','',344,'2,0,"","",""','c4',['#ff6384','#36a2eb','#cc60fe','#ffce56'],'pie','tot')

	makeChart('','',344,'3,0,"","",""','efectivo','','','tefectivo');
	makeChart('','',344,'6,0,"","",""','bancos','','','tbancos');
	makeChart('','',344,'4,0,"","",""','productos','','','');

	/*setInterval(function() {
   		
 	}, 10000);*/
});

$(document).on("change",".fo4",function(){

	clearTimeout(delaysTimer);
    var elem = $(this);
    delaysTimer = setTimeout(function() {
		let acc = 4;
		if($("#list").is(":checked"))
			acc = 5
		makeChart('','',344,acc+',0,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'","'+$("#_extra").val()+'"','productos','','','');
	},700)
});

$(document).on("change",".fo1",function(){

	clearTimeout(delaysTimer);
    var elem = $(this);
    delaysTimer = setTimeout(function() { 
    	updateChart("c0",'',344,'1,1,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'",""',undefined)
		updateChart("c1",'',344,'1,2,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'",""',undefined)
		updateChart("c2",'',344,'1,3,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'",""',undefined)
		updateChart("c3",'',344,'1,5,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'",""',undefined)
		updateChart("c4",'',344,'2,0,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'",""','tot')
    },700)

});

$(document).on("change",".fo2",function(){

	clearTimeout(delaysTimer);
    var elem = $(this);
    delaysTimer = setTimeout(function() { 
    	makeChart('','',344,'2,0,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'",""','c4',['#ff6384','#36a2eb','#cc60fe','#ffce56'],'pie','tot')
    },700)

});


$(document).on('keydown','#cpl .input',function(e){
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e)
   
    if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
        var tipo = getParameterByName('tf');
        $(".autocomplete-content").remove();
        
        $(this).autocomplete({
            limit: 5,
            data: arr('login',4,'',6,'"'+busqueda+'",1,@@impresa',0,0,0,1),
            onAutocomplete: function(val){
                fillProd(val)
            }
        })

        $(this).siblings($(".autocomplete-content")).css('width','100%');
    }else if(charCode == 13){
    	return fillProd($(this).val())
    }
});

// $(document).on("click",".close",function(){
// 	$("#_extra").val(vextra);

//     makeChart('','',344,'5,0,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'","'+$("#_extra").val()+'"','productos','','','');
// })

$(document).on("click",".s-bmi",function(){   

	if ($("#slide-tc").length == 1)
		$(".tc-show").sideNav('destroy');

	var code = parseInt($(this).attr('num'));

	$("#slide-bmi").attr('num',code);
	$("#slide-bmi").attr('el',$(this).attr('id'));

	$(".s-bmi").sideNav('destroy');

	$(this).sideNav({
	    menuWidth: 300,
	    edge: 'right',
	    closeOnClick: true,
	    draggable: true,
	    onOpen: function(){
	        var titulo = cuerpo = '';
	        $(".subbmi").addClass('hide');
	        
	        $("#_desde").removeClass (function (index, className) {
			    return (className.match (/(^|\s)fo\S+/g) || []).join(' ');
			});

			$("#_hasta").removeClass (function (index, className) {
			    return (className.match (/(^|\s)fo\S+/g) || []).join(' ');
			});

	        switch(code){
	        	case 1:
	        		titulo = 'Ventas x Hora';
	        		$("#_desde").addClass('fo1');
	        		$("#_hasta").addClass('fo1');
	        		break;
	        	case 4:
	        		titulo = 'Productos';
	        		$("#opts4").removeClass('hide');
	        		$("#_desde").addClass('fo4');
	        		$("#_hasta").addClass('fo4');
	        		break;
	        	default:
	        		break;
	        }

	        $(".ntitc").html('<b>'+titulo+'</b>');
	        
	        $("#_desde").focus()
	        Materialize.updateTextFields();
	    }
	});

	$(this).sideNav('show');

});

function fillProd(val){
	var id = getDatos('id',11,'nombre = "'+val+'" and id > 0')
	var lst = $('.chips-initial').material_chip('data');
	var salida = true;

    if(id[0].length){
    	lst.push({tag:val})
    	let vextra = $("#_extra").val().length ? $("#_extra").val()+','+id[0][0][0]: id[0][0][0];
    	$("#_extra").val(vextra);

    	makeChart('','',344,'5,0,"'+$("#_desde").val()+'","'+$("#_hasta").val()+'","'+$("#_extra").val()+'"','productos','','','');
    }else{
    	Materialize.toast('Producto no Existente',4000,'red');
    	$("#cpl .input").focus().select();
    	salida = false;
    }

    $('.chips-initial').material_chip({
		    data: lst
	});
    return salida;
}

function actualizar(){
	updateChart("c0",'',344,'1,1,"'+$("#vdesde0").val()+'","'+$("#vhasta0").val()+'",""',undefined)
	updateChart("c1",'',344,'1,2,"'+$("#vdesde0").val()+'","'+$("#vhasta0").val()+'",""',undefined)
	updateChart("c2",'',344,'1,3,"'+$("#vdesde0").val()+'","'+$("#vhasta0").val()+'",""',undefined)
	updateChart("c3",'',344,'1,5,"'+$("#vdesde0").val()+'","'+$("#vhasta0").val()+'",""',undefined)
	updateChart("c4",'',344,'2,0,"'+$("#vdesde0").val()+'","'+$("#vhasta0").val()+'",""','tot')

	makeChart('','',344,'3,0,"'+$("#vdesde0").val()+'","'+$("#vhasta0").val()+'",""','efectivo','','','tefectivo');
	makeChart('','',344,'6,0,"'+$("#vdesde0").val()+'","'+$("#vhasta0").val()+'",""','bancos','','','tbancos');
	makeChart('','',344,'4,0,"'+$("#vdesde0").val()+'","'+$("#vhasta0").val()+'",""','productos','','','');
}

function makeChart(vtit,vsel,vtbl,vwhr,velem,vcolor,vtipo,vsum){
	$("#"+velem).html('<i class="mdi mdi-refresh mdi-48px mdi-spin center"></i>')
	mantenimiento_async('login',4,{sel:vsel,tbl:vtbl,where:vwhr },1,0,{tit:vtit,elem:velem,tipo:vtipo,color:vcolor,sum:vsum})	
}

function updateChart(chart,vsel,vtbl,vwhr,vsum){
	$("#"+chart).html('<i class="mdi mdi-refresh mdi-48px mdi-spin center"></i>')
	mantenimiento_async('login',4,{sel:vsel,tbl:vtbl,where:vwhr },1,0,{elem:chart,update:1,sum:vsum})
}

function getOrder(arr){
	var salida = [];
	salida[0] = [];
	salida[1] = [];
	salida['sum'] = 0;

	$.each(arr,function(index){
		salida[0].push($(this)[0])
		salida[1].push($(this)[1])
		if($(this)[1] != undefined){
			if(!isNaN($(this)[1]))
				salida['sum'] += parseInt($(this)[1])
		}
	})

	return salida;
}

function postExcecute(vid,p,more){
	var vdata;

	if(p.succed){
		var elem = more['elem'];
		var vtipo = more['tipo'];

		if(more['update'] != undefined){
			
			vdata = p;
			vdata = getOrder(vdata[0]);
			var chart = Chart.instances[$("#"+elem).attr('cid')]
			chart.data.labels = vdata[0]
			chart.data.datasets[0].data = vdata[1]
			chart.update();

			if(more['sum'] != undefined){
				$("#"+more['sum']).html('CRC '+vdata['sum'].formatMoney(0,'.',','))
			}

			return false;
		}

		if(more['tipo'] != ''){
			var tit = more['tit'];

			vdata = p;
			vdata = getOrder(vdata[0]);
			var ctx = document.getElementById(elem).getContext('2d');
			var myChart = new Chart(ctx, {
			    type: vtipo,
			    data: {
			        labels: vdata[0],
			        datasets: [{
			            label: tit,
			            data: vdata[1],
			            backgroundColor: more['color']
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero: true,
			                    callback: function(label, index, labels) {
			                        return Intl.NumberFormat().format(label);
			                    }
			                }
			            }]
			        }
			        ,
			        tooltips: {
				      callbacks: {
				          label: function(tooltipItem, data,) {
				          	var sl;

				          	if(vtipo == 'pie'){
				          		var index = tooltipItem.index;

				          		sl =  data.labels[index]+': '+parseInt(data.datasets[0].data[index]).formatMoney(0,'.',',');
				          	}else
				          		sl = tooltipItem.yLabel.formatMoney(0,'.',',')

			                return sl;
			            }	
				      }
				  }
			    }
			});

			if(more['sum'] != undefined){
				$("#"+more['sum']).html('CRC '+vdata['sum'].formatMoney(0,'.',','))
			}

			$("#"+elem).attr('cid',myChart.id)
		}else{
			if(!p[0].length){
				$("#"+elem).html('<tr><td colspan="100%" style="text-align:center;">SIN DATOS</td></tr>')
				return false;
			}
			var str = '';
			var cols = p[0][0].length;
			var tsum = 0;

			for (var i = 0; i < p[0].length; i++) {
				if(more['sum'] != undefined)
					tsum += parseFloat(p[0][i][$("#"+elem).attr('scol')]);
				str += '<tr>';
				for (var j = 0; j < cols; j++) {
					var nm = isNaN(p[0][i][j]) ? p[0][i][j] : parseFloat(p[0][i][j]).formatMoney(0,'.',',');
					var al = isNaN(p[0][i][j]) ? 'left' : 'right';
					str += '<td style="text-align:'+al+';">'+nm+'</td>';
				}
				str += '</tr>';
			}
			if(more['sum'] != '')
				$("#"+more['sum']).html('CRC '+tsum.formatMoney(0,'.',','))

			/*if(more['tit'] != undefined)
				$("#"+more['tit']).html('CRC '+tsum.formatMoney(0,'.',','))*/

			$("#"+elem).html(str)
		}

		
	}
}