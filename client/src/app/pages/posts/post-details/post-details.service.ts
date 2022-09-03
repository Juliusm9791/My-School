import { Injectable } from '@angular/core';
import {Post} from '../../../types/types'

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {
  post: Post = {} as Post
  constructor() { }
}
