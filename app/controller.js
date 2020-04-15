(function () {

    'user strict';

    var spaApp = angular.module("spaApp");
    spaApp.controller('produtoController', produtoController);
    produtoController.$inject = ['$scope'];

    function produtoController($scope) {
        var vm = this;
        vm.produto = {};
        vm.produtos = [];

        vm.adicionarProduto = function () {
            if(vm.produto.id != undefined){
                vm.atualizarItem(vm.produto, vm.produto.id);
                vm.limparCampos();
            }else{
                vm.produtos.push(angular.copy(vm.produto));
                vm.limparCampos();
            }
        };

        vm.limparCampos = function () {
            vm.produto = {};
        };

        vm.deletarItem = function(index){
            vm.produtos.splice(index, 1);
        };

        vm.carregarItem = function(index){
            vm.produto = {
                id: index,
                nome: vm.produtos[index].nome,
                preco: vm.produtos[index].preco
            };
        };

        vm.atualizarItem = function(item, index){   
            if(index === item.id){
                vm.produtos[index] = item;
            }
        };
    }
}());
