import { Component, ElementRef, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MapService } from '../Service/MapService';
import { map } from 'rxjs/operators';
import * as Leaflet from 'leaflet';
import { latLng, tileLayer } from 'leaflet';
import { icon, Marker} from 'leaflet';
import * as proj4leaflet from "proj4leaflet";
import 'proj4leaflet';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
//import * as jsPDF from 'jspdf'
//import jsPDF from 'jspdf';
import 'jspdf-autotable';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-table-incident',
  templateUrl: './table-incident.component.html',
  styleUrls: ['./table-incident.component.scss']
})
export class TableIncidentComponent implements OnInit {
  MesIncident:any=[]
  MesPhoto:any=[]
  IncidentWithPhoto:any=[]
  MyOriginalListAllIncidentwithPhoto:any=[]
  Secteur1=['Incident routier','Incident corporel','Incident matériel','Incident de masse']
  Type1=['collision individuelle','collision multiple','collision à dommage corporel']
  Type2=['mort','suicide','blessure','éléctrocution','brulure de 3ème degré']
  Type3=['incendie','électrique','Destruction']
  Type4=['grève importante','inondation','séisme','tsunami','épidémie','tempête']
  Statut=['pris en compte','en cours de traitement','Traité','Bloqué','redirigé','Validé','Rejeté']
  MyTypes=[]
  NomsProvinceFiltre:any=[];
  map:any;
  p:number=1
  title = 'Excel';  

  
  constructor(private MapService:MapService) { }

  ngOnInit() {
    this.getIncident()
    this.RemplirAttributFiltre()
    document.getElementById('mapId').hidden=true
  }

  ChangeType(secteur){
    console.log(secteur)
    if(secteur=='Incident routier'){
      this.MyTypes=this.Type1;
    }
    if(secteur=='Incident corporel'){
      this.MyTypes=this.Type2
    }
    if(secteur=='Incident matériel'){
      this.MyTypes=this.Type3
    }
    if(secteur=='Incident de masse'){
      this.MyTypes=this.Type4
    }
    console.log(this.MyTypes)
  }

  RemplirAttributFiltre(){
    this.MapService.RetournerNomsProvinces().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        result.features.forEach(element => {
          if(element.properties.Nom_Provin.length>1){
            this.NomsProvinceFiltre.push(element.properties.Nom_Provin)
          }
        });
        })
    });
  }

  getIncident(){
    this.MapService.onGetIncident().then(
      (value) => {
        value["pipe"](map((res => res))).subscribe(result => {
          this.MesIncident.push(result)
          })       
      }
    );

    setTimeout(
      () => {
        this.MapService.onGetIncidentPhoto().then(
          (value) => {
            value["pipe"](map((res => res))).subscribe(result => {
              result.forEach(element => {
                for(var i=0;i<this.MesIncident[0].length;i++){
                  if(this.MesIncident[0][i]['id']==element['id_Incident']){
                    var date=this.MesIncident[0][i]['date'].split("+")[0].split("T")[0]+"  "+this.MesIncident[0][i]['date'].split("+")[0].split("T")[1].split(".")[0]
                    var statut=this.MesIncident[0][i]['etat_validation']
                    if(statut==null){statut='en cours de traitement'}
                    var a={secteur:this.MesIncident[0][i]['secteur'],type:this.MesIncident[0][i]['type'],province:this.MesIncident[0][i]['province'],
                        description:this.MesIncident[0][i]['description'],statut:statut,date:date,
                        photo:'data:image/jpeg;base64,'+element['data'],longitude:this.MesIncident[0][i]['longitude'],
                        latitude:this.MesIncident[0][i]['latitude']}
                    this.IncidentWithPhoto.push(a)                    
                  }
                }   
              });
              this.MyOriginalListAllIncidentwithPhoto=this.IncidentWithPhoto
              console.log(this.MyOriginalListAllIncidentwithPhoto)
              this.leafletMap()
              })              
          }
        );
      }, 2000
    );
  }


  OndeleteFilter(){
    document.getElementById('secteurfilter')['value']=""
    document.getElementById('typefilter')['value']=""
    document.getElementById('provinceFilter')['value']=""
    document.getElementById('statutFilter')['value']=""
    this.IncidentWithPhoto=this.MyOriginalListAllIncidentwithPhoto
    this.map.remove();
    this.leafletMap()
  }

  onFilter(){
    this.IncidentWithPhoto=this.MyOriginalListAllIncidentwithPhoto
    var features:any = [];
    var secteurFilter=document.getElementById('secteurfilter')['value']
    var typeFilter=document.getElementById('typefilter')['value']
    var provinceFilter=document.getElementById('provinceFilter')['value']
    var statutFilter=document.getElementById('statutFilter')['value']
    console.log(secteurFilter+"   "+typeFilter+"   "+provinceFilter+"     "+statutFilter)
    console.log(this.IncidentWithPhoto)

   if(this.IncidentWithPhoto!=null){
      for (let i = 0; i < this.IncidentWithPhoto.length; i++) {
        var checkFilter=true
        if(secteurFilter.length>0 && this.IncidentWithPhoto[i]["secteur"]!=secteurFilter){
          checkFilter=false
        }
        if(typeFilter.length>0 && this.IncidentWithPhoto[i]["type"]!=typeFilter){
          checkFilter=false
        }
        if(provinceFilter.length>0 && this.IncidentWithPhoto[i]["province"]!=provinceFilter){
          checkFilter=false
        }
        if(statutFilter.length>0 && this.IncidentWithPhoto[i]["statut"]!=statutFilter){
          checkFilter=false
        }
        if(checkFilter==true){
          features.push(this.IncidentWithPhoto[i])
        }
      }
    }
    this.IncidentWithPhoto=features
    console.log(this.IncidentWithPhoto)
    this.map.remove();
    this.leafletMap()
    
  }

  leafletMap() {
    
    this.map = Leaflet.map('mapId',).setView([32,-6.30], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 0,
      attribution: ''
    }).addTo(this.map);
    const iconUrl = 'assets/marker-icon.png';
    const iconDefault = icon({
      iconUrl,
    });
    Marker.prototype.options.icon = iconDefault;
    console.log(this.IncidentWithPhoto.length)
    console.log(this.IncidentWithPhoto)
    for(var i=0;i<this.IncidentWithPhoto.length;i++){
      const markPoint = Leaflet.marker([this.IncidentWithPhoto[i]["latitude"],this.IncidentWithPhoto[i]["longitude"]]).bindPopup("Secteur ");
      this.map.addLayer(markPoint);  
    } 
  }

  onClickShowMap(){
    document.getElementById('idTable').hidden=true
    document.getElementById('mapId').hidden=false
    this.map.remove();
    this.leafletMap()
  }

  onClickShowTable(){
    document.getElementById('idTable').hidden=false
    document.getElementById('mapId').hidden=true
  }

  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('ExelTable'));  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  } 
  
  exportToExcel1(){
    let tableData = document.getElementById('ExelTable').outerHTML;
      //tableData = tableData.replace(/<img[^>]*>/gi,""); //enable thsi if u dont want images in your table
    tableData = tableData.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
      tableData = tableData.replace(/<input[^>]*>|<\/input>/gi, ""); //remove input params
  
    tableData = tableData + '<br /><br />Code witten By sudhir K gupta. If you found this helpful then please like my FB page -<br/>https://facebook.com/comedymood<br />My Blog - https://comedymood.com'
  
    //click a hidden link to which will prompt for download.
    let a = document.createElement('a')
    let dataType = 'data:application/vnd.ms-excel';
    a.href = `data:application/vnd.ms-excel, ${encodeURIComponent(tableData)}`
    a.download = 'sudhir600_' + "this.rand()" + '.xls'
    a.click()
  }
 /*rand() {
   let rand = Math.floor((Math.random().toFixed(2)*100))
    let dateObj = new Date()
    let dateTime = `${dateObj.getHours()}${dateObj.getMinutes()}${dateObj.getSeconds()}`
  
    return `${dateTime}${rand}`
    return "test"
  }*/

 /* ExportToPDF(){
    let printContents, popupWin;
    printContents = document.getElementById('ExelTable').innerHTML;
    console.log(printContents)
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
      <title>Print tab</title>

    </head>
<body onload="window.print();window.close()"><table class="table table-bordered">${printContents}</table></body>
  </html>`
    );
    popupWin.document.close();
  }
  public SavePDF1(): void {  
    
      var divContents = $("#ExelTable").html();
      var printWindow = window.open('', '', 'height=400,width=800');
      printWindow.document.write('<html><head><title>DIV Contents</title>');
      printWindow.document.write('</head><body >');
      printWindow.document.write(divContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
  
  } */


generatePdf(){
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  const documentDefinition = this.getDocumentDefinition();
  pdfMake.createPdf(documentDefinition).open();
 }
 getDocumentDefinition(){
  return {
    content: [

      {
        text: 'Mes incidents',
        bold: true,
        fontSize: 20,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {

      },
      
      {
        //layout: 'headerLineOnly',
        table: {
          headerRows: 0,
          dontBreakRows: true,
          widths: [ '*', 300],
          body: this.RemplirTablePDF()
        }
      }
    
    ],
      styles: {
        name: {
          fontSize: 16,
          bold: true
        }
      }
  };
 }



 getProfilePicObject(Data) {
  //this.getBase64()
  if (true) {
    return {
      image: Data,
      width: 200,
      height:200,
      alignment : 'right'
    };
  }
  return null;
}


RemplirTablePDF(){
  const exs = [];
  exs.push([ { text: "Image de l'incident", bold: true },{ text: "Detail de l'incident", bold: true }])
  this.IncidentWithPhoto.forEach(element => {
    exs.push(
      [ this.getProfilePicObject(element["photo"] ), {
        columns: [
          [{
            text: "Secteur :"+element["secteur"],
            //style: 'name'
          },
          {
            text: "Type :"+element["type"],
          },
          {
            text: 'Statut : ' +element["statut"],
          },
          {
            text: 'Province : ' +element["province"],
          },
          {
            text: 'Date : ' +element["date"],
          },
          {
            text: 'Coordonnée : ' +element["longitude"]+"   "+element["latitude"],
          },
          {
            text: 'Description : ' +element["description"],
          }
         
          ],
          [
           // this.getProfilePicObject()
          // this.getExperienceObject1()
          ]
        ]
      }]
    );
  });
  console.log(exs)
  return  exs
}



}
