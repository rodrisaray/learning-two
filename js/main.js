const bloggerFeedURL = 'https://yourblog.blogspot.com/feeds/posts/default?alt=json';

fetch(bloggerFeedURL)
  .then(response => response.json())
  .then(data => {
    const blogFeed = document.getElementById('blogFeed');
    const posts = data.feed.entry?.slice(0, 4) || [];

    posts.forEach(post => {
      const title = post.title.$t;
      const content = post.content.$t;
      const link = post.link.find(l => l.rel === 'alternate').href;

      const article = document.createElement('article');
      article.className = 'blog-post';
      article.innerHTML = `
        <h3>${title}</h3>
        <p>${stripHTML(content).substring(0, 140)}...</p>
        <a href="${link}" target="_blank" rel="noopener noreferrer">Read More</a>
      `;
      blogFeed.appendChild(article);
    });
  })
  .catch(() => {
    document.getElementById('blogFeed').innerHTML = "<p>Unable to load posts at this time.</p>";
  });

function stripHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}
