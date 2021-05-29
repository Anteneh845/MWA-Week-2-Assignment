angular
    .module("meanGuitars")
    .controller("GuitarListController", GuitarListController);


function GuitarListController(GuitarDataFactory, $routeParams,$location) {
    let vm = this;
    let brand = $routeParams.brand;
    console.log(brand)
    vm.searchHandler = () => {
        let brand = vm.brand;
        $location.search({brand: brand})
        GuitarDataFactory
            .getGuitarList(brand)
            .then(response => vm.guitars = response);
    }
    if (!brand)
        GuitarDataFactory
            .getGuitarList()
            .then(response => vm.guitars = response);
    else
        GuitarDataFactory
            .getGuitarList(brand)
            .then(response => vm.guitars = response);
    vm.filterByYear = function (year) {
        return function (guitar) {
            return guitar["year"] > year
        };
    }
}