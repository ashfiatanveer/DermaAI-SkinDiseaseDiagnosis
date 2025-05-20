import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <nav className="navbar">
        <a href="/" className="back-arrow">←</a>
        <ul className="nav-list">
          <li><a href="/" className="nav-button">Home</a></li>
          <li><a href="/App" className="nav-button">Diagnosis</a></li>
          <li><a href="/NewApp" className="nav-button">Compare Results</a></li>
        </ul>
      </nav>

      <div className="page-content">
        <h1 className="main-header">About DermaAI</h1>
        <p className="paragraph">
          DermaAI is an innovative AI-powered skin diagnosis assistant that helps users monitor and understand their skin health.
          Built using fine-tuned NLP and image classification models, it accepts both image and text-based inputs,
          making it more versatile and accessible to a wide range of users. Whether you're uploading a photo or describing symptoms,
          DermaAI is here to support your skin wellness journey.
        </p>

        <h2 className="sub-header">What Problems Does It Solve?</h2>
        <p className="paragraph">
           Millions of people suffer from skin issues but lack timely access to dermatologists.
          DermaAI aims to bridge this gap by providing preliminary insights instantly.
          It empowers individuals to take their first step toward treatment by recognizing potential issues early—right from their phone.
        </p>

        <h2 className="sub-header">How Does It Work?</h2>
        <p className="paragraph">
          Users can either upload an image of the affected area or describe their symptoms in text.
          The app processes these inputs through trained deep learning models.
          The image classifier compares the visual features with a rich dataset of labeled skin conditions,
          while the NLP model analyzes your written symptoms to suggest possible matches.
          It then provides a predicted diagnosis with confidence scores and next-step suggestions.
        </p>

        <h2 className="sub-header">Our Commitment to Improvement</h2>
        <p className="paragraph">
           At DermaAI, we are continuously learning and improving. Feedback from real users,
          data collected through ethical means, and expert consultations allow us to constantly update our models.
          Every version of DermaAI is more accurate, inclusive, and robust than the last, with a strong focus
          on diverse skin tones, rare conditions, and real-world scenarios.
        </p>

        <h2 className="sub-header">Transparency and Collaboration</h2>
        <p className="paragraph">
          We are committed to transparency in both our technology and limitations.
          We collaborate with dermatologists, researchers, and the open-source community to ensure our models are
          responsibly built and fairly evaluated. Our mission is to create trustworthy AI—not to replace doctors,
          but to assist them and you in making better, faster decisions.
        </p>

        <h2 className="sub-header">Details About DermaAI Accuracy</h2>
        <p className="paragraph">
          DermaAI's image classification and NLP models have demonstrated up to 90% accuracy on internal test datasets.
          While the results are promising, we openly acknowledge that no AI system is perfect.
          This tool is meant to assist—not diagnose—and users are always encouraged to follow up with a certified medical professional.
        </p>

        <h2 className="sub-header">Ongoing Development</h2>
        <p className="paragraph">
           DermaAI is evolving rapidly. In the near future, we plan to expand from detecting 15 skin condition classes
          to covering a broader range of dermatological issues. We are also working on a real-time <strong>online consultation</strong>
          feature where users can chat directly with verified dermatologists for immediate advice, second opinions,
          and emotional reassurance. This feature will bridge the gap between automated AI feedback and personalized medical care.
          <br /><br />
          Other exciting enhancements include multilingual support, faster processing, user accounts with health history tracking,
          and a recommendation system for skincare products tailored to your diagnosis.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
