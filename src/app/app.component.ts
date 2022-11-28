import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Cars } from './interfaces/cars.enum';
import { UserForm } from './interfaces/user-form.interface';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  carsEnum = Cars;
  users: Array<User> = [];

  // 1. Using :
  // let myStr: string;  // declaring a variable with its type as string

  // 2. Using as
  // let strLength = (myStr as string).length; // casting a variable's type to string type using `as` keyword,but here type of strLength is determine by type assertion as there is no explicit type defined.

  // 3. Using <> on left side
  // let strLength = <string>myStr.length;  // same as 2 above but using <>

  // 4. Using <> on right side
  // let myObs: Observable<number>  // Observable is a generic type you can specify its type(T) in  Observable<T>, here it is `number` type.

  userForm = <UserForm>{
    firstname: "",
    lastname: "",
    car: ""
  }

  constructor(private userService: UserService) {

  }

  async ngOnInit() {
    console.log('Run NgOnInit')
    this.users = await lastValueFrom(this.userService.getAll());
  }


  async submit(f: NgForm) {
    try {
      console.log('values: ', f.value);
      const response = await lastValueFrom(this.userService.save(f.value));
      console.log(response);

      this.users = await lastValueFrom(this.userService.getAll());
      console.log(this.users);

      this.userForm = {
        firstname: "",
        lastname: "",
        car: ""
      }

    } catch (error) {
      console.log(error)
    }
  }

}
