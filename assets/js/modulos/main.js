$(function(){
    $("#mchange").change(function(){
        console.log(mantenimiento('main',3,$(this).val()));
    });
    generarSSuc();
    $("#mchange").val($("#mchange").attr('sel'));
    $("#mchange").material_select('update');

   
    // dibujarGrafico("chartG1",'Ganancias por Dia','Ganancias','line',{sel:'',tbl:307,where:'3,0,0,0,"'+now()+'","",0,0,0'},2,0,2);

    var hasiniciate = arr('login',4,'count(id),monto',404,'idusuario = @@usr AND date_format(fecha,"%Y-%m-%d") = "'+now()+'"',0,0,0)[0][0];
    if (hasiniciate[1] != null) {
        $("#vmonto").val(hasiniciate[1]);
        $("#vmonto").attr('disabled',true);
    }

  //   var ctx = document.getElementById('chartG1').getContext("2d");

  // window.myBar = new Chart(ctx, {
  //   type: 'bar',
  //   data: barChartData,
  //   options: {
  //     title: {
  //       display: true,
  //       fontStyle: 'bold',
  //       text: "Figure"
  //     },
  //     legend: {
  //       position: "bottom",
  //       labels: {}
  //     },
  //     tooltips: {
  //       mode: 'label',
  //       bodySpacing: 10,
  //       cornerRadius: 0,
  //       titleMarginBottom: 15,
  //     },
  //     scales: {
  //       xAxes: [{
  //         ticks: {}
  //       }],
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true,
  //           stepSize: 500000,
  //           // Return an empty string to draw the tick line but hide the tick label
  //           // Return `null` or `undefined` to hide the tick line entirely
  //           userCallback: function(value, index, values) {
  //               // Convert the number to a string and splite the string every 3 charaters from the end
  //               value = value.toString();
  //               value = value.split(/(?=(?:...)*$)/);
                
  //               // Convert the array to a string and format the output
  //               value = value.join('.');
  //               return '€' + value;
  //               }
  //         }
  //       }]
  //     },
  //     responsive: true,
  //   }
  // });

});

$(document).on("click","#iniciar",function(){
    var simbolo = arr('login',4,'simbolo',54,'principal = 1',0,0,0)[0][0];
    var modulo = $(this).attr('modulo');
    var $toastContent = $('<span>Iniciar caja con '+simbolo+parseFloat($("#vmonto").val()).formatMoney(2,'.',',')+'?</span>').add($('<button class="btn-flat toast-action green white-text add" modulo="'+modulo+'">Aceptar</button>'));
    if ($("#vmonto").val() != '' || $("#vmonto").val() > 0) {
        Materialize.toast($toastContent, 10000,'green');
    }else{
        Materialize.toast('Monto debe ser mayor a 0', 4000,'green');
    }
});

function validar (varreglo,vmodulo) {
    var salida = {}
    /*VALIDACION FRONT END*/
    switch(vmodulo['modulo']) {
        case 'cajainicialusuario':
        if (vmodulo['tip'] == '') {
            err = validarcajainicial();
            if ( err ) {
                return err;
            }
        }
        break;
    }
    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    return salida;
}

function validarcajainicial() {
    if ($("#vmonto").val() == '' || $("#vmonto").val() < 0){ $("#vmonto").focus(); return 'Monto debe ser mayor a 0';  };
    return false;
}

function endDetail(id,acc,modulo) {
    if (acc == 1) {
        $("#vmonto").attr('disabled',true);
    }
}