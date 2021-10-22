package eu.melinaapricot.todolist.todos

import java.util.*

interface TodoRepository {
  fun findOneById(id: UUID): TodoItem?
  fun findAll(): Sequence<TodoItem>

  fun create(item: TodoItem): TodoItem
  fun update(item: TodoItem): TodoItem
  fun delete(id: UUID)
}
