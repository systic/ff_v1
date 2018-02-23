import { Component, OnInit } from '@angular/core';

import { PageTitleService } from '../../services/page-title.service';
import { DevicesService } from '../../services/devices.service';
import { AlphanumericSortPipe } from '../../pipes/alphanumeric-sort.pipe';

@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.scss']
})
export class DeviceManagementComponent implements OnInit {

  pageSize = 12;
  inGridView = true;
  currentPage = 1;
  deviceList: any;
  isAddUpdateFormVisible = false;
  // add or udpate form
  formType: string;
  formData: any;
  // sort
  sortBy: any;
  orderIn = 'descending';

  searchText = '';

  constructor(
    private pageTitleService: PageTitleService,
    private devicesService: DevicesService,
    private sortPipe: AlphanumericSortPipe) { }

  ngOnInit() {
    this.pageTitleService.pageTitle.next('Device Management');

    // get device list and update object
    this.devicesService.getDevices()
      .subscribe( response => {
        const devices = response;
        this.deviceList = devices.map( device => {
          device.selected = false;
          device.activated = true;
          return device;
        });
      });
  }

  /**
   * add a new device
   */
  addDevice() {
    this.formData = undefined;
    this.showForm('add');
  }

  /**
   * update a device only if there is one device selected otherwise ignore
   */
  updateDevice() {
    const selectedDevices = this.getSelectedDevices();
    if (selectedDevices.length === 1) {
      this.formData = selectedDevices[0];
      this.showForm('update');
    }
  }

  /**
   * returns an array of devices selected by the user
   */
  getSelectedDevices() {
    return this.deviceList.filter( device => {
      return device.selected === true;
    });
  }

  /**
   * shows device form
   * @param {string} type : type of form , add or update device
   */
  showForm(type: string) {
    this.formType = type;
    this.isAddUpdateFormVisible = true;
  }

  deactivateDevices() {
    this.deviceList.forEach( device => {
      if (device.selected) {
        device.activated = false;
        device.selected = false;
      }
    });
  }

  sortList(sortBy: string) {
    if (sortBy === this.sortBy) {
      this.orderIn = (this.orderIn === 'ascending') ? 'descending' : 'ascending';
    } else {
      this.orderIn = 'descending';
      this.sortBy = sortBy;
    }
    this.deviceList = this.sortPipe.transform(this.deviceList, this.sortBy, this.orderIn);
  }

  // update searchText so that searchFilter pipe can use it
  // and in pagination reset the current page to 1
  // note that the actual filter is implemented as a pipe in the template
  filterDevices(value: string) {
    this.currentPage = 1;
    this.searchText = value;
  }

}
