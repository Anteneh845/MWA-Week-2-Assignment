angular
    .module("meanGuitars")
    .controller("GuitarDetailController", GuitarDetailController)

function GuitarDetailController(GuitarDataFactory, $routeParams) {
    let vm = this;
    let guitarId = $routeParams.guitarId;
    vm.deleteGuitar = (id) => {
        GuitarDataFactory
            .deleteGuitarById(id)
            .then(() => location.href = "/#!/")
            .catch(err => console.log(err))
    }
    GuitarDataFactory
        .getGuitarById(guitarId)
        .then(guitar => vm.guitar = guitar)
        .catch(err => console.log(err))
}