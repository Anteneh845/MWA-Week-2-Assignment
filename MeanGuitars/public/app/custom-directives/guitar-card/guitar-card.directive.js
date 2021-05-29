angular
    .module("meanGuitars")
    .controller("GuitarCardController", GuitarCardController)
    .directive("guitarCard", guitarCard);

function GuitarCardController() {
    let vm = this;
    vm.acousticImageUrl = "https://media.guitarcenter.com/is/image/MMGS7//O120CESB-Auditorium-Acoustic-Electric-Guitar-3-Color-Sunburst/J51473000001000-00-1600x1600.jpg";
    vm.electricImageUrl = "https://media.guitarcenter.com/is/image/MMGS7//SG-Standard-Electric-Guitar-Ebony/L54573000002000-00-1600x1600.jpg";
    vm.classicalImageUrl = "https://us.123rf.com/450wm/yolya/yolya1802/yolya180200106/96114000-acoustic-classic-guitar-on-blue-background-simple-musical-instrument-with-copy-space.jpg?ver=6";
}


function guitarCard() {
    return {
        restrict: "E",
        templateUrl: "app/custom-directives/guitar-card/guitar-card.html",
        controller: "GuitarCardController",
        controllerAs: "guitarCardCtrl",
        scope: {
            guitar: "=guitar"
        }
    }
}