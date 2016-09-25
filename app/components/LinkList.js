import React, { PropTypes } from 'react';

export const LinkList = React.createClass({
	propTypes: {
		links: PropTypes.array,
	},

	render: function() {
		const links = this.props.links || [];
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const byDay = {};
		links.map((value) => {
			let thisday = new Date(value.createdAt);
			thisday = Math.floor(thisday.getTime() / (1000 * 60 * 60 * 24));
			byDay[thisday] = byDay[thisday] || [];
			byDay[thisday].push(value);
		});
		return (
			<div>
				<hr />
				
				{Object.keys(byDay).map((day) => {
					const thisDate = new Date(day * 1000 * 60 * 60 * 24);
					return (
						<div>
							<h2>{months[thisDate.getMonth()] + ' ' + thisDate.getDate() + ', ' + thisDate.getFullYear()}</h2>
							{byDay[day].map((link) => {
								return (
									<div>
										{link.createdAt}
										<a href={link.url}>{link.title}</a>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}

});

export default LinkList;
