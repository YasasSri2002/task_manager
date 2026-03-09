package edu.yasas.task_manager.dto.response;

import edu.yasas.task_manager.dto.TaskDto;
import edu.yasas.task_manager.entity.TaskEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    private UUID id;

    private String firstName;

    private String lastName;

    private String username;

    private String email;


    private List<TaskDto> taskDtoList;

}
