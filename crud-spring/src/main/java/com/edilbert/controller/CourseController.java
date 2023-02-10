package com.edilbert.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
