package edu.yasas.task_manager.controller;

import edu.yasas.task_manager.dto.request.TaskRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import edu.yasas.task_manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/task")

public class TaskController {

    private final TaskService taskService;

    @PostMapping("/persist")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TaskResponseDto>persist(@RequestBody TaskRequestDto taskRequestDto){
        return taskService.persist(taskRequestDto);
    }

}
