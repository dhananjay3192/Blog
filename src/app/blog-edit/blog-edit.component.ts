import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BlogHttpService } from 'src/app/blog-http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
  providers:[Location]
})
export class BlogEditComponent implements OnInit {

  public currentBlog;
  public possibleCategories = ["Comedy","Drama","Action","Technology","Science and Technology"];


  constructor(private _route:ActivatedRoute,private router:Router,public blogHttpService:BlogHttpService,private toastr: ToastrService, private location:Location) 
  {  

  }

  
  ngOnInit() {
    let myBlogId=this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    //calling the function to get the blog with this blogId
    
   this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(

      data=>{
        console.log(data);
        this.currentBlog=data["data"];
      
      },
      error =>{
        console.log("some error occured");
        console.log(error.errorMessage)
      }
    )

    
  }
  
  public editThisBlog():any{

    this.blogHttpService.editBlog(this.currentBlog.blogId, this.currentBlog).subscribe(
      data=>{
        console.log(data);
        this.toastr.success('Blog edited successfully','Successs');
        console.log(this.currentBlog);
       setTimeout(()=>{
          this.router.navigate(['/blog',this.currentBlog.blogId]);
        },2000)
      },
      error=>{
        console.log("some error occured");
        console.log(error.errorMessage);
        this.toastr.error('Some error occured','Error');
      }
    )

  }
}
