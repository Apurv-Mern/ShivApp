import React, { useState, useRef } from "react";
import love2 from "../../../assets/images/lover.png";

const OurStory = () => {
  const [metStory, setMetStory] = useState("");
  const [proposalStory, setProposalStory] = useState("");
  const [isMetStoryEditable, setIsMetStoryEditable] = useState(false);
  const [isProposalStoryEditable, setIsProposalStoryEditable] = useState(false);

  const metStoryRef = useRef(null);
  const proposalStoryRef = useRef(null);

  const handleMetStory = (e) => {
    setMetStory(e.target.value);
  };
  const handleProposalStory = (e) => {
    setProposalStory(e.target.value);
  };

  const handleEditMetStory = () => {
    setIsMetStoryEditable(true);
    metStoryRef.current.focus();
  };

  const handleEditProposalStory = () => {
    setIsProposalStoryEditable(true);
    proposalStoryRef.current.focus();
  };

  return (
    <div id="our-story">
      <section className="web-inner-page our-story">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="web-icon-top">
                <img src={love2} className="d-love" alt="icon" />
              </div>
              <div className="web-top-title"> Our Story </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="meet-bt-box">
                <div className="meet-bt">
                  <div className="title-bt"> How We Met </div>
                  <div className="date-bt"> 2022 </div>
                  {isMetStoryEditable ? null : (
                    <button className="date-bt" onClick={handleEditMetStory}>
                      &#9997;
                    </button>
                  )}
                </div>
                <div className="clearfix"></div>

                <textarea
                  className="title-text"
                  value={metStory}
                  onChange={handleMetStory}
                  placeholder="Share us how you guys met!"
                  ref={metStoryRef}
                  disabled={!isMetStoryEditable}
                ></textarea>

                <div className="clearfix"></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="meet-bt-box">
                <div className="meet-bt">
                  <div className="title-bt"> The Proposal </div>
                  <div className="date-bt"> 2022 </div>
                  {isProposalStoryEditable ? null : (
                    <button
                      className="date-bt"
                      onClick={handleEditProposalStory}
                    >
                      &#9997;
                    </button>
                  )}
                </div>
                <div className="clearfix"></div>

                <textarea
                  className="title-text"
                  value={proposalStory}
                  onChange={handleProposalStory}
                  ref={proposalStoryRef}
                  disabled={!isProposalStoryEditable}
                  placeholder="Share us your proposal story!"
                ></textarea>

                {/* <button onClick={()=>setProposalStory()}>Save</button> */}
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
