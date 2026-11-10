# Incidente en producción

**Estado:** producción caída. **Reportado por:** Marco Vargas (maintainer).

Abre la página de producción de tu repo: la barra de arriba está en rojo y el catálogo no carga.
Nadie tocó la lógica a propósito: el sistema se rompió por **malas prácticas de Git** de tus
compañeros Ana, Luis y Carla, que pushearon directo a `main` sin pasar por `dev` ni por PR.

## Tu misión

1. Devolver producción a verde **solo con operaciones de Git**. No escribas código nuevo:
   el código correcto ya existe en algún lugar del historial.
2. Hacerlo con el flujo del equipo: rama `hotfix/tsk-<nombre_tarea>` desde `main`, PR hacia `main`
   (Assignee: tú, Reviewer: el docente) y merge cuando el docente apruebe.
3. Cerrar con el tag `v1.0.1` y llevar los arreglos a `dev` con un PR `main -> dev`.

## Por dónde empezar

```bash
git fetch origin
git switch main
git pull origin main
git log --oneline --graph --all -25
```

Lee los mensajes y los autores de los commits más recientes de `main`. Cada línea roja de la
barra apunta a un archivo distinto, y cada archivo se rompió por un error de Git distinto.

<details>
<summary>Pista 1: herramientas para investigar</summary>

- `git show <hash>`: qué cambió un commit.
- `git show --stat <hash>`: qué archivos tocó.
- `git log --merges --oneline`: solo los merges.
- `git blame js/<archivo>.js`: quién escribió cada línea.
- `git log --oneline --all -- js/<archivo>.js`: la historia de un archivo en todas las ramas.

</details>

<details>
<summary>Pista 2: precios.js (ReferenceError)</summary>

Alguien trajo un commit de otra rama, pero ese commit usa una función que se creó en un commit
anterior que **no** se trajo. Busca en qué rama vive esa función.
Herramienta: `git cherry-pick -x`.

</details>

<details>
<summary>Pista 3: carrito.js (SyntaxError)</summary>

Un merge tuvo conflicto y se commiteó sin resolverlo. Abre el archivo y busca `<<<<<<<`.
Dos caminos: resolver el conflicto bien, o deshacer ese merge con `git revert -m 1`.

</details>

<details>
<summary>Pista 4: pagos.js (TypeError)</summary>

Una feature a medias se mergeó directo a `main`. Lo que entra con un merge se deshace
revirtiendo el merge. Herramienta: `git revert -m 1 <hash-del-merge>`.

</details>

<details>
<summary>Pista 5: checkout.js (Error)</summary>

Alguien subió a producción un commit que nunca debió salir de su computadora.
Herramienta: `git revert <hash>`.

</details>

<details>
<summary>Pista 6: cómo saber que terminaste</summary>

- Prueba en local antes del PR: `python3 -m http.server 8000` y abre http://localhost:8000.
  La barra debe salir verde.
- Después del merge, espera un minuto y recarga producción con Ctrl + F5.
- El pie de página debe mostrar `v1.0.1` después del tag.

</details>

## Bonus

- `feature/tsk-cupones` tiene 6 commits desordenados. Déjalos en 1 o 2 commits limpios con
  `git rebase -i` antes de abrir su PR hacia `dev`.
- ¿Borraste algo por error en local? `git reflog` guarda todo lo que hiciste.
