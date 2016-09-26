import React, { PropTypes } from 'react';
import dateFormat from 'dateformat';

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
				{Object.keys(byDay).map((day, index) => {
					const thisDate = new Date(day * 1000 * 60 * 60 * 24);
					return (
						<div key={'day-' + index}>
							<h2>{months[thisDate.getMonth()] + ' ' + thisDate.getDate() + ', ' + thisDate.getFullYear()}</h2>
							{byDay[day].map((link, linkIndex) => {
								return (
									<div key={'link-' + linkIndex}>
										<a className={'userLink'} href={link.url}>
											{link.title}
											<div className={'userLinkDate'}>{dateFormat(link.createdAt, 'h:MM:ss TT')} - {link.url}</div>
										</a>

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
