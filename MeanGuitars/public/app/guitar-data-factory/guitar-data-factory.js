angular
    .module("meanGuitars")
    .factory("GuitarDataFactory", GuitarDataFactory);

function GuitarDataFactory($http) {
    return {
        getGuitarList: (brand) => getGuitarList($http, brand),
        getGuitarById: (id) => getGuitarById(id, $http),
        deleteGuitarById: (id) => deleteGuitarById(id, $http),
        addGuitar: (guitar) => addGuitar(guitar, $http),
        registerUser: (user) => registerUser($http, user),
        authenticateUser: (user) => authenticateUser($http, user)

    }
}

function registerUser($http, user) {
    return $http.post("/api/users", user)
        .then(complete)
        .catch(failed);
}

function authenticateUser($http, user) {
    return $http.post("/api/auth", user)
        .then(complete)
        .catch(failed);
}

const deleteGuitarById = (guitarId, $http) => {
    return $http.delete("/api/guitars/" + guitarId)
        .then(complete)
        .catch(failed)
}

const getGuitarById = (guitarId, $http) => {
    return $http.get("/api/guitars/" + guitarId)
        .then(complete)
        .catch(failed)
}

const addGuitar = (guitar, $http) => {
    return $http.post("/api/guitars", guitar)
        .then(complete)
        .catch(failed)
}

const getGuitarList = ($http, brand = "") => {
    return $http.get("/api/guitars" + (brand !== "" ? "?brand=" + brand : ""))
        .then(complete)
        .catch(failed)
}

const complete = (response) => {
    return response.data;
}

const failed = (error) => {
    console.log(error);
}