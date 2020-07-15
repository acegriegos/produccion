<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Login</title>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">

  <link rel="stylesheet" type="text/css" href="../assets/css/materialize.min.css?v=10.2.0.79">
  <link rel="stylesheet" type="text/css" href="../assets/css/materialdesignicons.min.css?v=10.2.0.79">
  <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css?v=10.2.0.79"> 
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-login.css?v=10.2.0.79">

</head>
<body>

  <div class="cont z-depth-3">
    <div class="demo">
      <div class="login">
       <form role="form" id="logF" action="index.php" method="POST">
        <input type="hidden" name="vdir" value="" id="vdir"> 

        <div class="login__check" align="center">
          <img id="img" src="../assets/img/login/2.png?v=1" style="width: 80%">
        </div>
        <div class="login__form" style="padding-top: 0;">
          <div class="input-field" style="margin-top: 0;">
            <svg class="login__icon name svg-icon prefix" viewBox="0 0 20 20">
              <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
            </svg>
            <input type="text"  id="user" name="usr" class="login__input "  placeholder="Usuario" value= "" autocomplete="off" />

          </div>

          <div class="input-field">
            <svg class="login__icon pass svg-icon prefix" viewBox="0 0 20 20">
              <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
            </svg>
            <input type="password" id="pass" class="login__input" autocomplete="new-password" name="pss" placeholder="Contraseña" value= ""/>

          </div>
          <input type="checkbox" name="remember" id="remember">
          <label for="remember" class="left">Recordar Usuario</label>
          <button type="submit" class="login__submit btn1">Ingresar</button>
          
          <p class="login__signup"> Olvido su contraseña? &nbsp;<a href="#modal1" class="modal-trigger" id="recupss">Recuperar</a> <span id="smail"></span></p>
        </div>
      </form>
    </div>

    <div id="modal1" class="modal bottom-sheet">
      <div id="msjrecupss" class="modal-content center">
      
      </div>
    </div>

     <div id="modal2" class="modal grandemodal">
      <div class="modal-content center">
        <h4>Inscripción del Cliente</h4>
        <div class="row">
        <div class="col s12 input-field">
          <input type="text" id="n_rzocial" readonly>
          <label for="n_rzocial">Razón Social</label>
        </div>
        </div>

        <div class="row">
        <div class="col s6 input-field">
          <input type="text" id="n_ced" readonly>
          <label for="n_ced">Cédula</label>
        </div>

        <div class="col s6 input-field">
          <input type="text" id="n_fant">
          <label for="n_fant">Nombre de Fantasía</label>
        </div>
        </div>

        <div class="row">
        <div class="col s6 input-field">
          <input type="text" id="n_mail">
          <label for="n_mail">Correo Electrónico</label>
        </div>

        <div class="col s6 input-field">
          <input type="text" id="n_phone">
          <label for="n_phone">Teléfono</label>
        </div>
        </div>

        <div class="row">
        <select id="n_tipo" class="browser-default col s4">
          <option value="0">Seleccione un Plan</option>
          <option value="1" selected="">Plan Básico</option>
          <option value="6">Plan Gold</option>
        </select>

        <div class="col s4 input-field">
          <input type="text" id="n_valor" readonly value="11,300.00" class="eder">
          <label for="n_valor">Valor Mensualidad +IVA, ¢</label>
        </div>

        <div class="col s4 input-field">
          <input type="date" id="n_date" readonly class="browser-default">
          <label for="n_date" class="active red-text">Fecha de Corte</label>
        </div>

        </div>

        <div class="row">
          <div class="col s8">

            <section style="border: 1px solid black; max-height: 20vh; overflow-y: auto;padding-right: 20px;padding-left: 20px;">
              <h1>TERMINOS Y CONDICIONES DE USO</h1>
              <hr> <br>
              <p style="text-align: justify; text-justify: inter-word;">
                1. Introducción.

Los presentes Términos y Condiciones regirán el acceso y el uso del producto de software y de los servicios de ESCOOLKARDEX (en adelante, los «Servicios»), propiedad de Tesla Software Solutions (en adelante, la «Empresa») así como toda información, texto, gráficos, fotografías u otros materiales que se carguen o se muestren en los Servicios o se descarguen a través de estos (en adelante, colectivamente, el «Contenido»).  El mero acceso y/o utilización a los Servicios y el uso que usted haga de estos significa la plena aceptación y cumplimiento de los presentes Términos y Condiciones de Uso.

Tesla Software Solutions se reserva el derecho de actualizar sin previo aviso los presentes TCU en cualquier momento. La versión más actualizada de los TCU puede ser revisada dando clic en la sección “Términos y Condiciones de Uso” localizada en la página de internet http://www.escoolkardex.com.

 

2. Condiciones básicas.

El usuario es responsable del uso que haga de los Servicios, del Contenido que publique en los Servicios y de las consecuencias que se deriven de dicho uso o publicaciones.  Otros usuarios de los Servicios podrán ver el Contenido que el usuario envíe, publique o muestre.  Proporcione sólo contenido con el que se sienta cómodo de compartir con los demás de acuerdo con estos Términos y Condiciones.

El usuario deberá respetar en todo momento los presentes Términos y Condiciones de Uso del Software. De forma expresa el usuario manifiesta que utilizará el software de forma diligente y asumiendo cualquier responsabilidad que pudiera derivarse del incumplimiento de las normas.

 

3.- Condiciones de utilización del sitio web.

Los Servicios pueden contener servicios de correo electrónico, áreas de chat, noticias de grupo, foros, comunidades, calendarios, fotografías, archivo de expedientes y/o otros mensajes o comunicaciones diseñadas para la comunicación con terceros (Servicios de Comunicación). Usted acepta utilizar estos servicios únicamente para enviar, publicar y recibir mensajes y materiales que no contravienen las disposiciones legales.

Los Usuarios se obligan a hacer buen uso del sitio web y de sus contenidos, respetando la normativa nacional vigente, las buenas costumbres y el orden público, comprometiéndose en todo momento a no causar daños a ESCOOLKARDEX ni a ningún tercero. A tal efecto, el usuario se abstendrá de utilizar cualquiera de los servicios con fines o efectos ilícitos, prohibidos en los presentes Términos y Condiciones, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los servicios, funcionamiento de cualquier programa, documentos y toda clase de contenidos en y desde cualquier equipo informático o de telecomunicaciones.

Los Servicios no podrán usarse de ninguna manera tal que pudiera causar daño, deshabilitar o saturar cualquiera de los servidores de Tesla Software Solutions, la(s) red(es) conectada(s) a cualquier servidor de Tesla Software Solutions o interferir con el uso y goce de los Servicios a favor de otro usuario. El usuario no debe intentar tener acceso no autorizado a los Servicios, a otra cuenta, sistemas o redes conectadas a algún servidor de Tesla Software Solutions o a los Servicios a través del robo o violación de datos o programas.

Usted es responsable del material que usted mismo publique, por lo que deberá cumplir con las Leyes y reglamentos que en materia de Propiedad Industrial e Intelectual apliquen. Usted sacará en paz y a salvo a Tesla Software Solutions y a ESCOOLKARDEX de cualquier demanda, denuncia y/o reclamación que se presente en su contra por la publicación del material del que Usted es responsable.

Los Servicios se proporcionan para el uso exclusivo y específico plasmado en el Contrato de Licencia de Uso de Software; los usuarios no están autorizados a modificar, copiar, distribuir, transmitir, comunicar, ejecutar, reproducir, publicar, licenciar, crear obras derivadas de, transferir o vender ninguna información, software, producto o servicio obtenido o que se desprenda de los Servicios.

 

4.- Obligaciones de los Usuarios y Condiciones de acceso.

Solo puede tener acceso a los Servicios y utilizarlos con propósitos legítimos.  El usuario es el único responsable del conocimiento y cumplimiento de las leyes, normativas y reglamentos relativos al uso del Servicio.  El usuario se compromete a no:

Utilizar los Servicios o alentar conductas que puedan constituir la comisión de un delito o dar lugar a responsabilidad civil, o de otro modo incumplir cualquier legislación o normativa local, estatal, federal o internacional, incluido, a título enunciativo;
Subir, publicar, enviar por correo electrónico o transferir por otros medios contenido que sea ilegal, amenazante, difamatorio, hostil, vulgar, obsceno, pornográfico, profano, que invada la privacidad de otra persona o promueva el odio o la xenofobia o que sea censurable por el motivo que fuere;
Subir, publicar, enviar por correo electrónico o transferir por otros medios contenido para el que no tenga los derechos de transmisión;
Subir, publicar, enviar por correo electrónico o transmitir por otros medios contenido que infrinja patentes, marcas registradas, secretos comerciales, derechos de autor u otros derecho de propiedad de terceros;
Modificar, dañar o eliminar contenido u otras comunicaciones que no sean de su propiedad, o bien interferir en la capacidad de otros a acceder a los Servicios o utilizarlos;
Subir, publicar, enviar por correo electrónico o transmitir por otros medios publicidad, materiales promocionales u otras formas de abordar a los demás usuarios que no estén autorizadas, incluido, a título enunciativo, «notificaciones», «mensajes», «correo basura», «spam» o «mensajes en cadena»;
Interferir o interrumpir los Servicios, los servidores o las redes conectadas a los Servicios o desobedecer los requisitos, procedimientos, políticas o reglamentos de las redes conectadas a los Servicios, así como adaptar o de otro modo modificar, crear un producto derivado o descompilar, aplicar ingeniería inversa o de otro modo intentar obtener el código fuente de los Servicios (o de una parte de estos);
Reproducir, duplicar, copiar, usar, distribuir, vender, revender o explotar de la forma que fuere y con fines comerciales partes de ESCOOLKARDEX o sus canales o Servicios;
Perjudicar a menores de la forma que fuere;
Acosar u hostigar a otras personas o;
Recopilar o almacenar información personal sobre otros usuarios sin su consentimiento.
Nos reservamos el derecho a suprimir o rechazar la distribución del Contenido en los Servicios y de suspender o cancelar usuarios sin responsabilidad alguna para con usted, pero no tendremos la obligación de hacerlo.  Asimismo, nos reservamos el derecho a accesar, leer, preservar y revelar toda la información que consideremos necesaria para:

Cumplir con las leyes o reglamentos aplicables o atender a las solicitudes relativas a procedimientos judiciales o gubernamentales;
Hacer valer las condiciones, incluida la investigación de posibles violaciones de estas;
Detectar, prevenir o, según sea el caso, abordar problemas de fraude, de seguridad o técnicos;
Responder a solicitudes de asistencia de los usuarios o;
Proteger los derechos, la propiedad o la seguridad de ESCOOLKARDEX, los usuarios y terceros.
 

5.- Derechos de Autor.

El Software se pone a disposición para su uso exclusivamente para los usuarios de conformidad con lo estipulado en el Contrato de Licencia de Uso de Software. Cualquier reproducción o redistribución del Software fuera de lo establecido en dicho Contrato está expresamente prohibido por la Ley y es considerado como delito en los términos penales. Cualquier violación a los derechos autorales así como de los presentes Términos y Condiciones se perseguirá como delito ante las autoridades competentes. Sin limitación por lo anterior, queda expresamente prohibida su reproducción total o parcial a cualquier otro servidor o locación para su posterior reproducción o redistribución, su traducción, inclusión, transmisión, almacenamiento o acceso a través de medios analógicos, digitales o de cualquier otro sistema o tecnología creada, a menos que esté expresamente permitido por el contrato de licencia que acompañe dicho software.

Todos los contenidos, marcas, logos, dibujos, documentación, programas informáticos o cualquier otro elemento susceptible de protección por la legislación de Derechos de Autor o Propiedad Industrial, que sean accesibles en el software, corresponden exclusivamente a la Empresa o a sus legítimos titulares y quedan expresamente reservados todos los derechos sobre los mismos.

En cualquier caso, ESCOOLKARDEX se reserva todos los derechos sobre los contenidos, información, datos y servicios que ostente sobre los mismos. ESCOOLKARDEX no concede ninguna licencia o autorización de uso al usuario sobre sus contenidos, datos o servicios, distinta de la que expresamente se detalle en los presentes Términos y Condiciones de Uso o en el Contrato de Licencia de Uso de Software.

En caso de que se utilice cualquier información contenida en este sitio web para fines diferentes a los autorizados, o simplemente se utilice para fines distintos a los expresamente detallados en los presentes Términos y Condiciones de Uso se considerará esto como una vulneración a los Derechos de Autor y la Empresa ejercerá las acciones legales correspondientes a que haya lugar conforme a la Ley Federal de Derechos de Autor y Ley de Propiedad Industrial.

 

6.- Limitaciones de garantía y responsabilidad.

Este apartado establece los límites de responsabilidad de ESCOOLKARDEX y de sus sociedades, matriz, filiales, asociadas, sociedades vinculadas, directivos, consejeros, empleados, agentes, representantes, socios y licenciatarios (en adelante, colectivamente, las «Entidades de ESCOOLKARDEX»). El usuario es responsable del uso que haga de los Servicios o del Contenido y del acceso a estos.  Usted entiende y acepta que los Servicios se le proporcionan COMO ESTÁN Y SEGÚN DISPONIBILIDAD.

Intentamos mantener ESCOOLKARDEX en funcionamiento, sin errores y seguro, pero usted lo utiliza bajo su propia responsabilidad. Proporcionamos ESCOOLKARDEX tal cual, sin garantía alguna expresa o implícita, incluidas, entre otras, las garantías de comerciabilidad, adecuación a un fin particular y no incumplimiento. No garantizamos que ESCOOLKARDEX sea siempre seguro o esté libre de errores, ni que funcione siempre sin interrupciones, retrasos o imperfecciones. ESCOOLKARDEX no se responsabiliza de las acciones, el contenido, la información o los datos de terceros, y por la presente usted dispensa a la Empresa, nuestros directivos, empleados y agentes de cualquier demanda o daños, conocidos o desconocidos, derivados de cualquier demanda que tenga interpuesta contra tales, terceros o de algún modo relacionados con esta.

Las Entidades de ESCOOLKARDEX no ofrecen ninguna garantía y excluyen toda responsabilidad con respecto a:

La integridad, exactitud, disponibilidad, puntualidad, seguridad o fiabilidad de los Servicios o el Contenido,
Los daños ocasionados en su sistema informático, la pérdida de datos u otros daños que sean consecuencia del uso que usted haga de los Servicios o del Contenido o del acceso a estos, y
La supresión del Contenido y de otras comunicaciones mantenidas a través de los Servicios o la omisión de guardarlos o transferirlos.
Los consejos o las informaciones, verbales o por escrito, proporcionados por las Entidades de ESCOOLKARDEX o a través de los Servicios, no crearán ninguna garantía que no se ofrezca de manera expresa en el presente.

En la medida máxima permitida por la legislación aplicable, las Entidades de ESCOOLKARDEX no serán responsables por los daños indirectos, incidentales, cuantificables, emergentes o punitivos; pérdidas de beneficios o ingresos, directas o indirectas, o pérdidas de datos, uso, fondo de comercio u otras pérdidas intangibles, que sean consecuencia:

Del uso que usted haga de los Servicios o del acceso a estos por su parte, o de la imposibilidad de utilizar los servicios o acceder a estos,
De la conducta o el Contenido de terceros en los servicios, incluido, a título enunciativo, toda conducta difamatoria, ofensiva o ilícita de otros usuarios o terceros,
Del contenido obtenido a través de los Servicios, o
Del acceso, el uso o la modificación no autorizados de su contenido o de las transferencias que usted efectúe.
Las limitaciones que se establecen en este subapartado se aplican a toda teoría de responsabilidad, sea por garantía, contrato, ley, agravio (incluida negligencia) o según sea el caso, e independientemente de que se haya informado a las Entidades de ESCOOLKARDEX de la posibilidad de que se produzcan tales daños, incluso en el caso de que un recurso establecido en virtud del presente haya fallado en su propósito esencial.

En ningún caso la Empresa, ESCOOLKARDEX o sus proveedores pueden ser señalados responsables por cualquier daño especial, indirecto o cualquier otro tipo de daño que resulte de la pérdida de información por el uso o negligencia que surja por o en conexión con el uso o desempeño del Software, documentos o alguna falla al proveer los Servicios o información disponible en ellos.

 

7.- Legislación aplicable y jurisdicción competente.

En caso de controversia derivada de la interpretación o cumplimiento de los presentes Términos y Condiciones de Uso, de las Políticas de Privacidad o de cualquier otro documento relevante del software, el usuario está de acuerdo en que serán aplicables las Leyes Federales de los Estados Unidos Mexicanos y competentes los Tribunales del Estado de Morelos, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponderle en razón de su domicilio presente o futuro.

*Copyright ESCOOLKARDEX 2016, todos los derechos reservados. ESCOOLKARDEX, sus logotipos y slogans son propiedad de Tesla Software Solutions.
<br>
Fecha de entrada en vigor: 28 de Junio de 2016.
              </p>
            </section>

            <input type="checkbox" id="atyc">
            <label for="atyc" style="float: left;">Acepto los Términos y Condiciones</label>
            <a href="#" id="down-pdf"  class="btn der">Descargar PDF</a>
          </div>

          <div class="col s4">
            <a href="#" id="n_acept" disabled  class="btn der">Aceptar</a>
            <input type="checkbox" id="issuc">
            <label for="issuc" class="der" style="margin-right: 7px;">Agregar Sucursal</label>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
<script src="../assets/js/jquery.js?v=10.2.0.79"></script>
<script src="../assets/js/materialize.min.js?v=10.2.0.79"></script>
<script src="../assets/js/asgard.js?v=10.2.0.79"></script>
<script src="../assets/js/modulos/login.js?v=10.2.0.79"></script>
<!-- https://texttospeech.responsivevoice.org/v1/text:synthesize
<script src="../assets/js/responsivevoice.js?v=10.2.0.79"></script> -->
</body>
</html>
