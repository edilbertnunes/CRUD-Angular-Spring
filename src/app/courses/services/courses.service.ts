import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
<<<<<<< Updated upstream
=======
import { tap,first, delay } from 'rxjs/operators';
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

<<<<<<< Updated upstream
  list(): Course[] {
    return [
      { _id: '1', name: 'Angular', category: 'front-end'}
    ]
=======
  list() {
      return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        delay(15000),
        tap(courses => console.log(courses))
      );
>>>>>>> Stashed changes
  }
}
