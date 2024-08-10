//login
document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    let loginId = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let storedLogin = localStorage.getItem('loginId');
    let storedPassword = localStorage.getItem('password');

    if (loginId === storedLogin && password === storedPassword) {
        document.querySelector('.login_page').classList.add('hide');
        document.querySelector('.home').classList.remove('hide');
        clearInputs();
        getPosts();
    } else {
        let passwordError = document.querySelector('.error');
        passwordError.classList.remove('hide');
    }
});

localStorage.setItem('loginId', 'admin@gmail.com');
localStorage.setItem('password', 'admin123');

document.querySelector('.logout').addEventListener('click', function() {
    document.querySelector('.home').classList.add('hide');
    document.querySelector('.login_page').classList.remove('hide');
});

function clearInputs() {
    document.querySelectorAll('input').forEach(input => input.value = '');
}
clearInputs();

//json
async function getPosts() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        let posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
function displayPosts(posts) {
    const tweets = document.querySelector('.tweets');
    tweets.innerHTML = '<p style="color: white; font-size: 20px; padding-left: 10px;">Home</p><hr>';
    posts.forEach(post => {
        const tweet = document.createElement('div');
        tweet.classList.add('tweet');
        tweet.innerHTML = `
        <div class="profilepic">
        <div>
        <img src="profile.svg" style="width:35px; height:35px; padding-right:5px"/>
        </div>
        <div>
        <h3 style="color: white; margin:0; padding-top:6px">User @user${post.id}<h3>
        <h3 style="color: #08a0e9;">${post.title}</h3>
        <p style="color: white;">${post.body}</p>
        </div>
        </div>
        <div class="bar">
        <span class="comment">Comment</span>
        <span>Share</span>
        <span>Like</span>
        <span class="save">Save</span>
        </div>
        <hr style="border: 1px solid #808080;">
        `;
        tweets.appendChild(tweet);
    });
}