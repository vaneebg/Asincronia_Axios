// 1. Quiero un perrito, pero no se que raza escoger, ¿me ayudas?
// En este ejercicio utilizaremos la API de https://dog.ceo/dog-api/. Leyendo su documentación, deberás hacer lo siguiente:
// Imprimir por consola la lista de razas de todos los perros.
// Imprimir por consola una imagen random de una raza.
// Imprimir por consola todas las imágenes de una raza concreta.
// Recuerda que para estos ejercicios deberás utilizar Axios. Al haber conseguido que se imprima por consola, el siguiente paso será que se muestren en pantalla con las herramientas que nos ofrece el árbol DOM.
// *Extra ¿Y si ahora te pidiéramos que podamos poner otra raza en la url para que nos busque otras imágenes? Adapta las urls que ya tenías para que puedas pasarle argumentos.

const btn = document.getElementById("search")
const resultsAllBreeds = document.getElementById("resultsAllBreeds")
const resultsImageRandom = document.getElementById("resultsImageRandom")
const resultsSearch = document.getElementById("resultsSearch")
const buttonBreeds = document.getElementById("breeds")


const saveAPI1 = async(e) => {
    e.preventDefault()
    try {
        const urlAll = "https://dog.ceo/api/breeds/list/all"
        const allBreeds = await axios.get(urlAll);
        const allBreedsFinal = Object.keys(allBreeds.data.message);
        console.log(allBreedsFinal)
        paintResultsAllBreeds(allBreedsFinal)

    } catch (error) {
        console.error(error)
    }

}
const saveAPI2 = async(e) => {
    e.preventDefault()
    try {
        const input = document.getElementById("text").value
        const url = "https://dog.ceo/api/breed/"
        const urlImageRandom = "https://dog.ceo/api/breeds/image/random"
        const imageBreed = await axios.get(url + input + "/images/random")
        const image = await axios.get(urlImageRandom)
        console.log(imageBreed.data.message)
        console.log(image.data.message)
        const imageFinal = image.data.message;
        const imageBreedFinal = imageBreed.data.message;
        paintResults(imageFinal, imageBreedFinal)

    } catch (error) {
        console.error(error)
    }

}

paintResultsAllBreeds = (allBreeds) => {
    resultsImageRandom.innerHTML = ""
    resultsSearch.innerHTML = ""
    allBreeds.forEach(breed => resultsAllBreeds.innerHTML += `<h1> ${breed} </h1> `)


}
paintResults = (imageRandom, imageBreed) => {
    resultsAllBreeds.innerHTML = ""
    resultsImageRandom.innerHTML = `<br> Aquí la imagen random: </br> <img src=${imageRandom}></br>`
    resultsSearch.innerHTML = `Aquí la imagen del perro que buscaste:</br>  <img src=${imageBreed}> `
}


btn.addEventListener("click", saveAPI2)
buttonBreeds.addEventListener("click", saveAPI1)


// 2. ¿Quieres saber mi información? Aquí la tienes.
// Para este ejercicio vamos a utilizar la API de usuarios de GitHub, la cual tiene esta URL: https://api.github.com/users/{username}. {username} es el nombre del usuario en GitHub, por lo que si quieres buscar a cualquier usuario, solo tienes que ponerlo en la url. Por ejemplo,https://api.github.com/users/sofiapinilla, o esta https://api.github.com/users/GeerDev. Si ponéis esta URL en una nueva pestaña del navegador podréis observar qué datos nos devuelve el API.
// Lo primero que haremos será crear un input de tipo texto y un botón para buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después crearemos una función que se ejecute cuando se pulse el botón buscar y que contenga una petición a la API para obtener información de ese usuario y así mostrarla en nuestra página:


// Lo que queremos que se imprima por consola será:
// Nombre
// Número de repositorios
// Avatar (imagen)
// Recuerda que para estos ejercicios deberás utilizar Axios.Si ya has obtenido toda la información, utiliza las herramientas del árbol DOM para que esta información aparezca en la pantalla.

const submitGithub = document.getElementById("searchGithub")
const resultsUsers = document.getElementById("usersGithub")

const saveAPIGithub = async(e) => {
    e.preventDefault()

    try {
        let searchGithub = document.getElementById("textGithub").value
        const urlGithub = "https://api.github.com/users/"
        const userGitub = await axios.get(urlGithub + searchGithub);
        paintUsers(userGitub)

    } catch (error) {
        console.error(error)
    }

}
const paintUsers = (users) => {
    resultsUsers.innerHTML = ""
    resultsUsers.innerHTML = `<h1>${users.data.login}</h1><img src=${users.data.avatar_url}> </br> Número de repos :${users.data.public_repos}`
    document.getElementById("textGithub").value = " "
}

submitGithub.addEventListener("click", saveAPIGithub)