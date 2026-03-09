package edu.yasas.task_manager.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponseDto {

    private UUID id;

    private String title;

    private String description;

    private String status; //IN_PROGRESS,DONE,to do are the status

    private String priority; //HIGH,MEDIUM,LOW

    private LocalDate dueDate;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private UserResponseDto userResponseDto;

}
