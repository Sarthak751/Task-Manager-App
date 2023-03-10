import { useEffect, useState } from 'react';
const api_base = 'http://localhost:8000';

function App() {
	const [tasks, setTasks] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newtask, setNewtask] = useState("");

	useEffect(() => {
		getTasks();
	}, []);

	const getTasks = () => {
		fetch(api_base + '/tasks')
			.then(res => res.json())
			.then(data => setTasks(data))
			.catch((err) => console.error("Error: ", err));
	}

	const addTask = async () => {
		const data = await fetch(api_base + "/tasks/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: newtask
			})
		}).then(res => res.json());

		setTasks([...tasks, data]);
		setPopupActive(false);
		setNewtask("");
	}

	const completeTask = async (id) => {
		const data = await fetch(
			api_base + '/tasks/complete/' + id,
			{ method: "PUT" })
			.then(res => res.json()
		);

		setTasks(tasks => tasks.map(task => {
			if (task._id === data._id) {
				task.completed = data.completed;
			}
			return task;
		}));
		
	}

	const deleteTask = async (id) => {
		const data = await fetch(api_base + '/tasks/delete/' + id, { method: "DELETE" })
			.then(res => res.json())
			.then((data) => {
				setTasks(tasks => tasks.filter(task => task._id !== data._id));
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="App">
			<h1>Welcome, Sarthak</h1>
			<h4>Your tasks</h4>

			<div className="tasks">
				{tasks.length > 0 ? tasks.map(task => (
					<div className={
						"task" + (task.completed ? " is-complete" : "")
					} key={task._id} onClick={() => completeTask(task._id)}>
						<div className="checkbox"></div>

						<div className="text">{task.text}</div>

						<div className="delete-task" onClick={() => deleteTask(task._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-task-input" onChange={e => setNewtask(e.target.value)} value={newtask} />
						<div className="button" onClick={addTask}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default App;