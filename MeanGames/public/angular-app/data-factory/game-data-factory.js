angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http) {
    return {
        getOneGame: (gameId) => {
            return $http.get("/api/games/" + gameId).then(complete).catch(failed)
        },
        getAllGames: () => {
            return $http.get("/api/games")
                .then(complete)
                .catch(failed);
        },
        createNewGame: (game) => createNewGame($http, game),
        registerUser: (user) => registerUser($http, user),
        authenticateUser: (user)=>authenticateUser ($http,user)
    }
}

function authenticateUser($http,user){
    return $http.post("/api/auth", user)
        .then(complete)
        .catch(failed);
}

function registerUser($http, user) {
    return $http.post("/api/users", user)
        .then(complete)
        .catch(failed);
}

function createNewGame($http, game) {
    return $http.post("/api/games", game)
        .then(complete)
        .catch(failed)
}

function complete(response) {
    return response.data;
}

function failed(error) {
    console.log(error);
}