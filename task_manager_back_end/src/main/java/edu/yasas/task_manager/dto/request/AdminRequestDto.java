package edu.yasas.task_manager.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminRequestDto {

    private UUID id;

    private String username;

    private String email;

    private String password;

}
