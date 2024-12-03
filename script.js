document.querySelectorAll('.post').forEach((post, index) => {
    const likeBtn = post.querySelector('.like-btn');
    const likeCount = post.querySelector('.like-count');
    const commentInput = post.querySelector('.comment-input');
    const commentBtn = post.querySelector('.comment-btn');
    const commentList = post.querySelector('.comment-list');
  
    const postKey = `post_${index}`;
  
    // Load saved data
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
  
    // Comment functionality
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
        commentInput.value = '';
        savePostData();
      }
    }
  
    // Save likes and comments to Local Storage
    function savePostData() {
      const postData = {
        likes: parseInt(likeCount.textContent),
        liked: likeBtn.classList.contains('liked'),
        comments: Array.from(commentList.children).map(comment => comment.textContent)
      };
      localStorage.setItem(postKey, JSON.stringify(postData));
    }
  
    // Load likes and comments from Local Storage
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
  