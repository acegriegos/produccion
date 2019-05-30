var vpara = vbody = "";
var mid = 0;

$(function(){

     $('.chips-initial').material_chip({
        data: getCorreos(),
     });

     $(".chips .input").css("color","white");

     Materialize.updateTextFields();

     $('#lcorreos').click(function(){

        $(this).prop('disabled','disabled');
        mostrar_cargar();
         var para = $('.chips-initial').material_chip('data');
         $("#listcorreos").html("");
  
         for (var i = 0; i < para.length; i++) {
            vpara += para[i].tag+',';
         }
         vpara=vpara.substring(0,vpara.length -1);
         mid = getParameterByName('id');

        var archivos = '';
        var tipo = $("#fact").html();
        mantenimiento('login',8,{arch:'recibo',id:mid,mic:1,tit:tipo+' Electrónica',sel:'',tbl:72,where:mid},1);
        var vfactura = $("#numfact").html().trim();
        vbody = getDatos('',73,mid,0,0)[0][0];
        var vsucursal = vbody[1];

        if (vfactura == mid)
            archivos = 'pdf/'+tipo+' N°'+vfactura+', '+vsucursal+'.pdf';
        else{
            archivos = {0:'xml/'+tipo+' N°'+vfactura+', '+vsucursal+'.xml',1:'pdf/'+tipo+' N°'+vfactura+', '+vsucursal+'.pdf',2:'xml/RH_'+vfactura+', '+vsucursal+'.xml'}
            mantenimiento('login',9,{id:mid,factura:vfactura,sucursal:vsucursal,restado:tipo},1);
            mantenimiento('login',14,{id:mid,sucursal:vsucursal,restado:tipo},1);
        }
        
        var e = enviarCorreo(3,vpara,tipo+" N° "+vfactura,vbody[0],archivos,0,mid,64);
        vpara = vbody = "";
        mid = 0;

        $('.chips-initial').material_chip();
        $(".chips .input").css("color","white");
     });

});

function postExcecute(vid,p){
    switch(parseInt(vid)){
        default:
            break;
    }
}

function getCorreos(){
    var salida = "[";
    var p= getDatos("correo",17,"idcorreo>0 and idtabla=2 and idfila="+$('#vid').val(),0,0,0)[0];

    for (var i = 0; i < p.length; i++) {
        salida+='{"tag":"'+p[i][0]+'"},';
    }

    if (p.length > 0) {
        return JSON.parse(salida.substring(0,salida.length -1)+"]");
    }else
        return '';

    
}

function generarhoja(){

var salida = '<!doctype html>'+
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">'+
'<head>'+

'<meta charset="UTF-8">'+
'<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
'<meta name="viewport" content="width=device-width, initial-scale=1">'+
'<title>FACTURA</title>'+

'<style type="text/css">'+
'p{'+
'margin:10px 0;'+
'padding:0;'+
'}'+
'table{'+
'border-collapse:collapse;'+
'}'+
'h1,h2,h3,h4,h5,h6{'+
'display:block;'+
'margin:0;'+
'padding:0;'+
'}'+
'img,a img{'+
'border:0;'+
'height:auto;'+
'outline:none;'+
'text-decoration:none;'+
'}'+
'body,#bodyTable,#bodyCell{'+
'height:100%;'+
'margin:0;'+
'padding:0;'+
'width:100%;'+
'}'+
'.mcnPreviewText{'+
'display:none !important;'+
'}'+
'#outlook a{'+
'padding:0;'+
'}'+
'img{'+
'-ms-interpolation-mode:bicubic;'+
'}'+
'table{'+
'mso-table-lspace:0pt;'+
'mso-table-rspace:0pt;'+
'}'+
'.ReadMsgBody{'+
'width:100%;'+
'}'+
'.ExternalClass{'+
'width:100%;'+
'}'+
'p,a,li,td,blockquote{'+
'mso-line-height-rule:exactly;'+
'}'+
'a[href^=tel],a[href^=sms]{'+
'color:inherit;'+
'cursor:default;'+
'text-decoration:none;'+
'}'+
'p,a,li,td,body,table,blockquote{'+
'-ms-text-size-adjust:100%;'+
'-webkit-text-size-adjust:100%;'+
'}'+
'.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{'+
'line-height:100%;'+
'}'+
'a[x-apple-data-detectors]{'+
'color:inherit !important;'+
'text-decoration:none !important;'+
'font-size:inherit !important;'+
'font-family:inherit !important;'+
'font-weight:inherit !important;'+
'line-height:inherit !important;'+
'}'+
'#bodyCell{'+
'padding:10px;'+
'}'+
'.templateContainer{'+
'align: center;'+
'max-width: 800px !important;'+
'}'+
'a.mcnButton{'+
'display:block;'+
'}'+
'.mcnImage{'+
'vertical-align:bottom;'+
'}'+
'.mcnTextContent{'+
'word-break:break-word;'+
'}'+
'.mcnTextContent img{'+
'height:auto !important;'+
'}'+
'.mcnDividerBlock{'+
'table-layout:fixed !important;'+
'}'+

'body,#bodyTable{'+
'background-color:#ffffff;'+
'background-image:none;'+
'background-repeat:no-repeat;'+
'background-position:center;'+
'background-size:cover;'+
'}'+

'#bodyCell{'+
'border-top:0;'+
'}'+

'.templateContainer{'+
'border:0;'+
'}'+

'h1{'+
'color:#202020;'+
'font-family:Helvetica;'+
'font-size:26px;'+
'font-style:normal;'+
'font-weight:bold;'+
'line-height:125%;'+
'letter-spacing:normal;'+
'text-align:left;'+
'}'+

'h2{'+
'color:#202020;'+
'font-family:Helvetica;'+
'font-size:22px;'+
'font-style:normal;'+
'font-weight:bold;'+
'line-height:125%;'+
'letter-spacing:normal;'+
'text-align:left;'+
'}'+

'h3{'+
'color:#202020;'+
'font-family:Helvetica;'+
'font-size:20px;'+
'font-style:normal;'+
'font-weight:bold;'+
'line-height:125%;'+
'letter-spacing:normal;'+
'text-align:left;'+
'}'+

'h4{'+
'color:#202020;'+
'font-family:Helvetica;'+
'font-size:18px;'+
'font-style:normal;'+
'font-weight:bold;'+
'line-height:125%;'+
'letter-spacing:normal;'+
'text-align:left;'+
'}'+

'#templateHeader{'+
'border-top:0;'+
'border-bottom:0;'+
'}'+

'#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{'+
'color:#202020;'+
'font-family:Helvetica;'+
'font-size:16px;'+
'line-height:150%;'+
'text-align:left;'+
'}'+

'#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{'+
'color:#2BAADF;'+
'font-weight:normal;'+
'text-decoration:underline;'+
'}'+

'#templateBody{'+
'border-top:0;'+
'border-bottom:0;'+
'}'+

'#templateBody .mcnTextContent,#templateBody .mcnTextContent p{'+
'color:#202020;'+
'font-family:Helvetica;'+
'font-size:16px;'+
'line-height:150%;'+
'text-align:left;'+
'}'+

'#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{'+
'color:#2BAADF;'+
'font-weight:normal;'+
'text-decoration:underline;'+
'}'+

'#templateFooter{'+
'border-top:0;'+
'border-bottom:0;'+
'}'+

'#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{'+
'color:#202020;'+
'font-family:Helvetica;'+
'font-size:12px;'+
'line-height:150%;'+
'text-align:left;'+
'}'+

'#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{'+
'color:#202020;'+
'font-weight:normal;'+
'text-decoration:underline;'+
'}'+
'@media only screen and (min-width:768px){'+

// 'div.m15e35539aa25fc51 .m_1169369238308866651templateContainer{max-width: 800px !important}'+
// 'div.m15e35539aa25fc51 .m_1169369238308866651templateContainer{width: 800px !important}'+

'.templateContainer{'+
'align: center;'+
'width:800px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'body,table,td,p,a,li,blockquote{'+
'-webkit-text-size-adjust:none !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'body{'+
'width:100% !important;'+
'min-width:100% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'#bodyCell{'+
'padding-top:10px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnImage{'+
'width:100% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{'+
'max-width:100% !important;'+
'width:100% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnBoxedTextContentContainer{'+
'min-width:100% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnImageGroupContent{'+
'padding:9px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{'+
'padding-top:9px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnImageCardTopImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{'+
'padding-top:18px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnImageCardBottomImageContent{'+
'padding-bottom:9px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnImageGroupBlockInner{'+
'padding-top:0 !important;'+
'padding-bottom:0 !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnImageGroupBlockOuter{'+
'padding-top:9px !important;'+
'padding-bottom:9px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnTextContent,.mcnBoxedTextContentColumn{'+
'padding-right:18px !important;'+
'padding-left:18px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{'+
'padding-right:18px !important;'+
'padding-bottom:0 !important;'+
'padding-left:18px !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+
'.mcpreview-image-uploader{'+
'display:none !important;'+
'width:100% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+

'h1{'+
'font-size:22px !important;'+
'line-height:125% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+

'h2{'+
'font-size:20px !important;'+
'line-height:125% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+

'h3{'+
'font-size:18px !important;'+
'line-height:125% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+

'h4{'+
'font-size:16px !important;'+
'line-height:150% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+

'table.mcnBoxedTextContentContainer td.mcnTextContent,td.mcnBoxedTextContentContainer td.mcnTextContent p{'+
'font-size:14px !important;'+
'line-height:150% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+

'td#templateHeader td.mcnTextContent,td#templateHeader td.mcnTextContent p{'+
'font-size:16px !important;'+
'line-height:150% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+

'td#templateBody td.mcnTextContent,td#templateBody td.mcnTextContent p{'+
'font-size:16px !important;'+
'line-height:150% !important;'+
'}'+

'}   @media only screen and (max-width: 480px){'+

'td#templateFooter td.mcnTextContent,td#templateFooter td.mcnTextContent p{'+
'font-size:14px !important;'+
'line-height:150% !important;'+
'}'+

'}</style></head>'+
'<body style="min-width: 800px !important">'+
'<span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;"> FACTURA </span>'+
'<center>'+
'<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">'+
'<tr>'+
'<td align="left" valign="top" id="bodyCell">'+

'<table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">'+
'<tr>'+
'<td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">'+
'<tbody class="mcnCaptionBlockOuter">'+
'<tr>'+
'<td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">'+



'<table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%">'+
'<tbody><tr>'+
'<td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">'+
'<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">'+
'<tbody><tr>'+
'<td class="mcnCaptionRightImageContent" valign="top">'+
'<br>'+
/*Aqui se cambia el logo del correo*/
'<img alt="logintechcr.com" src="https://logintechcr.com/img/logo.png" width="264" style="max-width:339px;" class="mcnImage">'+

'</td>'+
'</tr>'+
'</tbody></table>'+
'<table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="264">'+
'<tbody><tr>'+
'<td valign="top" class="mcnTextContent" style="font-size: 12px;">'+
'<div style="text-align: left; color: #494949;">'+
'<strong>'+$("#fnombre").html()+'</strong><br>'+
'<strong>Cédula:</strong> '+$("#fcedula").html()+'<br>'+
'<strong>Teléfono:</strong> '+$("ftelefono").html()+'<br>'+
'<strong>Correo:</strong> '+$("#fcorreo").html()+'<br>'+
'<strong>Dirección:</strong><br>'+
''+$("#fdireccion").html()+'</div>'+

'</td>'+
'</tr>'+
'</tbody></table>'+
'</td>'+
'</tr>'+
'</tbody></table>'+


'</td>'+
'</tr>'+
'</tbody>'+
'</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">'+
'<tbody class="mcnDividerBlockOuter">'+
'<tr>'+
'<td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">'+
'<table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">'+
'<tbody><tr>'+
'<td>'+
'<span></span>'+
'</td>'+
'</tr>'+
'</tbody></table>'+

'</td>'+
'</tr>'+
'</tbody>'+
'</table>'+
'</td>'+
'</tr>'+
'<tr>'+
'<td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">'+

'<tbody class="mcnBoxedTextBlockOuter">'+
'<tr>'+
'<td valign="top" class="mcnBoxedTextBlockInner">'+

'<table align="left" border="0" cellpadding="0" cellspacing="0" width="390" class="mcnBoxedTextContentContainer">'+
'<tbody><tr>'+

'<td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:18px;">'+

'<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="min-width:100% !important;">'+
'<tbody><tr>'+
'<td valign="top" class="mcnTextContent" style="color: #494949;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;">'+
'<div style="text-align: left;"><span style="font-size:18px">'+$("#ftipo").html()+'</span><br>'+
'<br>'+
'<strong>'+$("#fact").html()+' N°</strong> '+$("#numfact").html()+'<br>'+
'<strong>Factura de: </strong>'+$("#fclase").html()+'<br>'+
'<strong>Cliente:</strong><br>'+
'<br>'+
$("#fcliente").html()+'<br>'+
'<br>'+
'<strong>Vende:</strong> '+$("#fvendedor").html()+'<br>'+
'<strong>Comentario:</strong><br>'+
$("#fcomentario").html()+'</div>'+

'</td>'+
'</tr>'+
'</tbody></table>'+
'</td>'+
'</tr>'+
'</tbody></table>'+

'<table align="left" border="0" cellpadding="0" cellspacing="0" width="210" class="mcnBoxedTextContentContainer">'+
'<tbody><tr>'+

'<td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:18px;">'+

'<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="min-width:100% !important;">'+
'<tbody><tr>'+
'<td valign="top" class="mcnTextContent" style="color: #494949;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;">'+
'<div style="text-align: center;"><br>'+
'<br>'+
'<strong >'+$(".ftipofact").html()+'</strong><br>'+$(".ftipofa").html()+'<br>'+
'<br>'+
'<strong>Fecha:</strong>&nbsp;<br>'+
$("#ffecha").html()+'</div>'+
'</td>'+
'</tr>'+
'</tbody></table>'+
'</td>'+
'</tr>'+
'</tbody></table>'+

'</td>'+
'</tr>'+
'</tbody>'+
'</table></td>'+
'</tr>'+
'<tr>'+
'<td valign="top" id="templateFooter"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">'+
'<tbody class="mcnTextBlockOuter">'+
'<tr>'+
'<td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">'+

'<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">'+
'<tbody><tr>'+

'<td valign="top" class="mcnTextContent" style="font-size: 14px;text-align: center; padding: 1%;color: #494949;" align="center">'+
'<strong>Cantidad</strong>'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="font-size: 14px;text-align: center; padding: 1%;color: #494949;" align="center">'+
'<strong>Descripcion</strong>'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="font-size: 14px;text-align: center; padding: 1%;color: #494949;" align="center">'+
'<strong>P. Unitario</strong>'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="font-size: 14px;text-align: center; padding: 1%;color: #494949;" align="center">'+
'<strong>Tipo</strong>'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="font-size: 14px;text-align: center; padding: 1%;color: #494949;" align="center">'+
'<strong>Descuento</strong>'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="font-size: 14px;text-align: center; padding: 1%;color: #494949;" align="center">'+
'<strong>Importe</strong>'+
'</td>'+
'</tr>'+
'</tbody></table>'+

//'<!-- DETALLE FACTURA -->'+
'<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">'+
'<tbody>';

$("#ftbody tr").each(function(){

salida += '<tr>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$(this).find('.flista1').html()+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$(this).find('.flista2').html()+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$(this).find('.flista3').html()+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$(this).find('.flista4').html()+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$(this).find('.flista5').html()+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$(this).find('.flista6').html()+
'</td>'+
'</tr>';

});

salida += '</tbody>'+
'</table>'+

'<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">'+
'<tbody class="mcnDividerBlockOuter">'+
'<tr>'+
'<td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">'+
'<table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">'+
'<tbody><tr>'+
'<td>'+
'<span></span>'+
'</td>'+
'</tr>'+
'</tbody></table>'+

'</td>'+
'</tr>'+
'</tbody>'+
'</table>'+

'<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">'+
'<tbody>'+
//'<!-- SUBTOTAL -->'+
'<tr>'+
'<td width="65%" valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
'&nbsp;'+
'</td>'+

'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: right;">'+
'Subtotal'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$("#fsubtotal").html()+'</td>'+
'</tr>'+
'<tr>'+
'<td width="65%" valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
'&nbsp;'+
'</td>'+

'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: right;">'+
'Impuesto'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$("#fimv").html()+'</td>'+
'</tr>'+
'<tr>'+
'<td width="60%" valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
'&nbsp;'+
'</td>'+

'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: right;">'+
'Descuento'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
$("#fdescuento").html()+'</td>'+
'</tr>'+
'<tr>'+
'<td width="60%" valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
'&nbsp;'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: right;">'+
'<strong>Total</strong>'+
'</td>'+
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;">'+
'<strong>'+$("#ftotal").html()+'</strong>'+
'</td>'+
'</tr>'+
//'<!-- SUBTOTAL -->'+
'</tbody></table>'+
//'<!-- /DETALLE FACTURA -->'+

'</td>'+
'</tr>'+
'</tbody>'+
'</table>'+
'</td>'+
'</tr>'+
'</table>'+

'</td>'+
'</tr>'+
'</table>'+
'</center>'+
'</body>'+
'</html>'

return salida;
}