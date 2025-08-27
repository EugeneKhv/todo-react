// Компонент одной задачи (PascalCase)
export default function TodoItem({ task, toggleDone, removeTask }) {
  return (
    <li style={{ margin: '6px 0' }}>
      <input
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.done}
        onChange={() => toggleDone(task.id)}
      />

      {/* Стилизуем выполненные через класс done */}
      <label
        htmlFor={`task-${task.id}`}
        className={task.done ? 'done' : ''}
        style={{ marginLeft: 8 }}
        title="Двойной клик для редактирования (если добавим позже)"
      >
        {task.text}
      </label>

      <button
        onClick={() => removeTask(task.id)}
        style={{ marginLeft: 10 }}
      >
        Удалить
      </button>
    </li>
  );
}
