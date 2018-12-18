import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: any;
  public currentPage : number = 1;
  public pageSize : number = 1;
  public pages : number = 1;
  public countUsers: number = 0;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getAllUsers(this.currentPage).subscribe((res)=> {
      this.users = res.docs;
      this.currentPage = res.page;
      this.countUsers = res.total;
      this.pageSize = res.limit;
      this.pages = res.pages;
    })
  }

  public onRoleChange(value, user): void {
    let backupValue = user.role;
    console.log(value);
    console.log(user);

    if (value === 'user' || value === 'admin') {
      user.role = value;

      this.userService.updateUser(user).toPromise().then((res) => {
        this.toastr.success("De gebruikersrol is succesvol gewijzigd.", "Gebruiker wijzigen");
      }).catch (err => {
        this.toastr.error("De gebruikersrol kan niet gewijzigd worden.", "Gebruiker wijzigen");
        user.role = backupValue;
      });
    } else {
      this.toastr.error("Er is een ongeldige waarde geconstateerd.", "Gebruiker wijzigen");
      user.role = backupValue;
    }
  }

  public onStatusChange(value, user): void {
    let backupValue = !!user.isActive;
    console.log(!!value);
    console.log(user);
    if (!!value === false || !!value === true) {
      user.isActive = !!value;
      console.log(user.isActive);

      this.userService.updateUser(user).toPromise().then((res) => {
        this.toastr.success("De gebruikerstatus is succesvol gewijzigd.", "Gebruiker wijzigen");
      }).catch (err => {
        this.toastr.error("De gebruikerstatus kan niet gewijzigd worden.", "Gebruiker wijzigen");
        user.isActive = backupValue;
      });
    }
    else {
      this.toastr.error("Er is een ongeldige waarde geconstateerd.", "Gebruiker wijzigen");
      user.isActive = backupValue;
    }
  }

  public deleteUser(user) {
    this.userService.deleteUser(user._id).toPromise().then((res) => {
      this.users.splice(this.users.findIndex(user => user._id === user._id), 1)
      this.toastr.success("De gebruiker is succesvol verwijderd.", "Gebruiker verwijderen");
    }).catch (err => {
      this.toastr.error("De gebruiker kan niet verwijderd worden.", "Gebruiker verwijderen");
    });
  }

  public pageChanged(value) {
    this.currentPage = value;
    this.getUsers();
  }
}
