import React from 'react';

const Calendar = () => {
	return (
		<div className="row row-striped">
			<div className="col-12">
				<div className="d-flex flex-row-reverse">
					<button className='btn'>
						<i className='bi bi-x'></i>
					</button>
				</div>
			</div>
			<div className="col-2 text-center">
				<h1 className="display-6"><span className="badge bg-primary">23</span></h1>
				<h2>OCT</h2>
			</div>
			<div className="col-10">
				<h3 className="text-uppercase"><strong>Ice Cream Social</strong></h3>
				<ul className="list-inline">
				  <li className="list-inline-item"><i className="bi bi-calendar" aria-hidden="true"></i> Monday</li>
					<li className="list-inline-item"><i className="bi bi-clock" aria-hidden="true"></i> 12:30 PM - 2:00 PM</li>
				</ul>
				<p>Lorem ipsum dolsit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			</div>
		</div>
	);
}

export default Calendar;
