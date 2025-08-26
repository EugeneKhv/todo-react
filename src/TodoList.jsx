import { useState } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');



    return (<>
        <div>
            <h1>Заголовок</h1>
            <label>
                <input
                    type="text" value={text}
                    placeholder="Введите задание"
                    onChange={e => {
                        setText(e.target.value);
                        console.log("Текущее значение:", e.target.value);
                    }}
                />
            </label>
        </div>


        <div>
            <button
                disabled={!text.trim()}
                onClick={() => {
                    const trimmed = text.trim();
                    const newTask = { id: Date.now(), text: trimmed, done: false };
                    setTasks(prev => [...prev, newTask]);
                    setText('');
                    console.log("Добавлено:", newTask);
                }}
            >
                Добавить
            </button>
        </div>
        <div><p>Всего задач: {tasks.length}</p>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>

                        <input type="checkbox" id={`task-${task.id}`} checked={task.done}
                            onChange={() =>
                                setTasks(prev =>
                                    prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t)
                                )
                            } /><span className={task.done ? 'done' : ''}>
                            {task.text}
                        </span>

                        <button onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        <div className="controls">
            <button onClick={() => setTasks(prev => [...prev].reverse())}>
                Перевернуть порядок
            </button>
            <button
                onClick={() => {
                    setTasks(prev => [...prev].sort((a, b) => a.text.localeCompare(b.text, 'ru')));
                    console.log('Отсортировано A→Я');
                }}
            >
                Сортировать A→Я
            </button>
        </div>
        <p><button onClick={() => setTasks(prev => prev.filter(t => !t.done))}>
            Удалить выполненные
        </button>
        </p>

    </>
    )
}
export default TodoList;