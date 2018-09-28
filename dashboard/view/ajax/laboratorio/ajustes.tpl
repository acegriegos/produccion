<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Ajustes Laboratorio</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css?v=10.0.0.61">
  </head>
  <body>
    {$NAV}
    <div class="bdy pequeño">
      <!-- <div class="card pequeño"> -->
        <div class="card center mbotcero pequeño">
          <h4 class="center-align mbotcero head1">Ajustes de Laboratorio</h4>
        </div>

          <ul class="collapsible card" data-collapsible="accordion">
            <li {if $smarty.session.IMPRESA neq 1 && $smarty.session.TMP_CIA neq -1} class="hide" {/if}>
              <div class="collapsible-header {if $smarty.session.IMPRESA eq 1} active {/if}" idsuc="1" style="align-items: center;  background: #F9F9F9"><i class="mdi mdi-cube-unfolded"></i><p style="font-size: 1.2em">Laboratorio de Cultivos y Tejidos</p></div>
              <div class="collapsible-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col s12 m3" align="center">
                      <h6><b>Inventarios</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12 input-field">
                          <select  id="invVariedadCT" class="role_inv" tp="1">
                          </select>
                          <label for="invVariedadCT">Inventarios Variedades</label>
                        </div>
                        <div class="col s12 input-field">
                          <select  id="invreactivosCT" class="role_inv" tp="2">
                          </select>
                          <label for="invreactivosCT">Inventarios Reactivos</label>
                        </div>
                        <div class="col s12 input-field">
                          <select  id="invcompCT" class="role_inv" tp="4">
                          </select>
                          <label for="invcompCT">Inventarios Componentes</label>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m4" style="background: #F9F9F9" align="center">
                      <h6><h6><b>Ciclos</b></h6></h6>
                      <div class="row" align="center">
                        <div class="col s12 container"><br>
                          <label for="">Medio Multiplicación</label><br>
                          <a class="btn btn1 modalmedios" tm="2">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="2">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="2">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Medio Enraizamiento</label><br>
                          <a class="btn btn1 modalmedios" tm="3">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="3">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="3">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Medio de Iniciación</label><br>
                          <a class="btn btn1 modalmedios" tm="4">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="4">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="4">DATOS</a>
                        </div>
                      </div>  
                    </div>
                    <div class="col s12 m2" align="center">
                      <h6><b>QoS Fin de Proceso</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 pruebasQoS" ids="1">QoS</a>
                        </div>
                      </div><br>
                      <h6><b>Pérdidas por laboratorio</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 perdidasxlab" ids="1">Perdidas</a>
                        </div>
                      </div><br>
                    </div>
                    <div class="col s12 m3" style="background: #F9F9F9" align="center">
                      <h6><b>Bandejas-Frascos</b></h6><br>
                      <div class="row" align="center">
                        <!-- <div class="col s12 input-field">
                          <select id="inv-bandejasCT" class="role_inv" tp="3">
                          </select>
                          <label for="inv-bandejasCT">Inventarios Bandejas</label>
                        </div> -->
                        <div class="col s12 input-field">
                          <select id="inv-frascosCT" class="role_inv" tp="5">
                          </select>
                          <label for="inv-frascosCT">Inventarios Frascos</label>
                        </div>
                        <div class="col s12">
                          <a href="#modal-bandejas" class="btn btn2 relaciones" tp="1">Relación</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li {if $smarty.session.IMPRESA neq 5 && $smarty.session.TMP_CIA neq -1} class="hide" {/if}>
              <div class="collapsible-header {if $smarty.session.IMPRESA eq 5} active {/if}" idsuc="5" style="align-items: center;  background: #F9F9F9"><i class="mdi mdi-eyedropper"></i><p style="font-size: 1.2em">Planta de Sustratos</p></div>
                <div class="collapsible-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col s12 m3" align="center">
                      <h6><b>Inventarios</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12 input-field">
                          <select  id="invVariedadPS" class="role_inv" tp="6">
                            <option disabled selected value="0">Seleccione una Opción</option>
                          </select>
                          <label for="invVariedadPS">Inventarios Variedades</label>
                        </div>
                        <div class="col s12 input-field">
                          <select  id="invreactivosPS" class="role_inv" tp="7">
                          </select>
                          <label for="invreactivosPS">Inventarios Reactivos</label>
                        </div>
                        <div class="col s12 input-field">
                          <select  id="invcompPS" class="role_inv" tp="9">
                          </select>
                          <label for="invcompPS">Inventarios Componentes</label>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m4" style="background: #F9F9F9" align="center">
                      <h6><h6><b>Ciclos</b></h6></h6>
                      <div class="row" align="center">
                        <div class="col s12 container"><br>
                          <label for="">Crudos</label><br>
                          <a class="btn btn1 modalmedios" tm="45">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="45">QoS</a>
                          <a class="btn btn1 modalmedios" tm="45">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Pesaje</label><br>
                          <a class="btn btn1 modalmedios" tm="46">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="46">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="46">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Mezclado</label><br>
                          <a class="btn btn1 modalmedios" tm="47">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="47">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="47">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Tratamiento Térmico</label><br>
                          <a class="btn btn1 modalmedios" tm="48">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="48">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="48">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Empaque</label><br>
                          <a class="btn btn1 modalmedios" tm="49">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="49">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="49">DATOS</a>
                        </div>
                      </div>  
                    </div>
                    <div class="col s12 m2" align="center">
                      <h6><b>QoS Fin de Proceso</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 pruebasQoS" ids="5">QoS</a>
                        </div>
                      </div>
                      <h6><b>Pérdidas por laboratorio</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 perdidasxlab" ids="1">Perdidas</a>
                        </div>
                      </div><br>
                    </div>
                    <div class="col s12 m3" style="background: #F9F9F9" align="center">
                      <h6><b>Bandejas-Frascos</b></h6><br>
                      <div class="row" align="center">
                        <!-- <div class="col s12 input-field">
                          <select id="inv-bandejasPS" class="role_inv" tp="3">
                          </select>
                          <label for="inv-bandejasPS">Inventarios Bandejas</label>
                        </div> -->
                        <div class="col s12 input-field">
                          <select id="inv-frascosPS" class="role_inv" tp="10">
                          </select>
                          <label for="inv-frascosPS">Inventarios Frascos</label>
                        </div>
                        <div class="col s12">
                          <a href="#modal-bandejas" class="btn btn2 relaciones" tp="5">Relación</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li {if $smarty.session.IMPRESA neq 2 && $smarty.session.TMP_CIA neq -1} class="hide" {/if}>
              <div class="collapsible-header {if $smarty.session.IMPRESA eq 2} active {/if}" idsuc="2" style="align-items: center;  background: #F9F9F9"><i class="mdi mdi-bug"></i><p style="font-size: 1.2em">Laboratorio Cotesia Flavipes</p></div>
              <div class="collapsible-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col s12 m3" align="center">
                      <h6><b>Inventarios</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12 input-field">
                          <select  id="invVariedadCF" class="role_inv" tp="11">
                          </select>
                          <label for="invVariedadCF">Inventarios Variedades</label>
                        </div>
                        <div class="col s12 input-field">
                          <select  id="invreactivosCF" class="role_inv" tp="12">
                          </select>
                          <label for="invreactivosCF">Inventarios Reactivos</label>
                        </div>
                        <div class="col s12 input-field">
                          <select  id="invcompCF" class="role_inv" tp="14">
                          </select>
                          <label for="invcompCF">Inventarios Componentes</label>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m4" style="background: #F9F9F9" align="center">
                      <h6><h6><b>Ciclos</b></h6></h6>
                      <div class="row" align="center">
                        <div class="col s12 container"><br>
                          <label for="">Copulación</label><br>
                          <a class="btn btn1 modalmedios" tm="11">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="11">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="11">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Recolección de Posturas</label><br>
                          <a class="btn btn1 modalmedios" tm="12">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="12">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="12">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Inoculación</label><br>
                          <a class="btn btn1 modalmedios" tm="13">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="13">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="13">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Parasitación</label><br>
                          <a class="btn btn1 modalmedios" tm="14">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="14">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="14">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Revisión</label><br>
                          <a class="btn btn1 modalmedios" tm="15">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="15">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="15">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Puparios</label><br>
                          <a class="btn btn1 modalmedios" tm="16">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="16">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="16">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Empaque</label><br>
                          <a class="btn btn1 modalmedios" tm="17">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="17">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="17">DATOS</a>
                        </div>
                      </div>  
                    </div>
                    <div class="col s12 m2" align="center">
                      <h6><b>QoS Fin de Proceso</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 pruebasQoS" ids="2">QoS</a>
                        </div>
                      </div>
                      <h6><b>Pérdidas por laboratorio</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 perdidasxlab" ids="1">Perdidas</a>
                        </div>
                      </div><br>
                    </div>
                    <div class="col s12 m3" style="background: #F9F9F9" align="center">
                      <h6><b>Bandejas-Frascos</b></h6><br>
                      <div class="row" align="center">
                        <!-- <div class="col s12 input-field">
                          <select id="inv-bandejasCF" class="role_inv" tp="3">
                          </select>
                          <label for="inv-bandejasCF">Inventarios Bandejas</label>
                        </div> -->
                        <div class="col s12 input-field">
                          <select id="inv-frascosCF" class="role_inv" tp="15">
                          </select>
                          <label for="inv-frascosCF">Inventarios Frascos</label>
                        </div>
                        <div class="col s12">
                          <a href="#modal-bandejas" class="btn btn2 relaciones" tp="2">Relación</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li {if $smarty.session.IMPRESA neq 3 && $smarty.session.TMP_CIA neq -1} class="hide" {/if}>
              <div class="collapsible-header {if $smarty.session.IMPRESA eq 3} active {/if}" idsuc="3" style="align-items: center;  background: #F9F9F9"><i class="mdi mdi-mushroom"></i><p style="font-size: 1.2em">Laboratorio Hongos Entomopatógenos</p></div>
              <div class="collapsible-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col s12 m3" align="center">
                      <h6><b>Inventarios</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12 input-field">
                          <select  id="invVariedadHE" class="role_inv" tp="16">
                          </select>
                          <label for="invVariedadHE">Inventarios Variedades</label>
                        </div>
                        <div class="col s12 input-field">
                          <select  id="invreactivosHE" class="role_inv" tp="17">
                          </select>
                          <label for="invreactivosHE">Inventarios Reactivos</label>
                        </div>
                        <div class="col s12 input-field">
                          <select  id="invcompHE" class="role_inv" tp="19">
                          </select>
                          <label for="invcompHE">Inventarios Componentes</label>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m4" style="background: #F9F9F9" align="center">
                      <h6><h6><b>Ciclos</b></h6></h6>
                      <div class="row" align="center">
                        <div class="col s12 container"><br>
                          <label for="">Cepario</label><br>
                          <a class="btn btn1 modalmedios" tm="19">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="19">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="19">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Cultivo Monospórico</label><br>
                          <a class="btn btn1 modalmedios" tm="20">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="20">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="20">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Cultivo Total</label><br>
                          <a class="btn btn1 modalmedios" tm="21">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="21">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="21">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Matriz Líquid</label><br>
                          <a class="btn btn1 modalmedios" tm="22">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="22">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="22">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Inoculación</label><br>
                          <a class="btn btn1 modalmedios" tm="23">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="23">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="23">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Esporulación</label><br>
                          <a class="btn btn1 modalmedios" tm="24">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="24">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="24">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Secado</label><br>
                          <a class="btn btn1 modalmedios" tm="25">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="25">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="25">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Empaque</label><br>
                          <a class="btn btn1 modalmedios" tm="26">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="26">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="26">DATOS</a>
                        </div>
                      </div>  
                    </div>
                    <div class="col s12 m2" align="center">
                      <h6><b>QoS Fin de Proceso</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 pruebasQoS" ids="3">QoS</a>
                        </div>
                      </div>
                      <h6><b>Pérdidas por laboratorio</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 perdidasxlab" ids="1">Perdidas</a>
                        </div>
                      </div><br>
                    </div>
                    <div class="col s12 m3" style="background: #F9F9F9" align="center">
                      <h6><b>Bandejas-Frascos</b></h6><br>
                      <div class="row" align="center">
                        <!-- <div class="col s12 input-field">
                          <select id="inv-bandejasHE" class="role_inv" tp="3">
                          </select>
                          <label for="inv-bandejasHE">Inventarios Bandejas</label>
                        </div> -->
                        <div class="col s12 input-field">
                          <select id="inv-frascosHE" class="role_inv" tp="20">
                          </select>
                          <label for="inv-frascosHE">Inventarios Frascos</label>
                        </div>
                        <div class="col s12">
                          <a href="#modal-bandejas" class="btn btn2 relaciones" tp="3">Relación</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li {if $smarty.session.IMPRESA neq 4 && $smarty.session.TMP_CIA neq -1} class="hide" {/if}>
              <div class="collapsible-header {if $smarty.session.IMPRESA eq 4} active {/if}" idsuc="4" style="align-items: center;  background: #F9F9F9"><i class="mdi mdi-biohazard"></i><p style="font-size: 1.2em">Laboratorio Biología Molecular</p></div>
                            <div class="collapsible-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col s12 m3" align="center">
                      <h6><b>Inventarios</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12 input-field">
                          <select id="invVariedadBM" class="role_inv" tp="21">
                          </select>
                          <label for="invVariedadBM">Inventarios Variedades</label>
                        </div>
                        <div class="col s12 input-field">
                          <select id="invreactivosBM" class="role_inv" tp="22">
                          </select>
                          <label for="invreactivosBM">Inventarios Reactivos</label>
                        </div>
                        <div class="col s12 input-field">
                          <select id="invcompBM" class="role_inv" tp="24">
                          </select>
                          <label for="invcompBM">Inventarios Componentes</label>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m4" style="background: #F9F9F9" align="center">
                      <!-- <h6><h6><b>Ciclos</b></h6></h6> -->
                      <div class="row" align="center">
                        <div class="col s12 container"><br>
                          <label for="">Preparación de Muestra</label><br>
                          <a class="btn btn1 modalmedios" tm="36">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="36">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="36">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Extracción de Ácidos Nucleicos</label><br>
                          <a class="btn btn1 modalmedios" tm="37">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="37">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="37">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Ampificación de ADN Por Punto Final</label><br>
                          <a class="btn btn1 modalmedios" tm="38">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="38">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="38">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Electroforesis de Agarosa</label><br>
                          <a class="btn btn1 modalmedios" tm="39">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="39">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="39">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Electroforesis de Acrilamida</label><br>
                          <a class="btn btn1 modalmedios" tm="40">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="40">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="40">DATOS</a>
                        </div>
                        <div class="col s12 container"><br>
                          <label for="">Ampificación ADN Por Tiempo Real</label><br>
                          <a class="btn btn1 modalmedios" tm="43">MEDIOS</a>
                          <a class="btn btn1 modalmediosQoS" tm="43">QoS</a>
                          <a class="btn btn1 modalmediosExtra" tm="43">DATOS</a>
                        </div>
                      </div>  
                    </div>
                    <div class="col s12 m2" align="center">
                      <h6><b>QoS Fin de Proceso</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 pruebasQoS" ids="4">QoS</a>
                        </div>
                      </div>
                      <h6><b>Pérdidas por laboratorio</b></h6><br>
                      <div class="row" align="center">
                        <div class="col s12"><br>
                          <a class="btn btn3 perdidasxlab" ids="1">Perdidas</a>
                        </div>
                      </div><br>
                    </div>
                    <div class="col s12 m3" style="background: #F9F9F9" align="center">
                      <h6><b>Bandejas-Frascos</b></h6><br>
                      <div class="row" align="center">
                        <!-- <div class="col s12 input-field">
                          <select id="inv-bandejasBM" class="role_inv" tp="3">
                          </select>
                          <label for="inv-bandejasBM">Inventarios Bandejas</label>
                        </div> -->
                        <div class="col s12 input-field">
                          <select id="inv-frascosBM" class="role_inv" tp="25">
                          </select>
                          <label for="inv-frascosBM">Inventarios Frascos</label>
                        </div>
                        <div class="col s12">
                          <a href="#modal-bandejas" class="btn btn2 relaciones" tp="4">Relación</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

      <!-- </div> -->
    </div>

    <div id="modal-medios" class="modal modal-fixed-footer">
      <div class="modal-header head2 padding1">
        <div class="card-header center white-text">
            <p style="font-size: 1.2em" class="flow-text marginzero">Medios de cultivos</p>
        </div>
      </div>
      <div class="modal-content" style="padding: 0px;">
        <div class="row">
          <div class="input-field col s12 m3 l3">
            <input type="text" id="_vnombre" class="validate autocomplete" autocomplete="off">
            <input type="hidden" id="_vidciclo" value="0">
            <label for="_vnombre">Nombre del producto o paquete</label>
          </div>
          <div class="input-field col s12 m3 l3">
            <input type="text" id="_vcodigo" class="validate autocomplete" autocomplete="off">
            <label for="_vcodigo">Código del producto o paquete</label>
          </div>
          <div class="input-field col s12 m1 l1">
            <input type="number" id="_vcantidad" class="validate">
            <label for="_vcantidad">Cantidad</label>
          </div>
          <div class="input-field col s12 m2 l2">
            <select type="select" id="_vidunidad"></select>
            <label for="_vidunidad">Unidad</label>
          </div>
          <div class="input-field col s12 m1 l1">
            <select type="select" id="_vidreferencia" disabled></select>
            <label for="_vidreferencia">Referencia</label>
          </div>
          <div class="input-field col s12 m2 l2">
            <a class="btn btn-block btn1 btn-floating mdi mdi-plus mdi-24px" id="addmedio"></a>
            <a class="btn btnred btn-floating mdi mdi-cancel mdi-24px hide" id="cancelact"></a>
          </div>
        </div>
        <div class="row">
          <div class="col s1 m2 l2"></div>
          <div class="col s10 m8 l8 center">
            <table class="responsive-table striped highlight">
              <thead class="tab1">
                <tr>
                  <th colspan="3" class="tab2 center" style="padding: 0;">Medio de Cultivo de <span id="cantmediocultivo">1 L</span></th>
                </tr>
                <tr>
                  <th class="center" style="border: 0; border-radius: 0px !important; padding: 1% !important;">Componente</th>
                  <th class="center" style="border: 0; border-radius: 0px !important; padding: 1% !important;">Cantidad a tomar</th>
                  <th class="center" style="border: 0; border-radius: 0px !important; padding: 1% !important;">Acciones</th>
                </tr>
                
              </thead>
              <tbody id="listamedioscultivos"></tbody>
            </table>
          </div>
          <div class="col s1 m2 l2"></div>
        </div>
      </div>
      <div class="modal-footer ">
        <a class="modal-action waves-effect waves-green btn-flat z-depth-5 savemedio">Agregar</a>
        <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
      </div>
    </div>

    <div id="modal-bandejas" class="modal modal-fixed-footer grandemodal">
      <div class="modal-header">
        <div class="card-header center head2 padding1">
          <p style="font-size: 1.2em" class="flow-text marginzero">Relacion de Frascos</p>
        </div>
      </div>
      <div class="modal-content" style="padding: 20px;">
        <div class="row">
          <table class="table responsive-table centered striped bordered highlight pequeño" id="data-table-relaciones" cellspacing="0" width="100%" >
            <thead>
              <tr class="tab1">
                <!-- <th style="border: 0; border-radius: 0px !important;">Bandejas</th> -->
                <th style="border: 0; border-radius: 0px !important;">Frascos</th>
                <th style="border: 0; border-radius: 0px !important;">Contienen</th>
                <th style="border: 0; border-radius: 0px !important;">Acciones</th>
                <input type="hidden" id="autoinc" value="1">
              </tr>
            </thead>
            <tbody id="flaboratorio-relaciones">
              
              <!-- <input type="hidden" id="curpos" value="0"> -->
              <tr id="rw1" class="rowrel zelda">
                <!-- <td style="padding: 10px;">
                  <div class="input-field">
                  <select type="select" id="bandejas1" class="invbandejas"></select>
                </div>
              </td> -->
              
              <td style="padding: 10px;">
                <div class="input-field">
                <select type="select" id="frascos1" class="invfrascos"></select>
              </div>
              </td>
               <td style="padding: 10px;">
                <div class="input-field">
                  <input type="number" id="caben1" class="caben" value="1" min="1">
                </div>
              </td>
               <td style="padding: 10px;">
              <a class="waves-effect waves-light gtext pbtn addline add" modulo="laboratorio-relacione" id="al1" tp="5"><i class="mdi mdi-plus mdi-24px"></i></a>
              <a class="waves-effect waves-light gtext pbtn delline delete" modulo="laboratorio-relacione" id="dl1" tp="5"><i class="mdi mdi-close mdi-24px"></i></a>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>

<div id="modal-pruebasQoS" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
    <div class="card-header center head2 padding1">
      <p style="font-size: 1.2em" class="flow-text marginzero">QoS Fin de Proceso</p>
    </div>
  </div>
  <div class="modal-content" style="padding: 20px;">
    <div class="row">
      <div class="input-field col s10 m4 l4">
        <input type="text" id="tipopruebas" class="validate">
        <label for="tipopruebas">Pruebas QoS</label>
      </div>
      <div class="col s2 m2 l2" style="margin-top: 1rem">
        <a class="btn-floating btn2 mdi mdi-plus mdi-24px" id="addtestqos" style="padding-left: 8px;"></a>
      </div>
      <div class="col s12 m6 l6">
        <ul class="collection" id="testqos"></ul>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5 savetestqos">Agregar</a>
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>

<div id="modal-pruebasQoSCiclo" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
    <div class="card-header center head2 padding1">
      <p style="font-size: 1.2em" class="flow-text marginzero">QoS de Ciclo</p>
    </div>
  </div>
  <div class="modal-content" style="padding: 20px;">
    <div class="row">
      <div class="input-field col s10 m4 l4">
        <input type="text" id="tipopruebasCiclo" class="validate">
        <label for="tipopruebasCiclo">Pruebas QoS</label>
      </div>
      <div class="col s2 m2 l2" style="margin-top: 1rem">
        <a class="btn-floating btn2 mdi mdi-plus mdi-24px" id="addtestqosCiclo" style="padding-left: 8px;"></a>
      </div>
      <div class="col s12 m6 l6">
        <ul class="collection" id="testqosCiclo"></ul>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5 savetestqosCiclo">Agregar</a>
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>

<div id="modal-perdidasxlab" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
    <div class="card-header center head2 padding1">
      <p style="font-size: 1.2em" class="flow-text marginzero">Pérdidas por laboratorio</p>
    </div>
  </div>
  <div class="modal-content" style="padding: 20px;">
    <div class="row">
      <div class="input-field col s10 m4 l4">
        <input type="text" id="vperdida" class="validate">
        <label for="vperdida">Pérdida</label>
      </div>
      <div class="col s2 m2 l2" style="margin-top: 1rem">
        <a class="btn-floating btn2 mdi mdi-plus mdi-24px" id="addperdida" style="padding-left: 8px;"></a>
      </div>
      <div class="col s12 m6 l6">
        <ul class="collection" id="listaperdidas"></ul>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5 save-perdidas">Agregar</a>
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>

<div id="modal-datosextra" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
    <div class="card-header center head2 padding1">
      <p style="font-size: 1.2em" class="flow-text marginzero">Datos Extra</p>
    </div>
  </div>
  <div class="modal-content" style="padding: 20px;">
    <div class="row">
      <p>
        <input class="with-gap" name="datosproc" type="radio" id="dmedio" value="1" checked />
        <label for="dmedio">Datos Medio</label>&nbsp;&nbsp;
        <input class="with-gap" name="datosproc" type="radio" id="dfinal" value="0" />
        <label for="dfinal">Datos Final</label>
      </p>
      <div class="input-field col s10 m4 l4">
        <input type="text" id="tipopruebasExtra" class="validate">
        <label for="tipopruebasExtra">Dato Extra</label>
      </div>
      <div class="col s2 m2 l2" style="margin-top: 1rem">
        <a class="btn-floating btn2 mdi mdi-plus mdi-24px" id="addtestqosExtra" style="padding-left: 8px;"></a>
      </div>
      <div class="col s12 m6 l6">
        <ul class="collection" id="testqosExtra"></ul>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5 savetestqosExtra">Agregar</a>
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>

{$SCR}
<script src="../assets/js/modulos/laboratorio.js?v=10.0.0.61"></script>
</body>
</html>