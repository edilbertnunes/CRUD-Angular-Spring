import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, MinLengthValidator, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from './../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['',[Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
    category: ['', [Validators.required]]
  });

  constructor(private formBuilder: UntypedFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });

  }

  onSubmit() {
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error=> this.onError());
    this.onCancel();
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso!',' ', {duration: 3000})
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.',' ', {duration: 3000});
  }

  getErrorMessage(fiedName: string) {
    const field = this.form.get(fiedName);

    // verificar se o campo não é nulo
    if(field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength']: 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if(field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido';
  }

}
