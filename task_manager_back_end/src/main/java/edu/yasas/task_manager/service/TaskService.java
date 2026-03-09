package edu.yasas.task_manager.service;

import edu.yasas.task_manager.dto.request.TaskRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import org.springframework.http.ResponseEntity;

public interface TaskService {

    ResponseEntity<TaskResponseDto>persist(TaskRequestDto taskRequestDto);

}
