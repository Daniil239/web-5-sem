document.addEventListener('DOMContentLoaded', () =>
    document.getElementById('commentsButton')
        .addEventListener('click', () => loadReviews()))

async function loadReviews() {
    let comments = document.getElementById('comments');
    let animation = document.querySelector('animation');
    let randomNumber = Math.floor(Math.random() * 500);
    let response;
    let fetchedComments;

    comments.innerHTML = ''
    animation.innerHTML += `
            <div class="spinner"></div>
        `;

    try {
        response = await fetch(`https://jsonplaceholder.typicode.com/comments/`);
        fetchedComments = await response.json();
    } catch (error) {
        comments.innerHTML += `
            <div class="comment">
                ⚠ Что-то пошло не так
            </div>
        `;
    }

    animation.innerHTML = ''

    if (fetchedComments.length === 0 || response.status >= 400) {
        comments.innerHTML += `
            <div class="comment">
                ⚠ Что-то пошло не так
            </div>
        `;
    }

    for (let i = 1; i < randomNumber; i++) {
        let comment = document.querySelector('#comment');
        let clone = comment.content.cloneNode(true);
        let title = clone.querySelector('div strong');
        let email = clone.querySelector('div email');
        let text = clone.querySelector('div small');

        title.innerHTML = fetchedComments[i].name;
        email.innerHTML = fetchedComments[i].email;
        text.innerHTML = fetchedComments[i].body;
        comments.appendChild(clone);
    }
}