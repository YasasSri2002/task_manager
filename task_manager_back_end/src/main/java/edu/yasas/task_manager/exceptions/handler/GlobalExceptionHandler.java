package edu.yasas.task_manager.exceptions.handler;

import edu.yasas.task_manager.dto.response.ErrorResponseDto;
import edu.yasas.task_manager.exceptions.EmailAlreadyExistException;
import edu.yasas.task_manager.exceptions.user_exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> userHasNotFound(UserNotFoundException exception){

        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setHttpStatus(HttpStatus.NOT_FOUND);
        errorResponseDto.setMessage(exception.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponseDto);

    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity<ErrorResponseDto>emailIsExist(EmailAlreadyExistException ex){

        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setMessage(ex.getMessage());
        errorResponseDto.setHttpStatus(HttpStatus.BAD_REQUEST);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDto);
    }

}
