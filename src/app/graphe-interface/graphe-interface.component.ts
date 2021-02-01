import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { MapService } from '../Service/MapService';
import { map } from 'rxjs/operators';
import am4themes_material from "@amcharts/amcharts4/themes/material";

@Component({
  selector: 'app-graphe-interface',
  templateUrl: './graphe-interface.component.html',
  styleUrls: ['./graphe-interface.component.scss']
})
export class GrapheInterfaceComponent implements OnInit {
  MesIncident:any=[]
  Secteur1=['Incident routier','Incident corporel','Incident matériel','Incident de masse']
  Type1=['collision individuelle','collision multiple','collision à dommage corporel']
  Type2=['mort','suicide','blessure','éléctrocution','brulure de 3ème degré']
  Type3=['incendie','électrique','Destruction']
  Type4=['grève importante','inondation','séisme','tsunami','épidémie','tempête']
  Statut=['pris en compte','en cours de traitement','Traité','Bloqué','redirigé','Validé','Rejeté']
  constructor(private MapService:MapService) { }

  ngOnInit() {
    this.NombreIncidentStatut()
    this.getIncident()
    this.NombreIncidentparRegion()
    this.NombreIncidentSecteurType()
    this.NombreIncidentMois()
  }
  getIncident(){
    this.MapService.onGetIncident().then(
      (value) => {
        value["pipe"](map((res => res))).subscribe(result => {
          this.MesIncident.push(result)
          console.log(this.MesIncident)
          })       
      }
    );
  }

  NombreIncidentStatut(){
    
    setTimeout(
      () => {
        //console.log("length       ="+this.MesIncident[0].length)
        am4core.useTheme(am4themes_animated);

    let chart = am4core.create("IncidentStatut", am4charts.PieChart);
    var DataStatut=[{"statut":'pris en compte',"nombre":0},{"statut":'en cours de traitement',"nombre":0},{"statut":'Traité',"nombre":0},{"statut":'Bloqué',"nombre":0},{"statut":'redirigé',"nombre":0},{"statut":'Validé',"nombre":0},{"statut":'Rejeté',"nombre":0}]
    for(var i=0;i<this.MesIncident[0].length;i++){
      if(this.MesIncident[0][i]['etat_validation']==DataStatut[0]["statut"]){DataStatut[0]["nombre"]++;}
      if(this.MesIncident[0][i]['etat_validation']==DataStatut[1]["statut"]){DataStatut[1]["nombre"]++;}
      if(this.MesIncident[0][i]['etat_validation']==DataStatut[2]["statut"]){DataStatut[2]["nombre"]++;}
      if(this.MesIncident[0][i]['etat_validation']==DataStatut[3]["statut"]){DataStatut[3]["nombre"]++;}
      if(this.MesIncident[0][i]['etat_validation']==DataStatut[4]["statut"]){DataStatut[4]["nombre"]++;}
      if(this.MesIncident[0][i]['etat_validation']==DataStatut[5]["statut"]){DataStatut[5]["nombre"]++;}
      if(this.MesIncident[0][i]['etat_validation']==DataStatut[6]["statut"]){DataStatut[6]["nombre"]++;}
    }
    //console.log(Nombre4+"    "+Nombre3+"    "+Nombre2+"         "+Nombre1)
    // Add data
    chart.data =DataStatut
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "nombre";
    pieSeries.dataFields.category = "statut";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
      }, 3000
    );
    
  }

  NombreIncidentparRegion(){
    setTimeout(
      () => {
       // console.log("length  gg     ="+this.MesIncident[0].length)
        let Region=['TANGER-TETOUAN-AL HOCEIMA','ORIENTAL-RIF','FES-MEKNES','RABAT-SALE-KENITRA','CASABLANCA-SETTAT',
    'BENI MELLAL-KHENIFRA','DRAA-TAFILALET','MARRAKECH-SAFI','SOUSS-MASSA','GUELMIM-OUED NOUN',
    'LAAYOUNE-BOUJDOUR-SAKIA AL HAMRA','ED DAKHLA-OUED EDDAHAB']
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("IncidentRegion", am4charts.PieChart);
    var dataRegion:any=[]
    for(var i=0;i<Region.length;i++){
      dataRegion.push({"region":Region[i],"nombre":0})
    }
    //console.log(dataRegion)
    for(var i=0;i<this.MesIncident[0].length;i++){
      for(var j=0;j<dataRegion.length;j++){
        //console.log(this.MesIncident[0][i]['region']+"                             "+dataRegion[j]["region"])
        if(this.MesIncident[0][i]['region']==dataRegion[j]["region"]){dataRegion[j]["nombre"]++;}
      }
    }
    
    chart.data = dataRegion;
    
    // Set inner radius
    chart.innerRadius = am4core.percent(50);
    
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "nombre";
    pieSeries.dataFields.category = "region";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
      }, 3000
      );
    
  }

  NombreIncidentSecteurType(){
    setTimeout(
      () => {
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        let container = am4core.create("IncidentSecteurType", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";
        
        
        let chart = container.createChild(am4charts.PieChart);

        let Secteur1=['Incident routier','Incident corporel','Incident matériel','Incident de masse']
        let Type1=['collision individuelle','collision multiple','collision à dommage corporel']
        let Type2=['mort','suicide','blessure','éléctrocution','brulure de 3ème degré']
        let Type3=['incendie','électrique','Destruction']
        let Type4=['grève importante','inondation','séisme','tsunami','épidémie','tempête']
        let Statut=['pris en compte','en cours de traitement','Traité','Bloqué','redirigé']

        var dataSecteurType=[{"secteur":"Incident routier","nombre":0,"subData":[{ name: "collision individuelle", value: 0 }, { name: "collision multiple", value: 0 }, { name: "collision à dommage corporel", value: 0 }]},
        {"secteur":"Incident corporel","nombre":0,"subData":[{ name: "mort", value: 0 }, { name: "suicide", value: 0 }, { name: "blessure", value: 0 }, { name: "éléctrocution", value: 0 }, { name: "brulure de 3ème degré", value: 0 }]},
        {"secteur":"Incident matériel","nombre":0,"subData":[{ name: "incendie", value: 0 }, { name: "électrique", value: 0 }, { name: "Destruction", value: 0 }]},
        {"secteur":"Incident de masse","nombre":0,"subData":[{ name: "grève importante", value: 0 }, { name: "inondation", value: 0 }, { name: "séisme", value: 0 }, { name: "tsunami", value: 0 }, { name: "épidémie", value: 0 }, { name: "tempête", value: 0 }]}]

        for(var i=0;i<this.MesIncident[0].length;i++){
          if(this.MesIncident[0][i]['secteur']=='Incident routier'){
            dataSecteurType[0]["nombre"]++;
            for(var j=0;j<dataSecteurType[0]["subData"].length;j++){
              if(dataSecteurType[0]["subData"][j].name==this.MesIncident[0][i]['type']){
                dataSecteurType[0]["subData"][j].value++;
              }
            }
          }
          if(this.MesIncident[0][i]['secteur']=='Incident corporel'){
            dataSecteurType[1]["nombre"]++;
            for(var j=0;j<dataSecteurType[1]["subData"].length;j++){
              if(dataSecteurType[1]["subData"][j].name==this.MesIncident[0][i]['type']){
                dataSecteurType[1]["subData"][j].value++;
              }
            }
          }
          if(this.MesIncident[0][i]['secteur']=='Incident matériel'){
            dataSecteurType[2]["nombre"]++;
            for(var j=0;j<dataSecteurType[2]["subData"].length;j++){
              if(dataSecteurType[2]["subData"][j].name==this.MesIncident[0][i]['type']){
                dataSecteurType[2]["subData"][j].value++;
              }
            }
          }
          if(this.MesIncident[0][i]['secteur']=='Incident de masse'){
            dataSecteurType[3]["nombre"]++;
            for(var j=0;j<dataSecteurType[3]["subData"].length;j++){
              if(dataSecteurType[3]["subData"][j].name==this.MesIncident[0][i]['type']){
                dataSecteurType[3]["subData"][j].value++;
              }
            }
          }
        }
        //console.log(dataSecteurType)
        // Add data
        chart.data =dataSecteurType
        
        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "nombre";
        pieSeries.dataFields.category = "secteur";
        pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
        //pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";
        
        pieSeries.slices.template.events.on("hit", function(event) {
          selectSlice(event.target.dataItem);
        })
        
        let chart2 = container.createChild(am4charts.PieChart);
        chart2.width = am4core.percent(30);
        chart2.radius = am4core.percent(80);
        
        // Add and configure Series
        let pieSeries2 = chart2.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = "value";
        pieSeries2.dataFields.category = "name";
        pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
        //pieSeries2.labels.template.radius = am4core.percent(50);
        //pieSeries2.labels.template.inside = true;
        //pieSeries2.labels.template.fill = am4core.color("#ffffff");
        pieSeries2.labels.template.disabled = true;
        pieSeries2.ticks.template.disabled = true;
        pieSeries2.alignLabels = false;
        pieSeries2.events.on("positionchanged", updateLines);
        
        let interfaceColors = new am4core.InterfaceColorSet();
        
        let line1 = container.createChild(am4core.Line);
        line1.strokeDasharray = "2,2";
        line1.strokeOpacity = 0.5;
        line1.stroke = interfaceColors.getFor("alternativeBackground");
        line1.isMeasured = false;
        
        let line2 = container.createChild(am4core.Line);
        line2.strokeDasharray = "2,2";
        line2.strokeOpacity = 0.5;
        line2.stroke = interfaceColors.getFor("alternativeBackground");
        line2.isMeasured = false;
        
        let selectedSlice;
        
        function selectSlice(dataItem) {
        
          selectedSlice = dataItem.slice;
        
          let fill = selectedSlice.fill;
        
          let count = dataItem.dataContext.subData.length;
          pieSeries2.colors.list = [];
          for (var i = 0; i < count; i++) {
            pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
          }
        
          chart2.data = dataItem.dataContext.subData;
          pieSeries2.appear();
        
          let middleAngle = selectedSlice.middleAngle;
          let firstAngle = pieSeries.slices.getIndex(0).startAngle;
          let animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
          animation.events.on("animationprogress", updateLines);
        
          selectedSlice.events.on("transformed", updateLines);
        
        //  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
        //  animation.events.on("animationprogress", updateLines)
        }
        
        
        function updateLines() {
          if (selectedSlice) {
            let p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
            let p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };
        
            p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
            p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);
        
            let p21 = { x: 0, y: -pieSeries2.pixelRadius };
            let p22 = { x: 0, y: pieSeries2.pixelRadius };
        
            p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
            p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);
        
            line1.x1 = p11.x;
            line1.x2 = p21.x;
            line1.y1 = p11.y;
            line1.y2 = p21.y;
        
            line2.x1 = p12.x;
            line2.x2 = p22.x;
            line2.y1 = p12.y;
            line2.y2 = p22.y;
          }
        }
        
        chart.events.on("datavalidated", function() {
          setTimeout(function() {
            selectSlice(pieSeries.dataItems.getIndex(0));
          }, 1000);
        });
      }, 3000
    );


  }

  NombreIncidentMois(){
    setTimeout(
      () => {
      am4core.useTheme(am4themes_animated);
      var dataMois:any=[]
      var dataMoisFilter=[]
      for(var i=0;i<this.MesIncident[0].length;i++){
        dataMois.push({"date":this.MesIncident[0][i]['date'].split("T")[0],"value":0})
      }
      for(var i=0;i<this.MesIncident[0].length;i++){
        if(dataMoisFilter.length>0){
          var check:boolean=false
          for(var j=0;j<dataMoisFilter.length;j++){ 
            if(this.MesIncident[0][i]['date'].split("T")[0]==dataMoisFilter[j]["date"]){
              dataMoisFilter[j]["value"]++;check=true
            }
          }
          if(check==false){
            dataMoisFilter.push({"date":this.MesIncident[0][i]['date'].split("T")[0],"value":1})
          }
        }
        else{
          dataMoisFilter.push({"date":this.MesIncident[0][0]['date'].split("T")[0],"value":1})
        }
      }
      dataMoisFilter.sort(function (a, b) {
        var nameA = new Date(a["date"]);
        var nameB = new Date(b["date"]);
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
      });
      console.log(dataMoisFilter)
      let chart = am4core.create("IncidentMois", am4charts.XYChart);

      
      // Add data
      chart.data = dataMoisFilter;

      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.strokeWidth = 3;
      series.fillOpacity = 0.5;

      // Add vertical scrollbar
      chart.scrollbarY = new am4core.Scrollbar();
      chart.scrollbarY.marginLeft = 0;

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "zoomY";
      chart.cursor.lineX.disabled = true;
    }, 3000
    );
  }



}
