package com.edilbert.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edilbert.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> { }
