import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  post: Post[]=[];
  constructor(private PostService :PostService){
  }
  ngOnInit(){
    this.getAllpost();
  }
  getAllpost():void{
    this.PostService.getAll().subscribe(post=>{this.post = post, console.log("day la log"+this.post)} );
  }
  deletePost(id:number){
    this.PostService.delete(id).subscribe(res => {
         this.post = this.post.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
}
