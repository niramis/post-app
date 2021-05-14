import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { FormBuilder } from '@angular/forms';

class Post {
  constructor(
    public userId: number,
    public id: string,
    public title: string,
    public body: string
  ) { }
}

class Pizza {
  constructor(
    public name: string,
    public id: number,
    public body: string
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  api: string = "https://jsonplaceholder.typicode.com/posts";
  api2: string = "http://localhost:8000/posts";
  pizza_api: string = "http://localhost:8000/pizza";
  data = [];

  list_of_pizza = [];

  global_pizza: Pizza = {
    name: '',
    body: '',
    id: 1
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPosts();
    // this.getPizza();
  }

  clickFunction(){
    this.sendPizza(this.global_pizza);
  }

  sendPizza(pizza){
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.pizza_api;

      this.http
        .post<Pizza[]>(apiURL, pizza)
        .toPromise()
        .then((res: any) => {
          // Success
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        );
    }); 

    return promise;
  }

  getPizza(){
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.pizza_api;
      this.http
        .get<Pizza[]>(apiURL)
        .toPromise()
        .then((res: any) => {
          // Success
          this.list_of_pizza = res.map((res: any) => {
            return new Pizza(
              res.name,
              res.id,
              res.body
            );
          });
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }
  

  getPosts() {
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.api;
      this.http
        .get<Post[]>(apiURL)
        .toPromise()
        .then((res: any) => {
          // Success
          this.data = res.map((res: any) => {
            return new Post(
              res.userId,
              res.id,
              res.title,
              res.body
            );
          });
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

}