//this is a by default statement
import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from 'src/app/blog-http.service';


//decorator
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// a simple class

export class HomeComponent implements OnInit {
  
  public allBlogs=[];
  constructor(public blogHttpService:BlogHttpService) { 
    console.log("Home component constructor called");
  }

  ngOnInit() {
    console.log("Home component onInit called");
    this.allBlogs = this.blogHttpService.getAllBlogs().subscribe(
      data =>{
        console.log(data);
        this.allBlogs = data["data"];
      },
      error =>{
        console.log(error.errorMessage)
      }

    );
    //console.log(this.allBlogs);
  }

}
