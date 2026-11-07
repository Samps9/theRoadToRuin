/**
 * Content Renderer
 * Dynamically loads and renders content from JSON data files
 * Preserves exact HTML structure and CSS classes from the original site
 */

class ContentRenderer {
  constructor() {
    this.releases = [];
    this.news = [];
    this.featuredVideos = [];
  }

  /**
   * Initialize the renderer by loading all data files
   */
  async init() {
    try {
      await Promise.all([
        this.loadReleases(),
        this.loadNews(),
        this.loadFeaturedVideos()
      ]);

      this.render();
    } catch (error) {
      console.error('Error initializing content renderer:', error);
    }
  }

  /**
   * Load releases data from JSON
   */
  async loadReleases() {
    try {
      const response = await fetch('data/releases.json');
      this.releases = await response.json();
    } catch (error) {
      console.error('Error loading releases:', error);
    }
  }

  /**
   * Load news data from JSON
   */
  async loadNews() {
    try {
      const response = await fetch('data/news.json');
      this.news = await response.json();
    } catch (error) {
      console.error('Error loading news:', error);
    }
  }

  /**
   * Load featured videos data from JSON
   */
  async loadFeaturedVideos() {
    try {
      const response = await fetch('data/featured-videos.json');
      const data = await response.json();
      // Support both single video object and array of videos
      this.featuredVideos = Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Error loading featured videos:', error);
    }
  }

  /**
   * Render all content to the page
   */
  render() {
    this.renderFeaturedVideos();
    this.renderReleases();
    this.renderNews();
  }

  /**
   * Render the featured videos section
   */
  renderFeaturedVideos() {
    const container = document.getElementById('featured-videos-container');
    if (!container || !this.featuredVideos || this.featuredVideos.length === 0) return;

    const videosHTML = this.featuredVideos.map(video => `
      <div class="video-player">
        <iframe src="${video.embedUrl}"></iframe>
      </div>
    `).join('');

    container.innerHTML = videosHTML;
  }

  /**
   * Render all music releases
   */
  renderReleases() {
    const container = document.getElementById('releases-container');
    if (!container) return;

    const releasesHTML = this.releases.map(release => {
      const releaseClass = release.type === 'single' ? 'release-text single' : 'release-text';

      return `
        <div class="release">
          <div class="release-player">
            <iframe src="${release.bandcampEmbedUrl}" seamless><a href="${release.bandcampUrl}">${release.title} by The Road To Ruin</a></iframe>
          </div>
          <div class="${releaseClass}">
            <h4>${release.title}</h4>
            <p><a class="bc-button" href="${release.bandcampUrl}" target="_blank">Stream or purchase on Bandcamp</a></p>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = releasesHTML;
  }

  /**
   * Render all news posts
   */
  renderNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    const newsHTML = this.news.map(post => {
      let imageHTML = '';
      if (post.image) {
        const imageId = post.image.replace(/\.(jpg|png|gif)$/, '').replace(/_/g, '-');
        imageHTML = `<div id="${imageId}" class="cover"></div>`;

        // Dynamically set the background image
        this.setBackgroundImage(imageId, post.image);
      }

      let subtitleHTML = '';
      if (post.subtitle) {
        subtitleHTML = `<h1 class="post-title">${post.subtitle}</h1>`;
      }
      if (post.extraSubtitle) {
        subtitleHTML += `<h1 class="post-title">${post.extraSubtitle}</h1>`;
      }

      return `
        <article class="post">
          <span class="post-date">${post.date}</span>
          <h1 class="post-title">${post.title}</h1>
          ${subtitleHTML}
          ${imageHTML}
          <p class="post-content">
            ${post.content}
          </p>
        </article>
      `;
    }).join('');

    // Add the news controls at the end
    const controlsHTML = `
      <div id="news-controls">
        <ul>
          <li><span id="less-news-button">SHOW LESS</span></li>
          <li><span id="more-news-button">SHOW MORE</span></li>
        </ul>
      </div>
    `;

    container.innerHTML = newsHTML + controlsHTML;

    // After rendering news, initialize the show/hide functionality
    if (window.displayRecentNews) {
      window.displayRecentNews();
    }
  }

  /**
   * Set background image for a news post cover
   */
  setBackgroundImage(elementId, imagePath) {
    // Wait for the element to be in the DOM
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.style.backgroundImage = `url(images/${imagePath})`;
      }
    }, 0);
  }
}

// Initialize content renderer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const renderer = new ContentRenderer();
    renderer.init();
  });
} else {
  const renderer = new ContentRenderer();
  renderer.init();
}
