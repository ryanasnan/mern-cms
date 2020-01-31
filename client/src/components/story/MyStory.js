import React, { Component } from 'react';
import { jpgDemoImg } from '../../utils/helper';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';

class MyStory extends Component {
	constructor(props) {
		super(props);
		this.props.clearAlert();
		this.props.clearErrors();
	}

	render() {
		return (
			<div className="row increase-min-height">
				<div className="col-md-12">
					<div className="container pb-2">
						<div className="row filter-data">
							<div className="col search">
								<input type="text" className="form-control input-round" placeholder="Search" />
							</div>
							<div className="col limit">
								<select className="form-control">
									<option value="volvo">10</option>
									<option value="saab">20</option>
								</select>
							</div>
						</div>
					</div>

					<div className="container pt-2">
						<div className="row data-page-switch">
							<ul>
								<li className="form-control data-page-info"><Link to="#" className="text-primary"><FontAwesomeIcon size="lg" icon="chevron-left" /></Link></li>
								<li className="form-control data-page-info"><span className="text-dark">You have 23 Stories</span></li>
								<li className="form-control data-page-info" ><Link to="#" className="text-lightblue"><FontAwesomeIcon size="lg" icon="chevron-right" /></Link></li>
							</ul>

						</div>
					</div>

					<div className="container pt-4 pb-4">
						<div className="row">
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>
							<div className="flex-item-two-columns">
								<div className="mb-3 d-flex align-items-center">
									<img alt="#" height="80" src={jpgDemoImg('blog4')} />
									<div className="pl-3">
										<h2 className="mb-2 h6 font-weight-bold">
											<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
										</h2>
										<small className="text-muted">Dec 12 &middot; 5 min read</small>
									</div>
								</div>
								<ul className="story-button">
									<li className="form-control" to="#"><Link to="#" className="text-primary"><i className="fa fa-chart-line"></i>12 Like</Link></li>
									<li className="form-control" to="#"><Link to="#" className="text-secondary">2 Comment</Link></li>
									<li className="form-control" ><Link to="#" className="text-muted">Edit</Link></li>
									<li className="form-control" ><Link to="#" className="text-danger">Delete</Link></li>
								</ul>
							</div>


						</div>
					</div>

				</div>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { setAlert, clearAlert, setErrors, clearErrors })(withRouter(MyStory));