import { Component, OnInit } from '@angular/core';


import Map from 'ol/Map';
import proj from 'ol/proj/Projection';
import {transform as transform0}   from 'ol/proj';
//import proj from 'ol/proj';
import {Source as source}  from 'ol/source';
import {Layer as layer} from 'ol/layer';
import Vector from 'ol/layer/Vector';
import {Vector as Vector1}  from 'ol/source';
//import control from 'ol/control/Control';
//import {Control as control} from 'ol/control';
import FullScreen from 'ol/control/FullScreen';
import MousePosition from 'ol/control/MousePosition';
import Attribution from 'ol/control/Attribution';
import OverviewMap from 'ol/control/OverviewMap';
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import Control  from 'ol/control/Control';
import {defaults as defaultControls} from 'ol/control';
//import LayerSwitcher  from 'ol/control/LayerSwitcher';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Tile from 'ol/layer/Tile';
import KML from 'ol/format/KML';
import {format as format1} from 'ol/coordinate';
import LayerSwitcher from 'ol-layerswitcher/src/ol-layerswitcher';
import TileWMS from 'ol/source/TileWMS';
import OSMXML from 'ol/format/OSMXML';
import Group from 'ol/layer/Group';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke'; 
import Feature from 'ol/Feature';
import Text from 'ol/style/Text';
import Projection from 'ol/proj/Projection';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { UserService } from '../Service/UserService';
import turf from '@turf/turf';
import * as turf1 from '@turf/turf'
import {lineString as linestring11} from '@turf/helpers/index.js';
import {point as point1} from '@turf/helpers/index.js';
import {polygon as polygon1} from '@turf/helpers/index.js';
import { map } from 'rxjs/operators';
import { MapService } from '../Service/MapService';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-interface-map',
  templateUrl: './interface-map.component.html',
  styleUrls: ['./interface-map.component.scss']
})
export class InterfaceMapComponent implements OnInit {
  map:any;
  DataFiltre:any;
  IncidentLocalisation:Feature=[];
  imageStyle = new Style({
    image: new Circle({
          radius: 5,
          snapToPixel: false,
          fill: new Fill({
          color: [255 , 0 , 0 , 0.2]
      }),
      stroke: new Stroke({
          color: [255 ,0 ,0, 1],
          width: 1
      })
  })
  });

  NomsRegionFiltre:any=[];
  NomsProvinceFiltre:any=[];
  NomsVilleFiltre:any=[];

  ListSpecialisation:any;
  ListSecteur:String[]=[];
  ListType:String[]=[];

  constructor(private MapService:MapService,private http: HttpClient,private UserService:UserService) { }


  testJSON(){
    //console.log("11111"+this.DataFiltre)
    if(this.DataFiltre==null){
      console.log("isssssssssssssssssssss nulllllllllllllll")
    }else{
      var coordonnee = [-6.30, 32.0];
      var coordonnee2 = [-6.30, 31.0];
      var coordonnee3 = [-8.5,32.0];
      var coordonnee4 = [-8.58,31.48];
      var pt1 = point1( [-8.58,31.48]);
      var pt2 = point1([-8.5, 32.0]);
      var pt3 = point1([-6.30,  31.0]);
      var pt1 = point1([-6.30, 32.0]);
      var polygon =polygon1([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
      var isInside2 = turf1.inside(pt3,this.DataFiltre);
      console.log("yeeeeeeeeeeeeeeeeeesssssssssss="+isInside2 )
    }
  }

  TransformToPoint(Data){
    Data=this.FilterIncident(Data)
    var features = [];
    var layer1 = new Tile({
      source: new OSM()
    });
    if(Data!=null){
      for (let i = 0; i < Data.length; i++) {
        var coordonnee = [Data[i]["longitude"], Data[i]["latitude"]];
        var point = new Point(coordonnee, 'XY');
        var point_feature = new Feature ( point );
        point_feature.setStyle(this.imageStyle);
        this.transform_geometry(point_feature,layer1)
        
        features[i]=point_feature
      }
    }
    this.map.getLayers().array_[1].getLayers().getArray().forEach(layer => {
      if (layer && layer.values_.title=='Incident') {
        var index = this.map.getLayers().array_[1].getLayers().getArray().indexOf(layer );
        this.map.getLayers().array_[1].getLayers().getArray().splice(index, 1)
      }
    });
    var layer_point = new Vector({
      title : 'Incident',
      source: new Vector1( {
        features: features
      })
    });
    this.map.getLayers().array_[1].getLayers().extend([layer_point])
    return features;
    
  }

  getIncident(){
    this.MapService.onGetIncident().then(
      (value) => {
        value["pipe"](map((res => res))).subscribe(result => {
          console.log(result)
          this.TransformToPoint(result)         
          })
      }
    );
  }

  
  FilterIncident(DataIncident){
    var features:any = [];
    var FilterRegion=document.getElementsByClassName('FilterRegion')[0]["value"]
    //console.log("FilterRegion  ="+FilterRegion)
    var FilterProvince=document.getElementsByClassName('FilterProvince')[0]["value"]
    //console.log("FilterProvince  ="+FilterProvince)
    var FilterVille=document.getElementsByClassName('FilterVille')[0]["value"]
    var FilterEtat=document.getElementsByClassName('FilterEtat')[0]["value"]
    var FilterSecteur=document.getElementsByClassName('FilterSecteur')[0]["value"]
    var FilterType=document.getElementsByClassName('FilterType')[0]["value"]
    
    if(DataIncident!=null){
      for (let i = 0; i < DataIncident.length; i++) {
        var checkFilter=true
        if(FilterRegion.length>0 && DataIncident[i]["region"]!=FilterRegion){
          checkFilter=false
        }
        if(FilterProvince.length>0 && DataIncident[i]["province"]!=FilterProvince){
          checkFilter=false
        }
        console.log("checkFilter   ="+checkFilter)
        if(FilterVille.length>0 && DataIncident[i]["ville"]!=FilterVille){
          checkFilter=false
        }
        if(FilterEtat.length>0 && DataIncident[i]["etat_validation"]!=FilterEtat){
          checkFilter=false
        }
        if(FilterSecteur.length>0 && DataIncident[i]["secteur"]!=FilterSecteur){
          checkFilter=false
        }
        if(FilterType.length>0 && DataIncident[i]["type"]!=FilterType){
          checkFilter=false
        }
        if(checkFilter==true){
          features.push(DataIncident[i])
        }
      }
    }
    console.log(features)
    return features
  }

  RemplirAttributFiltre(){
    this.MapService.RetournerNomsRegions().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        result.features.forEach(element => {
          if(element.properties.Nom_Region.length>1){
            this.NomsRegionFiltre.push(element.properties.Nom_Region)
          }
        });
        })
    });
    this.MapService.RetournerNomsProvinces().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        result.features.forEach(element => {
          if(element.properties.Nom_Provin.length>1){
            this.NomsProvinceFiltre.push(element.properties.Nom_Provin)
          }
        });
        })
    });
    this.MapService.RetournerNomsVille().then((value) => {
      value["pipe"](map((res => res))).subscribe(result => {
        //console.log(result)
        result.features.forEach(element => {
          if(element.properties.NOM.length>1){
            this.NomsVilleFiltre.push(element.properties.NOM)
          }
          
        });
        })
    });
  }
 
  deleteFilterRegion(){
    document.getElementsByClassName('FilterRegion')[0]["value"]=""
  }
  
  deleteFilterProvince(){
    document.getElementsByClassName('FilterProvince')[0]["value"]=""
  }

  deleteFilterVille(){
    document.getElementsByClassName('FilterVille')[0]["value"]=""
  }

  deleteFilterEtat(){
    document.getElementsByClassName('FilterEtat')[0]["value"]=""
  }

  deleteFilterSecteur(){
    document.getElementsByClassName('FilterSecteur')[0]["value"]=""
    document.getElementsByClassName('FilterType')[0]["value"]=""
  }

  deleteFilterType(){
    document.getElementsByClassName('FilterType')[0]["value"]=""
  }

  DisplayListSecteur(){
    if(this.ListSpecialisation!=null){
      for(let Secteur of this.ListSpecialisation){
        this.ListSecteur.push(Secteur.secteur)
      }
      this.ListSecteur=this.ListSecteur.filter((v,i,a)=>a.indexOf(v)==i);
    }
  }
  DisplayListType(){
    let NomSecteur=document.getElementsByClassName('FilterSecteur')[0]["value"]
    if(NomSecteur!=null){
      this.ListType=[]
      for(let type of this.ListSpecialisation){
        if(type.secteur==NomSecteur){
          this.ListType.push(type.type)
        }
      }
      this.ListType=this.ListType.filter((v,i,a)=>a.indexOf(v)==i);
    }
    else{
      document.getElementsByClassName('FilterType')[0]["value"]=""
    }
  }

  
  ngOnInit() {


    /************** */
    this.RemplirAttributFiltre()
    this.getIncident()
    /************ */

    document.getElementsByClassName('tableFilter')[0]['hidden']=true
    /************ */
    var click = document.getElementById('clickme');
    click.addEventListener('click', myfunction);
    
    function myfunction() {
      if(document.getElementsByClassName('tableFilter')[0]['hidden']==true){
        document.getElementsByClassName('tableFilter')[0]['hidden']=false
      }else{
        document.getElementsByClassName('tableFilter')[0]['hidden']=true
      }
    };
    /****************** */

    /******************* */
    this.UserService.GetSpecialisation1().then(
      (value) => {
        value["pipe"](map((res => res))).subscribe(result => {
          console.log(result);
          this.ListSpecialisation=result;console.log(this.ListSpecialisation)
          this.DisplayListSecteur()
          //this.DisplayListType1(this.CurrentUser["specialisation"]["secteur"],result)
          })

      }
    );
    /********************* */


    
    


    this.MapService.GetFichierJSON().then(
      (value) => {
        value["pipe"](map((res => res))).subscribe(result => {
          console.log(result.features[0].geometry.coordinates);
          this.DataFiltre=result.features[0].geometry.coordinates
          })
      }
    );

 

// attribution
var attribution = new Attribution({
  collapsible: true,
  collapsed: true,
})
// full screen
var iconFullScreen = document.createElement("span");
iconFullScreen.className = "fa fa-arrows";
var fscreen = new FullScreen({
  label: iconFullScreen,
})
// mouse position
var mposition = new MousePosition({
  undefinedHTML: '<span class="label label-success"><i class="fa fa-map-marker"></i> No data</span>',
  projection: 'EPSG:4326',
  coordinateFormat: function(coordinate) {
    return format1(coordinate, '<span class="label label-success"><i class="fa fa-map-marker"></i> {x} ° | {y} °</span>', 4);
  }
})
// overview map
var iconOverview = document.createElement("span");
iconOverview.className = "fa fa-eye bg-success text-success";
var iconNoOverview = document.createElement("span");
iconNoOverview.className = "fa fa-eye-slash bg-danger text-danger";
var overview = new OverviewMap({
  collapsible: true,
  collapsed: true,
  label: iconOverview,
  collapseLabel: iconNoOverview,
  layers: [
    new Tile({
    source: new OSM({})
    })
  ],
})
// scale line
var scale = new ScaleLine();
// zoom slider
var zslider = new ZoomSlider();
// zoom to extent
var zextent = new ZoomToExtent({
  extent: [-11243808.051695308, 4406397.202710291, -4561377.290892059, 6852382.107835932]
});




/*var vector = new Vector({
  title : 'Regions',
  source: new Vector1({
    url: 'https://raw.githubusercontent.com/yassine-zouhri/test/master/RefionProjetFinal.kml',
    format: new KML({
      extractStyles: false
    })
  })
  
});*/
var imageStyle = new Style({
  image: new Circle({
        radius: 5,
        snapToPixel: false,
        fill: new Fill({
        color: [255 , 0 , 0 , 0.2]
    }),
    stroke: new Stroke({
        color: [255 ,0 ,0, 1],
        width: 1
    })
})
});
var imageStyle1 = new Style({
  image: new Icon({
    color: '#8959A8',
    crossOrigin: 'anonymous',
    src: 'https://img.icons8.com/material-rounded/24/000000/cloud-network.png',
    scale: 0.8,
  }),
});
var coordonnee = [-6.30, 32.0];
var coordonnee2 = [-6.30, 31.0];
var coordonnee3 = [-8.5,32.0];
var coordonnee4 = [-8.58,31.48];
var point = new Point(coordonnee, 'XY');
var point2 = new Point(coordonnee2, 'XY');
var point3 = new Point(coordonnee3, 'XY');
var point4 = new Point(coordonnee4, 'XY');
var point_feature = new Feature ( point );
var point_feature2 = new Feature ( point2 );
var point_feature3 = new Feature ( point3 );
var point_feature4 = new Feature ( point4);
point_feature.setStyle(imageStyle);
point_feature3.setStyle(imageStyle);
point_feature2.setStyle(imageStyle1);
var features = [ point_feature,point_feature2,point_feature3,point_feature4];
var layer1 = new Tile({
  source: new OSM()
});
/*var current_projection = new Projection({ code: "EPSG:4326" });
var new_projection = layer1.getSource().getProjection();
point_feature.getGeometry().transform(current_projection, new_projection);*/

for (let i = 0; i < features.length; i++) {
  this.transform_geometry(features[i],layer1)
}

/*for(let a in features){
  console.log(a)
  this.transform_geometry(a,layer1)
}*/
var layer_point = new Vector({
  title : 'Point',
  source: new Vector1( {
    features: features
  })
});


 
var linestring1=linestring11([
  [4.9020, 52.3667],
  [4.9030, 52.3667],
  [4.9040, 52.3667],
  [4.9050, 52.3667]
]);
var pt1 = point1([4.9040, 52.3667]);
var pt2 = point1([4.9060, 52.3667]);
var polygon =polygon1([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
var isInside1 = turf1.inside(pt1, polygon);
console.log("idddddddddddddddddd="+isInside1 )





    this.map = new Map({
      controls: defaultControls({
        attribution : true,
      }).extend([
        attribution,
        fscreen,
        mposition,
        overview,
        scale,
        zslider,
        zextent
      ]),
       /* Déclaration des couches de la carte */
 

      target: 'hotel_map',

      


      layers: [
        new Group({
          title: 'Base maps',
          fold: 'open',
              layers: [
                      new Tile({
                      title: 'OSM',
                      type: 'base',
                      visible: true,
                      source: new OSM(),
                      }),                      
                      ],
          }),
          new Group({
            title: 'Couches',
            fold: 'open',
            layers: [
                new Tile({
                    title: 'Regions',
                    type: 'Overlays',
                    visible: true,
                    source: new TileWMS({
                        url: 'http://localhost:8080/geoserver/cite/wms',
                        params: {
                            'LAYERS': 'cite:Regions',
                            'TRANSPARENT': 'true',
                            'WIDTH': 640, 
                            'HEIGHT': 480,
                        

                            }
                        })
                    }),layer_point,
                    new VectorLayer({
                      title: 'GeoJSON',
                      source: new VectorSource({
                        crossOrigin: 'anonymous',
                        //url: 'https://github.com/yassine-zouhri/test/blob/master/Region.geojson',
                        url:'http://localhost:8080/geoserver/cite/ows?service=WFS&request=GetFeature&typeName=cite:Regions&CQL_FILTER=(OBJECTID=7)&outputFormat=application/json',
                        format: new GeoJSON(),
                      }),
                    }),
                    new Tile({
                      title: 'Provinces',
                      type: 'Overlays',
                      visible: true,
                      source: new TileWMS({
                          url: 'http://localhost:8080/geoserver/cite/wms',
                          params: {
                              'LAYERS': 'cite:Province',
                              'TRANSPARENT': 'true',
                              'WIDTH': 640, 
                              'HEIGHT': 480
                              }
                          })
                      }),
    
            ]
        }),
      ],
      /* Caractéristiques de la vue de la carte */
      view: new View({
        center: transform0([-7.63, 33.56], "EPSG:4326", "EPSG:3857"),
        zoom: 5,
      })
    });
    var layerSwitcher = new LayerSwitcher();
    this.map.addControl(layerSwitcher);	
  
  }


    transform_geometry(element,layer) {
      var current_projection = new Projection({ code: "EPSG:4326" });
      var new_projection = layer.getSource().getProjection();
      element.getGeometry().transform(current_projection, new_projection);
    }

}
