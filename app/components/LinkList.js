import React, { PropTypes } from 'react';
import dateFormat from 'dateformat';
import Textarea from 'react-textarea-autosize';

let styles;
export const LinkList = React.createClass({
	propTypes: {
		links: PropTypes.array,
		hideDays: PropTypes.bool,
		handleLinkEdit: PropTypes.func,
		handleLinkDelete: PropTypes.func,
	},

	getInitialState() {
		return {
			activeEdit: undefined,
			activeDelete: undefined,
			activeEditDescription: '',
			activeEditURL: '',
		};
	},

	buildDateString: function(date) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
	},

	handleEditClick: function(id, description, url, evt) {
		evt.preventDefault();
		this.setState({ 
			activeEdit: id,
			activeEditDescription: description,
			activeEditURL: url,
			activeDelete: undefined,
		});
	},

	checkForEnter: function(evt) {
		if (evt.which === 13) {
			this.handleSubmit(evt);
		}
	},
	descriptionChange: function(evt) {
		this.setState({ activeEditDescription: evt.target.value });
	},

	linkChange: function(evt) {
		const targetLink = evt.target.value;
		const linkWithHTTP = targetLink.length > 4 && targetLink.substring(0, 4) !== 'http' ? 'http://' + targetLink : targetLink; 
		this.setState({ activeEditURL: linkWithHTTP });
	},

	confirmEdit: function(evt) {
		evt.preventDefault();
		// if (!this.state.description) { return this.setState({ error: 'Description required' }); }
		// if (!this.state.url) { return this.setState({ error: 'URL required' }); }

		this.props.handleLinkEdit(this.state.activeEdit, this.state.activeEditDescription, this.state.activeEditURL);
		this.setState({ activeEdit: undefined });
	},
	cancelEdit: function(evt) {
		evt.preventDefault();
		this.setState({ activeEdit: undefined });
	},


	handleDeleteClick: function(id, evt) {
		evt.preventDefault();
		this.setState({ activeDelete: id, activeEdit: undefined, });
		
	},
	confirmDelete: function() {
		this.props.handleLinkDelete(this.state.activeDelete);
		this.setState({ activeDelete: undefined });
	},
	cancelDelete: function() {
		this.setState({ activeDelete: undefined });
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
				{Object.keys(byDay).sort((foo, bar) => {
					// Sort so that most recent is first in array
					if (byDay[foo][0].createdAt > byDay[bar][0].createdAt) { return -1; }
					if (byDay[foo][0].createdAt < byDay[bar][0].createdAt) { return 1; }
					return 0;
				}).map((day, index) => {
					const thisDate = new Date(byDay[day][0].createdAt);
					const thisDateString = this.buildDateString(thisDate);
					const todayDateString = this.buildDateString(new Date());
					const yesterdayDateString = this.buildDateString(new Date(Date.now() - 86400000));
					let dateString = thisDateString;
					if (thisDateString === todayDateString) { dateString = 'Today'; }
					if (thisDateString === yesterdayDateString) { dateString = 'Yesterday'; }

					return (
						<div key={'day-' + index}>
							{!this.props.hideDays &&
								<div style={styles.date}>{dateString}</div>
							}
							
							{byDay[day].sort((foo, bar) => {
								// Sort so that most recent is first in array
								if (foo.createdAt > bar.createdAt) { return -1; }
								if (foo.createdAt < bar.createdAt) { return 1; }
								return 0;
							}).map((link, linkIndex) => {
								return (
									<div key={'link-' + linkIndex}>
										<a className={'userLink'} href={link.url}>
											{link.description}
											<div className={'userLinkDate'}>
												{dateFormat(link.createdAt, 'h:MM:ss TT')} - {link.url}
												{this.props.handleLinkDelete && this.props.handleLinkEdit &&
													<span>
														<span className={'underlineOnHover'} style={styles.hoverButton} onClick={this.handleEditClick.bind(this, link.id, link.description, link.url)}>Edit</span>
														<span className={'underlineOnHover'} style={styles.hoverButton} onClick={this.handleDeleteClick.bind(this, link.id)}>Delete</span>		
													</span>
												}
												
											</div>
										</a>

										{this.state.activeEdit && this.state.activeEdit === link.id &&
											<div>
												<form onSubmit={this.confirmEdit} style={styles.form}>
													<Textarea style={styles.input} id={'description'} name={'description'} type="text" placeholder={'Description'} value={this.state.activeEditDescription} onKeyPress={this.checkForEnter} onChange={this.descriptionChange} />
													<Textarea style={styles.input} id={'url'} name={'url'} type="url" placeholder={'URL'} value={this.state.activeEditURL} onKeyPress={this.checkForEnter} onChange={this.linkChange} />
													<button name={'login'} className={'button'} onClick={this.confirmEdit} style={styles.button}>
														Update
													</button>
													<button onClick={this.cancelEdit} className={'button'} style={styles.button}>Cancel</button>
												</form>
											</div>
										}

										{this.state.activeDelete && this.state.activeDelete === link.id &&
											<div>
												<button onClick={this.confirmDelete} className={'button'} style={styles.deleteButton}>Confirm Delete</button>
												<button onClick={this.cancelDelete} className={'button'} style={styles.deleteButton}>Cancel</button>
											</div>
										}

									</div>
								);
							})}

						</div>
					);
				})}

				{links.length === 0 && 
					<div style={styles.noLinks}>
						No links yet
					</div>
				}
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
		marginTop: '1em',
	},
	noLinks: {
		fontSize: '1.25em',
		fontWeight: 'bold',
		color: '#555',
		textAlign: 'center',
		padding: '3em 0em',
	},
	hoverButton: {
		padding: '0em 1em',
	},
	input: {
		marginRight: '1em',
		width: 'calc(50% - 1em - 40px - 6px - 1em - 1em - 40px - 6px - 1em)',
		fontSize: '.85em',
		resize: 'none',
		verticalAlign: 'top',
		padding: '.75em .5em',
		minHeight: '1em',
	},
	form: {
		verticalAlign: 'top',
		paddingLeft: '1.5em',
		paddingTop: '.4em',
		paddingBottom: '1.5em',
	},
	button: {
		// backgroundColor: 'black',
		// color: 'white',
		border: '0px',
		// height: 'calc(3em + 5px)',
		position: 'relative',
		width: '80px',
		padding: '.5em 0em',
		top: '.5em',
		cursor: 'pointer',
		marginRight: '1em',
	},
	deleteButton: {
		marginLeft: '2em',
		padding: '.5em 1em',
		cursor: 'pointer',
		marginBottom: '1.5em',
	}
};
