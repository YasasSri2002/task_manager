package edu.yasas.task_manager.service;

import edu.yasas.task_manager.dto.TaskDto;
import edu.yasas.task_manager.dto.request.TaskRequestDto;
import edu.yasas.task_manager.dto.response.TaskResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface TaskService {

    ResponseEntity<TaskResponseDto>persist(TaskRequestDto taskRequestDto);

    ResponseEntity<List<TaskDto>>getAllByUserId(String id);

    ResponseEntity<Map<String,String>>markAsCompleted(String taskId);


}
