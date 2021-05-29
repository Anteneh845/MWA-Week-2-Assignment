angular
    .module("meanGuitars")
    .controller("AddGuitarController", AddGuitarController)

function AddGuitarController(GuitarDataFactory, $location) {
    let vm = this;
    vm.cancelHandler = () => {
        $location.path("/")
    }
    vm.addGuitarHandler = () => {
        if (vm.form.$valid) {
            let guitar = {
                year: vm.year,
                type: vm.type,
                link: vm.link,
                description: vm.description,
                brand: vm.brand,
                stringType: vm.stringType,
            }
            GuitarDataFactory
                .addGuitar(guitar)
                .then(() => location.href = "/#!/")
                .catch(err => console.log(err))
        }
    }
}