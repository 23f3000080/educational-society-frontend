function setMetaTag(name, content, attr = 'name') {
  if (!content) return;
  let selector = `${attr}="${name}"`;
  let el = document.querySelector(`meta[${selector}]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setPropertyTag(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function updateMeta(meta = {}) {
  const siteName = 'Educational Society';
  if (meta.title) {
    document.title = `${meta.title} — ${siteName}`;
  } else {
    document.title = siteName;
  }

  setMetaTag('description', meta.description || 'Courses, notes and live classes to help students learn and grow.');
  setMetaTag('keywords', meta.keywords || 'education, online courses, live classes, notes, books');
  setPropertyTag('og:title', meta.title ? `${meta.title} — ${siteName}` : siteName);
  setPropertyTag('og:description', meta.description || 'Courses, notes and live classes to help students learn and grow.');
  setPropertyTag('og:url', meta.url || window.location.href);
  setPropertyTag('og:image', meta.image || `${window.location.origin}/og-image.png`);
  setPropertyTag('og:site_name', siteName);
  setMetaTag('twitter:card', meta.twitterCard || 'summary_large_image', 'name');
  setMetaTag('twitter:title', meta.title ? `${meta.title} — ${siteName}` : siteName, 'name');
  setMetaTag('twitter:description', meta.description || 'Courses, notes and live classes to help students learn and grow.', 'name');
  setMetaTag('twitter:image', meta.image || `${window.location.origin}/og-image.png`, 'name');

  // canonical link
  if (meta.canonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', meta.canonical);
  }
}

export default { updateMeta };
