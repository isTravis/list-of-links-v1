import React, { PropTypes } from 'react';
import { Link } from 'react-router';

let styles;
export const InputHeader = React.createClass({
	propTypes: {
		loginData: PropTypes.object,
		handleAddLink: PropTypes.func,
	},

	getInitialState() {
		return {
			description: '',
			link: ''
		};
	},

	linkChange: function(evt) {
		this.setState({ link: evt.target.value.toLowerCase() });
	},
	descriptionChange: function(evt) {
		this.setState({ description: evt.target.value });
	},

	handleSubmit: function(evt) {
		evt.preventDefault();
		this.props.handleAddLink(this.state.description, this.state.link);
		this.setState({
			description: '',
			link: ''
		});
	},

	render: function() {
		const user = this.props.loginData;
		return (
			<div style={styles.container}>
				<Link to={'/' + user.username} style={styles.imageLink}>
					<img src={user.image} style={styles.image} alt="user" />
				</Link>

				{/* <input placeholder={'Description'} type={'text'}/>
				<input placeholder={'link'} type={'url'}/> */}

				<form onSubmit={this.handleSubmit} style={styles.form}>

					{/* <label htmlFor={'description'}>Description</label> */}
					<input style={styles.input} id={'description'} name={'description'} type="text" placeholder={'Description'} value={this.state.description} onChange={this.descriptionChange} />

					{/* <label htmlFor={'link'}>Link</label> */}
					<input style={styles.input} id={'link'} name={'link'} type="url" placeholder={'URL'} value={this.state.link} onChange={this.linkChange} />

					<button name={'login'} className={'button'} onClick={this.handleSubmit} style={styles.button}>
						Add Link
					</button>


				</form>


			</div>
		);
	}

});

export default InputHeader;

styles = {
	container: {
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
		height: '3em',
		marginRight: '1em',
		width: 'calc(50% - 1em - 40px - 6px)',
	},
	form: {
		display: 'table-cell',
		verticalAlign: 'middle',
	},
	button: {
		backgroundColor: 'black',
		color: 'white',
		border: '0px',
		height: 'calc(3em + 6px)',
		position: 'relative',
		width: '80px',
		top: '-1px',
		cursor: 'pointer',
	}
};

