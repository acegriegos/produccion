<?php /* Smarty version 2.6.17, created on 2016-06-27 11:22:03
         compiled from ajax/ajaxmantPaquetes.tpl */ ?>
<div id="mantPaquetes">
<h2 align="center">Mantenimiento Paquetes</h2>
<hr>
    <div class="row">
        <div class="col-md-6 col-lg-6">
            <button type="button" class="btn btn-primary">Buscar</button>            
        </div>
        <div class="col-md-6 col-lg-6">
            <button type="button" id="ingInvServ" class="btn btn-primary der" data-toggle="modal" href="#modal-paquetes" style="margin-right: 15px;">Agregar</button>
        </div>
    </div><br><br>

<div style="overflow:hidden;">
    <div class="form-group">
        <div class="row">
            <div class="col-md-8">
                <div id="datetimepicker12"></div>
            </div>
        </div>
    </div>
   
</div>

<div class="row">
  <div class="col-lg-6">
    <div class="input-group">
      <div class="input-group-btn">
        <button type="button" class="btn btn-secondary">Action</button>
        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div role="separator" class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </div>
      <input type="text" class="form-control" aria-label="Text input with segmented button dropdown">
    </div>
  </div>
  <div class="col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control" aria-label="Text input with segmented button dropdown">
      <div class="input-group-btn">
        <button type="button" class="btn btn-secondary">Action</button>
        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div role="separator" class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </div>
    </div>
  </div>
</div>
    
</div> <!-- End mantPaquetes -->

<script src="../assets/js/alertModal.js"></script>
 <?php echo '
    <script type="text/javascript">
        $(function () {
            $(\'#datetimepicker12\').datetimepicker({
                inline: true,
                sideBySide: true
            });
        });
    </script>
    '; ?>