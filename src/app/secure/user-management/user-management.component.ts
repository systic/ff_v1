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
  selectedUser: any;

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
   * update a user only if there is a user selected otherwise ignore
   */
  updateUser() {
    if (this.selectedUser) {
      this.formData = this.selectedUser;
      this.showForm('update');
    }
  }


  /**
   * shows user form
   * @param {string} type : type of form , add or update user
   */
  showForm(type: string) {
    this.formType = type;
    this.isAddUpdateFormVisible = true;
  }

  /**
   * toggle the selected user's activation status
   */
  toggleUserActivation() {
    if (this.selectedUser) {
      this.selectedUser.activated = !this.selectedUser.activated;
      this.selectedUser.selected = false;
      this.selectedUser = undefined;
    }
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

  /**
   * select a user when clicked on checkbox, but only select one at a time
   * @param {[type]} currentUser the user whose checkbox was toggled
   */
  selectUser(currentUser) {
    // unselect all users other than the toggled user
    this.userList.forEach( user => {
      if (currentUser !== user) {
        user.selected = false;
      }
    });
    // toggle user selection
    currentUser.selected = !currentUser.selected;

    // assign selected user if current user checkbox is checked else make it undefined
    if (currentUser.selected) {
      this.selectedUser = currentUser;
    } else {
      this.selectedUser = undefined;
    }
  }

}
