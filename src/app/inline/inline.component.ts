import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.css']
})
export class InlineComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Open Graph Page");
    this.meta.addTags([
      { property: 'og:title', content: 'The Rock' },
      { property: 'og:type', content: 'video.movie' },
      { property: 'og:url', content: '//www.imdb.com/title/tt0117500/' }
    ]);
  }
}
