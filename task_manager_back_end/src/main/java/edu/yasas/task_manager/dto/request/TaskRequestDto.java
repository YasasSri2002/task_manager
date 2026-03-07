package edu.yasas.task_manager.dto.request;

import edu.yasas.task_manager.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto {

    private String title;

    private String description;

    private String status; //IN_PROGRESS,DONE,to do are the status

    private String priority; //HIGH,MEDIUM,LOW

    private LocalDate dueDate;

    private String userId;

}
