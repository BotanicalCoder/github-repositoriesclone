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

  let token = "4e6b7b4e1ab0bd818a456b6905b2299aa17bce0d";

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
