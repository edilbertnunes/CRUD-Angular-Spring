import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { tap,first, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list() {
      return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        delay(1000),
        // tap(courses => console.log(courses))
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>) {
    if(record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first()); // .pipe(first() é opcional
  }

  private update(record: Partial<Course>) {
    return this.httpClient.post<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

}
