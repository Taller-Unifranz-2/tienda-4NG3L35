# 🛍️ Tienda Unifranz · Taller de Git

**Tu tienda publicada en GitHub Pages:**

- Producción (`main`): https://taller-unifranz-2.github.io/tienda-4NG3L35/
- Desarrollo (`dev`): https://taller-unifranz-2.github.io/tienda-4NG3L35/dev/

Este repositorio es tuyo. Aquí practicas el flujo de trabajo del equipo con un proyecto real que se publica solo en GitHub Pages.

| Rama | Entorno | URL |
|---|---|---|
| `main` | Producción | `https://taller-unifranz-2.github.io/tienda-4NG3L35/` |
| `dev` | Desarrollo | `https://taller-unifranz-2.github.io/tienda-4NG3L35/dev/` |

Cada vez que algo llega a `main` o `dev`, GitHub Actions vuelve a publicar la página en 1 minuto, más o menos. Recarga con **Ctrl + F5** y revisa el **commit** que aparece en la barra de arriba: así sabes que ves la última versión.

La barra de arriba es el monitor de la tienda:

- 🟩 **Verde:** todos los módulos funcionan.
- 🟥 **Rojo:** hay incidentes; cada línea dice qué archivo falló y por qué.

## Reglas del equipo

- Nadie hace commit directo en `main` ni en `dev`: todo entra por **pull request**.
- Ramas: `feature/tsk-<nombre_tarea>`, `fix/tsk-<nombre_tarea>`, `hotfix/tsk-<nombre_tarea>`.
- Commits: `tipo(alcance): descripción en imperativo`, por ejemplo `feat(productos): agrega termo`.
- Cada PR lleva **Assignee** (quien hizo la tarea: tú, se asigna solo) y **Reviewer** (el maintainer: el docente, se agrega solo).
- Sin la aprobación del docente no se puede hacer merge.
- Puedes ver los repos de tus compañeros, pero solo puedes modificar el tuyo.

## Parte 1 · Practica en dev

1. Clona por SSH:
   ```bash
   git clone git@github.com:Taller-Unifranz-2/tienda-4NG3L35.git
   cd tienda-4NG3L35
   git switch dev
   ```
2. Crea tu rama desde `dev`:
   ```bash
   git switch -c feature/tsk-mi_producto
   ```
3. Agrega un producto al final de `js/productos.js`, por ejemplo:
   ```js
   { id: 5, nombre: 'Termo', precio: 60 }
   ```
   No olvides la coma en la línea anterior.
4. Prueba en local: abre la carpeta con un servidor (por ejemplo, `python3 -m http.server` y entra a `http://localhost:8000`) o con Live Server de VS Code. La barra debe salir verde.
5. Commit y push:
   ```bash
   git add -p
   git commit -m "feat(productos): agrega termo"
   git push -u origin feature/tsk-mi_producto
   ```
6. Abre un PR hacia **`dev`** y completa la plantilla. Revisa que tú quedes como Assignee y el docente como Reviewer. Cuando el docente apruebe, haz merge (la rama se borra sola).
7. Revisa `/dev/`: tu producto ya debe estar publicado.
8. Abre un PR de **`dev` → `main`**. Al mergearlo, tu producto llega a producción.

## Parte 2 · Producción rota

Producción está caída. Lee el reporte en [INCIDENTE.md](INCIDENTE.md) y sigue las pistas.

