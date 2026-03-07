package edu.yasas.task_manager.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {


    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String password;


}
