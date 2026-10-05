// Núcleo de la tienda: registra los módulos, captura errores y muestra
// la barra de estado. NO es parte de los ejercicios: no lo modifiques.
window.Tienda = (function () {
  'use strict';

  // Módulos = scripts de js/ que carga index.html (menos el núcleo y los datos)
  var NO_MODULOS = ['tienda', 'config', 'productos'];
  function listaModulos() {
    var lista = [];
    document.querySelectorAll('script[src]').forEach(function (s) {
      var m = s.getAttribute('src').match(/js\/([\w-]+)\.js/);
      if (m && NO_MODULOS.indexOf(m[1]) === -1) lista.push(m[1]);
    });
    return lista;
  }
  var modulos = {};   // nombre -> { ok: true } | { ok: false, msg, linea }
  var pruebas = [];   // { nombre, ok, msg }
  var tardios = [];   // errores al hacer clic, después de cargar

  function nombreArchivo(ruta) {
    var base = (ruta || '').split('?')[0].split('/').pop();
    return base.replace(/\.js$/, '');
  }

  window.addEventListener('error', function (e) {
    var archivo = nombreArchivo(e.filename);
    var msg = e.error ? e.error.name + ': ' + e.error.message : String(e.message || 'Error');
    msg = msg.replace(/^Uncaught /, '');
    var info = { archivo: archivo || '¿?', msg: msg, linea: e.lineno || 0 };
    if (cargado) {
      tardios.push(info);
      pintar();
      return;
    }
    if (archivo && NO_MODULOS.indexOf(archivo) === -1 && !modulos[archivo]) {
      modulos[archivo] = { ok: false, msg: msg, linea: info.linea };
    }
  });

  function listo(nombre) {
    if (!modulos[nombre]) modulos[nombre] = { ok: true };
  }

  function prueba(nombre, fn) {
    try {
      pruebas.push({ nombre: nombre, ok: fn() === true });
    } catch (err) {
      pruebas.push({ nombre: nombre, ok: false, msg: err.name + ': ' + err.message });
    }
  }

  var version = null;
  var cargado = false;

  function entorno() {
    if (!version) return 'LOCAL';
    return version.rama === 'main' ? 'PRODUCCIÓN' : version.rama.toUpperCase();
  }

  function escapar(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function pintar() {
    var caja = document.getElementById('estado');
    if (!caja) return;
    var items = [];
    var fallas = 0;

    listaModulos().forEach(function (m) {
      var r = modulos[m];
      if (r && r.ok) {
        items.push('<li class="ok">✅ <code>' + m + '.js</code> funcionando</li>');
      } else {
        fallas++;
        var detalle = r ? r.msg + (r.linea ? ' (línea ' + r.linea + ')' : '')
                        : 'no terminó de cargar · abre la consola (F12)';
        items.push('<li class="mal">❌ <code>' + m + '.js</code> ' + escapar(detalle) + '</li>');
      }
    });
    pruebas.forEach(function (p) {
      if (p.ok) {
        items.push('<li class="ok">✅ Prueba: ' + escapar(p.nombre) + '</li>');
      } else {
        fallas++;
        items.push('<li class="mal">❌ Prueba: ' + escapar(p.nombre) + (p.msg ? ' · ' + escapar(p.msg) : '') + '</li>');
      }
    });
    tardios.forEach(function (t) {
      fallas++;
      items.push('<li class="mal">❌ <code>' + escapar(t.archivo) + '.js</code> al usar la tienda: ' + escapar(t.msg) + '</li>');
    });

    var commit = version ? ' · commit ' + version.commit : '';
    var tag = version && version.tag ? ' · ' + version.tag : '';
    caja.className = 'estado ' + (fallas ? 'estado-mal' : 'estado-ok');
    caja.querySelector('.estado-titulo').innerHTML = fallas
      ? '💥 ' + entorno() + ' · ' + fallas + (fallas === 1 ? ' incidente' : ' incidentes') + escapar(tag + commit)
      : '✅ ' + entorno() + ' · sin errores' + escapar(tag + commit);
    caja.querySelector('.estado-lista').innerHTML = fallas ? items.join('') : '';

    var v = document.getElementById('version');
    if (v) {
      v.textContent = version
        ? 'Rama ' + version.rama + ' · ' + (version.tag || 'sin versión') + ' · commit ' + version.commit + ' · publicado ' + version.fecha
        : 'Versión local (abre la página publicada en GitHub Pages para ver la versión)';
    }

    window.estadoTienda = { entorno: entorno(), fallas: fallas, modulos: modulos, pruebas: pruebas };
  }

  window.addEventListener('load', function () {
    cargado = true;
    pintar();
    fetch('version.json', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (v) { version = v; pintar(); })
      .catch(function () { /* en local no existe version.json */ });
  });

  return { listo: listo, prueba: prueba };
})();
