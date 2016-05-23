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

    vm.trustHtml = function (value){
        return $sce.trustAsHtml(value);
    };

    vm.calculateAttackSpeed= function(attackDelay, attackGrowth){
        if(attackGrowth == undefined)
            attackGrowth=0;
        return (0.625/1+(attackDelay)).toFixed(3) + " ("+attackGrowth+"% x Nvl)";
    }

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

    vm.replaceSpellValues=function(text, spell){
        /*EffectBurn replacement*/


        var newText = replace("")
    };






}