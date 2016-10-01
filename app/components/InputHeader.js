import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Textarea from 'react-textarea-autosize';
import LinkList from '../components/LinkList';
import ButtonLoader from '../components/ButtonLoader';

let styles;
export const InputHeader = React.createClass({
	propTypes: {
		loginData: PropTypes.object,
		isLoading: PropTypes.bool,
		handleAddLink: PropTypes.func,
	},

	getInitialState() {
		return {
			description: '',
			url: '',
			addedLinks: [],
			error: undefined,
		};
	},

	checkForEnter: function(evt) {
		if (evt.which === 13) {
			this.handleSubmit(evt);
		}
	},

	linkChange: function(evt) {
		const linkLowerCase = evt.target.value.toLowerCase();
		const linkWithHTTP = linkLowerCase.length > 4 && linkLowerCase.substring(0, 4) !== 'http' ? 'http://' + linkLowerCase : linkLowerCase; 
		this.setState({ url: linkWithHTTP });
	},
	descriptionChange: function(evt) {
		this.setState({ description: evt.target.value });
	},

	handleSubmit: function(evt) {
		evt.preventDefault();
		if (!this.state.description) { return this.setState({ error: 'Description required' }); }
		if (!this.state.url) { return this.setState({ error: 'URL required' }); }

		this.props.handleAddLink(this.state.description, this.state.url);
		

		const newAddedLinks = this.state.addedLinks;
		newAddedLinks.push({
			title: this.state.description,
			url: this.state.url,
			createdAt: new Date(),
			updatedAt: new Date()
		});
		return this.setState({
			description: '',
			url: '',
			addedLinks: newAddedLinks,
			error: undefined,
		});
	},

	render: function() {
		const user = this.props.loginData;

		return (
			<div>
				<div style={styles.addLinkWrapper}>
					<Link to={'/' + user.username} style={styles.imageLink}>
						<img src={user.image} style={styles.image} alt="user" />
					</Link>

					<form onSubmit={this.handleSubmit} style={styles.form}>
						<Textarea style={styles.input} id={'description'} name={'description'} type="text" placeholder={'Description'} value={this.state.description} onKeyPress={this.checkForEnter} onChange={this.descriptionChange} />
						<Textarea style={styles.input} id={'url'} name={'url'} type="url" placeholder={'URL'} value={this.state.url} onKeyPress={this.checkForEnter} onChange={this.linkChange} />
						<button name={'login'} className={'button'} onClick={this.handleSubmit} style={styles.button}>
							Add
							<ButtonLoader isLoading={this.props.isLoading} />
						</button>
					</form>
				</div>
				<div style={styles.errorMessage}>{this.state.error}</div>
				{!!this.state.addedLinks.length &&
					<div>
						<div style={styles.justAdded}>Just Added</div>
						<LinkList links={this.state.addedLinks} hideDays={true} />	
					</div>
				}
				
			</div>
		);
	}

});

export default InputHeader;

styles = {
	addLinkWrapper: {
		display: 'table',
		width: '100%',
		marginBottom: '1em',
	},
	imageLink: {
		display: 'table-cell',
		width: '1%',
	},
	image: {
		height: '3em',
		marginRight: '1em',
		display: 'inline-block',
	},
	input: {
		marginRight: '1em',
		width: 'calc(50% - 1em - 40px - 6px - 1em)',
		fontSize: '.85em',
		resize: 'none',
		verticalAlign: 'top',
		padding: '.75em .5em',
		minHeight: '1em',
	},
	form: {
		display: 'table-cell',
		verticalAlign: 'top',
		paddingTop: '.4em',
	},
	button: {
		backgroundColor: 'black',
		color: 'white',
		border: '0px',
		height: 'calc(3em + 5px)',
		position: 'relative',
		width: '80px',
		top: '-1px',
		cursor: 'pointer',
	},
	justAdded: {
		fontSize: '1.25em',
		fontWeight: 'bold',
		color: '#555',
	},
	errorMessage: {
		color: '#E05151',
		textAlign: 'right',
		marginTop: '-1em',
	},
};

