// Компонент одной задачи (PascalCase)
export default function TodoItem({ task, toggleDone, removeTask, renameTask }) {
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
                style={{ marginLeft: 10 }}
                onClick={() => {
                    const newText = window.prompt('Введите новое название задачи', task.text);
                    if (newText == null) return;           // нажали Cancel — выходим
                    renameTask(task.id, newText);           // renameTask уже триммит и игнорит пустое
                }}
            >
                Переименовать
            </button>
            <button
                onClick={() => removeTask(task.id)}
                style={{ marginLeft: 10 }}
            >
                Удалить
            </button>

        </li>
    );
}
