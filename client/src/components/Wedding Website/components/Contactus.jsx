import React from "react";

function Contactus() {
  return (
    <>
      <section class="wedding-contact-page">
        <div class="container">
          <div class="row">
            <div className="col-md-12 contact-content">
              <h2>Contact</h2>
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <label for="name" className="">
                        Your name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <label for="email" className="">
                        Your email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <label for="contact-no" className="">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        id="contact-no"
                        name="subject"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <label for="contact-no" className="">
                        Query Type
                      </label>
                      <select className="form-select">
                        <option>Query type 1</option>
                        <option>Query type 2</option>
                        <option>Query type 3</option>
                        <option>Query type 4</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="md-form">
                      <label for="message">Your message</label>
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        rows="2"
                        className="form-control md-textarea"></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="attach-text">
                      <label for="contact-no" className="">
                        Attach any images or documents if required
                      </label>
                      <div className="d-flex justify-right">
                        <div className="btn btn-primary btn-rounded">
                          <label
                            className="form-label text-white m-1"
                            for="customFile1">
                            Choose file
                          </label>
                          <input
                            type="file"
                            className="form-control d-none"
                            id="customFile1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="text-center text-md-left ">
                <a className="btn btn-primary primary-contect">Send</a>
              </div>
              <div className="status"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contactus;
