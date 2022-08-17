window.addEventListener('DOMContentLoaded', () => {
    fetch('https://picsum.photos/v2/list?page=2&limit=30', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        data.forEach(e => {
            createPost(e.id, e.download_url, e.author)
        })
    })
    .catch(err => console.log(err))
})

function createPost(id, image, name) {
    const post = (`
    <div class="post">
        <div class="op-info">
            <div class="profile-pic">
                <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png" alt="profile-pic">
            </div>
            <div class="name-and-location">
                <p class="profile-name">${name}</p>
                <p class="location">Buenos Aires, Argentina</p>
            </div>
        </div>
        <div class="img-container">
            <img src="${image}" alt="Image id${id}">
        </div>
        <div class="post-buttons">
            <button class="like id${id}" onclick="toggleLike('id${id}')">
                <svg viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1922 3.93947L12.0108 5.06127L12.8152 3.92921C13.9861 2.28118 15.3883 1.55 17.3 1.55C20.3746 1.55 23 4.27619 23 7.8C23 10.955 20.7845 12.9687 18.0873 15.2089C17.8129 15.4087 17.5359 15.6571 17.3041 15.8651C17.2108 15.9488 17.1248 16.0259 17.0492 16.0907L17.04 16.0986L17.031 16.1067L16.031 17.0067L16.031 17.0067L16.0229 17.0141C14.7715 18.1654 13.9306 18.932 13.3415 19.4474C12.7382 19.9753 12.4494 20.1942 12.2855 20.2925C12.2252 20.3287 12.1585 20.3587 12.0968 20.3783C12.0368 20.3974 12.0037 20.3997 12.0003 20.4C12 20.4 11.9999 20.4 12 20.4C12.0001 20.4 12 20.4 11.9997 20.4C11.9963 20.3997 11.9632 20.3974 11.9032 20.3783C11.8415 20.3587 11.7748 20.3287 11.7145 20.2925C11.5541 20.1962 11.2228 19.9348 10.5927 19.3883C10.1545 19.0083 9.60715 18.5221 8.92072 17.9126C8.65615 17.6776 8.37091 17.4243 8.06331 17.1517L8.06334 17.1516L8.05618 17.1454L6.93166 16.1676C6.6069 15.8455 6.24259 15.5339 5.94738 15.2878C3.27308 12.9733 1 10.916 1 7.8C1 4.27233 3.62562 1.55854 6.68649 1.59991L6.68649 1.6H6.7C8.61517 1.6 10.0212 2.3347 11.1922 3.93947Z" fill="none" stroke="black" stroke-width="2"/>
                </svg>
            </button>
            <button class="comment">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.6444 15.9944C20.8595 13.8925 21.2678 11.4202 20.7931 9.03916C20.3184 6.65816 18.9932 4.53141 17.0649 3.05622C15.1366 1.58103 12.7372 0.858298 10.3149 1.02305C7.89265 1.1878 5.61321 2.22875 3.90242 3.95146C2.19163 5.67416 1.16651 7.96077 1.01858 10.3841C0.870644 12.8075 1.61001 15.2018 3.09855 17.1198C4.58708 19.0378 6.72298 20.3483 9.10721 20.8065C11.4915 21.2646 13.9609 20.8391 16.0544 19.6094L20.9884 20.9864L19.6444 15.9944Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                </svg>                    
            </button>
            <button class="send">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 1L8.21802 8.083" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M10.698 18.334L21 1.001H1L8.218 8.084L10.698 18.334Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
                </svg>    
            </button>
        </div>
        <div class="comments id${id}">
            <p><strong>try_to_comment </strong>dolor sit amet, consectetur adipiscing elit. Mi enim ut eu cras ultrices eget et tristique proin. Mi enim ut eu cras ultrices eget et tristique proin.</p>
        </div>
        <div class="comment-box id${id}">
            <input type="text" value="" placeholder="Write something">
            <p class="post-comment id${id}" onclick='postComment("id${id}")'>Post</p>
        </div>
    </div>
    `)
    document.getElementById('wrapper').innerHTML += post
}

function postComment(id) {
    const commentInput = document.querySelector(`.comment-box.${id} input`)
    const comments = document.querySelector(`.comments.${id}`)
    if (commentInput.value.length > 0)  {
        comments.innerHTML += `<p><strong>Comment </strong>${commentInput.value}</p>`
        commentInput.value = ''
    }
}

function toggleLike(id){
    const likePath = document.querySelector(`.like.${id} svg path`)
    const likeButton = document.querySelector(`.like.${id}`)
    if (likeButton.classList.contains('active')) {
        likeButton.classList.remove('active')
        likePath.setAttribute('fill', 'none')
    } else {
        likeButton.classList.add('active')
        likePath.setAttribute('fill', '#ED4956')
    }
}