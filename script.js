// Load posts
async function loadPosts() {
  const res = await fetch('data.json');
  const posts = await res.json();

  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get('cat');
  const id = urlParams.get('id');

  const container =
    document.getElementById('post-list') ||
    document.getElementById('category-posts') ||
    document.getElementById('post-content');

  if (container && cat) {
    const filtered = posts.filter(p => p.category === cat);
    container.innerHTML = filtered.map(post =>
      `<div class="post">
        <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
      </div>`).join('');
  } else if (container && id) {
    const post = posts.find(p => p.id === id);
    document.getElementById('post-title').innerText = post.title;
    container.innerHTML = `<p>${post.content}</p>`;
  } else if (container) {
    container.innerHTML = posts.map(post =>
      `<div class="post">
        <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
        <p>Category: ${post.category}</p>
      </div>`).join('');
  }
}

window.onload = loadPosts;
      
