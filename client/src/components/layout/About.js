import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';

class About extends Component {
	constructor(props) {
		super(props);
		this.props.clearAlert();
		this.props.clearErrors();
	}

	render() {
		return (
			<Fragment>
				<div className="row increase-min-height">
					<div className="col-md-12">
						<div className="container pt-4 pb-4">
							<div className="row justify-content-center">
								<div className="col-md-12 col-lg-10">
									<article className="article-post">
										<p>
											This is my first app project after learning MERN (Mongo, Express, React, Node) in 4 months.
											I began to learning in the end of september 2019 until january 2020.
											Its so hard in the beginning, cause i never using javascript at all.
											My background skill was Back End Developer and using Laravel (PHP framework), so this is my first experience learning concept of Front End and a new programming language. 
										</p>
										<p>
											This app is simple Content Management System for creating a story.
											Im so inspired on medium web app, so i decided to try making clone on that app in my first project.
											This app built with Mongo for storing database, Express for the server, React for the front end and Redux for data management.
											For the template i just use Mundana Template, that template is open source and you can downloading free.
										</p>
										<p>
											I created this app about 3 weeks, and of course the most hard part is front end implementation.
											Maybe i need 10 days to implementate, create new page and fixing the front end code, so it will better to be used.
											The MOST HARD PART is implemented new react lifecycle getDerivedStateFromProps.
											React announce about deprecating method componentWillReceiveProps and change to getDerivedStateFromProps, well the big problem is the getDerivedStateFromProps always get previous props.
											And this will cause error on navigating browser (go and back).
											I need to research this new behavior and because of that big change i need 3 days to solve this problem.
										</p>
										<p>
											I have added some feature on this app, you can try on every page, here is the list:
										</p>
										<p>1. Validation</p> 
										<p>
											The validation run both on Front End and Back End.
											Im using mongoose to handle validation in backend.
											Mongoose can detect any error input like duplicate data, empty string, etc.
											In front end im using package validator to validate string input.
										</p>
										<p>
											My purpose using validation on front and back is because there are no comprehensive validation on both package.
											For example mongoose validation cannot detect correct mail input validation, the email validation in mongoose need to create manually on pre save data.
											In other way, input validation from front end cannot detect duplicate email, and just can be do it in back end.
											So thats why im using both validation in front end and back end.
										</p>
										<p>2. Authentication & Authorize</p>
										<p>
											Because MERN is a microservice app, which is using any library in one bundle app, so im using JWT (Json Web Token) to make authentication. 
											The token stored on local storage, and will be taken for get user in the component load/render process.
										</p>
										<p>
											The authorization which i used is from back end process. 
											The conditional is simple, if the user is not the owner of the data(exp story), the user will be redirect on a page and will given some warning.
										</p>
										<p>
											Well i still not implemented any permission like RBAC or ACL in this project, cause mongo has a different method in structure schema (not like MySQL which have a relational data)
										</p>
										<p>
											FYI my app using loading to waiting the process of load/render component. The main problem with javascript language is the code running asynchronous, which is there are no waiting syntax to be done, this is very dangerous to load component without any load time. And thats why im using loading in every process get/set data. 
											So, if the authentication state is empty, when access private route like create story or view profile will never rendering at first, but will be redirect to main page.
											This is applicable on authorization process too.
											You will see loading spinner in some page, exp login or when the component load data. 
										</p>
										<p>3. Pagination And Sorting</p>
										<p>
											Well i create pagination and sorting in manual code, im not using package like mongoose-pagination.
											I think its a bad idea to using third party to change the query on mongoose, it will bothering on previous query, and may provide error on query process
										</p>
										<p>4. Simple CRUD Story</p>
										<p>Well it is a basic to create app huh ?? :D </p>
										<br></br>
										<p>
											So that is the feature on this app, i will makes feature on above list to be in my first version app
										</p>
										<p>
											In the future i will added some a new feature to complete this app
										</p>
										<p>My Next feature is</p>
										<p>1. Notification (I need to learn websocket or maybe using firebase from google)</p>
										<p>2. Permission & Data Management (Permission is so important and management data is very urgent, sadly i dont have any system analyst experience)</p>
										<p>3. Using UUID (Universal Unique Identifier will give some extra security when access resource)</p>
										<p>4. Security (Prevent CORS or XSS, maybe i will just use package helmet)</p>
										<p>5. Unit test(Well i still not find any good unit testing for express and react)</p>
										<p>6. Responsive Web and Mobile Apps (The most hard part for back end developer like me)</p>
										<p>
											Well, thats it, thanks for reading my app description, and sorry for my bad english.
										</p>
										<p>
											Feel free to try my code at github repo
										</p>
										<a href="https://github.com/ryanasnan/mern-cms">https://github.com/ryanasnan/mern-cms</a> 
										<p>
											Or maybe you want to fork this project, so we can work together, im so happy if have a new partner :)
										</p>
									</article>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Fragment>
		)
	}
}

export default connect(null, { setAlert, clearAlert, setErrors, clearErrors })(About);