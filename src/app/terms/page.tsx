import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <ul className="list-disc pl-6 space-y-4">
        <li>
          We are not responsible for the content of external links or the
          accuracy, legality, or reliability of any information contained on
          external websites linked through our platform.
        </li>
        <li>
          All images uploaded to this platform remain the property of their
          respective owners. By submitting an image, you affirm that you either
          own the copyright or have obtained the necessary permissions to upload
          the image.
        </li>
        <li>
          If you upload an image that represents a brand, organization, or
          entity that you do not own or have explicit permission to represent,
          we reserve the right to remove the image upon request by the rightful
          owner or their authorized representatives.
        </li>
        <li>
          We are not liable for any damages, losses, or legal consequences that
          may arise from the images uploaded to this platform. All content
          uploaded is the sole responsibility of the user who submitted it.
        </li>
        <li>Only JPEG and PNG image formats are accepted.</li>
        <li>
          Uploaded images must be 20x20 pixels. Larger images will be resized,
          and quality may be degraded as a result.
        </li>
        <li>Links to web pages must start with http:// or https://.</li>
        <li>
          All images and links will be reviewed to ensure they closely align
          with the projects goals.
        </li>
      </ul>
    </div>
  );
};

export default TermsPage;
