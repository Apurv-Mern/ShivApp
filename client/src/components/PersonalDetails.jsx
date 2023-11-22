import React from "react";

export default function PersonalDetails() {
  return (
    <div className="main-container">
      <div className="container bg-w">
        <form>
          <div className="m-2">
            <div className="mb-3 personal-info">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter a Bride Name
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter a Bride Name"
              />
            </div>
            <div className="mb-3 personal-info">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter a Groom Name
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter a Groom Name"
              />
            </div>
            <div className="mb-3 personal-info">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter Bride Father Name
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter a Bride Father Name"
              />
            </div>
            <div className="mb-3 personal-info">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter a Bride Mother Name
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter a Bride Mother Name"
              />
            </div>
            <div className="mb-3 personal-info">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter a Groom Father Name
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter a Groom Father Name"
              />
            </div>
            <div className="mb-3 personal-info">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter a Groom Mother Name
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter a Groom Mother Name"
              />
            </div>
            <div className="col-auto personal-info">
              <button
                type="submit"
                className="bg-[#00565f] text-white rounded-lg border-none cursor-pointer w-32 py-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
