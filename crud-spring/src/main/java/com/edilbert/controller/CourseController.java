package com.edilbert.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.edilbert.model.Course;
import com.edilbert.repository.CourseRepository;

import lombok.AllArgsConstructor;
@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

  //@Autowired
  private CourseRepository courseRepository;

  // @GetMapping e  @RequestMapping(method = RequestMethod.GET) são a mesma coisa
  @GetMapping
  public List<Course> list() {
    return courseRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Course> findById(@PathVariable Long id){
    return courseRepository.findById(id)
    .map(recordFound -> ResponseEntity.ok().body(recordFound))
    .orElse(ResponseEntity.notFound().build());
  }

  // Utilizando o ResponseEntity
  // @PostMapping
  // public ResponseEntity<Course> create(@RequestBody Course course) {
  //   return ResponseEntity.status(HttpStatus.CREATED)
  //   .body(courseRepository.save(course));
  // }


  //Utilizando anotação do spring
  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public Course create(@RequestBody Course course) {
    return courseRepository.save(course);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Course>update(@PathVariable Long id, @RequestBody Course course) {
    return courseRepository.findById(id)
    .map(recordFound -> {
      recordFound.setName(course.getName());
      recordFound.setCategory(course.getCategory());
      Course updated = courseRepository.save(recordFound);
      return ResponseEntity.ok().body(updated);
    })
    .orElse(ResponseEntity.notFound().build());

  }

}
