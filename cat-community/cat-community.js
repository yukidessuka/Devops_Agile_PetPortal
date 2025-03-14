function createPostElement(post) {
    var postBox = document.createElement('div');
    postBox.className = 'post-box';
    postBox.setAttribute('data-post-id', post._id);

    postBox.innerHTML = `
        <div class="post-header">
            <img src="img/yuki.jpg" alt="User" class="profile-pic">
            <div class="post-details">
                <span class="post-author">${post.author}</span>
                <span class="post-time">${new Date(post.time).toLocaleString()}</span>
            </div>
        </div>
        <p class="post-content">${post.content}</p>
        <div class="divider"></div>
        <div class="comment-section">
            <span class="comment-header">Comment</span>
            ${post.comments.map(comment => `
                <div class="comment-box" data-comment-id="${comment._id}">
                    <img src="img/yuki.jpg" alt="User" class="comment-profile-pic">
                    <div class="comment-content">
                        <span class="post-author">${comment.author}</span>
                        <p class="comment-text">${comment.content}</p>
                        <span class="delete-comment">🗑️ Delete</span>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="post-actions">
            <span><i>👍</i> Like</span>
            <span class="comment-toggle"><i>💬</i> Comment</span>
            <span class="delete-post">🗑️ Delete</span>
        </div>
    `;

    addPostEventListeners(postBox, post._id);
    return postBox;
}

// Function to load posts from the server
async function loadPosts() {
    try {
        const response = await fetch('http://localhost:3002/posts');
        const posts = await response.json();
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = ''; // Clear existing posts

        posts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

document.getElementById('postButton').addEventListener('click', async function() {
    var inputField = document.getElementById('questionInput');
    var postContent = inputField.value;

    if (postContent.trim() !== "") {
        try {
            const response = await fetch('http://localhost:3002/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ author: 'Onwara', content: postContent })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newPost = await response.json();
            const postElement = createPostElement(newPost);
            document.getElementById('postsContainer').prepend(postElement);
            inputField.value = "";
        } catch (error) {
            console.error('Error:', error);
        }   
    }
});

function addPostEventListeners(postBox, postId) {
    // Add event listener for delete post
    postBox.querySelector('.delete-post')?.addEventListener('click', async function() {
        try {
            const response = await fetch(`http://localhost:3002/posts/${postId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            postBox.remove();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Add event listener for comment toggle (to add comments to an existing post-box)
    postBox.querySelector('.comment-toggle').addEventListener('click', function() {
        var commentBox = document.createElement('div');
        commentBox.className = 'comment-box';
        commentBox.innerHTML = `
            <input type="text" class="comment-input" placeholder="Type your comment here...">
            <button class="comment-button">Comment</button>
        `;
        postBox.querySelector('.comment-section').appendChild(commentBox);

        // Add event listener for comment button (posting a comment)
        commentBox.querySelector('.comment-button').addEventListener('click', async function() {
            var commentInput = commentBox.querySelector('.comment-input');
            var commentContent = commentInput.value;

            if (commentContent.trim() !== "") {
                try {
                    const response = await fetch(`http://localhost:3002/posts/${postId}/comments`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ author: 'Onwara', content: commentContent })
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const updatedPost = await response.json();
                    const newComment = updatedPost.comments[updatedPost.comments.length - 1];
                    var newCommentBox = document.createElement('div');
                    newCommentBox.className = 'comment-box';
                    newCommentBox.setAttribute('data-comment-id', newComment._id);

                    newCommentBox.innerHTML = `
                        <img src="img/yuki.jpg" alt="User" class="comment-profile-pic">
                        <div class="comment-content">
                            <span class="post-author">Onwara</span>
                            <p class="comment-text">${newComment.content}</p>
                            <span class="delete-comment">🗑️ Delete</span>
                        </div>
                    `;

                    postBox.querySelector('.comment-section').appendChild(newCommentBox);
                    commentInput.value = "";
                    commentBox.remove();

                    // Add event listener for delete comment button
                    newCommentBox.querySelector('.delete-comment').addEventListener('click', async function() {
                        try {
                            const response = await fetch(`http://localhost:3002/posts/${postId}/comments/${newComment._id}`, {
                                method: 'DELETE'
                            });

                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }

                            newCommentBox.remove();
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    });

    // Add event listeners for existing comments (to delete comment)
    postBox.querySelectorAll('.comment-box').forEach(commentBox => {
        const commentId = commentBox.getAttribute('data-comment-id');
        commentBox.querySelector('.delete-comment').addEventListener('click', async function() {
            try {
                const response = await fetch(`http://localhost:3002/posts/${postId}/comments/${commentId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                commentBox.remove();
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
}

// Load posts when the page loads
window.onload = loadPosts;

// Search functionality
document.querySelector('.search-bar input').addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    document.querySelectorAll('.post-box').forEach(function(postBox) {
        var postContent = postBox.querySelector('.post-content').textContent.toLowerCase();
        if (postContent.includes(searchTerm)) {
            postBox.style.display = '';
        } else {
            postBox.style.display = 'none';
        }
    });
});
