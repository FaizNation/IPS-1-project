document.querySelectorAll('.post').forEach((post, index) => {
    const likeBtn = post.querySelector('.like-btn');
    const likeCount = post.querySelector('.like-count');
    const video = post.querySelector('video');
    const commentInput = post.querySelector('.comment-input');
    const commentBtn = post.querySelector('.comment-btn');
    const commentList = post.querySelector('.comment-list');
  
    const postKey = `post_${index}`;
  
    // Menyimpan referensi ke video yang sedang diputar
    let currentlyPlayingVideo = null;
  
    // Load data from Local Storage on page load
    loadPostData();
  
    // Like button functionality
    likeBtn.addEventListener('click', () => {
      let likes = parseInt(likeCount.textContent);
      if (likeBtn.classList.contains('liked')) {
        likes -= 1;
        likeBtn.textContent = '♡ Like';
      } else {
        likes += 1;
        likeBtn.textContent = '♥ Liked';
      }
      likeBtn.classList.toggle('liked');
      likeCount.textContent = `${likes} likes`;
      savePostData();
    });
  
    // Auto-pause ketika video lainnya diputar
    video.addEventListener('play', () => {
      if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
        currentlyPlayingVideo.pause();
      }
      currentlyPlayingVideo = video;
    });
  
    // Auto-play video berikutnya setelah selesai
    video.addEventListener('ended', () => {
      const nextPost = document.querySelector(`.post:nth-child(${index + 2}) video`);
      if (nextPost) {
        nextPost.play();
      }
    });
  
    // Add new comment
    commentBtn.addEventListener('click', addComment);
    commentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addComment();
      }
    });
  
    function addComment() {
      const commentText = commentInput.value.trim();
      if (commentText !== '') {
        const commentItem = document.createElement('li');
        commentItem.textContent = commentText;
        commentList.appendChild(commentItem);
        savePostData();
        commentInput.value = '';
      }
    }
  
    // Save post data (likes & comments) to Local Storage
    function savePostData() {
      const postData = {
        likes: parseInt(likeCount.textContent),
        liked: likeBtn.classList.contains('liked'),
        comments: Array.from(commentList.children).map(comment => comment.textContent),
      };
      localStorage.setItem(postKey, JSON.stringify(postData));
    }
  
    // Load post data from Local Storage
    function loadPostData() {
      const postData = JSON.parse(localStorage.getItem(postKey));
      if (postData) {
        likeCount.textContent = `${postData.likes} likes`;
        if (postData.liked) {
          likeBtn.classList.add('liked');
          likeBtn.textContent = '♥ Liked';
        }
        postData.comments.forEach(comment => {
          const commentItem = document.createElement('li');
          commentItem.textContent = comment;
          commentList.appendChild(commentItem);
        });
      }
    }
  });
  