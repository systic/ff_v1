import { Component, OnInit } from '@angular/core';

import { PageTitleService } from '../../services/page-title.service';
import { UsersService } from '../../services/users.service';
import { AlphanumericSortPipe } from '../../pipes/alphanumeric-sort.pipe';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  pageSize = 12;
  inGridView = true;
  currentPage = 1;
  userList: any;
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
    private usersService: UsersService,
    private sortPipe: AlphanumericSortPipe) { }

  ngOnInit() {
    this.pageTitleService.pageTitle.next('User Management');

    // get user list and update object
    this.usersService.getUsers()
      .subscribe( response => {
        const users = response;
        this.userList = users.map( user => {
          user.selected = false;
          user.activated = true;
          return user;
        });
      });
  }

  /**
   * add a new user
   */
  addUser() {
    this.formData = undefined;
    this.showForm('add');
  }

  /**
   * update a user only if there is one user selected otherwise ignore
   */
  updateUser() {
    const selectedUsers = this.getSelectedUsers();
    if (selectedUsers.length === 1) {
      this.formData = selectedUsers[0];
      this.showForm('update');
    }
  }

  /**
   * returns an array of users selected by the user
   */
  getSelectedUsers() {
    return this.userList.filter( user => {
      return user.selected === true;
    });
  }

  /**
   * shows user form
   * @param {string} type : type of form , add or update user
   */
  showForm(type: string) {
    this.formType = type;
    this.isAddUpdateFormVisible = true;
  }

  deactivateUsers() {
    this.userList.forEach( user => {
      if (user.selected) {
        user.activated = false;
        user.selected = false;
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
    this.userList = this.sortPipe.transform(this.userList, this.sortBy, this.orderIn);
  }

  // update searchText so that searchFilter pipe can use it
  // and in pagination reset the current page to 1
  // note that the actual filter is implemented as a pipe in the template
  filterUsers(value: string) {
    this.currentPage = 1;
    this.searchText = value;
  }

}
