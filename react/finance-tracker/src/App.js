import React , {useState, useEffect} from "react";
import api from './api'


const App = () => {
	const [trans,setTrans] = useState([]);
	const [formData,setFormData] = useState({
		amt:'',
		cat:'',
		desc:'',
		isIncome:false,
		date:''
	});
	const fetchTrans = async () => {
		const response = await api.get('/transaction');
		setTrans(response.data);
	};
	useEffect(()=>{
		fetchTrans();
	},[]);
	const handleInputChange = (event) => {
		const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
		setFormData({
			...formData,
			[event.target.name]:value,
		});
	};

	const handleFormSubmit = async (event) =>{
		event.preventDefault();
		await api.post('/tran',formData);
		fetchTrans();
		setFormData({
		amt:'',
		cat:'',
		desc:'',
		isIncome:false,
		date:''
		});
	};

	return (
		<div>
			<nav className="navbar navbar-dark bg-primary">
				<div className="container-fluid">
					<a className="navbar-brand text-dark" href="/">
						Personal Finance Tracker
					</a>
				</div>
			</nav>

		<div className="container">
			<form onSubmit={handleFormSubmit}>
				<div className="mb-3 mt-3">
					<label htmlFor="amount" className="form-label">Amount</label>
					<input type="text" className="form-control" id="amt" name="amt" onChange={handleInputChange} value={formData.amt} />
				</div>

				<div className="mb-3">
					<label htmlFor="category" className="form-label">Category</label>
					<input type="text" className="form-control" id="cat" name="cat" onChange={handleInputChange} value={formData.cat} />
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">Description</label>
					<input type="text" className="form-control" id="desc" name="desc" onChange={handleInputChange} value={formData.desc} />
				</div>


				<div className="mb-3">
					<label htmlFor="is_income" className="form-label">Is income</label>
					<input type="checkbox"  id="is_income" name="is_income" onChange={handleInputChange} value={formData.isIncome} />
				</div>


				<div className="mb-3">
					<label htmlFor="date" className="form-label">Date</label>
					<input type="text" className="form-control" id="date" name="date" onChange={handleInputChange} value={formData.date} />
				</div>

				<button type="submit" className="btn btn-primary">
					Submit Form
				</button>
			</form>
		</div>

		</div>
	)
}
export default App;
