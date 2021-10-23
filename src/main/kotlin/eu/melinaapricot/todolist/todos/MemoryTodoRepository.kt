package eu.melinaapricot.todolist.todos

import org.springframework.stereotype.Component
import java.time.Instant
import java.util.*
import java.util.concurrent.ConcurrentHashMap

@Component
class MemoryTodoRepository: TodoRepository {

  private val cache = ConcurrentHashMap<UUID, TodoItem>()

  override fun findOneById(id: UUID): TodoItem? = this.cache[id]
  override fun findAll(): Sequence<TodoItem> = this.cache.values.asSequence().sortedByDescending { it.createdAt }

  override fun create(item: TodoItem): TodoItem {
    val id = UUID.randomUUID()
    val itemToSave = item.copy(id = id, createdAt = Instant.now())

    this.cache[id] = itemToSave
    return itemToSave
  }


  override fun update(item: TodoItem): TodoItem {
    val alreadyExists = this.cache[item.id]
            ?: throw TodoNotFoundException("Todo item with id ${item.id} not found")

    val updatedItem = item.copy(id = alreadyExists.id, createdAt = alreadyExists.createdAt)
    this.cache[item.id] = updatedItem
    return updatedItem
  }

  override fun delete(id: UUID) {
    val alreadyExists = this.cache.containsKey(id)
    if (!alreadyExists) {
      throw TodoNotFoundException("Todo item with id $id not found")
    }

    this.cache.remove(id)
  }


  private class TodoNotFoundException(message: String): RuntimeException(message)
}
