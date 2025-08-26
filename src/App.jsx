import Hello from './Hello';
import Footer from './Footer';
import UserCard from './UserCard';
import ProfileForm from './ProfileForm';
import TodoList from './TodoList';
import './App.css';


import Counter from './Counter';


function App() {
  return (
    <div>
      <h1>Привет, React!</h1>
      <Hello />
      <ProfileForm />
      <UserCard name="Юджин" age="46" />
      <UserCard name="Анна" age="30" />
      <UserCard name="Марк" age="22" />
      <Counter />
      <TodoList />
      <Footer year={2025} owner="Юджин" />
    </div>
  );
}

export default App;

