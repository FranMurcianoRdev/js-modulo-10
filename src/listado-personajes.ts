import { obtenerPersonajes } from "./listado-personajes.api";
import { Personaje } from "./listado-personajes.model";


const crearElementoImagen = (imagenPersonaje: string, nombre: string): HTMLImageElement => {

    const imagen = document.createElement("img");
    imagen.src = imagenPersonaje;
    imagen.alt = nombre;
    return imagen;
};

const crearElementoParrafoNombre = (texto: string): HTMLParagraphElement => {
    const parrafo = document.createElement("p");

    // Crea un elemento <strong> para la palabra "Nombre"
    const nombreEnNegrita = document.createElement("strong");
    nombreEnNegrita.textContent = "Nombre: ";

    // Agrega el elemento <strong> al párrafo
    parrafo.appendChild(nombreEnNegrita);

    // Agrega el texto adicional al párrafo
    parrafo.append(texto);

    return parrafo;
};

const crearElementoParrafoEspecialidad = (texto: string): HTMLParagraphElement => {
    const parrafo = document.createElement("p");

    const especialidadEnNegrita = document.createElement("strong");
    especialidadEnNegrita.textContent = "Especialidad: ";

    parrafo.appendChild(especialidadEnNegrita);

    parrafo.append(texto);

    return parrafo;
};

const crearElementoParrafoHabilidades = (habilidades: string[]): HTMLParagraphElement => {
    const parrafo = document.createElement("p");

    const habilidadesEnNegrita = document.createElement("strong");
    habilidadesEnNegrita.textContent = "Habilidades: ";

    parrafo.appendChild(habilidadesEnNegrita);

    // Convierte el array de habilidades en una sola cadena de texto separada por comas
    const habilidadesTexto = habilidades.join(", ");

    parrafo.append(habilidadesTexto);

    return parrafo;
};

const creaContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {

    const elementoPersonaje = document.createElement("div");
    elementoPersonaje.classList.add("contenedor-personaje");

    const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
    elementoPersonaje.appendChild(imagen);

    const nombre = crearElementoParrafoNombre (personaje.nombre);
    elementoPersonaje.appendChild(nombre)

    const especialidad = crearElementoParrafoEspecialidad(personaje.especialidad);
    elementoPersonaje.appendChild(especialidad)

    const habilidades = crearElementoParrafoHabilidades(personaje.habilidades);
    elementoPersonaje.appendChild(habilidades);

    return elementoPersonaje;
};

let personajes: Personaje[] = [];

const pintarPersonajes = async () => {
    const datos = await obtenerPersonajes();
    personajes = datos;
    const listado = document.querySelector("#contenedor-de-personajes");

    if (listado && listado instanceof HTMLDivElement) {
        personajes.forEach((personajes) => {
        const contenedorPelicula = creaContenedorPersonaje(personajes)
        listado.appendChild(contenedorPelicula)
        });
    } else {
        throw new Error ("No se ha encontrado el listado");
    }
};

const filtrarPersonajesPorNombre = (nombreBusqueda: string, personajes: Personaje[]) => {
    // Filtra los personajes cuyo nombre incluya el texto de búsqueda, ignorando mayúsculas y minúsculas
    return personajes.filter(personaje =>
        personaje.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase())
    );
};

//pinta los personajes filtrados
const pintarPersonajesFiltrados = (personajesFiltrados: Personaje[]): HTMLDivElement => {
    const listado = document.querySelector("#contenedor-de-personajes");
    
    if (listado && listado instanceof HTMLDivElement) {
        listado.innerHTML = '';
        personajesFiltrados.forEach((personajes) => {
        const contenedorPelicula = creaContenedorPersonaje(personajes)
        listado.appendChild(contenedorPelicula)
        });
    } else {
        throw new Error ("No se ha encontrado el listado");
    }

    return listado;
};

// Obtiene los elementos del DOM para el input de búsqueda y el botón
const inputBusqueda = document.getElementById('nombre-busqueda') as HTMLInputElement;
const btnFiltrar = document.getElementById('btn-filtrar') as HTMLButtonElement;

btnFiltrar.addEventListener('click', () => {
    // Obtiene el texto introducido en el input de búsqueda
    const nombreBuscado = inputBusqueda.value;
    // Filtra los personajes según el nombre buscado
    const personajesFiltrados = filtrarPersonajesPorNombre(nombreBuscado, personajes);
    // Muestra los resultados filtrados
    pintarPersonajesFiltrados(personajesFiltrados);
    console.log("boton pinchado", nombreBuscado)
});

document.addEventListener("DOMContentLoaded", pintarPersonajes);