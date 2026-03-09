package edu.yasas.task_manager.dto;


import edu.yasas.task_manager.entity.TaskEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private UUID id;

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String role = "ROLE_USER";

    private String password;

}
