import { Component, OnInit } from '@angular/core';
import { searchResults } from 'src/app/types/types';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  searchResults: searchResults = {} as searchResults;

  constructor(private postsService: PostsService) {
    // this.searchResults = this.postsService.topSearchResults;
    this.postsService.changeSearchResults.subscribe((results) => {
      this.searchResults = results;
    });
  }

  ngOnInit(): void {
    this.searchResults = this.postsService.topSearchResults;
  }

  descriptionCut(description: string, search: string) {
    const wordIndex = description.split(' ').indexOf(search);

    // return description
    //   .split(' ')
    //   .slice(wordIndex < 10 ? 0 : wordIndex - 10, wordIndex + 10)
    //   .join(' ');
    return description;
  }
}
