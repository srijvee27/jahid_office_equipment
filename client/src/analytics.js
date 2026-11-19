import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    try {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      console.log('📊 Google Analytics 4 Initialized:', GA_MEASUREMENT_ID);
    } catch (err) {
      console.warn('GA4 Init warning:', err);
    }
  } else {
    // Graceful no-op log in dev
    console.log('ℹ️ GA4 Measurement ID not set in env (VITE_GA_MEASUREMENT_ID). Analytics events will be logged locally.');
  }
};

export const logPageView = (path) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (action, params = {}) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.event(action, params);
  } else {
    console.log(`[GA4 Event] ${action}:`, params);
  }
};

// Custom JOE Event Helpers
export const trackModelSelect = (modelSlug, modelName) => {
  trackEvent('model_select', {
    model_slug: modelSlug,
    model_name: modelName
  });
};

export const trackPartHover = (partSlug, partName) => {
  trackEvent('part_hover', {
    part_slug: partSlug,
    part_name: partName
  });
};

export const trackPartClick = (partSlug, partName, priceBDT) => {
  trackEvent('part_click', {
    part_slug: partSlug,
    part_name: partName,
    price_bdt: priceBDT
  });
};

export const trackQuoteSubmit = (itemName, itemType, customerEmail) => {
  trackEvent('quote_submit', {
    item_name: itemName,
    item_type: itemType,
    customer_domain: customerEmail ? customerEmail.split('@')[1] : 'unknown'
  });
};
