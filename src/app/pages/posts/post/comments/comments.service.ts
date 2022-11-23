import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private _userNameInComment: string = '';
  @Output() changeUserNameComment: EventEmitter<any> = new EventEmitter();
  constructor() {}

  attachUserNameService(name: string) {
    if (name !== '') {
      this._userNameInComment = `@${name} `;
    } else {
      this._userNameInComment = '';
    }
    this.changeUserNameComment.emit(this._userNameInComment);
  }

  get userName() {
    return this._userNameInComment;
  }
}
