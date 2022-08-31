import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/models/post.service';

@Component({
  selector: 'app-allsilos',
  templateUrl: './allsilos.component.html',
  styleUrls: ['./allsilos.component.scss']
})
export class AllsilosComponent implements OnInit, OnDestroy {

  posts: any[] = [];
  subscriptions: Subscription[]= [];
  constructor(
    private _post: PostService
  ) { }
  ngOnInit(): void {
    this.getAllPostAsilos();
  }

  getAllPostAsilos(){
    this.subscriptions.push(

      this._post.getPostId()
      .subscribe((resp) =>{
        for(let f of resp.docs){
          
          
          this.posts.push(f.data());
          
        }
        
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((eliminar) =>{
      eliminar.unsubscribe();
    })
  }

}
