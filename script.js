/**
 * Test Site - Main JavaScript
 * Security-enhanced with input validation and sanitization
 */

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initContactForm();
    initContactInfoProtection();
  });

  /**
   * Navigation toggle for mobile
   */
  function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('open');
      });

      // Close menu when clicking nav links
      const links = navLinks.querySelectorAll('a');
      links.forEach(function(link) {
        link.addEventListener('click', function() {
          navLinks.classList.remove('open');
        });
      });
    }
  }

  /**
   * Contact form validation and submission
   */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Check honeypot field (bot detection)
      const honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value !== '') {
        // Likely a bot - silently reject
        form.reset();
        return;
      }

      // Validate all fields
      const isValid = validateForm(form);

      if (isValid) {
        // In production, this would send to a backend
        // For now, show success message
        showSuccessMessage();
        form.reset();
        clearErrors(form);
      }
    });

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input:not([name="website"]), textarea');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(input);
      });

      // Clear error on input
      input.addEventListener('input', function() {
        clearFieldError(input);
      });
    });
  }

  /**
   * Validate entire form
   */
  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input:not([name="website"]), textarea');

    inputs.forEach(function(input) {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Validate individual field
   */
  function validateField(field) {
    const value = field.value.trim();
    const name = field.name || field.id;
    let error = '';

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      error = 'This field is required';
    }
    // Email validation
    else if (field.type === 'email' && value) {
      if (!isValidEmail(value)) {
        error = 'Please enter a valid email address';
      }
    }
    // Text length validation
    else if (value) {
      if (value.length > 500 && field.tagName === 'TEXTAREA') {
        error = 'Message is too long (max 500 characters)';
      } else if (value.length > 100 && field.tagName === 'INPUT') {
        error = 'Input is too long (max 100 characters)';
      }
      // Check for suspicious patterns
      else if (containsSuspiciousContent(value)) {
        error = 'Invalid characters detected';
      }
    }

    if (error) {
      showFieldError(field, error);
      return false;
    } else {
      clearFieldError(field);
      return true;
    }
  }

  /**
   * Email validation
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Check for suspicious content (basic XSS detection)
   */
  function containsSuspiciousContent(text) {
    const suspicious = /<script|javascript:|onerror=|onclick=|<iframe/i;
    return suspicious.test(text);
  }

  /**
   * Show field error
   */
  function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorDiv = field.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
  }

  /**
   * Clear field error
   */
  function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
      errorDiv.classList.remove('show');
    }
  }

  /**
   * Clear all form errors
   */
  function clearErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(function(error) {
      error.classList.remove('show');
    });
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(function(field) {
      field.classList.remove('error');
    });
  }

  /**
   * Show success message
   */
  function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = 'Thanks for your message! We\'ll be in touch soon. 😊';
    message.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#4CAF50;color:white;padding:1rem 2rem;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.2);z-index:1000;font-family:Georgia,serif;';
    
    document.body.appendChild(message);
    
    setTimeout(function() {
      message.style.transition = 'opacity 0.3s';
      message.style.opacity = '0';
      setTimeout(function() {
        document.body.removeChild(message);
      }, 300);
    }, 4000);
  }

  /**
   * Decode and display contact information (anti-scraping)
   */
  function initContactInfoProtection() {
    // Decode phone number
    const phoneEl = document.querySelector('[data-phone]');
    if (phoneEl) {
      const encoded = phoneEl.getAttribute('data-phone');
      phoneEl.textContent = atob(encoded);
    }

    // Decode email
    const emailEl = document.querySelector('[data-email]');
    if (emailEl) {
      const encoded = emailEl.getAttribute('data-email');
      const decoded = atob(encoded);
      emailEl.textContent = decoded;
      
      // Make it a clickable mailto link
      const parent = emailEl.parentElement;
      if (parent.tagName === 'P') {
        const link = document.createElement('a');
        link.href = 'mailto:' + decoded;
        link.textContent = decoded;
        link.style.color = 'inherit';
        emailEl.replaceWith(link);
      }
    }
  }

})();
