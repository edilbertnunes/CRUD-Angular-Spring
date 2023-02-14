package com.edilbert.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@Entity
// @Table(name = "cursos")
public class Course {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @JsonProperty("_id")
  private Long id;

  @NotBlank
  @NotNull
  @Length(min = 5, max= 100)
  @Column(name = "name", length = 100, nullable = false )
  private String name;

  @NotBlank
  @NotNull
  @Length(max = 10)
  @Pattern(regexp = "Back-end|Front-end")
  @Column(name = "category", length = 10, nullable = false)
  private String category;
}
