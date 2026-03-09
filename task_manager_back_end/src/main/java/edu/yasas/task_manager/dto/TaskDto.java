package edu.yasas.task_manager.dto;


import edu.yasas.task_manager.entity.UserEntity;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class TaskDto {

    private UUID id;

    private String title;

    private String description;

    private String status; //IN_PROGRESS,DONE,to do are the status

    private String priority; //HIGH,MEDIUM,LOW

    private LocalDate dueDate;

    private LocalDate createdAt;

    private LocalDate updatedAt;



}
