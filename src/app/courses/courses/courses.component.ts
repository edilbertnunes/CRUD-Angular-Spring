import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

courses$: Observable<Course[]>;
displayedColumns = ['name','category']

  constructor(private coursesService: CoursesService,
              private dialog: MatDialog) {

    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        // espera um observable
        // para parar ele deve receber dados
        // o of cria um observable que retorna um array vazio
        return of([])
      })
    )

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
    });
  }

  ngOnInit(): void {

  }
}
