import React, { Component, Fragment } from 'react';
import { jpgDemoImg } from '../../utils/helper';
import { Link } from 'react-router-dom';

class Story extends Component {
	render() {
		return (
			<Fragment>
				<div className="row">
					<div className="col-md-12">
						<div className="container pt-4 pb-4">
							<div className="row justify-content-center mb-3">
								<div className="col-md-12 col-lg-10">
									<div style={{ backgroundImage: `url(${jpgDemoImg(2)})`, height: '500px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
								</div>
							</div>

							<div className="row justify-content-center">
								<div className="col-md-12 col-lg-10">
									<article className="article-post">
										<p>
											Holy grail funding non-disclosure agreement advisor ramen bootstrapping ecosystem. Beta crowdfunding iteration assets business plan paradigm shift stealth mass market seed money rockstar niche market marketing buzz market.
									</p>
										<p>
											Burn rate release facebook termsheet equity technology. Interaction design rockstar network effects handshake creative startup direct mailing. Technology influencer direct mailing deployment return on investment seed round.
									</p>
										<p>
											Termsheet business model canvas user experience churn rate low hanging fruit backing iteration buyer seed money. Virality release launch party channels validation learning curve paradigm shift hypotheses conversion. Stealth leverage freemium venture startup business-to-business accelerator market.
									</p>
										<p>
											Freemium non-disclosure agreement lean startup bootstrapping holy grail ramen MVP iteration accelerator. Strategy market ramen leverage paradigm shift seed round entrepreneur crowdfunding social proof angel investor partner network virality.
									</p>
									</article>
								</div>
							</div>
						</div>

						<div className="container pt-4 pb-4">
							<h5 className="font-weight-bold spanborder"><span>Read next</span></h5>
							<div className="row">
								<div className="col-lg-6">
									<div className="card border-0 mb-4 box-shadow h-xl-300">
										<div style={{ backgroundImage: `url(${jpgDemoImg(2)})`, height: '150px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
										<div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
											<h2 className="h4 font-weight-bold">
												<Link className="text-dark" to="./story"> Stimulation Relieves Depression Symptoms</Link>
											</h2>
											<p className="card-text">
												Researchers have found an effective target in the brain for electrical stimulation to improve mood in people suffering from depression.
										</p>
											<div>
												<small className="d-block"><Link className="text-muted" to="./story">Favid Rick</Link></small>
												<small className="text-muted">Dec 12 · 5 min read</small>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="flex-md-row mb-4 box-shadow h-xl-300">
										<div className="mb-3 d-flex align-items-center">
											<img alt="#" height="80" src={jpgDemoImg('blog4')} />
											<div className="pl-3">
												<h2 className="mb-2 h6 font-weight-bold">
													<Link className="text-dark" to="./story">Nasa's IceSat space laser makes height maps of Earth</Link>
												</h2>
												<div className="card-text text-muted small">
													Jake Bittle in LOVE/HATE
										</div>
												<small className="text-muted">Dec 12 · 5 min read</small>
											</div>
										</div>
										<div className="mb-3 d-flex align-items-center">
											<img alt="#" height="80" src={jpgDemoImg('blog5')} />
											<div className="pl-3">
												<h2 className="mb-2 h6 font-weight-bold">
													<Link className="text-dark" to="./story">Underwater museum brings hope to Lake Titicaca</Link>
												</h2>
												<div className="card-text text-muted small">
													Jake Bittle in LOVE/HATE
										</div>
												<small className="text-muted">Dec 12 · 5 min read</small>
											</div>
										</div>
										<div className="mb-3 d-flex align-items-center">
											<img alt="#" height="80" src={jpgDemoImg('blog6')} />
											<div className="pl-3">
												<h2 className="mb-2 h6 font-weight-bold">
													<Link className="text-dark" to="./story">Sun-skimming probe starts calling home</Link>
												</h2>
												<div className="card-text text-muted small">
													Jake Bittle in LOVE/HATE
										</div>
												<small className="text-muted">Dec 12 · 5 min read</small>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
				</div>
			</Fragment >
		)
	}
}

export default Story;