package eu.melinaapricot.todolist.api

import eu.melinaapricot.todolist.todos.TodoItem
import eu.melinaapricot.todolist.todos.TodoRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
class TodoController(private val repo: TodoRepository) {

  @GetMapping("api/todos")
  fun getAll(): List<TodoItem> {
    return this.repo.findAll().toList()
  }

  @PostMapping("api/todos/create")
  fun create(@RequestBody item: TodoItem): TodoItem {
    return this.repo.create(item)
  }

  @PutMapping("api/todos/update")
  fun update(@RequestBody item: TodoItem): TodoItem {
    return this.repo.update(item)
  }

  @DeleteMapping("api/todos/{id}")
  fun delete(@PathVariable id: UUID) {
    this.repo.delete(id)
  }

  @ExceptionHandler
  fun handleException(ex: Exception): ResponseEntity<ErrorResponse> {
    val responseBody = ErrorResponse(ex::class.simpleName ?: "UnknownError", ex.message ?: "")
    return ResponseEntity(responseBody, HttpStatus.BAD_REQUEST)
  }

  data class ErrorResponse(val errorCode: String, val errorMessage: String)
}
