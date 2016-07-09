/**
 * Created by Juan Pa on 30/03/2016.
 */
angular.module("appLaGrieta")
    .controller("ChampionDetailCtrl",championDetailController);


function championDetailController($sce, championService) {
    var vm = this;
    var Service = championService;
    vm. renamedSpells = false;
    vm.detailChampData = JSON.parse(localStorage.getItem('champDetail'));
    vm.apiVersion = localStorage.getItem('apiVersion');

    //Todo Funcion para concatenar todos los tags de los campeones
    vm.getAllTags=function(){
        var tags = "( ";
        for(var i =0;i<vm.detailChampData.tags.length;i++){
            if(i == vm.detailChampData.tags.length-1){
                tags+= vm.detailChampData.tags[i]+" )";
            }else{
                tags+= vm.detailChampData.tags[i] +" - ";
            }
        }
        return tags;
    }
    //Todo funcion para mostrar el texto traido desde el api
    vm.trustHtml = function (value){
        return $sce.trustAsHtml(value);
    };

    //Todo Funcion para calcular la velocidad de ataque del campeon
    vm.calculateAttackSpeed= function(attackDelay, attackGrowth){
        if(attackGrowth == undefined)
            attackGrowth=0;
        return (0.625/1+(attackDelay)).toFixed(3) + " ("+attackGrowth+"% x Nvl)";
    }

    //Todo Funcion para renombrar el skin normal de los campeones a Estandar
    vm.renameSkin=function(skinName){
        if(skinName === "default"){
            skinName="Estándar"
        }
        return skinName;
    }

    vm.drawBars=function(attack, defense, magic, difficulty){

        if(Service.isGoogleLoaded == false){
            google.charts.load('current', {packages: ['corechart', 'bar']});
            google.charts.setOnLoadCallback(drawBasic);
            Service.setGoogleLoaded(true);
        }else{
            google.charts.setOnLoadCallback(drawBasic);
        }

        function drawBasic() {

            var data = google.visualization.arrayToDataTable([
                ['', '', { role: 'style' }],
                ['Poder de Ataque', attack, 'fill-color:#8d0202; stroke-color:#FFFFFF; stroke-width:1; stroke-opacity: 0.6'],
                ['Poder de Defensa', defense, 'fill-color:#064b06; stroke-color:#FFFFFF; stroke-width:1; stroke-opacity: 0.6'],
                ['Poder de Magia', magic, 'stroke-color:#FFFFFF; stroke-width:1; fill-color:#232bc3; stroke-opacity: 0.6'],
                ['Dificultad', difficulty , 'fill-color:#670b85; stroke-color:#FFFFFF; stroke-width:1; stroke-opacity: 0.6'],

            ]);

            var options = {
                title: '',
                chartArea: {width: '50%'},
                legend: { position: "none" },
                animation:{
                    duration: 1000,
                    easing: 'linear',
                    startup:true
                },
                hAxis: {
                    title: '',
                    minValue: 0,
                    maxValue:10,
                    textStyle:{ color: 'White',
                        bold: true,},
                    gridlines:{ color:'#283646'},
                    ticks: [0,2,4,6,8,10]
                },
                vAxis: {
                    gridlines:{ color:'#283646'},
                    textStyle:{ color: 'White',
                        bold: true,},

                },
                backgroundColor: '#283646'
            };

            var chart = new google.visualization.BarChart(document.getElementById('stats-graph'));

            chart.draw(data, options);
        }
    }

    angular.element(document).ready(function(){
        vm.drawBars(vm.detailChampData.info.attack, vm.detailChampData.info.defense, vm.detailChampData.info.magic, vm.detailChampData.info.difficulty);
    });

    vm.renameSpells=function (data){
        if(data != undefined )
        {
            /*if(Service.nameIndex < 4){*/
                switch (Service.nameIndex){
                    case 0:

                            data += " (Q)";
                            Service.setNameIndex(1);

                        break;
                    case 1:
                        data += " (W)";
                        Service.setNameIndex(2);
                        break;
                    case 2:
                        data+= " (E)";
                        Service.setNameIndex(3);
                        break;
                    case 3:
                        data+= " (R)";
                        Service.setNameIndex(0);
                        break;
                }
            /*}*/


            return data;
        }

    };

    vm.getKeyValueFromArray=function(arr, val){
        for(var i=0;i<arr.length;i++){
            if(arr[i].key == val){
                return arr[i].coeff[0]*100+"%";
            }
        }
    };

    vm.replaceSpellValues=function(spell) {
        /*EffectBurn replacement*/
        var exp = /{{/g;//Expresion para las llaves que abren
        var exp2 = /}}/g;//Expresion para las llaves que cierran
        var exp3 = /\s\w\d\s/g;//Expression para los valores que se encuentran dentro de las llaves para luego cambiarlos
        var expColor =/class="color/g;//Expression del color para cambiarlo por style
        spell.tooltip = spell.tooltip.replace(exp, "(");
        spell.tooltip = spell.tooltip.replace(exp2, ")");
        spell.tooltip=  spell.tooltip.replace(expColor, "style=\"color:#");
        var result = exp3.exec(spell.tooltip);

        while (result != null) {
            var val = spell.tooltip.substring(result.index+1 , result.index + 2);
            var position = parseInt(spell.tooltip.substring(result.index + 2, result.index + 3));
            switch (val) {
                case "e":
                    spell.tooltip = spell.tooltip.replace(result[0],"<span style=\"color:#2289b9\">"+ spell.effectBurn[position]+"</span>");
                    break;
                case "a":
                    if(spell.vars != undefined)
                        spell.tooltip = spell.tooltip.replace(result[0], vm.getKeyValueFromArray(spell.vars, result[0].trim()));
                    else
                        spell.tooltip = spell.tooltip.replace(result[0], " ");
                    break;
                case "f":
                    if(spell.vars != undefined)
                        spell.tooltip = spell.tooltip.replace(result[0], vm.getKeyValueFromArray(spell.vars, result[0].trim() ));
                    else
                        spell.tooltip = spell.tooltip.replace(result[0], " ");
                    break;
            }
            result = exp3.exec(spell.tooltip);
        }
        return spell.tooltip;

    };




}