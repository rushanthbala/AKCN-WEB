import { Component, OnInit } from '@angular/core';
import { DBURL } from 'src/app/servise/_database/db';
import { ReplyCommentService } from 'src/app/servise/replyComment/reply-comment.service';

@Component({
  selector: 'app-reply-comments',
  templateUrl: './reply-comments.component.html',
  styleUrls: ['./reply-comments.component.scss'],
})
export class ReplyCommentsComponent implements OnInit {
  public open = true;
  userData: any;
  public selectedId: any;
  p: number = 1;

  constructor(private dataServise: ReplyCommentService) {}

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    this.dataServise.getAllData('api/getAllReplyComments').subscribe((res) => {
      this.userData = res;
    });
  }
  selectingID(id: any) {
    this.selectedId = id;
  }
  handleDelete() {
    this.dataServise
      .handleDelete('api/deleteReplyComment/' + this.selectedId)
      .subscribe((res) => {
        console.log('deteted');
        this.getAllData();
      });
  }
}
