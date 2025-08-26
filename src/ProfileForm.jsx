import { useState } from 'react';

function ProfileForm() {
    const [name, setName] = useState('John');
    const [age, setAge] = useState(0);
    const [city, setCity] = useState('New York');
    const [saved, setSaved] = useState(null);

    return (
        <div className="profile-form">
            <div>
                <label>
                    <input
                        placeholder="Введите имя"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    <input
                        placeholder="Введите город"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="number"
                        placeholder="Введите возраст"
                        value={age}
                        onChange={e => setAge(Number(e.target.value))}
                    />
                </label>
            </div>

            <div>
                <p>Имя {name}, Возраст {age}, Город {city}</p>
            </div>

            <div>
                <button
                    onClick={() => {
                        setSaved({ name, age, city });
                        setName('');
                        setAge('');        // если хочешь очищать поле полностью, можно setAge('')
                        setCity('');
                    }}

                >
                    Сохранить
                </button>
                console.log(saved.name);
                {saved && (
                    <div>
                        <p>Профиль сохранён:</p>
                        <p>Имя: {saved.name}</p>
                        <p>Возраст: {saved.age}</p>
                        <p>Город: {saved.city}</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ProfileForm;
