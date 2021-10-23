package eu.melinaapricot.todolist.todos

import java.time.Instant
import java.util.*

data class TodoItem(
  val id: UUID = UUID.randomUUID(),
  val isDone: Boolean = false,
  val message: String,
  val createdAt: Instant
)
