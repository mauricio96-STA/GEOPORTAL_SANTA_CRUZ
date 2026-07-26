/* ============================================
   GEOPORTAL SANTA CRUZ - Aplicación Principal
   ============================================ */

// --- Supabase Config ---
const SUPABASE_URL = '{{SUPABASE_URL}}';
const SUPABASE_KEY = '{{SUPABASE_KEY}}';
const REST = SUPABASE_URL + '/rest/v1';

// --- Capas Config ---
const LAYERS_CONFIG = [
    {
        name: 'Zona Urbana',
        table: 'zona urbana - santa cruz',
        geomField: 'geom',
        geomType: 'MULTIPOLYGON',
        color: '#7b1fa2',
        icon: 'fa-city',
        description: 'Límite de la zona urbana',
        popupFields: {
            'nombre': 'Nombre',
            'bloque': 'Bloque',
            'piso': 'Piso',
            'departamen': 'Departamento',
            'claves': 'Claves',
            'observacio': 'Observaciones',
            'estado': 'Estado',
            'tipo_catas': 'Tipo Catastral',
            'area': 'Área (m²)'
        }
    },
    {
        name: 'Límite Urbano',
        table: 'limite urbano',
        geomField: 'geom',
        geomType: 'MULTILINESTRING',
        color: '#1565c0',
        icon: 'fa-bezier-curve',
        description: 'Límite urbano del cantón',
        popupFields: {
            'layer': 'Capa',
            'text': 'Texto',
            'entityhand': 'Tipo Entidad',
            'linetype': 'Tipo Línea'
        }
    },
    {
        name: 'Manzanas',
        table: 'manzanas zona urbana - santa cruz',
        geomField: 'geom',
        geomType: 'MULTIPOLYGON',
        color: '#2e7d32',
        icon: 'fa-th-large',
        description: 'Manzanas de la zona urbana',
        popupFields: {
            'clave_cata': 'Clave Catastral',
            'nombre': 'Nombre',
            'codigo_man': 'Código Manzana',
            'tipo_catas': 'Tipo Catastral',
            'shape_area': 'Área (m²)',
            'shape_leng': 'Perímetro (m)',
            'codigo_pro': 'Código Provincia',
            'codigo_can': 'Código Cantón',
            'codigo_par': 'Código Parroquia'
        }
    },
    {
        name: 'Vías',
        table: 'vias - santa cruz',
        geomField: 'geom',
        geomType: 'MULTIPOLYGON',
        color: '#e65100',
        icon: 'fa-road',
        description: 'Vías del cantón',
        popupFields: {
            'nombre': 'Nombre',
            'estado': 'Estado',
            'area': 'Área (m²)',
            'observacio': 'Observaciones',
            'tipo_catas': 'Tipo Catastral',
            'departamen': 'Departamento',
            'bloque': 'Bloque',
            'piso': 'Piso',
            'claves': 'Claves'
        }
    },
    {
        name: 'Bloques Constructivos',
        table: 'bloques constructivos - santa cruz',
        geomField: 'geom',
        geomType: 'MULTIPOLYGON',
        color: '#c62828',
        icon: 'fa-building',
        description: 'Bloques constructivos',
        popupFields: {
            'claves': 'Claves',
            'num_bloque': 'N° Bloque',
            'num_piso': 'N° Pisos',
            'observacio': 'Observaciones',
            'tipo_catas': 'Tipo Catastral',
            'gid_catast': 'ID Catastral'
        }
    },
    {
        name: 'Reportes Ciudadanos',
        table: 'reportes_ciudadanos',
        geomField: 'geom',
        geomType: 'POINT',
        color: '#ff6f00',
        icon: 'fa-exclamation-circle',
        description: 'Reportes de problemas de ciudadanos',
        isReports: true,
        popupFields: {
            'tipo_problema': 'Tipo de Problema',
            'descripcion': 'Descripción',
            'autor': 'Reportado por',
            'telefono': 'Teléfono',
            'fecha_reporte': 'Fecha',
            'estado': 'Estado'
        }
    }
];

// Fields to always exclude from popups
const EXCLUDE_FIELDS = [
    'geom','geometry','geojson','gid','__gid','id','gid_catast',
    'codigo_pro','codigo_can','codigo_par','codigo_zon','codigo_sec',
    'codigo_man','codigo_m_1','clacat','codigo_pre','paperspace',
    'subclasses','linetype','entityhand','area','área'
];

// Colores por tipo de problema
const REPORT_COLORS = {
    'Alumbrado Público':   '#f9a825',
    'Baches':              '#5d4037',
    'Limpieza':            '#00897b',
    'Inundaciones':        '#1565c0',
    'Basura':              '#6d4c41',
    'Parques y Jardines':  '#2e7d32',
    'Señalización':        '#6a1b9a',
    'Agua Potable':        '#0288d1',
    'Alcantarillado':      '#4e342e',
    'Vialidad':            '#37474f',
    'Seguridad':           '#c62828',
    'Árbol Caído':         '#33691e',
    'Otro':                '#757575'
};

// --- Tipos de Problema (para el modal) ---
const TIPOS_PROBLEMA = [
    { id: 'Alumbrado Público',   icon: 'fa-lightbulb',  color: '#f9a825' },
    { id: 'Baches',              icon: 'fa-road',       color: '#5d4037' },
    { id: 'Limpieza',            icon: 'fa-broom',      color: '#00897b' },
    { id: 'Inundaciones',        icon: 'fa-water',      color: '#1565c0' },
    { id: 'Basura',              icon: 'fa-trash',      color: '#6d4c41' },
    { id: 'Parques y Jardines',  icon: 'fa-tree',       color: '#2e7d32' },
    { id: 'Señalización',        icon: 'fa-sign',       color: '#6a1b9a' },
    { id: 'Agua Potable',        icon: 'fa-tint',       color: '#0288d1' },
    { id: 'Alcantarillado',      icon: 'fa-water',      color: '#4e342e' },
    { id: 'Vialidad',            icon: 'fa-car',        color: '#37474f' },
    { id: 'Seguridad',           icon: 'fa-shield-alt', color: '#c62828' },
    { id: 'Árbol Caído',         icon: 'fa-tree',       color: '#33691e' },
    { id: 'Otro',                icon: 'fa-ellipsis-h', color: '#757575' }
];

// --- Map Init ---
const map = L.map('map', {
    center: [-1.73, -79.03],
    zoom: 14,
    zoomControl: false
});

L.control.zoom({ position: 'topright' }).addTo(map);

// --- Measurement Tool ---
let measureMode = null;
let measurePoints = [];
let measureLayer = null;
let measureTooltip = null;

function startMeasure(type) {
    cancelMeasure();
    measureMode = type;
    measurePoints = [];

    document.getElementById('btn_distance').classList.toggle('active', type === 'distance');
    document.getElementById('btn_area').classList.toggle('active', type === 'area');
    document.getElementById('btn_cancel_measure').style.display = 'flex';

    map.getContainer().style.cursor = 'crosshair';
    map.on('click', onMeasureClick);
    map.on('dblclick', onMeasureDblClick);
    map.doubleClickZoom.disable();

    showToast(type === 'distance' ? 'Modo distancia activo: clic para agregar puntos, doble clic para finalizar' : 'Modo área activo: clic para agregar puntos, doble clic para finalizar', 'info');
}

function cancelMeasure() {
    measureMode = null;
    measurePoints = [];

    document.getElementById('btn_distance').classList.remove('active');
    document.getElementById('btn_area').classList.remove('active');
    document.getElementById('btn_cancel_measure').style.display = 'none';

    map.getContainer().style.cursor = '';
    map.off('click', onMeasureClick);
    map.off('dblclick', onMeasureDblClick);
    map.doubleClickZoom.enable();

    if (measureLayer) { map.removeLayer(measureLayer); measureLayer = null; }
    if (measureTooltip) { measureTooltip.remove(); measureTooltip = null; }
}

function onMeasureClick(e) {
    measurePoints.push(e.latlng);

    if (measureLayer) map.removeLayer(measureLayer);

    if (measureMode === 'distance') {
        measureLayer = L.polyline(measurePoints, {
            color: '#667eea', weight: 3, dashArray: '8 6',
            className: 'measure-line'
        }).addTo(map);
    } else {
        if (measurePoints.length >= 3) {
            measureLayer = L.polygon(measurePoints, {
                color: '#764ba2', weight: 2, fillColor: '#764ba2',
                fillOpacity: 0.15, dashArray: '6 4'
            }).addTo(map);
        } else {
            measureLayer = L.polyline(measurePoints, {
                color: '#764ba2', weight: 2, dashArray: '8 6'
            }).addTo(map);
        }
    }

    updateMeasureTooltip();
}

function onMeasureDblClick(e) {
    L.DomEvent.stop(e);
    if (measurePoints.length < 2) return;

    const result = calculateMeasure();

    if (measureTooltip) measureTooltip.remove();

    const popupContent = measureMode === 'distance'
        ? `<div style="font-weight:700;font-size:13px;color:#667eea;">${result.text}</div>`
        : `<div style="font-weight:700;font-size:13px;color:#764ba2;">${result.text}</div>`;

    const lastPoint = measurePoints[measurePoints.length - 1];
    measureTooltip = L.popup({ closeButton: true, className: 'measure-result-popup', offset: [0, -10] })
        .setLatLng(lastPoint)
        .setContent(popupContent)
        .openOn(map);

    map.off('click', onMeasureClick);
    map.off('dblclick', onMeasureDblClick);
    map.getContainer().style.cursor = '';
    map.doubleClickZoom.enable();

    document.getElementById('btn_distance').classList.remove('active');
    document.getElementById('btn_area').classList.remove('active');
    document.getElementById('btn_cancel_measure').style.display = 'none';
    measureMode = null;
}

function updateMeasureTooltip() {
    if (measurePoints.length < 1) return;

    const result = calculateMeasure();
    const lastPoint = measurePoints[measurePoints.length - 1];

    if (measureTooltip) measureTooltip.remove();

    const content = measurePoints.length === 1
        ? '<span style="opacity:0.7;">Click para agregar más puntos</span>'
        : `<span>${result.text}</span>`;

    measureTooltip = L.tooltip({
        permanent: true, direction: 'top', offset: [0, -12],
        className: 'measure-tooltip'
    }).setLatLng(lastPoint).setContent(content).addTo(map);
}

function calculateMeasure() {
    if (measureMode === 'distance') {
        let total = 0;
        for (let i = 1; i < measurePoints.length; i++) {
            total += measurePoints[i - 1].distanceTo(measurePoints[i]);
        }
        return { length: total, text: formatDistance(total) };
    } else {
        let length = 0;
        for (let i = 1; i < measurePoints.length; i++) {
            length += measurePoints[i - 1].distanceTo(measurePoints[i]);
        }
        const area = calculatePolygonArea();
        return { length, area, text: formatArea(area) };
    }
}

function calculatePolygonArea() {
    if (measurePoints.length < 3) return 0;
    let area = 0;
    const n = measurePoints.length;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += measurePoints[i].lng * measurePoints[j].lat;
        area -= measurePoints[j].lng * measurePoints[i].lat;
    }
    return Math.abs(area / 2) * 111319.9 * 111319.9 * Math.cos(measurePoints[0].lat * Math.PI / 180);
}

function formatDistance(m) {
    if (m < 1000) return m.toFixed(1) + ' m';
    return (m / 1000).toFixed(2) + ' km';
}

function formatArea(m2) {
    if (m2 < 10000) return m2.toFixed(1) + ' m²';
    return (m2 / 10000).toFixed(2) + ' ha';
}

function showToast(msg, type) {
    let toast = document.getElementById('measure_toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'measure_toast';
        toast.style.cssText = `
            position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
            background:linear-gradient(135deg,#0f0c29,#302b63);color:white;
            padding:10px 20px;border-radius:8px;font-size:12px;font-weight:600;
            box-shadow:0 4px 16px rgba(0,0,0,0.3);z-index:10001;
            transition:opacity .3s;display:flex;align-items:center;gap:8px;
        `;
        document.body.appendChild(toast);
    }
    const icon = type === 'info' ? 'fa-ruler' : 'fa-check-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
    toast.style.opacity = '1';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => { toast.style.opacity = '0'; }, 4000);
}

// --- Basemaps ---
const basemapOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
});

const basemapSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 18
});

basemapOSM.addTo(map);

let currentBasemap = 'osm';

function switchBasemap(type) {
    if (type === currentBasemap) return;

    if (currentBasemap === 'osm') {
        map.removeLayer(basemapOSM);
    } else {
        map.removeLayer(basemapSatellite);
    }

    if (type === 'osm') {
        basemapOSM.addTo(map);
    } else {
        basemapSatellite.addTo(map);
    }

    currentBasemap = type;

    document.querySelectorAll('.basemap-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });
}

// --- State ---
let layersData = {};
let totalFeatures = 0;

// --- Popup Builder ---
function buildPopupHTML(cfg, props) {
    const fields = cfg.popupFields || {};
    const keys = Object.keys(fields);

    let rows = '';
    let hasData = false;

    keys.forEach(k => {
        const v = props[k];
        if (v !== null && v !== '' && v !== undefined && String(v).trim() !== '') {
            hasData = true;
            rows += `<tr><td class="popup-label">${fields[k]}</td><td class="popup-value">${v}</td></tr>`;
        }
    });

    if (!hasData) {
        rows = '<tr><td colspan="2" class="popup-empty">Sin atributos disponibles</td></tr>';
    }

    return `
        <div class="popup-card">
            <div class="popup-header" style="background:${cfg.color}">
                <i class="fas ${cfg.icon || 'fa-map-pin'}"></i>
                ${cfg.name}
            </div>
            <div class="popup-body">
                <table class="popup-table">${rows}</table>
            </div>
        </div>`;
}

// --- Panel Toggle ---
function togglePanel() {
    document.getElementById('side_panel').classList.toggle('collapsed');
}

// --- Sidebar ---
function buildSidebar() {
    const container = document.getElementById('layers_list');
    container.innerHTML = LAYERS_CONFIG.map((cfg, i) => `
        <div class="panel-layer" data-name="${cfg.name.toLowerCase()}">
            <div class="layer-bar" style="background:${cfg.color}"></div>
            <div class="layer-data">
                <div class="layer-title">
                    <i class="fas ${cfg.icon || 'fa-layer-group'}" style="color:${cfg.color}"></i>
                    ${cfg.name}
                </div>
                <div class="layer-sub">${cfg.description}</div>
            </div>
            <div class="layer-toggle active" id="toggle_${i}" onclick="toggleLayer(${i})"></div>
        </div>
    `).join('');
}

function toggleLayer(idx) {
    const toggle = document.getElementById('toggle_' + idx);
    const isActive = toggle.classList.contains('active');

    if (isActive) {
        toggle.classList.remove('active');
        if (layersData[idx]) map.removeLayer(layersData[idx]);
    } else {
        toggle.classList.add('active');
        if (layersData[idx]) map.addLayer(layersData[idx]);
    }
}

// --- PDF Generation ---
async function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'letter');
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(15, 12, 41);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Geoportal Santa Cruz', 15, 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Reporte de Reportes Ciudadanos', 15, 22);
    doc.setFontSize(8);
    doc.text('Fecha: ' + new Date().toLocaleDateString('es-EC', { year:'numeric', month:'long', day:'numeric' }), 15, 28);

    // Fetch reports
    let reportes = [];
    try {
        const res = await fetch(`${REST}/reportes_ciudadanos?select=*&order=fecha_reporte.desc&limit=5000`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        reportes = await res.json();
    } catch (e) {
        console.error('Error al obtener reportes:', e);
    }

    if (reportes.length === 0) {
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(12);
        doc.text('No hay reportes registrados.', pageWidth / 2, 50, { align: 'center' });
        doc.save('reportes_santa_cruz.pdf');
        return;
    }

    // Summary by type
    const summary = {};
    reportes.forEach(r => {
        const tipo = r.tipo_problema || 'Otro';
        summary[tipo] = (summary[tipo] || 0) + 1;
    });

    let y = 40;
    doc.setTextColor(26, 26, 46);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen por Tipo', 15, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    for (const [tipo, count] of Object.entries(summary)) {
        doc.setFillColor(245, 245, 248);
        doc.roundedRect(15, y - 4, pageWidth - 30, 7, 1, 1, 'F');
        doc.setTextColor(26, 26, 46);
        doc.text(tipo, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(String(count), pageWidth - 20, y, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        y += 9;
    }

    y += 5;
    doc.setDrawColor(200, 200, 210);
    doc.line(15, y, pageWidth - 15, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalle de Reportes (' + reportes.length + ' total)', 15, y);
    y += 3;

    // Table
    const rows = reportes.map((r, i) => [
        String(i + 1),
        r.tipo_problema || 'Otro',
        (r.descripcion || '').substring(0, 60),
        r.autor || 'Anónimo',
        r.fecha_reporte ? new Date(r.fecha_reporte).toLocaleDateString('es-EC') : '-',
        r.estado || 'Pendiente'
    ]);

    doc.autoTable({
        startY: y,
        margin: { left: 15, right: 15 },
        head: [['#', 'Tipo', 'Descripción', 'Autor', 'Fecha', 'Estado']],
        body: rows,
        styles: { fontSize: 7.5, cellPadding: 2, overflow: 'linebreak', font: 'helvetica' },
        headStyles: { fillColor: [15, 12, 41], textColor: 255, fontStyle: 'bold', fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 248, 252] },
        columnStyles: {
            0: { cellWidth: 8 },
            1: { cellWidth: 30 },
            2: { cellWidth: 55 },
            3: { cellWidth: 25 },
            4: { cellWidth: 22 },
            5: { cellWidth: 20 }
        },
        didDrawPage: function (data) {
            // Footer on each page
            doc.setFontSize(7);
            doc.setTextColor(150);
            doc.text(
                'Geoportal Santa Cruz - Reportes Ciudadanos | Página ' + doc.internal.getNumberOfPages(),
                pageWidth / 2, doc.internal.pageSize.getHeight() - 8,
                { align: 'center' }
            );
        }
    });

    doc.save('reportes_santa_cruz.pdf');
}

// --- Legend ---
function toggleLegend() {
    document.getElementById('legend_body').classList.toggle('open');
}

function buildLegend() {
    const body = document.getElementById('legend_body');
    let html = LAYERS_CONFIG.map(cfg => `
        <div class="legend-item">
            <div class="legend-swatch" style="background:${cfg.color}"></div>
            <span><i class="fas ${cfg.icon || 'fa-layer-group'}" style="color:${cfg.color}"></i>${cfg.name}</span>
        </div>
    `).join('');

    html += `
        <div class="legend-item" style="margin-top:8px;padding-top:8px;border-top:1px solid #f0f0f5;">
            <div class="legend-swatch" style="background:transparent;border:none;"></div>
            <span style="font-weight:700;font-size:11px;color:#888;">Reportes por Tipo</span>
        </div>`;

    for (const [tipo, color] of Object.entries(REPORT_COLORS)) {
        html += `
            <div class="legend-item" style="padding-left:12px;">
                <div class="legend-swatch" style="background:${color};border-radius:50%;width:10px;height:10px;"></div>
                <span style="font-size:11px;">${tipo}</span>
            </div>`;
    }

    body.innerHTML = html;
}

// --- Data Loader ---
async function cargarDatos() {
    const loading = document.getElementById('loading');
    const detail = document.getElementById('loading_detail');
    const progressFill = document.getElementById('progress_fill');
    let loaded = 0;

    buildSidebar();
    buildLegend();

    for (let i = 0; i < LAYERS_CONFIG.length; i++) {
        const cfg = LAYERS_CONFIG[i];
        detail.textContent = `Cargando: ${cfg.name} (${i + 1}/${LAYERS_CONFIG.length})...`;
        progressFill.style.width = ((i + 1) / LAYERS_CONFIG.length * 100) + '%';

        try {
            const encoded = encodeURIComponent(cfg.table);
            const res = await fetch(`${REST}/${encoded}?select=*&limit=5000`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_KEY,
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) {
                console.warn(`Error cargando ${cfg.table}: ${res.status} ${res.statusText}`);
                continue;
            }

            const rows = await res.json();
            if (!Array.isArray(rows) || rows.length === 0) continue;

            const features = [];
            rows.forEach(row => {
                let geom = row[cfg.geomField];
                if (typeof geom === 'string') {
                    try { geom = JSON.parse(geom); } catch (_) {}
                }
                if (geom && geom.type) {
                    const props = {};
                    for (let k in row) {
                        if (!EXCLUDE_FIELDS.includes(k)) {
                            props[k] = row[k];
                        }
                    }
                    features.push({ type: 'Feature', properties: props, geometry: geom });
                }
            });

            if (features.length === 0) continue;

            const geojson = { type: 'FeatureCollection', features: features };
            const isLine = cfg.geomType.includes('LINE');

            const layer = L.geoJSON(geojson, {
                style: function () {
                    if (isLine) {
                        return { color: cfg.color, weight: 3, opacity: 0.85 };
                    }
                    return { color: cfg.color, weight: 1.5, fillOpacity: 0.3, fillColor: cfg.color };
                },
                pointToLayer: function (f, ll) {
                    if (cfg.isReports) {
                        const tipo = f.properties.tipo_problema || 'Otro';
                        const c = REPORT_COLORS[tipo] || cfg.color;
                        return L.circleMarker(ll, {
                            radius: 9, fillColor: c, color: '#fff',
                            weight: 2.5, fillOpacity: 0.9
                        });
                    }
                    return L.circleMarker(ll, {
                        radius: 5, fillColor: cfg.color, color: '#fff',
                        weight: 1.5, fillOpacity: 0.85
                    });
                },
                onEachFeature: function (feature, layer) {
                    const html = buildPopupHTML(cfg, feature.properties);
                    layer.bindPopup(html, { maxWidth: 380, maxHeight: 450, autoPanPadding: [10, 10] });
                }
            });

            layer.addTo(map);
            layersData[i] = layer;
            loaded++;
            totalFeatures += features.length;

        } catch (err) {
            console.error(`Error en capa ${cfg.name}:`, err);
        }
    }

    document.getElementById('total_features').textContent = totalFeatures.toLocaleString();
    detail.textContent = `${loaded} capa(s) cargada(s) con ${totalFeatures.toLocaleString()} features.`;
    progressFill.style.width = '100%';

    setTimeout(() => loading.classList.add('hide'), 600);

    let bounds = null;
    Object.values(layersData).forEach(l => {
        try {
            const b = l.getBounds();
            if (b.isValid()) bounds = bounds ? bounds.extend(b) : b;
        } catch (_) {}
    });
    if (bounds) map.fitBounds(bounds.pad(0.1));
}

/* ============================================
   MODAL REPORTE CIUDADANO
   ============================================ */

let rptSelectedTipo = null;
let rptSelectedLat = null;
let rptSelectedLng = null;
let rptMarker = null;
let rptMapClickEnabled = false;

function buildProblemasGrid() {
    const grid = document.getElementById('problemas_grid');
    grid.innerHTML = TIPOS_PROBLEMA.map(p => `
        <div class="problema-option" data-id="${p.id}" onclick="selectProblemaModal('${p.id}')">
            <i class="fas ${p.icon}" style="color:${p.color}"></i>
            ${p.id}
        </div>
    `).join('');
}

function selectProblemaModal(id) {
    rptSelectedTipo = id;
    document.getElementById('rpt_tipo').value = id;
    document.querySelectorAll('.problema-option').forEach(el => {
        el.classList.toggle('selected', el.dataset.id === id);
    });
    rptUpdateButton();
}

function rptUpdateButton() {
    const btn = document.getElementById('rpt_btnEnviar');
    btn.disabled = !(rptSelectedTipo && rptSelectedLat !== null);
}

function abrirModalReporte() {
    document.getElementById('modal_reporte').classList.add('open');
    rptMapClickEnabled = true;
    map.getContainer().style.cursor = 'crosshair';
    rptObtenerUbicacion();
}

function rptObtenerUbicacion() {
    const latD = document.getElementById('rpt_lat_display');
    const lngD = document.getElementById('rpt_lng_display');

    if (!navigator.geolocation) {
        latD.placeholder = 'Clic en mapa';
        lngD.placeholder = 'Clic en mapa';
        return;
    }

    latD.value = 'Obteniendo...';
    lngD.value = 'Obteniendo...';
    latD.classList.remove('detected');
    lngD.classList.remove('detected');

    navigator.geolocation.getCurrentPosition(
        function (pos) {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            rptSetUbicacion(lat, lng);
            map.setView([lat, lng], 17);
        },
        function (err) {
            latD.value = '';
            lngD.value = '';
            latD.placeholder = 'Clic en mapa';
            lngD.placeholder = 'Clic en mapa';
            console.warn('Geolocation error:', err.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function rptSetUbicacion(lat, lng) {
    rptSelectedLat = lat;
    rptSelectedLng = lng;

    if (rptMarker) map.removeLayer(rptMarker);

    rptMarker = L.circleMarker([lat, lng], {
        radius: 10,
        fillColor: '#c62828',
        color: '#fff',
        weight: 3,
        fillOpacity: 0.9
    }).addTo(map);

    rptMarker.bindPopup(`
        <div style="text-align:center;padding:4px;">
            <b>Ubicación del Reporte</b><br>
            <span style="font-family:monospace;font-size:11px;color:#666;">
                ${lat.toFixed(6)}, ${lng.toFixed(6)}
            </span>
        </div>
    `).openPopup();

    document.getElementById('rpt_lat').value = lat.toFixed(7);
    document.getElementById('rpt_lng').value = lng.toFixed(7);

    const latDisplay = document.getElementById('rpt_lat_display');
    const lngDisplay = document.getElementById('rpt_lng_display');
    latDisplay.value = lat.toFixed(7);
    lngDisplay.value = lng.toFixed(7);
    latDisplay.classList.add('detected');
    lngDisplay.classList.add('detected');

    rptUpdateButton();
}

function cerrarModalReporte() {
    document.getElementById('modal_reporte').classList.remove('open');
    rptMapClickEnabled = false;
    map.getContainer().style.cursor = '';
}

// Click en mapa para ajustar ubicación del reporte
map.on('click', function (e) {
    if (!rptMapClickEnabled) return;
    rptSetUbicacion(e.latlng.lat, e.latlng.lng);
});

async function enviarReporte() {
    const tipo = document.getElementById('rpt_tipo').value;
    const descripcion = document.getElementById('rpt_descripcion').value.trim();
    const autor = document.getElementById('rpt_autor').value.trim() || 'Anónimo';
    const telefono = document.getElementById('rpt_telefono').value.trim();
    const lat = parseFloat(document.getElementById('rpt_lat').value);
    const lng = parseFloat(document.getElementById('rpt_lng').value);

    if (!tipo || !descripcion || isNaN(lat) || isNaN(lng)) {
        showToast('Por favor completa todos los campos obligatorios', true);
        return;
    }

    const btn = document.getElementById('rpt_btnEnviar');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {
        const res = await fetch(`${REST}/reportes_ciudadanos`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                tipo_problema: tipo,
                descripcion: descripcion,
                autor: autor,
                telefono: telefono,
                latitud: lat,
                longitud: lng,
                estado: 'Pendiente'
            })
        });

        if (!res.ok) throw new Error('Error al guardar');

        showToast('Reporte enviado correctamente');
        resetModalForm();
        cerrarModalReporte();

        if (rptMarker) {
            map.removeLayer(rptMarker);
            rptMarker = null;
        }

        recargarCapaReportes();

    } catch (err) {
        console.error('Error enviando reporte:', err);
        showToast('Error al enviar el reporte. Intenta de nuevo.', true);
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Reporte';
    }
}

function resetModalForm() {
    document.getElementById('rpt_tipo').value = '';
    document.getElementById('rpt_descripcion').value = '';
    document.getElementById('rpt_autor').value = '';
    document.getElementById('rpt_telefono').value = '';
    document.getElementById('rpt_lat').value = '';
    document.getElementById('rpt_lng').value = '';
    const latD = document.getElementById('rpt_lat_display');
    const lngD = document.getElementById('rpt_lng_display');
    latD.value = '';
    lngD.value = '';
    latD.classList.remove('detected');
    lngD.classList.remove('detected');
    rptSelectedTipo = null;
    rptSelectedLat = null;
    rptSelectedLng = null;
    document.querySelectorAll('.problema-option').forEach(el => el.classList.remove('selected'));
    const btn = document.getElementById('rpt_btnEnviar');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Reporte';
}

function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('i');
    document.getElementById('toast_msg').textContent = msg;
    toast.className = 'toast show' + (isError ? ' error' : '');
    icon.className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    setTimeout(() => toast.className = 'toast', 3500);
}

async function recargarCapaReportes() {
    const idx = LAYERS_CONFIG.findIndex(c => c.isReports);
    if (idx === -1) return;

    const cfg = LAYERS_CONFIG[idx];

    if (layersData[idx]) {
        map.removeLayer(layersData[idx]);
        delete layersData[idx];
    }

    try {
        const encoded = encodeURIComponent(cfg.table);
        const res = await fetch(`${REST}/${encoded}?select=*&order=fecha_reporte.desc&limit=5000`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) return;
        const rows = await res.json();
        if (!Array.isArray(rows) || rows.length === 0) return;

        const features = [];
        rows.forEach(row => {
            let geom = row[cfg.geomField];
            if (typeof geom === 'string') {
                try { geom = JSON.parse(geom); } catch (_) {}
            }
            if (geom && geom.type) {
                const props = {};
                for (let k in row) {
                    if (!EXCLUDE_FIELDS.includes(k)) props[k] = row[k];
                }
                features.push({ type: 'Feature', properties: props, geometry: geom });
            }
        });

        if (features.length === 0) return;

        const geojson = { type: 'FeatureCollection', features };

        const layer = L.geoJSON(geojson, {
            style: function () {
                return { color: cfg.color, weight: 1.5, fillOpacity: 0.3, fillColor: cfg.color };
            },
            pointToLayer: function (f, ll) {
                const tipo = f.properties.tipo_problema || 'Otro';
                const c = REPORT_COLORS[tipo] || cfg.color;
                return L.circleMarker(ll, {
                    radius: 9, fillColor: c, color: '#fff',
                    weight: 2.5, fillOpacity: 0.9
                });
            },
            onEachFeature: function (feature, layer) {
                const html = buildPopupHTML(cfg, feature.properties);
                layer.bindPopup(html, { maxWidth: 380, maxHeight: 450, autoPanPadding: [10, 10] });
            }
        });

        layer.addTo(map);
        layersData[idx] = layer;

        const toggle = document.getElementById('toggle_' + idx);
        if (toggle && !toggle.classList.contains('active')) {
            toggle.classList.add('active');
        }

    } catch (err) {
        console.error('Error recargando reportes:', err);
    }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', function () {
    cargarDatos();
    buildProblemasGrid();
});
