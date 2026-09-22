{php}
	
	require_once 'model/m_login.php';
    $log = new _login();

	/*cargar la estructura*/
	$result = $log->kamehameha('',373,'@@impresa,@@usr');

	for ($i=0; $i < sizeof($result); $i++) { 
		echo '<div sid="'.$result[$i][0].'" dclass="'.$result[$i][1].'" titulo="'.$result[$i][2].'" titulo_id="t'.$result[$i][3].'" is_report="'.$result[$i][11].'" sel="'.$result[$i][6].'" tbl="'.$result[$i][7].'" whr="'.$result[$i][8].'" gcolor="'.$result[$i][9].'" gtipo="'.$result[$i][10].'" gname="'.$result[$i][5].'" gheight="'.$result[$i][12].'" isrow="'.$result[$i][13].'" gcol="'.$result[$i][14].'" is_clone="'.$result[$i][15].'" isvertical="'.$result[$i][16].'"></div>';
	}

{/php}

{literal}

<div id="principal"></div>

<script type="text/javascript">
	$(function(){
		var fecha = now();
		$(".fch").val(fecha);
		$("[fch]").attr('dsd',fecha)
		$("[fch]").attr('hst',fecha)
		cargarCols()

		$("[dclass]").remove();
	});

	function cargarCols(){
		let is_row = 1;
		let row_elem_default = '<div class="row"></div>';
		let col_elem_default = '<div class="col mdiv"></div>'
		let row = col = tmpcol = '';
		let rcount = cnumber = 0;
		let tit_id = '';

		$.each($('[dclass]'),function(i){
			cnumber = parseInt($(this).attr('dclass'))
			
			is_row = cnumber == 0 ? 0 : is_row;
			tmpcol = cnumber == 0 ? tmpcol : '';

			if(is_row || rcount+cnumber > 12){
				is_row = 0;
				rcount = 0;
				row = $(row_elem_default);
				$("#principal").append(row);
				row.attr('id','r'+i);
				tmpcol = '';
			}

			if(tmpcol == ''){

				col = $(col_elem_default);
				row.append(col)
				
				col.addClass('s'+cnumber)
				col.addClass('mdiv')
				if($(this).attr('isrow') == '1'){
					tmpcol = col;
					col.addClass('row')
				}
				col.attr('style','')

				if($(this).attr('titulo') != ''){
					if($(this).attr('titulo_id') != '')
						tit_id = ' <span id="'+$(this).attr('titulo_id')+'"></span>';

					col.append('<h6 class="mtit" sid="'+$(this).attr('sid')+'">'+$(this).attr('titulo')+'</h6>')
				}
			}else
				is_row = rcount >= 12 ? 1 : 0;

			if($(this).attr('gtipo') != '')
				cargarGrafico(tmpcol==''?col:tmpcol,$(this)) 
			else
				cargarTabla(col,$(this))

			rcount += cnumber;
			if(rcount >= 12){
				rcount = 0;
				is_row = 1;
			}
		});
	}

	function cargarTabla(col,div){
		let variables = div.attr('whr');
		let tabla = '<div style="background-color: white;height: 300px;" class="tabla" sel="'+div.attr('sel')+'" tbl="'+div.attr('tbl')+'" whr="'+variables+'"  height="'+div.attr('gheight')+'">            <table class="tbl bordered mtbl">                <thead>                    <tr>                        <th>PRODUCTO</th>                         <th>CANTIDAD</th>                        <th>VENTAS</th>                        <th>INVENTARIO</th>                        <th>PROMEDIO</th>                     </tr>                 </thead>                <tbody id="t'+div.attr('is_report')+'" scol="4"></tbody>             </table>          </div>';
		col.append(tabla);

		let idrep = 0;
		if(div.attr('tbl') == '344'){
			idrep = div.attr('is_clone') == '0' ? div.attr('is_report') : div.attr('is_clone');
			vwhere = idrep+',"'+cargarFiltros(variables,1)+'"';
		}

		makeChart(div.attr('gname'),div.attr('sel'),div.attr('tbl'),vwhere,'t'+div.attr('is_report'),div.attr('gcolor'),div.attr('gtipo'),'',div.attr('sid'));
	}

	function cargarGrafico(col,div){
		let variables = div.attr('whr');
		let gcol = fgcol = vwhere = ''
		if(div.attr('gcol') != '0'){
			gcol = '<div class="col s'+div.attr('gcol')+' mdiv">';
			fgcol = '</div>';
		}

		let grafico = gcol+'<div class="card grafico" sel="'+div.attr('sel')+'" tbl="'+div.attr('tbl')+'" whr="'+variables+'" color="'+div.attr('gcolor')+'" tipo="'+div.attr('gtipo')+'" nombre="'+div.attr('gname')+'" vid="'+div.attr('is_report')+'"> <canvas id="c'+div.attr('is_report')+'" isvertical="'+div.attr('isvertical')+'" height="'+div.attr('gheight')+'"></canvas> </div>'+fgcol;
		col.append(grafico)

		idrep = 0;
		if(div.attr('tbl') == '344'){
			idrep = div.attr('is_clone') == '0' ? div.attr('is_report') : div.attr('is_clone');
			vwhere = idrep+',"'+cargarFiltros(variables,1)+'"';
		}
		
		makeChart(div.attr('gname'),div.attr('sel'),div.attr('tbl'),vwhere,'c'+div.attr('is_report'),div.attr('gcolor'),div.attr('gtipo'),'',div.attr('sid'));
	}

	function cargarFiltros(variables,tipo){
		let arreglo = variables.toString().split(',')
		let salida = ''
		let _tipo = tipo == '1'?'^':'';

		$.each(arreglo,function(i,v){
			if(isNaN(v)){
				salida += $("#"+v).val()+_tipo;
			}else{
				salida += v+_tipo;
			}
		})

		return salida;
	}

</script>

{/literal}
