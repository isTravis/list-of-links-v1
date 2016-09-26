import React, { PropTypes } from 'react';
import dateFormat from 'dateformat';

let styles;
export const LinkList = React.createClass({
	propTypes: {
		links: PropTypes.array,
	},

	buildDateString: function(date) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
	},

	render: function() {
		const links = this.props.links || [];
		
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
					const thisDate = new Date(byDay[day][0].createdAt);
					const thisDateString = this.buildDateString(thisDate);
					const todayDateString = this.buildDateString(new Date());
					const yesterdayDateString = this.buildDateString(new Date(Date.now() - 86400000));
					let dateString = thisDateString;
					if (thisDateString === todayDateString) { dateString = 'Today'; }
					if (thisDateString === yesterdayDateString) { dateString = 'Yesterday'; }

					return (
						<div key={'day-' + index}>
							<div style={styles.date}>{dateString}</div>
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

styles = {
	date: {
		fontSize: '1.25em',
		fontWeight: 'bold',
		color: '#555',
	},
};
