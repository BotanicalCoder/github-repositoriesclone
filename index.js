const fetchData = () => {
  console.log("fetching data");

  let avatar;
  let username;
  let repositories;
  let endpoint = "https://api.github.com/graphql";

  let userImage = document.getElementById("userImage");
  let navImageDesktop = document.getElementById("navimgDesktop");
  let navImageMobile = document.getElementById("navimgMobile");
  let reposContainer = document.getElementById("reposContainer");

  let content = {
    query: `{
      viewer {
        avatarUrl
        name
        repositories(first: 20) {
          edges {
            node {
              name
              shortDescriptionHTML
              languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  node {
                    name
                  }
                  size
                }
              }
            }
          }
        }
      }
    }`,
  };

  let token = "ff53b1b5603d4ed6fd8a4eb5102cb86591328b88";

  let body = JSON.stringify(content);

  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
    body: body,
  })
    .then((response) => response.json())
    .then(({ data }) => {
      console.log(data);
      //assigning the returned data values to variables
      avatar = data.viewer.avatarUrl;
      username = data.viewer.name;
      repositories = data.viewer.repositories;

      // setting the avatar as source for the images
      navImageDesktop.setAttribute("src", avatar);
      navImageMobile.setAttribute("src", avatar);
      userImage.setAttribute("src", avatar);
      reposContainer.innerHTML = ` 
      ${repositories.edges.map((repo) => {
        return `
        <div class="repoContainer">
            <h2 class="name">${repo.node.name}</h2>
            <p class="desc">${repo.node.shortDescriptionHTML}</p>
            <h8 class='lang'>${
              repo.node.languages.edges[0] === undefined
                ? ""
                : repo.node.languages.edges[0].node.name
            }</h8>
            
            </div>
        `;
      })}
      
      `;
    })
    .catch((err) => {
      // Log any errors
      console.log("something went wrong", err);
    });
};

const toggleDisplay = () => {
  let dropdownItems = document.getElementById("drop-down");

  if (dropdownItems.style.display === "block") {
    dropdownItems.style.display = "none";
  } else {
    dropdownItems.style.display = "block";
  }
};

// { "data":
//  { "viewer":
//   { "bio": "I am a front end web developer passionate about learning new technologies.",
//    "avatarUrl": "https://avatars2.githubusercontent.com/u/57745557?v=4", "
//    followers": { "totalCount": 1 },
//    "name": "BotanicalCoder",
//    "following": { "totalCount": 6 },
//    "websiteUrl": null,
//     "twitterUsername": "botanicalcoder",
//     "repositories":
//      { "edges": [
//      {"node":{ "name": "github-slideshow", "shortDescriptionHTML": "A robot powered training repository 🤖", "languages": { "edges": [ { "node": { "name": "HTML" }, "size": 111873 } ] } } },
//        { "node": { "name": "blog.github.io", "shortDescriptionHTML": "my port-folio", "languages": { "edges": [ { "node": { "name": "CSS" }, "size": 71889 } ] } } },
//        { "node": { "name": "You-Dont-Know-JS", "shortDescriptionHTML": "A book series on JavaScript. @YDKJS on twitter.", "languages": { "edges": [] } } },
//        { "node": { "name": "Functional-Light-JS", "shortDescriptionHTML": "Pragmatic, balanced FP in JavaScript. @FLJSBook on twitter.", "languages": { "edges": [ { "node": { "name": "JavaScript" }, "size": 8938 } ] } } },
//        { "node": { "name": "project-based-learning", "shortDescriptionHTML": "Curated list of project-based tutorials", "languages": { "edges": [] } } },
//        { "node": { "name": "app-ideas", "shortDescriptionHTML": "A Collection of application ideas which can be used to improve your coding skills.", "languages": { "edges": [] } } },
//        { "node": { "name": "100-days-of-code-frontend", "shortDescriptionHTML": "Curriculum for learning front-end development during #100DaysOfCode.", "languages": { "edges": [] } } },
//        { "node": { "name": "design-for-developers", "shortDescriptionHTML": "Design for Developers Workshop", "languages": { "edges": [] } } },
//        { "node": { "name": "my-hngi7", "shortDescriptionHTML": "", "languages": { "edges": [] } } },
//        { "node": { "name": "team-superman-hngi7", "shortDescriptionHTML": "", "languages": { "edges": [ { "node": { "name": "JavaScript" }, "size": 55218 } ] } } },
//        { "node": { "name": "ngs", "shortDescriptionHTML": "Node.js: Getting Started", "languages": { "edges": [ { "node": { "name": "JavaScript" }, "size": 12109 } ] } } },
//        { "node": { "name": "comingsoonpage", "shortDescriptionHTML": "", "languages": { "edges": [ { "node": { "name": "CSS" }, "size": 3772 } ] } } },
//        { "node": { "name": "js-stack-from-scratch", "shortDescriptionHTML": "🛠️⚡ Step-by-step tutorial to build a modern JavaScript stack.", "languages": { "edges": [ { "node": { "name": "JavaScript" }, "size": 530 } ] } } },
//        { "node": { "name": "google-home-page-BC-clone", "shortDescriptionHTML": "this is a clone of google search home page", "languages": { "edges": [ { "node": { "name": "CSS" }, "size": 8523 } ] } } },
//        { "node": { "name": "myjavascrit", "shortDescriptionHTML": "", "languages": { "edges": [ { "node": { "name": "JavaScript" }, "size": 3178 } ] } } },
//        { "node": { "name": "devfoodtimetable", "shortDescriptionHTML": "this is a food time table app built using vanilla javascript, html and css", "languages": { "edges": [ { "node": { "name": "CSS" }, "size": 6516 } ] } } },
//        { "node": { "name": "myTodolist", "shortDescriptionHTML": "todolist created with vanilla js, html and css", "languages": { "edges": [ { "node": { "name": "CSS" }, "size": 18918 } ] } } },
//        { "node": { "name": "setup-files-react-beach-resort", "shortDescriptionHTML": "", "languages": { "edges": [ { "node": { "name": "JavaScript" }, "size": 21879 } ] } } },
//        { "node": { "name": "learning-area", "shortDescriptionHTML": "Github repo for the MDN Learning Area. ", "languages": { "edges": [ { "node": { "name": "HTML" }, "size": 959196 } ] } } },
//        { "node": { "name": "newyorkweather", "shortDescriptionHTML": "", "languages": { "edges": [ { "node": { "name": "JavaScript" }, "size": 4432 } ] } } } ] } } } }
