import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {
  
  public allBlogs;
  public currentBlog;
  public baseUrl ='http://api.testexampledemo.in/api/v1/blogs';
  public authToken = 'Admin'

  constructor(private _http:HttpClient) {
    console.log("Blog-http service was called");
  }
  
  private handleError(err:HttpErrorResponse){
    console.log("Handle error Http calls");
    console.log(err.message);
    return Observable.throw(err.message);
  }


   public getAllBlogs():any{
     let myResponse=this._http.get(this.baseUrl+'/all?authToken='+ this.authToken)
     console.log(myResponse);
     return myResponse;
    }

    public getSingleBlogInformation(currentBlogId):any{
    
      let myResponse=this._http.get(this.baseUrl + '/view' + '/' + currentBlogId + '?authToken=' + this.authToken); 
      return myResponse;
    }

    public createBlog(blogData):any{
      let myResponse=this._http.post(this.baseUrl + '/create' + '?authToken=' + this.authToken,blogData);
      return myResponse;    
    }
    public deleteBlog(blogId):any{
      let data= {};
      let myResponse = this._http.post(this.baseUrl + '/' + blogId + '/delete' + '?authToken=' + this.authToken, data)
      return myResponse;  
    }

    public editBlog(blogId,blogData):any{

      let myResponse=this._http.put(this.baseUrl + '/' + blogId + '/edit' + '?authToken=' + this.authToken,blogData);
      return myResponse;
    }
}
