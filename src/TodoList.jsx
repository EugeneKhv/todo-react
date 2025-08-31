import { useState, useEffect, useRef } from 'react';
import TodoItem from './TodoItem';

// PascalCase для компонента
function TodoList() {
    // camelCase для переменных/функций
    const [tasks, setTasks] = useState([]);      // список задач: [{ id, text, done }]
    const [text, setText] = useState('');        // значение текстового поля
    const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'

    // Загрузка задач при первом рендере (persist в localStorage)
    // 👇 ref, который переживает рендеры и изначально false
    const didMount = useRef(false);
    // читаем из localStorage один раз
    useEffect(() => {
        try {
            const raw = localStorage.getItem('tasks');
            if (raw) setTasks(JSON.parse(raw));
        } catch (e) {
            console.warn('Bad tasks in localStorage, clearing.', e);
            localStorage.removeItem('tasks');
        }
    }, []);

    // сохраняем, но пропускаем первый вызов
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (e) {
            console.warn('Failed to save tasks', e);
        }
    }, [tasks]);

    // Отфильтрованный список для отображения
    const visibleTasks =
        filter === 'active' ? tasks.filter(task => !task.done)
            : filter === 'done' ? tasks.filter(task => task.done)
                : tasks;

    // Добавить задачу
    const addTask = () => {
        const trimmed = text.trim();
        if (!trimmed) return; // пустые не добавляем
        const newTask = { id: Date.now(), text: trimmed, done: false };
        setTasks(prevTasks => [...prevTasks, newTask]); // иммутабельно
        setText(''); // очистить поле
    };

    // Переключить done у задачи по id
    const toggleDone = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };
    //Переименовать задачу
    // Переименовать задачу по id
    const renameTask = (id, newText) => {
        const trimmed = String(newText).trim();
        if (!trimmed) return; // пустые имена не сохраняем
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, text: trimmed } : task
            )
        );
    };

    // Удалить одну задачу по id
    const removeTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    // Удалить все выполненные
    const removeCompleted = () => {
        setTasks(prevTasks => prevTasks.filter(task => !task.done));
    };

    // Перевернуть порядок задач
    const reverseOrder = () => {
        setTasks(prevTasks => [...prevTasks].reverse());
    };

    // Сортировать A→Я по тексту (учёт русской локали)
    const sortAZ = () => {
        setTasks(prevTasks =>
            [...prevTasks].sort((a, b) => a.text.localeCompare(b.text, 'ru'))
        );
    };

    return (
        <div className="todo">
            <h1>Список дел</h1>

            {/* Ввод новой задачи */}
            <div className="row">
                <input
                    autoFocus
                    type="text"
                    placeholder="Введите задание"
                    value={text}
                    onChange={e => setText(e.target.value)}               // держим state синхронным с input
                    onKeyDown={e => { if (e.key === 'Enter' && text.trim()) addTask(); }}
                />
                <button onClick={addTask} disabled={!text.trim()}>
                    Добавить
                </button>
            </div>

            {/* Фильтры и массовые действия */}
            <div className="controls" style={{ marginTop: 8 }}>
                <div className="filters" style={{ marginBottom: 8 }}>
                    <button className={filter === 'all' ? 'btn active' : 'btn'} onClick={() => setFilter('all')}>Все</button>
                    <button className={filter === 'active' ? 'btn active' : 'btn'} onClick={() => setFilter('active')}>Активные</button>
                    <button className={filter === 'done' ? 'btn active' : 'btn'} onClick={() => setFilter('done')}>Выполненные</button>
                </div>

                <div className="bulk">
                    <button onClick={reverseOrder}>Перевернуть порядок</button>
                    <button onClick={sortAZ}>Сортировать A→Я</button>
                    <button onClick={removeCompleted}>Удалить выполненные</button>
                </div>
            </div>

            {/* Счётчики */}
            <p style={{ marginTop: 8 }}>
                Всего: {tasks.length} • Активных: {tasks.filter(task => !task.done).length}
            </p>

            {/* Рендерим отфильтрованный список */}
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                {visibleTasks.map(task => (
                    <TodoItem
                        key={task.id}           // key только здесь (в месте map)
                        task={task}             // данные задачи
                        toggleDone={toggleDone} // действия — вниз через props
                        removeTask={removeTask}
                        renameTask={renameTask}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
