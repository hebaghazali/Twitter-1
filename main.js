var req = new XMLHttpRequest();
var url = "http://localhost:3000";
var posts = [],
  users = [],
  user = {};

// addData();
// getPosts();
// getUsers();
// getUser(1);

var userOb = {
  bio: "Front-End developer .",
  email: "Eman@gmail.com",
  followers: 3,
  following: 5,
  id: "2",
  name: "Eman Salah",
  password: "123456",
  userName: "Eman@Salah",
};

var postOb = {
  id: 1,
  createdAt: "2021-12-12T10:36:15.425Z",
  text: "my post text ",
  video: "url",
  image: "url",
  commentsNum: 0,
  likesNum: 0,
  retweetsNum: 0,
  user: "1",
  comments: [],
  usersLikes: [],
};

function getPosts() {
  req.open("GET", url + "/posts");
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        posts = JSON.parse(req.responseText);
        displayPosts(posts);
      }
    }
  };
}

function getUsers() {
  req.open("GET", url + "/users");
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        users = JSON.parse(req.responseText);
        console.log("users", users);
      }
    }
  };
}

function getUser(id) {
  req.open("GET", url + "/users/" + id);
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        user = JSON.parse(req.responseText);
        console.log("user>>>>>>>", user);
        return user;
      }
    } else {
      return undefined;
    }
  };
}

function addPost() {
  req.open("POST", url);
  console.log(JSON.stringify(postOb));
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  try {
    req.send(JSON.stringify(postOb));
    req.onreadystatechange = () => {
      console.log("on state change", req);

      if (req.readyState == 4) {
        if (req.status == 200) {
          data = JSON.parse(req.responseText); // to convert json to opject
          console.log("Done", data);
        } else {
          //   console.log(JSON.parse(req.responseText));
          console.log("error", req.responseText);
        }
      }
    };
  } catch (error) {
    console.log(">>>>>>>>>error", error);
  }
}

function displayPosts(posts) {
  document.getElementsByClassName("lds-ring")[0].classList.add("hidden"); // to hide indicator //.remove("hidden") change it back
  posts.forEach((post) => {
    console.log(post.user);
    document.getElementsByClassName("homepage")[0].innerHTML += `
    <div class="post-container">
          <div>
            <img class="logged-user-image" src=${post.user.img} />
            <h6 class="name-username-style">${post.user.name}</h6>
            <span class="name-username-style">@${post.user.userName}</span>
            <button title="More"class="settings-btn"><i class="fas fa-ellipsis-h"></i></button>
          </div>
          ${post.text && `<article class="post-article">${post.text}</article>`}
          ${post.image && `<img class="post-media" src=${post.image}/>`} 
          ${
            post.video &&
            `<video class="post-media" controls autoplay src="./assets/videos/production ID_4662765.mp4"></video>`
          } 
          <footer id="post-footer" style="display: flex;">
            <button id="reply-btn" title="Reply"><i class="far fa-comment"></i><label>${
              post.commentsNum
            }</label></button>
            <button id="retweet-btn" title="Retweet"><i class="fas fa-retweet"></i><label>${
              post.retweetsNum
            }</label></button>
            <button id="like-btn" title="Like"><i class="far fa-heart"></i><label>${
              post.likesNum
            }</label></button>
            <button id="share-btn" title="Share"><i class="fas fa-sign-out-alt"
                style="transform: rotate(-90deg);"></i></button>
          </footer>
        </div>
    `;
  });
}
