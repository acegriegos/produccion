    <style>

        /* ============================================================
   MODAL
   ============================================================ */

.modal-solicitud {
    width: 85%;
    max-width: 1250px;
    height: 86%;
    max-height: 86%;

    padding: 0;

    border-radius: 14px;

    overflow: hidden;

    background: #f8f9fb;
}


/* ============================================================
   HEADER
   ============================================================ */

.solicitud-modal-header {
    height: 76px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 26px;

    background: #ffffff;

    border-bottom: 1px solid #e7e9ec;
}

.solicitud-modal-header h4 {
    margin: 3px 0;

    font-size: 20px;
    font-weight: 600;

    color: #252a30;
}

.solicitud-modal-header p {
    margin: 0;

    font-size: 11px;

    color: #8c929a;
}

.solicitud-modal-kicker {
    font-size: 9px;
    font-weight: 700;

    letter-spacing: 1.4px;

    color: #9aa0a7;
}


/* ============================================================
   BODY
   ============================================================ */

.solicitud-modal-body {
    display: grid;

    grid-template-columns: 30% 70%;

    height: calc(100% - 144px);

    min-height: 0;
}


/* ============================================================
   SIDEBAR
   ============================================================ */

.solicitud-sidebar {
    overflow-y: auto;

    padding: 22px 20px;

    background: #f5f6f8;

    border-right: 1px solid #e2e5e9;
}


.sidebar-section {
    margin-bottom: 28px;
}


.sidebar-section-title {
    display: flex;
    align-items: center;

    gap: 10px;

    margin-bottom: 18px;
}


.sidebar-section-title strong {
    display: block;

    font-size: 12px;
    font-weight: 600;

    color: #40464e;
}


.sidebar-section-title span:not(.solicitud-section-number) {
    display: block;

    margin-top: 2px;

    font-size: 10px;

    color: #959ba3;
}


.solicitud-section-number {
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    border-radius: 8px;

    background: #e9ebee;

    font-size: 10px;
    font-weight: 700;

    color: #68707a;
}


/* ============================================================
   INFO SOLICITUD
   ============================================================ */

.sidebar-info {
    padding-left: 40px;
}


.sidebar-info-item {
    margin-bottom: 12px;
}


.sidebar-info-item span {
    display: block;

    margin-bottom: 3px;

    font-size: 9px;
    text-transform: uppercase;

    letter-spacing: .5px;

    color: #9a9fa6;
}


.sidebar-info-item strong {
    display: block;

    font-size: 12px;
    font-weight: 600;

    color: #4a5058;
}


/* ============================================================
   TIMELINE
   ============================================================ */

.solicitud-timeline {
    position: relative;

    margin-left: 14px;
    padding-left: 25px;
}


.solicitud-timeline::before {
    content: "";

    position: absolute;

    top: 8px;
    bottom: 8px;
    left: 5px;

    width: 1px;

    background: #d8dce1;
}


.timeline-item {
    position: relative;

    display: flex;
    align-items: center;

    min-height: 48px;

    margin-bottom: 3px;

    cursor: pointer;
}


.timeline-dot {
    position: absolute;

    left: -25px;

    width: 11px;
    height: 11px;

    border-radius: 50%;

    background: #d1d5da;

    border: 2px solid #f5f6f8;

    box-shadow: 0 0 0 1px #d1d5da;

    z-index: 2;
}


.timeline-item.active .timeline-dot {
    background: #6f7780;

    box-shadow:
        0 0 0 1px #6f7780,
        0 0 0 4px rgba(111,119,128,.08);
}


.timeline-content {
    width: 100%;

    padding: 7px 10px;

    border-radius: 7px;

    transition: background .15s ease;
}


.timeline-item:hover .timeline-content {
    background: #eceef1;
}


.timeline-item.active .timeline-content {
    background: #ffffff;

    box-shadow:
        0 2px 7px rgba(30,40,50,.04);
}


.timeline-number {
    display: inline-block;

    margin-right: 5px;

    font-size: 9px;
    font-weight: 700;

    color: #a0a5ac;
}


.timeline-name {
    display: block;

    margin-top: 2px;

    font-size: 11px;
    font-weight: 600;

    color: #555c65;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.timeline-type {
    display: block;

    margin-top: 2px;

    font-size: 8px;
    font-weight: 700;

    letter-spacing: .6px;

    color: #9ba1a8;
}


/* ============================================================
   AGREGAR ETAPA
   ============================================================ */

.btn-agregar-etapa {
    width: calc(100% - 39px);

    margin-left: 39px;
    margin-top: 8px;

    height: 34px;

    border: 1px dashed #d2d6db;
    border-radius: 7px;

    background: transparent;

    color: #747b84;

    font-size: 10px;

    cursor: pointer;
}


.btn-agregar-etapa:hover {
    background: #eceef1;
}


.btn-agregar-etapa i {
    font-size: 16px;

    vertical-align: middle;

    margin-right: 4px;
}


/* ============================================================
   DETALLE
   ============================================================ */

.solicitud-detalle {
    min-width: 0;
    min-height: 0;

    overflow-y: auto;

    background: #ffffff;

    padding: 30px 38px;
}


.solicitud-detalle-contenido {
    max-width: 720px;

    margin: 0 auto;
}


/* ============================================================
   DETALLE HEADER
   ============================================================ */

.detalle-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    padding-bottom: 20px;

    border-bottom: 1px solid #edf0f2;
}


.detalle-kicker {
    display: block;

    margin-bottom: 4px;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 1px;

    color: #a0a5ac;
}


.detalle-header h5 {
    margin: 0;

    font-size: 19px;
    font-weight: 600;

    color: #30353b;
}


.detalle-header p {
    margin: 4px 0 0;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: .7px;

    color: #9298a0;
}


/* ============================================================
   FORM
   ============================================================ */

.detalle-form {
    padding: 25px 0 10px;
}


.detalle-form .input-field {
    margin-top: 0;
    margin-bottom: 22px;
}


/* ============================================================
   PARTICIPANTES
   ============================================================ */

.detalle-participantes {
    margin-top: 10px;

    padding-top: 20px;

    border-top: 1px solid #edf0f2;
}


.participantes-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 12px;
}


.participantes-header strong {
    display: block;

    font-size: 12px;
    font-weight: 600;

    color: #464c54;
}


.participantes-header span {
    display: block;

    margin-top: 3px;

    font-size: 10px;

    color: #979da5;
}


/* ============================================================
   USUARIOS
   ============================================================ */

.detalle-usuarios {
    border: 1px solid #e6e8eb;

    border-radius: 8px;

    overflow: hidden;
}


.detalle-usuario {
    display: flex;
    align-items: center;

    min-height: 54px;

    padding: 7px 11px;

    border-bottom: 1px solid #edf0f2;
}


.detalle-usuario:last-child {
    border-bottom: 0;
}


.detalle-usuario-avatar {
    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 10px;

    border-radius: 50%;

    background: #f0f2f4;

    color: #777e87;
}


.detalle-usuario-info {
    flex: 1;
}


.detalle-usuario-info strong {
    display: block;

    font-size: 11px;

    color: #50565e;
}


.detalle-usuario-info span {
    display: block;

    margin-top: 2px;

    font-size: 9px;

    color: #999fa6;
}


.detalle-usuario-orden {
    margin-right: 10px;

    font-size: 9px;

    color: #a0a5ac;
}


/* ============================================================
   VACÍO
   ============================================================ */

.solicitud-detalle-vacio {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    text-align: center;

    color: #9da3aa;
}


.solicitud-detalle-vacio i {
    font-size: 38px;

    margin-bottom: 12px;

    color: #c3c7cc;
}


.solicitud-detalle-vacio strong {
    font-size: 13px;

    color: #747b83;
}


.solicitud-detalle-vacio span {
    max-width: 300px;

    margin-top: 5px;

    font-size: 10px;

    line-height: 1.5;
}


/* ============================================================
   FOOTER
   ============================================================ */

.solicitud-modal-footer {
    height: 68px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: 8px;

    padding: 0 26px;

    background: #ffffff;

    border-top: 1px solid #e5e7ea;
}


.solicitud-modal-footer .btn,
.solicitud-modal-footer .btn-flat {
    height: 36px;

    line-height: 36px;

    padding: 0 15px;

    border-radius: 7px;

    font-size: 11px;

    text-transform: none;

    box-shadow: none;
}


/* ============================================================
   RESPONSIVE
   ============================================================ */

@media (max-width: 850px) {

    .modal-solicitud {
        width: 94%;
        height: 92%;
        max-height: 92%;
    }

    .solicitud-modal-body {
        grid-template-columns: 35% 65%;
    }

    .solicitud-detalle {
        padding: 25px;
    }

}


@media (max-width: 650px) {

    .modal-solicitud {
        width: 96%;
    }

    .solicitud-modal-body {
        grid-template-columns: 1fr;
    }

    .solicitud-sidebar {
        display: none;
    }

}

        body {
            background: #f7f8fa;
            color: #263238;
        }

        .workflow-container {
            padding: 20px;
        }

        /* HEADER */

        .workflow-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .workflow-title {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .workflow-title h5 {
            margin: 0;
            font-weight: 600;
        }

        .workflow-title span {
            color: #78909c;
            font-size: 13px;
        }

        .ws-status {
            display: flex;
            align-items: center;
            gap: 7px;
            font-size: 12px;
            color: #607d8b;
        }

        .ws-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #26a69a;
        }

        /* GRID */

        .workflow-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            align-items: start;
        }

        /* COLUMN */

        .workflow-column {
            background: #ffffff;
            border-radius: 12px;
            border: 1px solid #eceff1;
            overflow: hidden;
            box-shadow: 0 2px 7px rgba(0,0,0,.04);
        }

        /* COLUMN HEADER */

        .workflow-column-header {
            padding: 16px 17px 12px;
            border-bottom: 1px solid #eceff1;
        }

        .column-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .column-title-left {
            display: flex;
            align-items: center;
            gap: 9px;
        }

        .column-icon {
            width: 34px;
            height: 34px;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5f7;
            color: #546e7a;
        }

        .column-title h6 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
        }

        .column-count {
            background: #eceff1;
            border-radius: 20px;
            padding: 3px 9px;
            font-size: 11px;
            font-weight: 600;
            color: #546e7a;
        }

        .column-description {
            font-size: 12px;
            color: #90a4ae;
            margin-top: 4px;
        }

        /* ACTIONS */

        .column-actions {
            display: flex;
            gap: 7px;
            margin-top: 13px;
        }

        .column-actions .btn-small {
            height: 31px;
            line-height: 31px;
            font-size: 11px;
            border-radius: 6px;
            box-shadow: none;
            padding: 0 12px;
        }

        .btn-maintenance {
            background: #ffffff !important;
            color: #546e7a !important;
            border: 1px solid #cfd8dc;
        }

        /* CONTENT */

        .workflow-items {
            padding: 7px 10px 10px;
        }

        /* ITEM */

        .workflow-item {
            padding: 13px 8px;
            border-bottom: 1px solid #f1f3f4;
            cursor: pointer;
            transition: background .15s;
        }

        .workflow-item:last-child {
            border-bottom: none;
        }

        .workflow-item:hover {
            background: #fafbfc;
        }

        .item-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
        }

        .item-title {
            font-size: 13px;
            font-weight: 600;
            color: #37474f;
        }

        .item-description {
            font-size: 12px;
            color: #78909c;
            margin-top: 3px;
        }

        .item-user {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 9px;
            font-size: 11px;
            color: #607d8b;
        }

        .user-avatar {
            width: 23px;
            height: 23px;
            border-radius: 50%;
            background: #eceff1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            font-weight: 600;
            color: #546e7a;
        }

        .item-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 8px;
        }

        .item-date {
            font-size: 10px;
            color: #90a4ae;
        }

        /* BADGES */

        .status {
            font-size: 10px;
            border-radius: 20px;
            padding: 4px 8px;
            font-weight: 600;
        }

        .status-pending {
            background: #fff8e1;
            color: #f57c00;
        }

        .status-progress {
            background: #e3f2fd;
            color: #1976d2;
        }

        .status-critical {
            background: #ffebee;
            color: #d32f2f;
        }

        .status-normal {
            background: #e8f5e9;
            color: #388e3c;
        }

        /* PROGRESS */

        .progress-container {
            margin-top: 9px;
        }

        .progress {
            height: 5px;
            margin: 0;
            background: #eceff1;
            border-radius: 10px;
        }

        .progress .determinate {
            border-radius: 10px;
        }

        .progress-text {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #90a4ae;
            margin-top: 4px;
        }

        /* EMPTY */

        .workflow-empty {
            text-align: center;
            padding: 35px 15px;
            color: #b0bec5;
            font-size: 12px;
        }

        /* RESPONSIVE */

        @media (max-width: 1000px) {

            .workflow-grid {
                grid-template-columns: 1fr;
            }

        }

    </style>

</head>

<body>

<div class="workflow-container">

    <!-- HEADER -->

    <div class="workflow-header">

        <div class="workflow-title">

            <div>
                <h5>Workflow</h5>
                <span>Centro de control de Gerencia</span>
            </div>

        </div>

        <div class="ws-status">

            <span class="ws-dot"></span>

            Conectado

        </div>

    </div>


    <!-- GRID -->

    <div class="workflow-grid">


        <!-- ===================================================== -->
        <!-- SOLICITUDES -->
        <!-- ===================================================== -->

        <section class="workflow-column">

            <header class="workflow-column-header">

                <div class="column-title">

                    <div class="column-title-left">

                        <div class="column-icon">
                            ☷
                        </div>

                        <h6>Solicitudes</h6>

                    </div>

                    <span class="column-count">
                        8
                    </span>

                </div>

                <div class="column-description">
                    Solicitudes activas de todos los usuarios
                </div>


                <div class="column-actions">

                    <button
                        class="btn-small core_modal"
                        data-accion="1"
                        data-modal="modal-solicitud"
                        data-btn_close="0"
                        >

                        + Agregar

                    </button>

                    <button
                        class="btn-small btn-maintenance"
                        onclick="verSolicitudes()">

                        Ver solicitudes

                    </button>

                </div>

            </header>


            <div class="workflow-items">


                <!-- ITEM -->

                <article class="workflow-item"
                    onclick="abrirSolicitud(101)">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Compra de equipo
                            </div>

                            <div class="item-description">
                                Solicitud de compra para departamento administrativo
                            </div>

                        </div>

                        <span class="status status-pending">
                            Pendiente
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            JP
                        </div>

                        Juan Pérez

                    </div>


                    <div class="item-footer">

                        <span class="item-date">
                            Hace 10 minutos
                        </span>

                        <span>
                            #101
                        </span>

                    </div>

                </article>


                <!-- ITEM -->

                <article class="workflow-item"
                    onclick="abrirSolicitud(102)">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Autorización de descuento
                            </div>

                            <div class="item-description">
                                Descuento especial para cliente
                            </div>

                        </div>

                        <span class="status status-progress">
                            En proceso
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            ML
                        </div>

                        María López

                    </div>


                    <div class="item-footer">

                        <span class="item-date">
                            Hace 35 minutos
                        </span>

                        <span>
                            #102
                        </span>

                    </div>

                </article>


                <!-- ITEM -->

                <article class="workflow-item"
                    onclick="abrirSolicitud(103)">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Pago extraordinario
                            </div>

                            <div class="item-description">
                                Solicitud de aprobación de pago
                            </div>

                        </div>

                        <span class="status status-critical">
                            Urgente
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            CR
                        </div>

                        Carlos Rodríguez

                    </div>


                    <div class="item-footer">

                        <span class="item-date">
                            Hace 1 hora
                        </span>

                        <span>
                            #103
                        </span>

                    </div>

                </article>


            </div>

        </section>



        <!-- ===================================================== -->
        <!-- RESPONSABILIDADES -->
        <!-- ===================================================== -->

        <section class="workflow-column">

            <header class="workflow-column-header">

                <div class="column-title">

                    <div class="column-title-left">

                        <div class="column-icon">
                            ✓
                        </div>

                        <h6>Responsabilidades</h6>

                    </div>

                    <span class="column-count">
                        5
                    </span>

                </div>

                <div class="column-description">
                    Responsabilidades activas asignadas
                </div>


                <div class="column-actions">

                    <button
                        class="btn-small"
                        onclick="agregarResponsabilidad()">

                        + Agregar

                    </button>

                    <button
                        class="btn-small btn-maintenance"
                        onclick="verResponsabilidades()">

                        Ver responsabilidades

                    </button>

                </div>

            </header>


            <div class="workflow-items">


                <article class="workflow-item">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Revisar inventario semanal
                            </div>

                            <div class="item-description">
                                Validar existencias y productos críticos
                            </div>

                        </div>

                        <span class="status status-progress">
                            En proceso
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            CR
                        </div>

                        Carlos Rodríguez

                    </div>


                    <div class="progress-container">

                        <div class="progress">

                            <div
                                class="determinate"
                                style="width:65%">
                            </div>

                        </div>

                        <div class="progress-text">

                            <span>Progreso</span>

                            <span>65%</span>

                        </div>

                    </div>


                    <div class="item-footer">

                        <span class="item-date">
                            Vence mañana
                        </span>

                    </div>

                </article>


                <article class="workflow-item">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Seguimiento de clientes
                            </div>

                            <div class="item-description">
                                Contactar clientes pendientes
                            </div>

                        </div>

                        <span class="status status-progress">
                            En proceso
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            AM
                        </div>

                        Andrés Méndez

                    </div>


                    <div class="progress-container">

                        <div class="progress">

                            <div
                                class="determinate"
                                style="width:40%">
                            </div>

                        </div>

                        <div class="progress-text">

                            <span>Progreso</span>

                            <span>40%</span>

                        </div>

                    </div>

                </article>


                <article class="workflow-item">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Revisar proveedores
                            </div>

                            <div class="item-description">
                                Evaluación mensual de proveedores
                            </div>

                        </div>

                        <span class="status status-pending">
                            Pendiente
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            AL
                        </div>

                        Ana López

                    </div>

                </article>


            </div>

        </section>



        <!-- ===================================================== -->
        <!-- ALERTAS -->
        <!-- ===================================================== -->

        <section class="workflow-column">

            <header class="workflow-column-header">

                <div class="column-title">

                    <div class="column-title-left">

                        <div class="column-icon">
                            !
                        </div>

                        <h6>Alertas</h6>

                    </div>

                    <span class="column-count">
                        7
                    </span>

                </div>

                <div class="column-description">
                    Alertas activas generadas por el ERP
                </div>


                <div class="column-actions">

                    <button
                        class="btn-small"
                        onclick="agregarAlerta()">

                        + Agregar

                    </button>

                    <button
                        class="btn-small btn-maintenance"
                        onclick="verAlertas()">

                        Ver alertas

                    </button>

                </div>

            </header>


            <div class="workflow-items">


                <article class="workflow-item">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Inventario bajo mínimo
                            </div>

                            <div class="item-description">
                                12 productos requieren reposición
                            </div>

                        </div>

                        <span class="status status-critical">
                            Crítica
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            IN
                        </div>

                        Inventario

                    </div>


                    <div class="item-footer">

                        <span class="item-date">
                            Hace 5 minutos
                        </span>

                        <span>
                            Inventario
                        </span>

                    </div>

                </article>


                <article class="workflow-item">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Facturas vencidas
                            </div>

                            <div class="item-description">
                                8 cuentas presentan vencimiento
                            </div>

                        </div>

                        <span class="status status-critical">
                            Alta
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            CT
                        </div>

                        Cuentas

                    </div>


                    <div class="item-footer">

                        <span class="item-date">
                            Hace 20 minutos
                        </span>

                    </div>

                </article>


                <article class="workflow-item">

                    <div class="item-top">

                        <div>

                            <div class="item-title">
                                Producto sin CABYS
                            </div>

                            <div class="item-description">
                                3 productos requieren configuración
                            </div>

                        </div>

                        <span class="status status-pending">
                            Pendiente
                        </span>

                    </div>


                    <div class="item-user">

                        <div class="user-avatar">
                            PR
                        </div>

                        Productos

                    </div>


                    <div class="item-footer">

                        <span class="item-date">
                            Hace 1 hora
                        </span>

                    </div>

                </article>


            </div>

        </section>


    </div>

</div>


<div id="modal-solicitud" class="modal modal-solicitud">

    <!-- HEADER -->
    <div class="solicitud-modal-header">

        <div>
            <span class="solicitud-modal-kicker">
                WORKFLOW
            </span>

            <h4>Nueva solicitud</h4>

            <p>
                Configure la solicitud y su flujo de aprobación.
            </p>
        </div>

        <button type="button"
                class="solicitud-modal-close modal-close">

            <i class="material-icons">close</i>

        </button>

    </div>


    <!-- BODY -->
    <div class="solicitud-modal-body">

        <!-- =========================================
             COLUMNA IZQUIERDA
             ========================================= -->
        <aside class="solicitud-sidebar">


            <!-- INFORMACION -->
            <section class="sidebar-section">

                <div class="sidebar-section-title">

                    <span class="solicitud-section-number">
                        01
                    </span>

                    <div>
                        <strong>Información</strong>

                        <span>
                            Datos de la solicitud
                        </span>
                    </div>

                </div>


                <div class="sidebar-info">

                    <div class="sidebar-info-item">

                        <span>Solicitud</span>

                        <strong id="sidebar-solicitud-nombre">
                            Nueva solicitud
                        </strong>

                    </div>


                    <div class="sidebar-info-item">

                        <span>Tiempo estimado</span>

                        <strong>
                            <span id="sidebar-solicitud-minutos">
                                0
                            </span>
                            minutos
                        </strong>

                    </div>

                </div>

            </section>


            <!-- FLUJO -->
            <section class="sidebar-section sidebar-flujo">

                <div class="sidebar-section-title">

                    <span class="solicitud-section-number">
                        02
                    </span>

                    <div>
                        <strong>Flujo de aprobación</strong>

                        <span>
                            Etapas del proceso
                        </span>
                    </div>

                </div>


                <!-- LINEA DE ETAPAS -->
                <div id="solicitud-timeline"
                     class="solicitud-timeline">
                </div>


                <button type="button"
                        id="btn-agregar-flujo"
                        class="btn-agregar-etapa">

                    <i class="material-icons">
                        add
                    </i>

                    Agregar etapa

                </button>

            </section>

        </aside>


        <!-- =========================================
             COLUMNA DERECHA
             ========================================= -->
        <main class="solicitud-detalle">


            <div id="solicitud-detalle-vacio"
                 class="solicitud-detalle-vacio">

                <i class="material-icons">
                    account_tree
                </i>

                <strong>
                    Seleccione una etapa
                </strong>

                <span>
                    Seleccione una etapa del flujo para
                    configurar sus participantes.
                </span>

            </div>


            <div id="solicitud-detalle-contenido"
                 class="solicitud-detalle-contenido">

                <!-- HEADER ETAPA -->
                <div class="detalle-header">

                    <div>

                        <span class="detalle-kicker">
                            ETAPA <span id="detalle-numero">1</span>
                        </span>

                        <h5 id="detalle-titulo">
                            Aprobación inicial
                        </h5>

                        <p id="detalle-tipo">
                            APROBADOR
                        </p>

                    </div>


                    <button type="button"
                            id="btn-eliminar-etapa"
                            class="btn-icon">

                        <i class="material-icons">
                            delete_outline
                        </i>

                    </button>

                </div>


                <!-- CAMPOS -->
                <div class="detalle-form">

                    <div class="input-field">

                        <input type="text"
                               id="detalle-nombre"
                               maxlength="100">

                        <label for="detalle-nombre">
                            Nombre de la etapa
                        </label>

                    </div>


                    <div class="input-field">

                        <textarea id="detalle-comentario"
                                  class="materialize-textarea"
                                  maxlength="500"></textarea>

                        <label for="detalle-comentario">
                            Instrucción / comentario
                        </label>

                    </div>

                </div>


                <!-- PARTICIPANTES -->
                <div class="detalle-participantes">

                    <div class="participantes-header">

                        <div>

                            <strong>
                                Participantes
                            </strong>

                            <span>
                                Personas que intervienen
                                en esta etapa.
                            </span>

                        </div>


                        <button type="button"
                                id="btn-agregar-usuario"
                                class="btn-agregar-usuario">

                            <i class="material-icons">
                                person_add
                            </i>

                            Agregar persona

                        </button>

                    </div>


                    <div id="detalle-usuarios"
                         class="detalle-usuarios">
                    </div>


                    <div id="detalle-usuarios-vacio"
                         class="detalle-usuarios-vacio">

                        <i class="material-icons">
                            people_outline
                        </i>

                        <span>
                            No hay personas asignadas.
                        </span>

                    </div>

                </div>

            </div>

        </main>

    </div>


    <!-- FOOTER -->
    <div class="solicitud-modal-footer">

        <button type="button"
                class="modal-close btn-flat">

            Cancelar

        </button>


        <button type="button"
                id="btn-guardar-solicitud"
                class="btn">

            <i class="material-icons left">
                save
            </i>

            Crear solicitud

        </button>

    </div>

</div>


<!-- TEMPLATE FLUJO -->
<template id="template-flujo">

    <div class="flujo-card"
         data-flujo-id="">

        <!-- CABECERA -->
        <div class="flujo-card-header">

            <div class="flujo-step">

                <span class="flujo-step-number">
                    1
                </span>

                <div>

                    <span class="flujo-step-label">
                        ETAPA
                    </span>

                    <strong class="flujo-step-titulo">
                        Aprobación inicial
                    </strong>

                </div>

            </div>


            <div class="flujo-card-actions">

                <span class="flujo-tipo-badge">
                    APROBADOR
                </span>

                <button type="button"
                        class="btn-icon btn-eliminar-flujo"
                        title="Eliminar etapa">

                    <i class="mdi mdi-delete_outline"></i>

                </button>

            </div>

        </div>


        <!-- DATOS DEL FLUJO -->
        <div class="flujo-card-body">

            <div class="row">

                <div class="input-field col s12 m5">

                    <input type="text"
                           class="flujo-nombre"
                           maxlength="100">

                    <label>
                        Nombre de la etapa
                    </label>

                </div>


                <div class="input-field col s12 m7">

                    <input type="text"
                           class="flujo-comentario"
                           maxlength="500">

                    <label>
                        Instrucción / comentario
                    </label>

                </div>

            </div>


            <!-- USUARIOS -->
            <div class="flujo-usuarios-header">

                <div>

                    <strong>
                        Participantes
                    </strong>

                    <span class="flujo-usuarios-descripcion">
                        Personas que pueden intervenir en esta etapa.
                    </span>

                </div>


                <button type="button"
                        class="btn-small btn-agregar-usuario">

                    <i class="mdi mdi-person_add left"></i>
                    Agregar persona

                </button>

            </div>


            <div class="flujo-usuarios">

            </div>


            <div class="flujo-usuarios-vacio">

                <i class="mdi mdi-people_outline"></i>

                <span>
                    No hay personas asignadas.
                </span>

            </div>

        </div>

    </div>

</template>


<!-- TEMPLATE USUARIO -->
<template id="template-flujo-usuario">

    <div class="flujo-usuario"
         data-usuario-id="">

        <div class="flujo-usuario-avatar">
            <i class="mdi mdi-person"></i>
        </div>

        <div class="flujo-usuario-info">

            <strong class="flujo-usuario-nombre">
                Usuario
            </strong>

            <span class="flujo-usuario-puesto">
                Puesto / departamento
            </span>

        </div>


        <span class="flujo-usuario-orden">
            1
        </span>


        <button type="button"
                class="btn-icon btn-eliminar-usuario"
                title="Eliminar persona">

            <i class="mdi mdi-close"></i>

        </button>

    </div>

</template>

<script>

$(function () {

    const SolicitudModal = {

        modal: null,

        data: {

            solicitud: {
                id: 0,
                nombre: '',
                minutos: 120,
                idusuario: 1,
                idsucursal: 1,
                idtipo: 'MANUAL'
            },

            flujos: [

                {
                    id: 1,
                    nombre: 'Aprobación inicial',
                    comentario: 'Revisar la solicitud y aprobar o rechazar su ejecución.',
                    idflujo: 'APROBADOR',

                    usuarios: [

                        {
                            id: 1,
                            idusuario: 12,
                            nombre: 'Juan Pérez',
                            puesto: 'Gerente Administrativo',
                            orden: 1
                        },

                        {
                            id: 2,
                            idusuario: 18,
                            nombre: 'María Rodríguez',
                            puesto: 'Jefatura Administrativa',
                            orden: 2
                        }

                    ]
                },


                {
                    id: 2,
                    nombre: 'Preparar equipo',
                    comentario: 'Preparar el equipo solicitado y dejarlo listo para entrega.',
                    idflujo: 'RESPONSABLE',

                    usuarios: [

                        {
                            id: 3,
                            idusuario: 25,
                            nombre: 'Carlos López',
                            puesto: 'Soporte Técnico',
                            orden: 1
                        },

                        {
                            id: 4,
                            idusuario: 31,
                            nombre: 'Ana Mora',
                            puesto: 'Soporte Técnico',
                            orden: 2
                        }

                    ]
                },


                {
                    id: 3,
                    nombre: 'Entrega',
                    comentario: 'Entregar el equipo al usuario solicitante y registrar la entrega.',
                    idflujo: 'RESPONSABLE',

                    usuarios: [

                        {
                            id: 5,
                            idusuario: 41,
                            nombre: 'Pedro Sánchez',
                            puesto: 'Encargado de Activos',
                            orden: 1
                        }

                    ]
                },


                {
                    id: 4,
                    nombre: 'Validación final',
                    comentario: 'Confirmar que la solicitud fue realizada correctamente.',
                    idflujo: 'APROBADOR',

                    usuarios: [

                        {
                            id: 6,
                            idusuario: 12,
                            nombre: 'Juan Pérez',
                            puesto: 'Gerente Administrativo',
                            orden: 1
                        },

                        {
                            id: 7,
                            idusuario: 55,
                            nombre: 'Andrés Vargas',
                            puesto: 'Jefatura',
                            orden: 2
                        }

                    ]
                }

            ]

        },


        init() {

            this.eventos();

        },


        eventos() {

            $('#btn-agregar-flujo')
                .on('click', () => this.agregarFlujo());


            $('#btn-agregar-flujo-vacio')
                .on('click', () => this.agregarFlujo());


            $('#btn-guardar-solicitud')
                .on('click', () => this.guardar());


            $('#solicitud-flujos')

                .on('click', '.btn-eliminar-flujo', (e) => {

                    const card = $(e.currentTarget)
                        .closest('.flujo-card');

                    this.eliminarFlujo(
                        Number(card.attr('data-flujo-id'))
                    );

                })


                .on('click', '.btn-agregar-usuario', (e) => {

                    const card = $(e.currentTarget)
                        .closest('.flujo-card');

                    this.agregarUsuario(
                        Number(card.attr('data-flujo-id'))
                    );

                })


                .on('click', '.btn-eliminar-usuario', (e) => {

                    const usuario = $(e.currentTarget)
                        .closest('.flujo-usuario');

                    const card = usuario
                        .closest('.flujo-card');


                    this.eliminarUsuario(

                        Number(card.attr('data-flujo-id')),

                        Number(usuario.attr('data-usuario-id'))

                    );

                })


                .on('input', '.flujo-nombre', (e) => {

                    const card = $(e.currentTarget)
                        .closest('.flujo-card');

                    const flujo = this.obtenerFlujo(
                        Number(card.attr('data-flujo-id'))
                    );

                    if (flujo) {
                        flujo.nombre = e.currentTarget.value;
                    }

                })


                .on('input', '.flujo-comentario', (e) => {

                    const card = $(e.currentTarget)
                        .closest('.flujo-card');

                    const flujo = this.obtenerFlujo(
                        Number(card.attr('data-flujo-id'))
                    );

                    if (flujo) {
                        flujo.comentario = e.currentTarget.value;
                    }

                });

        },


        abrir() {

            this.render();

            this.modal.open();

        },


        render() {

            const solicitud = this.data.solicitud;

            $('#solicitud-nombre')
                .val(solicitud.nombre);

            $('#solicitud-minutos')
                .val(solicitud.minutos);


            $('#solicitud-nombre')
                .next('label')
                .addClass('active');


            $('#solicitud-minutos')
                .next('label')
                .addClass('active');


            this.renderFlujos();

        },


        renderFlujos() {

            const contenedor = $('#solicitud-flujos');

            contenedor.empty();


            if (!this.data.flujos.length) {

                $('#solicitud-flujos-vacio')
                    .show();

                return;

            }


            $('#solicitud-flujos-vacio')
                .hide();


            this.data.flujos.forEach((flujo, index) => {

                this.renderFlujo(
                    flujo,
                    index
                );

            });

        },


        renderFlujo(flujo, index) {

            const template =
                document.getElementById('template-flujo');


            const card =
                template.content
                    .cloneNode(true);


            const elemento =
                $(card)
                    .find('.flujo-card');


            elemento.attr(
                'data-flujo-id',
                flujo.id
            );


            elemento.find('.flujo-step-number')
                .text(index + 1);


            elemento.find('.flujo-step-titulo')
                .text(flujo.nombre);


            elemento.find('.flujo-tipo-badge')
                .text(flujo.idflujo);


            elemento.find('.flujo-nombre')
                .val(flujo.nombre);


            elemento.find('.flujo-comentario')
                .val(flujo.comentario);


            elemento.find('.flujo-nombre')
                .next('label')
                .addClass('active');


            elemento.find('.flujo-comentario')
                .next('label')
                .addClass('active');


            /*
             * Actualizamos el título mientras escribe.
             */
            elemento.find('.flujo-nombre')
                .on('input', function () {

                    elemento.find('.flujo-step-titulo')
                        .text(
                            this.value || 'Nueva etapa'
                        );

                });


            /*
             * Render usuarios
             */
            const usuarios =
                elemento.find('.flujo-usuarios');


            flujo.usuarios.forEach(usuario => {

                this.renderUsuario(
                    usuarios,
                    usuario
                );

            });


            this.actualizarEstadoUsuarios(elemento);


            $('#solicitud-flujos')
                .append(elemento);


            M.updateTextFields();

        },


        renderUsuario(contenedor, usuario) {

            const template =
                document.getElementById(
                    'template-flujo-usuario'
                );


            const elemento =
                $(template.content.cloneNode(true))
                    .find('.flujo-usuario');


            elemento.attr(
                'data-usuario-id',
                usuario.id
            );


            elemento.find('.flujo-usuario-nombre')
                .text(usuario.nombre);


            elemento.find('.flujo-usuario-puesto')
                .text(usuario.puesto);


            elemento.find('.flujo-usuario-orden')
                .text(usuario.orden);


            contenedor.append(elemento);

        },


        actualizarEstadoUsuarios(card) {

            const cantidad =
                card.find('.flujo-usuario').length;


            if (cantidad) {

                card.find('.flujo-usuarios-vacio')
                    .hide();

            } else {

                card.find('.flujo-usuarios-vacio')
                    .show();

            }

        },


        agregarFlujo() {

            const id =
                this.nuevoIdFlujo();


            const posicion =
                this.data.flujos.length;


            /*
             * La primera y última etapa
             * son APROBADORES.
             *
             * Las intermedias son RESPONSABLES.
             */
            let tipo = 'RESPONSABLE';


            if (posicion === 0) {
                tipo = 'APROBADOR';
            }


            this.data.flujos.push({

                id: id,

                nombre:
                    tipo === 'APROBADOR'
                        ? 'Nueva aprobación'
                        : 'Nueva responsabilidad',

                comentario: '',

                idflujo: tipo,

                usuarios: []

            });


            /*
             * Si acabamos de agregar una etapa
             * después de la validación final,
             * la anterior deja de ser la última.
             */
            this.recalcularTipos();


            this.renderFlujos();


            /*
             * Scroll hasta la nueva etapa.
             */
            setTimeout(() => {

                const cards =
                    $('#solicitud-flujos .flujo-card');

                const ultima =
                    cards.last();

                if (ultima.length) {

                    ultima[0]
                        .scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });

                }

            }, 100);

        },


        eliminarFlujo(id) {

            const index =
                this.data.flujos.findIndex(
                    f => f.id === id
                );


            if (index === -1) {
                return;
            }


            this.data.flujos.splice(
                index,
                1
            );


            this.recalcularTipos();

            this.renderFlujos();

        },


        recalcularTipos() {

            const total =
                this.data.flujos.length;


            this.data.flujos.forEach(
                (flujo, index) => {

                    if (
                        index === 0 ||
                        index === total - 1
                    ) {

                        flujo.idflujo =
                            'APROBADOR';

                    } else {

                        flujo.idflujo =
                            'RESPONSABLE';

                    }

                }
            );

        },


        agregarUsuario(idFlujo) {

            const flujo =
                this.obtenerFlujo(idFlujo);


            if (!flujo) {
                return;
            }


            /*
             * DUMP
             *
             * Más adelante esto será:
             *
             * asgard.fetch({
             *     fn: 'workflow.usuarios',
             *     ...
             * })
             */
            const usuariosDisponibles = [

                {
                    idusuario: 70,
                    nombre: 'Laura Gómez',
                    puesto: 'Administración'
                },

                {
                    idusuario: 71,
                    nombre: 'Roberto Castro',
                    puesto: 'Recursos Humanos'
                },

                {
                    idusuario: 72,
                    nombre: 'Daniel Mora',
                    puesto: 'Tecnología'
                }

            ];


            const usuario =
                usuariosDisponibles[
                    Math.floor(
                        Math.random() *
                        usuariosDisponibles.length
                    )
                ];


            if (!usuario) {
                return;
            }


            /*
             * Evitar duplicados dentro
             * de la misma etapa.
             */
            const existe =
                flujo.usuarios.some(
                    u =>
                        u.idusuario ===
                        usuario.idusuario
                );


            if (existe) {

                Materialize.toas('La persona ya está asignada a esta etapa',4000,'red');

                return;

            }


            flujo.usuarios.push({

                id:
                    this.nuevoIdUsuario(),

                idusuario:
                    usuario.idusuario,

                nombre:
                    usuario.nombre,

                puesto:
                    usuario.puesto,

                orden:
                    flujo.usuarios.length + 1

            });


            this.renderFlujos();

        },


        eliminarUsuario(
            idFlujo,
            idUsuario
        ) {

            const flujo =
                this.obtenerFlujo(idFlujo);


            if (!flujo) {
                return;
            }


            const index =
                flujo.usuarios.findIndex(
                    u => u.id === idUsuario
                );


            if (index === -1) {
                return;
            }


            flujo.usuarios.splice(
                index,
                1
            );


            /*
             * Reordenar
             */
            flujo.usuarios.forEach(
                (usuario, index) => {

                    usuario.orden =
                        index + 1;

                }
            );


            this.renderFlujos();

        },


        obtenerFlujo(id) {

            return this.data.flujos.find(
                flujo =>
                    flujo.id === id
            );

        },


        nuevoIdFlujo() {

            return Date.now();

        },


        nuevoIdUsuario() {

            return Date.now() +
                Math.floor(
                    Math.random() * 1000
                );

        },


        guardar() {

            /*
             * Capturamos los datos generales.
             */
            this.data.solicitud.nombre =
                $('#solicitud-nombre')
                    .val()
                    .trim();


            this.data.solicitud.minutos =
                Number(
                    $('#solicitud-minutos')
                        .val()
                );


            /*
             * VALIDACIONES
             */
            if (!this.data.solicitud.nombre) {

                Materialize.toast('Debe indicar el nombre de la solicitud.',4000,'red');

                return;

            }


            if (
                !this.data.solicitud.minutos ||
                this.data.solicitud.minutos <= 0
            ) {

                Materialize.toast('Indique un tiempo estimado válido.',4000,'red');

                return;

            }


            if (!this.data.flujos.length) {

                Materialize.toast({
                    html:
                        'Debe configurar al menos una etapa.'
                });

                return;

            }


            /*
             * Primera etapa
             */
            if (
                this.data.flujos[0].idflujo !==
                'APROBADOR'
            ) {

                M.toast('La primera etapa debe ser de aprobación.',4000,'red');

                return;

            }


            /*
             * Última etapa
             */
            const ultima =
                this.data.flujos[
                    this.data.flujos.length - 1
                ];


            if (
                ultima.idflujo !==
                'APROBADOR'
            ) {

                Materialize.toast('La última etapa debe ser de aprobación.',4000,'red');

                return;

            }


            /*
             * Validar participantes
             */
            for (
                const flujo of this.data.flujos
            ) {

                if (!flujo.usuarios.length) {

                    Materialize.toast(`La etapa "${flujo.nombre}" no tiene participantes.`,4000,'red');

                    return;

                }

            }


            /*
             * DUMP FINAL
             *
             * Esto es exactamente lo que
             * posteriormente podemos enviar
             * al backend.
             */
            console.log(
                'SOLICITUD A GUARDAR:',
                structuredClone(
                    this.data
                )
            );


            Materialize.toast('Solicitud lista para guardar.',4000,'green');


            /*
             * Por ahora NO cerramos el modal.
             * Así podemos inspeccionar el dump.
             */

        }

    };


    SolicitudModal.init();


    /*
     * Exponer temporalmente para pruebas.
     */
    window.SolicitudModal =
        SolicitudModal;


});

    function agregarSolicitud() {

        console.log('Agregar solicitud');

    }


    function verSolicitudes() {

        console.log('Mantenimiento de solicitudes');

    }


    function abrirSolicitud(id) {

        console.log('Abrir solicitud:', id);

    }


    function agregarResponsabilidad() {

        console.log('Agregar responsabilidad');

    }


    function verResponsabilidades() {

        console.log('Mantenimiento de responsabilidades');

    }


    function agregarAlerta() {

        console.log('Agregar alerta');

    }


    function verAlertas() {

        console.log('Mantenimiento de alertas');

    }

</script>