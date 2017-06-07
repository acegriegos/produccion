<table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-productos" cellspacing="0" width="100%" >
    <thead>
        <tr>
            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">N° Factura</th>
            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Tipo Factura</th>
            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Fecha</th>
            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Cliente</th>
            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Total</th>
            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Comentario</th>
            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Acciones</th>
        </tr>
    </thead>
    <tbody id="listafacturas">
        <td style="width: 10%"><?php echo $obj[1]; ?></td>
        <td style="width: 10%"><?php echo $obj[2]; ?></td>
        <td style="width: 10%"><?php echo $obj[3]; ?></td>
        <td style="width: 10%"><?php echo $obj[4]; ?></td>
        <td style="width: 10%"><?php echo $obj[5]; ?></td>
        <td style="width: 10%"><?php echo $obj[6]; ?></td>
        <td style="width: 10%">
            <a class="btn-color pbtn material-icons" id="a<?php echo $obj[0]; ?>" title="">close</a>
            <a class="btn-color pbtn material-icons" id="b<?php echo $obj[0]; ?>" title="">close</a>
            <a class="btn-color pbtn material-icons" id="c<?php echo $obj[0]; ?>" title="">close</a>
            <a class="btn-color pbtn material-icons" id="d<?php echo $obj[0]; ?>" title="">close</a>
        </td>
    </tbody>
</table>