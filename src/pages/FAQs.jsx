import React from 'react';
import { Link } from 'react-router-dom';
import './FAQs.css'; 

const FAQs = () => {
  return (
    <div className="faq-page">
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={{ color: '#6FFFE9' }}>FAQs</h2>

        <div className="faq-section">
          <div className="faq-item">
            <h4>1. What payment methods do you accept?</h4>
            <p>We accept payments via Visa, MasterCard, American Express, PayPal, and direct bank transfers.</p>
          </div>

          <div className="faq-item">
            <h4>2. How can I track my order?</h4>
            <p>Once your order is shipped, you will receive a tracking number via email. You can use this number on our website to track your order in real-time.</p>
          </div>

          <div className="faq-item">
            <h4>3. Do you offer international shipping?</h4>
            <p>Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary depending on your location.</p>
          </div>

          <div className="faq-item">
            <h4>4. What is your return policy?</h4>
            <p>We offer a 30-day return policy for unused products in their original packaging. Please refer to our <Link to="/return-policy">Return Policy</Link> for detailed instructions on how to initiate a return.</p>
          </div>

          <div className="faq-item">
            <h4>5. How can I contact customer support?</h4>
            <p>You can reach our customer support team via email at <a href="mailto:support@sastoparts.com">support@sastoparts.com</a> or by filling out our <Link to="/contact">Contact Form</Link>. We strive to respond to all inquiries within 24 hours.</p>
          </div>

          <div className="faq-item">
            <h4>6. Are your products covered by warranty?</h4>
            <p>Yes, all our products come with a standard manufacturer's warranty. The warranty period varies by product and is specified on the product page.</p>
          </div>

          <div className="faq-item">
            <h4>7. Can I cancel my order?</h4>
            <p>You can cancel your order within 24 hours of placing it by contacting our customer support team. Orders that have already been shipped cannot be canceled.</p>
          </div>

          <div className="faq-item">
            <h4>8. Do you offer bulk discounts?</h4>
            <p>Yes, we offer discounts on bulk orders. Please contact our sales team at <a href="mailto:sales@sastoparts.com">sales@sastoparts.com</a> for more information on bulk pricing.</p>
          </div>

          <div className="faq-item">
            <h4>9. How do I change my account information?</h4>
            <p>You can update your account information, including your shipping address and payment methods, by logging into your account and navigating to the profile settings.</p>
          </div>

          <div className="faq-item">
            <h4>10. Do you have physical stores where I can purchase products?</h4>
            <p>Currently, we operate exclusively online. All purchases must be made through our website.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
