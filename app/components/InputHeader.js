import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
	},

	render: function() {
		const user = this.props.loginData;
		return (
			<div>
				<Link to={'/' + user.username}>
					<img src={user.image} width="100px" alt="user" />
				</Link>

				{/* <input placeholder={'Description'} type={'text'}/>
				<input placeholder={'link'} type={'url'}/> */}

				<form onSubmit={this.handleSubmit}>

					<div>
						<label htmlFor={'description'}>Description</label>
						<input id={'description'} name={'description'} type="text" value={this.state.description} onChange={this.descriptionChange} />
					</div>

					<div>
						<label htmlFor={'link'}>Link</label>
						<input id={'link'} name={'link'} type="url" value={this.state.link} onChange={this.linkChange} />
					</div>

					<button name={'login'} className={'button'} onClick={this.handleSubmit}>
						Add Link
					</button>


				</form>


			</div>
		);
	}

});

export default InputHeader;
