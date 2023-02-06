import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

<<<<<<< Updated upstream
  courses: Course[] = [];
=======
  courses$: Observable<Course[]>;

>>>>>>> Stashed changes
  displayedColumns = ['name','category']

  //coursesService: CoursesService;

  constructor(private coursesService: CoursesService) {
<<<<<<< Updated upstream
    // this.courses = [];
    //this.coursesService = new CoursesService();
=======
    this.courses$ = this.coursesService.list();
>>>>>>> Stashed changes
  }

  ngOnInit(): void {
    // pode ser colocado aqui ou no construtor
    this.courses = this.coursesService.list()
  }
}
