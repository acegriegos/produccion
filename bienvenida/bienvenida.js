$(function(){

$('input.pais').autocomplete({
    data: {
      "Argentina": '../assets/img/flags/argentina.gif', "Canada": '../assets/img/flags/canada.gif', "Colombia": '../assets/img/flags/colombia.gif', "Costa Rica": '../assets/img/flags/costarica.gif', "El Salvador": '../assets/img/flags/salvador.gif', "Estados Unidos": '../assets/img/flags/estadosunidos.gif', "Guatemala": '../assets/img/flags/guatemala.gif', "Honduras": '../assets/img/flags/honduras.gif', "Mexico": '../assets/img/flags/mexico.gif', "Nicaragua": '../assets/img/flags/nicaragua.gif', "Panama": '../assets/img/flags/panama.gif', "Paraguay": '../assets/img/flags/paraguay.gif', "Uruguay": '../assets/img/flags/uruguay.gif', "Venezuela": '../assets/img/flags/venezuela.gif'
    }
  });

$("#next").click(function(){
	$("#panel1").addClass('animated fadeOutLeft');
});


});

$(document).ready(function() {
    $('select').material_select();
});
// $(document).on("","",function(){});