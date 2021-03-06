import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { } from '@agm/core/services/google-maps-types';
import { PageTitleService } from '../../services/page-title.service';
import { StoresService } from '../../services/stores.service';

import { StoresCountryOptions } from '../../config/stores-country-options';
import { DefaultMapConfig } from '../../config/map-config';
import { DefaultMapStyles } from '../../config/map-styles';
import { MarkerUrls } from '../../config/marker-urls';

declare const google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myMap') myMap: any;

  // map reference
  mapRef: any;

  // stores list - country wise to be fetched from api
  countryStoresList: any;

  // store counts of the region (North America)
  regionStoreCounts = {
    total: 0,
    active: 0,
    issue: 0
  };

  // selected country index based on countryStoresList array and -1 when north america is selected
  selectedCountryIndex = -1;
  selectedCountryName = 'North America';

  activeMarkers: any;
  issueMarkers: any;
  activeMarkersVisible = true;
  issueMarkersVisible = true;

  hoverStoreSummary: any;
  selectedStoreSummary: any;
  // value is closed when no infowindow is visible
  infoWindowOpenId = 'closed';

  searchText = '';

  @HostListener('document: click', ['$event']) clickedOutside($event) {
    if (this.searchText !== '') {
      this.searchText = '';
    }
  }

  constructor(
    private mapsApiLoader: MapsAPILoader,
    private pageTitleService: PageTitleService,
    private storesService: StoresService) { }

  ngOnInit() {
    this.pageTitleService.pageTitle.next('Dashboard');

    // get full country wise store list
    this.storesService.getStores()
      .subscribe( response => {
        this.countryStoresList = StoresCountryOptions;
        const list = response;

        // add fetched stores data in countryStoresList array
        // with an assumption that these two arrays will have same elements may be in different order
        for (let i = 0; i < list.length; i++) {
          const countryCode = list[i].countryCode;
          for (let j = 0; j < this.countryStoresList.length; j++) {
            if (this.countryStoresList[j].countryCode === countryCode) {

              // update region counts
              this.regionStoreCounts.active += list[i].stores.active.length;
              this.regionStoreCounts.issue += list[i].stores.issue.length;

              // add stores array with locations
              this.countryStoresList[j].stores = list[i].stores;
              break;
            }
          }
        }

        this.regionStoreCounts.total = this.regionStoreCounts.active + this.regionStoreCounts.issue;

        this.updateMarkerArrays(this.selectedCountryIndex);

      });
  }


  // initialize map : executed only after map has bene fully initialized
  onMapReady(map) {
    // set some default options on the map
    map.setOptions({
      streetViewControl: DefaultMapStyles.streetViewControl,
      zoomControlOptions: {
        position: google.maps.ControlPosition[DefaultMapStyles.zoomControlPosition]
      },
      styles: DefaultMapStyles.styles
    });

    this.mapRef = map;

    this.setMapBoundsAndCenter();
  }

  /**
   * update all marker arrays based on in the index of the counry selected
   * @param {number} index of the country from countryStoresList whose markers need to be shown
   * if index is -1 that means full region is selected
   */
  updateMarkerArrays(index: number) {
    // populate active markers array
    this.populateActiveMarkersArray(index);
    // populate issue markers array
    this.populateIssueMarkersArray(index);
  }

  /**
   * @param {index} : index of country from countryStoresList whose active markers need to be shown
   * if index is -1 that means full region was selected
   */
  populateActiveMarkersArray(index: number) {
    this.activeMarkers = [];
    if (index === -1) {
      this.countryStoresList.forEach( item => {
        this.activeMarkers = [...item.stores.active, ...this.activeMarkers];
      });
    } else {
      this.activeMarkers = [...this.countryStoresList[index].stores.active, ...this.activeMarkers];
    }
  }


  /**
   * @param {index} : index of couuntry from countryStoresList whose issue markers need to be shown
   * if index is -1 that means full region was selected
   */
  populateIssueMarkersArray(index: number) {
    this.issueMarkers = [];
    if (index === -1) {
      this.countryStoresList.forEach( item => {
        this.issueMarkers = [...item.stores.issue, ...this.issueMarkers];
      });
    } else {
      this.issueMarkers = [...this.countryStoresList[index].stores.issue, ...this.issueMarkers];
    }
  }


  resetMarkerUrls() {
    this.activeMarkers.forEach( marker => {
      marker.markerUrl = MarkerUrls.active;
    });
    this.issueMarkers.forEach( marker => {
      marker.markerUrl = MarkerUrls.issue;
    });
  }


  /**
   * @param {filter}: filter (active or issue) for markers on the map
   */
  setMarkerFilter(filter: string) {
    if (filter === 'active') {
      if (this.issueMarkersVisible && !this.activeMarkersVisible) {
        this.activeMarkersVisible = true;
      }
      this.issueMarkersVisible = !this.issueMarkersVisible;
    } else {
      if (!this.issueMarkersVisible && this.activeMarkersVisible) {
        this.issueMarkersVisible = true;
      }
      this.activeMarkersVisible = !this.activeMarkersVisible;
    }
  }


  /**
   * sets the maps zoom such that all markers are just visible
   * and also sets the center of the map
   */
  setMapBoundsAndCenter() {

    const totalMarkers = [...this.issueMarkers , ...this.activeMarkers];

    const bounds = new google.maps.LatLngBounds();
    totalMarkers.forEach( marker => {
      bounds.extend(new google.maps.LatLng(marker.location[0], marker.location[1]));
    });

    // add some padding so that markers are not at the edge
    let boundsPadding = 0.1;

    // increase the paddding if there is just one marker so that the maps zooom should not be too deep
    if (totalMarkers.length === 1) {
      boundsPadding = 1;
    }

    // add the padding in the bounds
    const extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + boundsPadding, bounds.getNorthEast().lng() + boundsPadding);
    const extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - boundsPadding, bounds.getNorthEast().lng() - boundsPadding);
    bounds.extend(extendPoint1);
    bounds.extend(extendPoint2);

    this.mapRef.fitBounds(bounds, 0);


    // set the center according to the selected region
    this.mapsApiLoader.load().then(() => {
      const geoCoder = new google.maps.Geocoder();
      geoCoder.geocode({ 'address': this.selectedCountryName }, (results, status) => {
        if (status === 'OK') {
          if (totalMarkers.length === 0) {
            this.mapRef.setCenter(results[0].geometry.location);
          }
        }
      });
    });
  }

  /**
   * filter the stores on the country selected ftom the dropdown and update marker arrays
   * @param {number} index of the country selected
   */
  filterStoresOnCountry(index: number) {
    this.selectedCountryIndex = index;
    if (index === -1) {
      this.selectedCountryName = 'North America';
    } else {
      this.selectedCountryName = this.countryStoresList[index].countryName;
    }

    // close store summary
    this.selectedStoreSummary = false;

    // reset markerUrls
    this.resetMarkerUrls();

    // update the marker arrays
    this.updateMarkerArrays(index);

    // set map bounds
    this.setMapBoundsAndCenter();
  }


  /**
   * fetch and populate the selectedStoreSummary object when user clicks on a marker
   * @param {string} id storeId of the store to be fetched for
   */
  populateSelectedStoreSummary(id: string) {
    this.selectedStoreSummary = false;
    this.storesService.getStoreSummary(id)
      .subscribe( response => {
        this.selectedStoreSummary = response;
    });
  }


  /**
   * this function gets the geocode results on the given marker latlng
   * then it sets the selected country index and
   * then it sets the selected marker icon in place of the selected marker/store
   * @param {[type]} type          type of store 'active' or 'issue'
   * @param {[type]} storeLocation lat lng of the store selected
   * @param {[type]} storeId       storeid of the store
   */
  selectStoreOnMap(type, storeLocation, storeId) {
    this.mapsApiLoader.load().then(() => {
      const geoCoder = new google.maps.Geocoder();
      const latlng = {
        lat: storeLocation[0],
        lng: storeLocation[1]
      };
      geoCoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === 'OK') {
          this.selectedCountryName = results.slice(-2)[0].formatted_address;
          this.mapRef.setZoom(6);
          this.mapRef.setCenter(new google.maps.LatLng(storeLocation[0], storeLocation[1]));

          // update selected country index
          const countryCode = results.slice(-1)[0].address_components[0].short_name;
          for (let i = 0; i < this.countryStoresList.length; i++) {
            if (countryCode === this.countryStoresList[i].countryCode) {
              this.selectedCountryIndex = i;
              break;
            }
          }

          // set selected marker icon on the selected marker
          this.resetMarkerUrls();
          if (type === 'active') {
            this.activeMarkers.forEach(item => {
              if (item.id === storeId) {
                item.markerUrl = MarkerUrls.activeSelected;
              }
            });
          } else {
            this.issueMarkers.forEach(item => {
              if (item.id === storeId) {
                item.markerUrl = MarkerUrls.issueSelected;
              }
            });
          }

          this.populateSelectedStoreSummary(storeId);
        }
      });
    });
  }

  /**
   * fetch and populate the hoverStoreSummary object when user hovers over a marker
   * and assign infoWindowOpenId so that the infowindow for a storeId is visible
   * @param {string} storeId id of the store to be fetched for and infoWindow shown
   */
  showInfoWindow(storeId) {
    this.storesService.getStoreSummary(storeId)
      .subscribe( response => {
        this.hoverStoreSummary = response;
        this.infoWindowOpenId = storeId;
    });
  }


  /**
   * select store from search suggestions and show it on the map as selected
   * @param {string} type          type of store active or issue
   * @param {[type]} storeLocation store location in latlng
   * @param {[type]} storeId       storeId of the store selected
   */
  selectSearchSuggestion(type: string, storeLocation, storeId) {
    this.selectStoreOnMap(type, storeLocation, storeId);
  }

}
