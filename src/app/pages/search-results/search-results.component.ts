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
  // isSearching: boolean = true;

  constructor(private postsService: PostsService) {
    // this.postsService.changeisSearching.subscribe((searching) => {
    //   this.isSearching = searching;
    // });
  }

  ngOnInit(): void {
    // console.log(this.isSearching);
    this.searchResults = this.postsService.topSearchResults;
    console.log(this.searchResults);
  }

  descriptionCut(description: string, search: string) {
    const wordIndex = description.split(' ').indexOf(search);

    console.log(
      description
        .split(' ')
        .slice(wordIndex - 3, wordIndex + 3)
        .join(' ')
    );

    return description
      .split(' ')
      .slice(wordIndex - 10, wordIndex + 10)
      .join(' ');
  }
}
